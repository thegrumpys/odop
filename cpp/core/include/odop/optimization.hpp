#pragma once

#include <cstddef>
#include <string>
#include <vector>

namespace odop {
class DesignSession;
struct SystemControls;
}

namespace odop::optimization {
enum class Source { p, x };
struct Descriptor { Source source; std::size_t offset; double valid_min, valid_max, constraint_min, constraint_max, smin, smax; unsigned min_flags, max_flags; };
struct Problem { std::vector<Descriptor> descriptors; };
struct Evaluation { double objective = 0.; bool invalid = false; bool infeasible = false; std::vector<std::string> diagnostics; };
struct SearchResult {
  Evaluation evaluation;
  std::string termination;
  unsigned iterations = 0;
  unsigned evaluations = 0;
};
[[nodiscard]] double scale_denominator(const SystemControls& controls,
                                       double level, double limit,
                                       unsigned flags);
void recompute_scales(DesignSession& session);
[[nodiscard]] Problem compile_problem(const DesignSession& session);
[[nodiscard]] Evaluation evaluate(DesignSession& session, const Problem& problem);
[[nodiscard]] SearchResult patsh(DesignSession& session, const Problem& problem);
}
