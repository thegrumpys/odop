#include "odop/piston_cylinder.hpp"

extern "C" {

// Narrow Stage 1 host API. Outputs are written only when the caller supplies
// non-null locations, which keeps this smoke binding straightforward for Node.
void odop_piston_cylinder_evaluate(double pressure, double radius, double thickness,
    double* force, double* area, double* stress) {
  const auto result = odop::piston_cylinder::evaluate({ pressure, radius, thickness });
  if (force != nullptr) {
    *force = result.force;
  }
  if (area != nullptr) {
    *area = result.area;
  }
  if (stress != nullptr) {
    *stress = result.stress;
  }
}

}
