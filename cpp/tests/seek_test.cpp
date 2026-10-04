#include "odop/compression_spring_model.hpp"
#include "odop/optimization.hpp"

#include <cmath>
#include <cstdlib>
#include <fstream>
#include <iostream>
#include <regex>
#include <sstream>
#include <stdexcept>

namespace {
void require(bool condition, const std::string& message) {
  if (!condition) throw std::runtime_error(message);
}
bool close(double actual, double expected) {
  return std::abs(actual - expected) <= 1.e-9 + 1.e-8 * std::abs(expected);
}
double scalar(const std::string& body, const std::string& name) {
  std::smatch match;
  require(std::regex_search(body, match, std::regex("\"" + name + "\": ([^,\\n]+)")), name);
  return std::stod(match[1]);
}
std::string text(const std::string& body, const std::string& name) {
  std::smatch match;
  require(std::regex_search(body, match, std::regex("\"" + name + "\": \"([^\"]+)\"")), name);
  return match[1];
}
// The versioned fixture uses one compact flat-symbol row per line, with a
// declared fixed field order. Parse that bounded test format, not arbitrary JSON.
odop::compression_spring::FlatDesign design(const std::string& body, const std::string& key) {
  using namespace odop::compression_spring;
  FlatDesign result{std::string(kDesignType), kSchemaVersion, {}, {}};
  const auto start = body.find("\"" + key + "\": [");
  require(start != std::string::npos, key);
  const auto end = body.find("\n    ]", start);
  const auto rows = body.substr(start, end - start);
  const std::regex row(R"json(\["([^"]+)",(.*)\])json");
  for (std::sregex_iterator it(rows.begin(), rows.end(), row), last; it != last; ++it) {
    FlatSymbol symbol;
    symbol.id = (*it)[1];
    std::istringstream values((*it)[2]);
    std::vector<std::string> fields;
    std::string field;
    while (std::getline(values, field, ',')) fields.push_back(field);
    require(fields.size() == 12, "fixture row: " + symbol.id);
    const auto number = [&](std::size_t index) -> std::optional<double> {
      // strtod preserves the legacy -Number.MIN_VALUE subnormal bounds.
      return fields[index] == "null" ? std::nullopt : std::optional<double>{std::strtod(fields[index].c_str(), nullptr)};
    };
    if (symbol.id == "Material_Type" && fields[0] == "\"User_Specified\"") symbol.numeric_value = 2.;
    else if (fields[0].starts_with('"')) symbol.text_value = fields[0].substr(1, fields[0].size() - 2);
    else symbol.numeric_value = number(0);
    symbol.valid_minimum = number(1); symbol.valid_maximum = number(2);
    symbol.constraint_minimum = number(3); symbol.constraint_maximum = number(4);
    symbol.scale_denominator_limit = number(5);
    symbol.minimum_scale_denominator = number(6); symbol.maximum_scale_denominator = number(7);
    symbol.minimum_violation = number(8); symbol.maximum_violation = number(9);
    symbol.minimum_flags = number(10).value_or(0); symbol.maximum_flags = number(11).value_or(0);
    result.symbols.push_back(symbol);
  }
  require(result.symbols.size() == kSymbolCount, "complete fixture");
  result.propagations.push_back({"L_Solid", "L_2", PropagationTarget::valid_minimum});
  return result;
}
}

int main() {
  try {
    using namespace odop;
    std::ifstream input(ODOP_SEEK_FIXTURE_PATH);
    std::ostringstream buffer; buffer << input.rdbuf();
    const auto fixture = buffer.str();
    for (const std::string page : {"06", "07", "08", "13", "16"}) {
      const auto start = fixture.find("\"id\": \"tutor7-page-" + page + "\"");
      require(start != std::string::npos, page);
      const auto end = fixture.find("\"id\":", start + 1);
      const auto body = fixture.substr(start, end - start);
      auto created = compression_spring::create_session(design(body, "inputSymbols"), {});
      require(created.ok(), "hydrate " + page);
      auto& session = *created.session;
      require(compression_spring::init(session).ok(), "init");
      compression_spring::evaluate(session);
      optimization::recompute_scales(session);
      const auto problem = optimization::compile_problem(session);
      const auto original = static_cast<compression_spring::Model&>(session.model()).state();
      const auto cancelled = optimization::seek(session, problem, text(body, "target"), scalar(body, "direction"), [] { return true; });
      require(cancelled.termination == "Seek cancelled." && cancelled.evaluations == 0, "cancellation");
      const auto bad_target = optimization::seek(session, problem, "not-a-symbol", -1);
      require(!bad_target.ok, "reject unknown target");
      const auto result = optimization::seek(session, problem, text(body, "target"), scalar(body, "direction"));
      require(result.ok && result.termination == "Seek completed.", "Seek " + page);
      require(close(result.evaluation.objective, scalar(body, "objective")), "objective " + page + ": " + std::to_string(result.evaluation.objective) + " expected " + std::to_string(scalar(body, "objective")));
      require(close(result.ending_value, scalar(body, "endingValue")), "target " + page);
      const auto expected = design(body, "expectedSymbols");
      const auto actual = compression_spring::snapshot(static_cast<compression_spring::Model&>(session.model()).state());
      for (std::size_t i = 0; i < expected.symbols.size(); ++i) {
        const auto& a = actual.symbols[i]; const auto& e = expected.symbols[i];
        require(a.id == e.id && a.minimum_flags == e.minimum_flags && a.maximum_flags == e.maximum_flags, "flags " + e.id);
        if (e.numeric_value) require(a.numeric_value && close(*a.numeric_value, *e.numeric_value), page + " " + e.id);
        else require(a.text_value == e.text_value, "text " + e.id);
        if (e.numeric_value) {
          if (e.valid_minimum) require(close(*a.valid_minimum, *e.valid_minimum), "valid min " + e.id);
          if (e.valid_maximum) require(close(*a.valid_maximum, *e.valid_maximum), "valid max " + e.id);
          require(close(*a.constraint_minimum, *e.constraint_minimum) && close(*a.constraint_maximum, *e.constraint_maximum), "constraints " + e.id);
          if (e.minimum_scale_denominator) require(close(*a.minimum_scale_denominator, *e.minimum_scale_denominator), "min scale " + e.id);
          if (e.maximum_scale_denominator) require(close(*a.maximum_scale_denominator, *e.maximum_scale_denominator), "max scale " + e.id);
        }
      }
      auto& state = static_cast<compression_spring::Model&>(session.model()).state();
      state = original;
      unsigned probes = 0;
      const auto interrupted = optimization::seek(session, problem, text(body, "target"), scalar(body, "direction"), [&] { return ++probes > 3; });
      require(interrupted.termination == "Seek cancelled.", "cooperative interruption");
      for (std::size_t i = 0; i < state.p.size(); ++i) require(state.p[i].value == original.p[i].value, "restore cancelled baseline");
      if (page == "06") {
        const auto limited = optimization::seek(session, problem, "OD_Free", 1);
        require(limited.constraint_limited, "constraint-limited maximum");
        state = original;
        auto controls = session.controls();
        controls.merit_function_weight = 0.;
        session.set_controls(controls);
        require(!optimization::seek(session, problem, "Weight", -1).ok, "reject zero merit weight");
        controls.merit_function_weight = .01;
        session.set_controls(controls);
      }
      for (auto& p : state.p) p.minimum_flags = p.maximum_flags = 2;
      const auto fixed = optimization::seek(session, optimization::compile_problem(session), "Weight", -1);
      require(fixed.termination == "NO FREE INDEPENDENT VARIABLES", "fixed P");
    }
    return 0;
  } catch (const std::exception& error) {
    std::cerr << error.what() << '\n';
    return 1;
  }
}
