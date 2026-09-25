#include "odop/compression_spring_model.hpp"

#include <vector>

extern "C" {

// The caller supplies six P values and 48 numeric X values. The latter is
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

}
