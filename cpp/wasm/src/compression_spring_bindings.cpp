#include "odop/compression_spring_model.hpp"
#include "odop/optimization.hpp"

#include <memory>
#include <cmath>
#include <string>
#include <vector>

namespace {

using odop::compression_spring::FlatDesign;
using odop::compression_spring::FlatSymbol;

struct SessionHost {
  FlatDesign design{std::string(odop::compression_spring::kDesignType),
                    odop::compression_spring::kSchemaVersion, {}, {}};
  odop::SystemControls controls;
  std::unique_ptr<odop::DesignSession> session;
  std::string diagnostic;
  std::string trace;
  bool trace_enabled = false;
  double objective = 0.;
  odop::optimization::SeekResult seek_result;
};

FlatSymbol* symbol(SessionHost& host, const char* id) {
  if (id == nullptr || odop::compression_spring::find_slot(id) == nullptr) return nullptr;
  for (auto& current : host.design.symbols) if (current.id == id) return &current;
  host.design.symbols.push_back({});
  host.design.symbols.back().id = id;
  return &host.design.symbols.back();
}

odop::compression_spring::Model* model(SessionHost& host) {
  return host.session == nullptr ? nullptr :
      dynamic_cast<odop::compression_spring::Model*>(&host.session->model());
}

int hydrate(SessionHost& host) {
  auto result = odop::compression_spring::create_session(host.design, host.controls);
  if (!result.ok()) {
    host.session.reset();
    host.diagnostic = result.diagnostics.empty() ? "could not hydrate Compression Spring session" : result.diagnostics.front();
    return 0;
  }
  host.session = std::move(result.session);
  host.diagnostic.clear();
  return 1;
}

}  // namespace

