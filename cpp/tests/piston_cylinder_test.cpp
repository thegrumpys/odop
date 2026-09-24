#include "odop/piston_cylinder.hpp"

#include <cmath>
#include <cstdlib>
#include <iostream>

namespace {

bool approximately_equal(double actual, double expected) {
  return std::abs(actual - expected) <= 1e-12;
}

}  // namespace

int main() {
  const auto result = odop::piston_cylinder::evaluate({
    .pressure = 500.0,
    .radius = 0.4,
    .thickness = 0.04
  });

  if (!approximately_equal(result.area, 0.5026548245743669) ||
      !approximately_equal(result.force, 251.32741228718345) ||
      !approximately_equal(result.stress, 2500.0)) {
    std::cerr << "Piston-Cylinder smoke calculation did not match the JavaScript model.\n";
    return EXIT_FAILURE;
  }

  return EXIT_SUCCESS;
}
