#include "odop/optimization.hpp"
#include "odop/compression_spring_model.hpp"
#include "odop/design_session.hpp"

#include <algorithm>
#include <cmath>
#include <iomanip>
#include <sstream>

namespace odop::optimization {
namespace { constexpr unsigned constrained = 1, fixed = 2; }
namespace {
std::string trace_explore(const std::vector<double>& phi, const double objective,
                   const unsigned iterations, const double step,
                   const std::vector<int>& signs) {
  std::ostringstream output;
  output << std::setprecision(17);
  output << "[PATSH_TRACE][WASM] After patsh_explore {\"phi\":[";
  for (std::size_t i = 0; i < phi.size(); ++i) {
    if (i != 0) output << ',';
    output << phi[i];
  }
  output << "],\"s\":" << objective << ",\"itno\":" << iterations
            << ",\"del\":" << step << ",\"xflag\":[";
  for (std::size_t i = 0; i < signs.size(); ++i) {
    if (i != 0) output << ',';
    output << signs[i];
  }
  output << "]}";
  return output.str();
}

std::string trace_exit(const std::string& termination) {
  const std::string output = "[PATSH_TRACE][WASM] End patsh NCODE= " + termination;
  return output;
}

std::string trace_candidate(const std::vector<double>& phi, const Evaluation& evaluation,
                            const unsigned number, const double weight) {
  std::ostringstream output;
  output << std::setprecision(17) << "[PATSH_TRACE][WASM][CANDIDATE] {\"number\":" << number
         << ",\"p\":[";
  for (std::size_t i = 0; i < phi.size(); ++i) { if (i) output << ','; output << phi[i]; }
  output << "],\"violation_sum\":" << evaluation.violation_sum << ",\"violation_weight\":" << weight << ",\"objective\":" << evaluation.objective << ",\"terms\":[";
  for (std::size_t i = 0; i < evaluation.terms.size(); ++i) {
    const auto& term = evaluation.terms[i];
    if (i) output << ',';
    output << "{\"name\":\"" << term.name << "\",\"value\":" << term.value
           << ",\"validity_vmin\":" << term.valid_min << ",\"validity_vmax\":" << term.valid_max
           << ",\"feasibility_vmin\":" << term.feasibility_min << ",\"feasibility_vmax\":" << term.feasibility_max
           << ",\"smin\":" << term.smin << ",\"smax\":" << term.smax
           << ",\"contribution\":" << term.contribution << '}';
  }
  output << "]}";
  return output.str();
}
}
double scale_denominator(const SystemControls& controls, const double level,
                         const double limit, const unsigned flags) {
  const double weight = (flags & fixed) ? controls.fixed_weight
                                         : controls.constraint_weight;
  return std::max(std::abs(level) / weight + controls.small_number, limit);
}
void recompute_scales(DesignSession& session) {
  auto* model = dynamic_cast<compression_spring::Model*>(&session.model());
  if (!model) return;
  const auto update = [&](compression_spring::NumericSlot& slot) {
    slot.minimum_scale_denominator = scale_denominator(session.controls(), slot.constraint_minimum, slot.scale_denominator_limit, slot.minimum_flags);
    slot.maximum_scale_denominator = scale_denominator(session.controls(), slot.constraint_maximum, slot.scale_denominator_limit, slot.maximum_flags);
  };
  for (auto& slot : model->state().p) {
    // Fixing an independent value does not change its constraint levels or
    // finalized scales in the legacy reducer. Retain those persisted scales.
    if ((slot.minimum_flags & fixed) && slot.minimum_scale_denominator > 0. && slot.maximum_scale_denominator > 0.) continue;
    update(slot);
  }
  for (auto& slot : model->state().x_numbers) update(slot);
}
Problem compile_problem(const DesignSession& session) {
  const auto* model = dynamic_cast<const compression_spring::Model*>(&session.model());
  if (!model) return {};
  Problem result;
  const auto name = [&](Source source, std::size_t offset) {
    for (const auto& symbol : model->state().ui_symbols) {
      if (symbol.numeric && symbol.location.storage == (source == Source::p ? compression_spring::Storage::p : compression_spring::Storage::x) && symbol.location.offset == offset) return symbol.id;
    }
    return std::string(source == Source::p ? "p_" : "x_") + std::to_string(offset);
  };
  const auto add = [&](Source source, std::size_t offset, const compression_spring::NumericSlot& s) {
    result.descriptors.push_back({source, offset, name(source, offset), s.valid_minimum, s.valid_maximum, s.constraint_minimum, s.constraint_maximum, s.minimum_scale_denominator, s.maximum_scale_denominator, s.minimum_flags, s.maximum_flags});
  };
  for (std::size_t i=0;i<model->state().p.size();++i) add(Source::p,i,model->state().p[i]);
  for (std::size_t i=0;i<model->state().x_numbers.size();++i) add(Source::x,i,model->state().x_numbers[i]);
  return result;
}
Evaluation evaluate(DesignSession& session, const Problem& problem, const bool trace,
                    const std::optional<Merit>& merit) {
  Evaluation result;
  auto* model = dynamic_cast<compression_spring::Model*>(&session.model());
  if (!model) { result.diagnostics.push_back("objective requires a Compression Spring session"); return result; }
  const auto penalty = [](const double value) { return value * value; };
  const auto fixed_penalty = [&](const double valid, const double feasibility) {
    if (valid > 0. && feasibility > 0.) {
      const double combined = valid + feasibility;
      return combined > 1. ? combined : penalty(combined);
    }
    if (valid > 0.) return penalty(valid);
    if (feasibility > 0.) return feasibility > 1. ? feasibility : penalty(feasibility);
    return 0.;
  };
  for (const auto& d : problem.descriptors) {
    auto& slot = d.source == Source::p ? model->state().p.at(d.offset) : model->state().x_numbers.at(d.offset);
    const double value = slot.value;
    // Propagated bounds can change with every equation evaluation. Read the
    // candidate's current slot rather than the initial search descriptor.
    const double valid_min = slot.valid_minimum - value, valid_max = value - slot.valid_maximum;
    const bool is_fixed = d.source == Source::x && (slot.minimum_flags & fixed);
    const double min = (is_fixed || (slot.minimum_flags & constrained)) ? (slot.constraint_minimum - value) / slot.minimum_scale_denominator : 0.;
    const double max = is_fixed ? -min : ((slot.maximum_flags & constrained) ? (value - slot.constraint_maximum) / slot.maximum_scale_denominator : 0.);
    slot.minimum_violation = min; slot.maximum_violation = max;
    result.invalid |= valid_min > 0. || valid_max > 0.; result.infeasible |= min > 0. || max > 0.;
    const double before = result.objective;
    if (is_fixed) {
      result.objective += fixed_penalty(valid_min, min);
      result.objective += fixed_penalty(valid_max, max);
    } else {
      const auto add = [&](double valid, double feasibility) { if (valid > 0. && feasibility > 0.) result.objective += penalty(valid + feasibility); else if (valid > 0.) result.objective += penalty(valid); else if (feasibility > 0.) result.objective += penalty(feasibility); };
      add(valid_min, min); add(valid_max, max);
    }
    if (trace) result.terms.push_back({d.name, value, valid_min, valid_max, min, max, slot.minimum_scale_denominator, slot.maximum_scale_denominator, result.objective - before});
  }
  result.violation_sum = result.objective;
  result.objective *= session.controls().violation_weight;
  if (merit) {
    const auto& slot = merit->source == Source::p ? model->state().p.at(merit->offset) : model->state().x_numbers.at(merit->offset);
    result.objective += merit->direction < 0 ? (slot.value - merit->estimate) / merit->denominator
                                           : (-slot.value + merit->estimate) / merit->denominator;
  }
  return result;
}

SearchResult patsh(DesignSession& session, const Problem& problem,
                   const std::function<bool()>& cancelled, const bool trace,
                   const SearchOptions& options) {
  SearchResult result;
  auto* model = dynamic_cast<compression_spring::Model*>(&session.model());
  if (!model) {
    result.termination = "Search requires a Compression Spring session.";
    result.evaluation.diagnostics.push_back("search requires a Compression Spring session");
    return result;
  }

  std::vector<std::size_t> free_offsets;
  for (const auto& descriptor : problem.descriptors) {
    if (descriptor.source == Source::p && !(descriptor.min_flags & fixed)) {
      free_offsets.push_back(descriptor.offset);
    }
  }
  if (free_offsets.empty()) {
    result.termination = "Cannot Search because there are no free independent variables.";
    result.evaluation = evaluate(session, problem);
    return result;
  }

  const auto baseline = model->state();
  std::vector<double> psi;
  psi.reserve(free_offsets.size());
  for (const auto offset : free_offsets) psi.push_back(baseline.p.at(offset).value);

  const auto candidate = [&](const std::vector<double>& values) {
    model->state() = baseline;
    for (std::size_t i = 0; i < free_offsets.size(); ++i) {
      model->state().p.at(free_offsets[i]).value = values[i];
    }
    compression_spring::evaluate(session);
    ++result.evaluations;
    auto evaluation = evaluate(session, problem, trace, options.merit);
    if (trace) {
      std::vector<double> full_p;
      full_p.reserve(model->state().p.size());
      for (const auto& slot : model->state().p) full_p.push_back(slot.value);
      result.trace.push_back(trace_candidate(full_p, evaluation, result.evaluations, session.controls().violation_weight));
    }
    return evaluation;
  };
  const auto feasible_message = [](const unsigned iterations) {
    std::string message = "Search terminated when design reached feasibility (Objective value is less than OBJMIN)";
    if (iterations <= 2) return message + ". Low iteration count may produce low precision results.";
    return message + " after " + std::to_string(iterations) + " iterations.";
  };

  const auto& controls = session.controls();
  const double objective_minimum = options.objective_minimum.value_or(controls.objective_minimum);
  const auto cancellation_result = [&]() {
    result.termination = "Search cancelled.";
    result.evaluation = evaluate(session, problem);
    return result;
  };
  if (cancelled && cancelled()) return cancellation_result();
  auto current = candidate(psi);
  double current_objective = current.objective;
  double step = controls.initial_step;
  std::vector<int> signs(psi.size(), 1);
  constexpr double alpha = 1.05;

  const auto explore = [&](std::vector<double>& phi, double objective) {
    for (std::size_t k = 0; k < phi.size(); ++k) {
      double epsilon = .05 * phi[k];
      if (epsilon == 0.) epsilon = .05;
      phi[k] += epsilon * step * signs[k];
      auto attempt = candidate(phi);
      if (attempt.objective < objective) {
        objective = attempt.objective;
        current = std::move(attempt);
      } else {
        signs[k] = -signs[k];
        phi[k] += 2. * epsilon * step * signs[k];
        attempt = candidate(phi);
        if (attempt.objective < objective) {
          objective = attempt.objective;
          current = std::move(attempt);
        } else {
          phi[k] -= epsilon * step * signs[k];
        }
      }
    }
    return objective;
  };

  while (current_objective >= objective_minimum) {
    if (cancelled && cancelled()) return cancellation_result();
    auto phi = psi;
    double explored = explore(phi, current_objective);
    if (trace) result.trace.push_back(trace_explore(phi, explored, result.iterations, step, signs));
    if (explored < current_objective && explored + controls.tolerance * std::abs(current_objective) <= current_objective) {
      do {
        if (cancelled && cancelled()) return cancellation_result();
        ++result.iterations;
        const auto theta = psi;
        psi = phi;
        for (std::size_t i = 0; i < phi.size(); ++i) phi[i] += alpha * (phi[i] - theta[i]);
        current_objective = explored;
        if (current_objective < objective_minimum) {
          result.termination = feasible_message(result.iterations);
          result.evaluation = candidate(psi);
          if (trace) result.trace.push_back(trace_exit(result.termination));
          return result;
        }
        if (result.iterations > static_cast<unsigned>(controls.max_iterations)) {
          result.termination = "Search terminated when iteration count exceeded the maximum limit (MAXIT) after " + std::to_string(result.iterations) + " iterations.";
          result.evaluation = candidate(psi);
          if (trace) result.trace.push_back(trace_exit(result.termination));
          return result;
        }
        current = candidate(phi);
        explored = explore(phi, current.objective);
        if (trace) result.trace.push_back(trace_explore(phi, explored, result.iterations, step, signs));
      } while (explored < current_objective && explored + controls.tolerance * std::abs(current_objective) <= current_objective);
    } else if (step < controls.minimum_step) {
      result.termination = "Search terminated when step size reached the minimum limit (DELMIN)";
      if (result.iterations <= 2) result.termination += ". Low iteration count may produce low precision results.";
      else result.termination += " after " + std::to_string(result.iterations) + " iterations.";
      result.evaluation = candidate(psi);
      if (trace) result.trace.push_back(trace_exit(result.termination));
      return result;
    } else {
      step /= 1.9;
    }
  }
  result.termination = feasible_message(result.iterations);
  result.evaluation = candidate(psi);
  if (trace) result.trace.push_back(trace_exit(result.termination));
  return result;
}

SeekResult seek(DesignSession& session, const Problem& problem,
                const std::string& target, const int direction,
                const std::function<bool()>& cancelled, const bool trace) {
  SeekResult result;
  auto* model = dynamic_cast<compression_spring::Model*>(&session.model());
  const auto selected = std::find_if(problem.descriptors.begin(), problem.descriptors.end(),
      [&](const Descriptor& d) {
        const auto* slot = compression_spring::find_slot(d.name);
        return !target.empty() && d.name.starts_with(target) && (slot == nullptr || slot->numeric);
      });
  if (!model || selected == problem.descriptors.end() || (direction != -1 && direction != 1)) {
    result.ok = false;
    result.termination = "Seek requires a numeric target and MIN or MAX direction.";
    return result;
  }
  result.target = selected->name;
  const auto value = [&]() {
    return selected->source == Source::p ? model->state().p.at(selected->offset).value
                                       : model->state().x_numbers.at(selected->offset).value;
  };
  result.starting_value = result.ending_value = value();
  if (std::none_of(problem.descriptors.begin(), problem.descriptors.end(),
      [](const Descriptor& d) { return d.source == Source::p && !(d.min_flags & fixed); })) {
    result.termination = "NO FREE INDEPENDENT VARIABLES";
    result.evaluation = evaluate(session, problem);
    return result;
  }
  const auto& controls = session.controls();
  if (!std::isfinite(value()) || !std::isfinite(controls.merit_function_weight) || controls.merit_function_weight <= 0.) {
    result.ok = false;
    result.termination = "Seek requires a finite target value and positive merit weight.";
    return result;
  }
  const auto original = model->state();
  const auto denominator = [&](const double estimate) {
    const double scaled = std::abs(estimate) / controls.merit_function_weight;
    return scaled < controls.small_number ? 1. : scaled;
  };
  Merit merit{selected->source, selected->offset, direction,
              value() + .1 * direction * value(), 1.};
  merit.denominator = denominator(merit.estimate);
  const auto run = [&](const SearchOptions& options) {
    auto search = patsh(session, problem, cancelled, trace, options);
    result.iterations += search.iterations;
    result.evaluations += search.evaluations;
    result.trace.insert(result.trace.end(), search.trace.begin(), search.trace.end());
    result.evaluation = search.evaluation;
    if (search.termination == "Search cancelled.") {
      model->state() = original;
      result.evaluation = evaluate(session, problem);
    }
    return search.termination != "Search cancelled.";
  };
  if (!run({merit, -1.})) { result.termination = "Seek cancelled."; return result; }
  merit.estimate = value();
  merit.denominator = denominator(merit.estimate);
  // The estimate phase is followed by a penalty-only feasibility check. Legacy
  // restores the original independent values only if that point is feasible.
  compression_spring::evaluate(session);
  if (evaluate(session, problem).objective < controls.objective_minimum) {
    for (std::size_t i = 0; i < original.p.size(); ++i) model->state().p[i].value = original.p[i].value;
    compression_spring::evaluate(session);
  } else if (!run({})) { result.termination = "Seek cancelled."; return result; }
  if (!run({merit, {}})) { result.termination = "Seek cancelled."; return result; }
  result.ending_value = value();
  result.percent_improvement = std::abs(result.starting_value - result.ending_value) / result.starting_value * 100.;
  const auto& slot = selected->source == Source::p ? model->state().p.at(selected->offset) : model->state().x_numbers.at(selected->offset);
  result.constraint_limited = direction < 0 ? (slot.minimum_flags & constrained) && value() < slot.constraint_minimum
                                          : (slot.maximum_flags & constrained) && value() > slot.constraint_maximum;
  result.repeat_recommended = result.evaluation.objective < -controls.objective_minimum;
  // The public SEEK dispatcher refreshes the visible objective without merit
  // after composing the completion message. Keep that visible result identical.
  result.evaluation = evaluate(session, problem);
  result.termination = "Seek completed.";
  return result;
}
}