extern "C" {

// The caller supplies six P values and 54 numeric X values. The latter is
// updated in place, avoiding model internals or C++ object handles at the ABI.
int odop_compression_spring_evaluate(const double* p_input, double* x_output) {
  if (p_input == nullptr || x_output == nullptr) return 0;
  std::vector<double> p(p_input, p_input + odop::compression_spring::kPSize);
  std::vector<double> x(x_output, x_output + odop::compression_spring::kXSize);
  try {
    odop::compression_spring::evaluate(p, x, "mat_us.json", odop::SystemControls{});
  } catch (...) {
    return 0;
  }
  for (std::size_t i = 0; i < x.size(); ++i) x_output[i] = x[i];
  return 1;
}

// The Stage 7 façade intentionally exposes data, not C++ inheritance or Wasm
// memory ownership. The Worker hydrates a complete persisted table per
// transaction, then asks C++ to calculate/search it in one call.
void* odop_compression_spring_session_create() { return new SessionHost; }
void odop_compression_spring_session_destroy(void* raw) { delete static_cast<SessionHost*>(raw); }
void odop_compression_spring_session_clear(void* raw) {
  auto& host = *static_cast<SessionHost*>(raw);
  host.design.symbols.clear(); host.design.propagations.clear(); host.session.reset(); host.diagnostic.clear();
}
int odop_compression_spring_session_set_propagation(void* raw, const char* source, const char* target, int kind) {
  if (source == nullptr || target == nullptr || kind < 0 || kind > 3) return 0;
  static_cast<SessionHost*>(raw)->design.propagations.push_back({source, target, static_cast<odop::compression_spring::PropagationTarget>(kind)});
  return 1;
}
int odop_compression_spring_session_set_numeric(void* raw, const char* id,
    double value, double valid_minimum, double valid_maximum,
    double constraint_minimum, double constraint_maximum, double scale_limit,
    double minimum_scale, double maximum_scale, double minimum_violation,
    double maximum_violation, unsigned minimum_flags, unsigned maximum_flags) {
  auto* entry = symbol(*static_cast<SessionHost*>(raw), id);
  if (entry == nullptr) return 0;
  const auto optional = [](double candidate) -> std::optional<double> {
    return std::isnan(candidate) ? std::nullopt : std::optional<double>{candidate};
  };
  entry->numeric_value = value; entry->text_value.reset();
  entry->valid_minimum = optional(valid_minimum); entry->valid_maximum = optional(valid_maximum);
  entry->constraint_minimum = optional(constraint_minimum); entry->constraint_maximum = optional(constraint_maximum);
  entry->scale_denominator_limit = optional(scale_limit);
  entry->minimum_scale_denominator = optional(minimum_scale); entry->maximum_scale_denominator = optional(maximum_scale);
  entry->minimum_violation = optional(minimum_violation); entry->maximum_violation = optional(maximum_violation);
  entry->minimum_flags = minimum_flags; entry->maximum_flags = maximum_flags;
  return 1;
}
int odop_compression_spring_session_set_text(void* raw, const char* id, const char* value) {
  auto* entry = symbol(*static_cast<SessionHost*>(raw), id);
  if (entry == nullptr || value == nullptr) return 0;
  entry->text_value = value; entry->numeric_value.reset(); return 1;
}
void odop_compression_spring_session_set_control(void* raw, int field, double value) {
  auto& c = static_cast<SessionHost*>(raw)->controls;
  switch (field) {
    case 0: c.max_iterations = static_cast<int>(value); break;
    case 1: c.fixed_weight = value; break; case 2: c.constraint_weight = value; break;
    case 3: c.violation_weight = value; break; case 4: c.objective_minimum = value; break;
    case 5: c.initial_step = value; break; case 6: c.minimum_step = value; break;
    case 7: c.tolerance = value; break; case 8: c.small_number = value; break;
    case 9: c.merit_function_weight = value; break;
    default: break;
  }
}
void odop_compression_spring_session_set_trace(void* raw, int enabled) {
  static_cast<SessionHost*>(raw)->trace_enabled = enabled != 0;
}
int odop_compression_spring_session_recalculate(void* raw, int initialize) {
  auto& host = *static_cast<SessionHost*>(raw);
  if (!hydrate(host)) return 0;
  if (initialize) {
    const auto initialized = odop::compression_spring::init(*host.session);
    if (!initialized.ok()) { host.diagnostic = initialized.diagnostics.front(); return 0; }
  }
  odop::compression_spring::evaluate(*host.session);
  odop::optimization::recompute_scales(*host.session);
  const auto evaluation = odop::optimization::evaluate(
      *host.session, odop::optimization::compile_problem(*host.session));
  host.objective = evaluation.objective;
  return 1;
}
int odop_compression_spring_session_search(void* raw) {
  auto& host = *static_cast<SessionHost*>(raw);
  if (host.session == nullptr && !odop_compression_spring_session_recalculate(raw, 1)) return 0;
  const auto result = odop::optimization::patsh(*host.session, odop::optimization::compile_problem(*host.session), {}, host.trace_enabled);
  host.diagnostic = result.termination;
  host.trace.clear();
  for (const auto& line : result.trace) host.trace += line + '\n';
  host.objective = result.evaluation.objective;
  return 1;
}
int odop_compression_spring_session_seek(void* raw, const char* target, int direction) {
  auto& host = *static_cast<SessionHost*>(raw);
  if (target == nullptr) { host.diagnostic = "Seek requires a numeric target."; return 0; }
  if (host.session == nullptr && !odop_compression_spring_session_recalculate(raw, 1)) return 0;
  const auto* location = odop::compression_spring::find_slot(target);
  if (location != nullptr && !location->numeric) { host.diagnostic = "Seek requires a numeric target."; return 0; }
  host.seek_result = odop::optimization::seek(*host.session,
      odop::optimization::compile_problem(*host.session), target, direction, {}, host.trace_enabled);
  host.diagnostic = host.seek_result.termination;
  host.trace.clear();
  for (const auto& line : host.seek_result.trace) host.trace += line + '\n';
  host.objective = host.seek_result.evaluation.objective;
  return host.seek_result.ok ? 1 : 0;
}
const char* odop_compression_spring_session_seek_target(void* raw) {
  return static_cast<SessionHost*>(raw)->seek_result.target.c_str();
}
double odop_compression_spring_session_seek_result(void* raw, int field) {
  const auto& result = static_cast<SessionHost*>(raw)->seek_result;
  switch (field) {
    case 0: return result.starting_value;
    case 1: return result.ending_value;
    case 2: return result.percent_improvement;
    case 3: return result.constraint_limited;
    case 4: return result.repeat_recommended;
    default: return 0.;
  }
}
double odop_compression_spring_session_get_numeric(void* raw, const char* id, int field) {
  auto* current = model(*static_cast<SessionHost*>(raw));
  const auto* location = id == nullptr ? nullptr : odop::compression_spring::find_slot(id);
  if (current == nullptr || location == nullptr || !location->numeric) return 0.;
  const auto& slot = location->storage == odop::compression_spring::Storage::p ? current->state().p.at(location->offset) : current->state().x_numbers.at(location->offset);
  switch (field) {
    case 0: return slot.value; case 1: return slot.minimum_violation; case 2: return slot.maximum_violation;
    case 3: return slot.minimum_scale_denominator; case 4: return slot.maximum_scale_denominator;
    case 5: return slot.valid_minimum; case 6: return slot.valid_maximum;
    case 7: return slot.constraint_minimum; case 8: return slot.constraint_maximum;
    case 9: return slot.scale_denominator_limit; case 10: return slot.minimum_flags; case 11: return slot.maximum_flags;
    default: return 0.;
  }
}
const char* odop_compression_spring_session_diagnostic(void* raw) { return static_cast<SessionHost*>(raw)->diagnostic.c_str(); }
const char* odop_compression_spring_session_trace(void* raw) { return static_cast<SessionHost*>(raw)->trace.c_str(); }
double odop_compression_spring_session_objective(void* raw) { return static_cast<SessionHost*>(raw)->objective; }
const char* odop_compression_spring_session_get_text(void* raw, const char* id) {
  auto* current = model(*static_cast<SessionHost*>(raw));
  const auto* location = id == nullptr ? nullptr : odop::compression_spring::find_slot(id);
  if (current == nullptr || location == nullptr || location->numeric) return "";
  return current->state().x_text.at(location->offset).value.c_str();
}

}
