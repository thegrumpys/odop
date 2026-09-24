#pragma once

namespace odop::piston_cylinder {

struct Inputs {
  double pressure;
  double radius;
  double thickness;
};

struct Outputs {
  double force;
  double area;
  double stress;
};

// Stage 1 smoke model. Its equations match the existing JavaScript model.
[[nodiscard]] Outputs evaluate(const Inputs& inputs);

}  // namespace odop::piston_cylinder
