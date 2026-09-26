#include "odop/compression_spring_model.hpp"
#include "odop/optimization.hpp"

#include <cmath>
#include <cstdlib>
#include <memory>

namespace {
odop::compression_spring::RuntimeState state() {
  odop::compression_spring::RuntimeState result;
  result.p.resize(odop::compression_spring::kPSize);
  result.x_numbers.resize(odop::compression_spring::kXSize);
  result.x_text.resize(odop::compression_spring::kXSize);
  const double p[] = {1.1, .1055, 3.25, 10., 10., 39.};
  const double x[] = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,1,2,0,0,0,1,.284,11500000,1,261419.22328169446,50,50,
    130709.61164084723,130709.61164084723,4,2,0,0,0,.01,.4,-2,
    -106113.37959890341,370000};
  for (std::size_t i = 0; i < std::size(p); ++i) result.p[i].value = p[i];
  for (std::size_t i = 0; i < std::size(x); ++i) result.x_numbers[i].value = x[i];
  for (auto& slot : result.p) { slot.valid_minimum = -1.e100; slot.valid_maximum = 1.e100; }
  for (auto& slot : result.x_numbers) { slot.valid_minimum = -1.e100; slot.valid_maximum = 1.e100; }
  result.x_text[28].value = "mat_us.json";
  return result;
}
}

int main() {
  auto runtime = state();
  runtime.p[0].constraint_minimum = 2.;
  runtime.p[0].minimum_flags = 1; // constrained, but free
  runtime.p[1].minimum_flags = 2; // fixed P must never be searched
  odop::SystemControls controls;
  controls.objective_minimum = 1.e-5;
  odop::DesignSession session(std::make_unique<odop::compression_spring::Model>(runtime), controls);
  odop::compression_spring::evaluate(session);
  odop::optimization::recompute_scales(session);
  const auto problem = odop::optimization::compile_problem(session);
  const auto result = odop::optimization::patsh(session, problem);
  const auto& model = static_cast<const odop::compression_spring::Model&>(session.model());
  if (result.evaluation.objective >= controls.objective_minimum) return EXIT_FAILURE;
  if (model.state().p[0].value < 2.) return EXIT_FAILURE;
  if (std::abs(model.state().p[1].value - .1055) > 1.e-12) return EXIT_FAILURE;
  if (result.evaluations == 0 || result.iterations == 0) return EXIT_FAILURE;

  auto no_free = state();
  for (auto& slot : no_free.p) slot.minimum_flags = 2;
  odop::DesignSession fixed_session(std::make_unique<odop::compression_spring::Model>(no_free), controls);
  const auto fixed_result = odop::optimization::patsh(
      fixed_session, odop::optimization::compile_problem(fixed_session));
  if (fixed_result.termination.find("no free independent variables") == std::string::npos) return EXIT_FAILURE;

  auto cancellable = state();
  cancellable.p[0].constraint_minimum = 2.;
  cancellable.p[0].minimum_flags = 1;
  odop::DesignSession cancelled_session(std::make_unique<odop::compression_spring::Model>(cancellable), controls);
  const auto cancelled_result = odop::optimization::patsh(
      cancelled_session, odop::optimization::compile_problem(cancelled_session), [] { return true; });
  if (cancelled_result.termination != "Search cancelled." || cancelled_result.evaluations != 0) return EXIT_FAILURE;
  return EXIT_SUCCESS;
}
