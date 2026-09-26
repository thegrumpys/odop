#include "odop/compression_spring_model.hpp"
#include "odop/optimization.hpp"
#include <cmath>
#include <cstdlib>
#include <memory>
int main() {
  odop::compression_spring::RuntimeState state; state.p.resize(6); state.x_numbers.resize(48); state.x_text.resize(48);
  auto& p = state.p[0]; p.value=5; p.valid_minimum=0; p.valid_maximum=10; p.constraint_minimum=2; p.minimum_scale_denominator=1; p.minimum_flags=1;
  odop::DesignSession session(std::make_unique<odop::compression_spring::Model>(state));
  auto problem=odop::optimization::compile_problem(session); auto valid=odop::optimization::evaluate(session,problem);
  if (valid.objective != 0 || valid.invalid || valid.infeasible) return EXIT_FAILURE;
  auto& model=static_cast<odop::compression_spring::Model&>(session.model()); model.state().p[0].value=1;
  auto constrained=odop::optimization::evaluate(session,problem);
  if (std::abs(constrained.objective-1)>1e-12 || !constrained.infeasible || constrained.invalid) return EXIT_FAILURE;
  model.state().p[0].value=-1;
  auto invalid=odop::optimization::evaluate(session,problem);
  if (std::abs(invalid.objective-16)>1e-12 || !invalid.invalid || !invalid.infeasible) return EXIT_FAILURE;

  model.state().p[0].value=5;
  auto& x = model.state().x_numbers[0];
  x.value=5; x.valid_minimum=-100; x.valid_maximum=100; x.constraint_minimum=5;
  x.minimum_flags=2; x.scale_denominator_limit=0;
  odop::optimization::recompute_scales(session);
  if (std::abs(x.minimum_scale_denominator-(5.0/1.5+1.0e-7))>1e-12) return EXIT_FAILURE;
  auto fixed_valid=odop::optimization::evaluate(session,odop::optimization::compile_problem(session));
  if (std::abs(fixed_valid.objective)>1e-12) return EXIT_FAILURE;
  x.value=3;
  auto fixed_small=odop::optimization::evaluate(session,odop::optimization::compile_problem(session));
  if (std::abs(fixed_small.objective-0.36)>1e-6 || !fixed_small.infeasible) return EXIT_FAILURE;
  x.value=-2;
  auto fixed_large=odop::optimization::evaluate(session,odop::optimization::compile_problem(session));
  if (std::abs(fixed_large.objective-2.1)>1e-6 || fixed_large.invalid || !fixed_large.infeasible) return EXIT_FAILURE;
  return EXIT_SUCCESS;
}
