#pragma once

namespace odop {

// Shared, persisted controls common to ODOP models. Defaults mirror
// client/src/initialSystemControls.js. The numerical fields are inputs to
// scaling, objective evaluation, and search, not UI preferences.
struct SystemControls {
  int ioopt = 3;
  int max_iterations = 600;
  int weapon = 1;
  int merit_function = 1;
  double fixed_weight = 1.5;
  double constraint_weight = 1.0;
  double zero_weight = 10.0;
  double violation_weight = 1.0;
  double merit_function_weight = 0.01;
  double objective_minimum = 0.00001;
  double initial_step = 1.0;
  double minimum_step = 0.0001;
  double tolerance = 0.0001;
  double small_number = 1.0e-7;
  int show_units = 1;
  int show_violations = 1;
  int enable_auto_fix = 1;
  int enable_auto_search = 1;
};

}  // namespace odop
