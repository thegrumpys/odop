#pragma once

#include <cstddef>
#include <functional>
#include <optional>
#include <string>
#include <vector>

namespace odop {
class DesignSession;
struct SystemControls;
}

namespace odop::optimization {
enum class Source { p, x };
struct Descriptor { Source source; std::size_t offset; std::string name; double valid_min, valid_max, constraint_min, constraint_max, smin, smax; unsigned min_flags, max_flags; };
struct Problem { std::vector<Descriptor> descriptors; };
struct Merit { Source source; std::size_t offset; int direction; double estimate; double denominator; };
struct SearchOptions { std::optional<Merit> merit; std::optional<double> objective_minimum; };
struct EvaluationTerm { std::string name; double value, valid_min, valid_max, feasibility_min, feasibility_max, smin, smax, contribution; };
struct Evaluation { double objective = 0.; double violation_sum = 0.; bool invalid = false; bool infeasible = false; std::vector<std::string> diagnostics; std::vector<EvaluationTerm> terms; };
struct SearchResult {
  Evaluation evaluation;
  std::string termination;
  unsigned iterations = 0;
  unsigned evaluations = 0;
  std::vector<std::string> trace;
};
struct SeekResult : SearchResult {
  std::string target;
  double starting_value = 0.;
  double ending_value = 0.;
  double percent_improvement = 0.;
  bool constraint_limited = false;
  bool repeat_recommended = false;
  bool ok = true;
};
[[nodiscard]] double scale_denominator(const SystemControls& controls,
                                       double level, double limit,
                                       unsigned flags);
void recompute_scales(DesignSession& session);
[[nodiscard]] Problem compile_problem(const DesignSession& session);
[[nodiscard]] Evaluation evaluate(DesignSession& session, const Problem& problem, bool trace = false,
                                  const std::optional<Merit>& merit = {});
// Hosts may supply a cheap cooperative cancellation probe. The numerical loop
// remains host-independent and never calls back into UI or Redux state.
[[nodiscard]] SearchResult patsh(DesignSession& session, const Problem& problem,
                                 const std::function<bool()>& cancelled = {}, bool trace = false,
                                 const SearchOptions& options = {});
[[nodiscard]] SeekResult seek(DesignSession& session, const Problem& problem,
                              const std::string& target, int direction,
                              const std::function<bool()>& cancelled = {}, bool trace = false);
}
