#pragma once

#include <cstddef>
#include <functional>
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
struct EvaluationTerm { std::string name; double value, valid_min, valid_max, feasibility_min, feasibility_max, smin, smax, contribution; };
struct Evaluation { double objective = 0.; double violation_sum = 0.; bool invalid = false; bool infeasible = false; std::vector<std::string> diagnostics; std::vector<EvaluationTerm> terms; };
struct SearchResult {
  Evaluation evaluation;
  std::string termination;
  unsigned iterations = 0;
  unsigned evaluations = 0;
  std::vector<std::string> trace;
};
[[nodiscard]] double scale_denominator(const SystemControls& controls,
                                       double level, double limit,
                                       unsigned flags);
void recompute_scales(DesignSession& session);
[[nodiscard]] Problem compile_problem(const DesignSession& session);
[[nodiscard]] Evaluation evaluate(DesignSession& session, const Problem& problem, bool trace = false);
// Hosts may supply a cheap cooperative cancellation probe. The numerical loop
// remains host-independent and never calls back into UI or Redux state.
[[nodiscard]] SearchResult patsh(DesignSession& session, const Problem& problem,
                                 const std::function<bool()>& cancelled = {}, bool trace = false);
}
