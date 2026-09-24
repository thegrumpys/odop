#include "odop/piston_cylinder.hpp"

#include <numbers>

namespace odop::piston_cylinder {

Outputs evaluate(const Inputs& inputs) {
  const double area = std::numbers::pi * inputs.radius * inputs.radius;
  return {
    .force = inputs.pressure * area,
    .area = area,
    .stress = (inputs.pressure * inputs.radius) / (2.0 * inputs.thickness)
  };
}

}  // namespace odop::piston_cylinder
