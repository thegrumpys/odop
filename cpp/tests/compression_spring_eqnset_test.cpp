#include "odop/compression_spring_model.hpp"
#include "odop/compression_spring_state.hpp"

#include <cmath>
#include <cstdlib>
#include <iostream>
#include <memory>
#include <vector>

namespace {
bool close(double actual, double expected) {
  if (std::isnan(expected)) return std::isnan(actual);
  if (std::isinf(expected)) return std::isinf(actual) && std::signbit(expected) == std::signbit(actual);
  return std::abs(actual - expected) <= 1.e-10 + 1.e-12 * std::abs(expected);
}
bool check(bool value, const char* message) { if (!value) std::cerr << message << '\n'; return value; }
std::vector<double> input_x() {
  return {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,1,2,0,0,0,1,.284,11500000,1,261419.22328169446,50,50,130709.61164084723,
    130709.61164084723,4,2,0,0,0,.01,.4,-2,-106113.37959890341,370000};
}
}

int main() {
  bool ok = true;
  odop::SystemControls controls;
  std::vector<double> p{1.1, .1055, 3.25, 10., 10., 39.};
  auto x = input_x();
  odop::compression_spring::evaluate(p, x, "mat_us.json", controls);
  constexpr double expected[] = { .9945,8,22.631500150071364,.4418620035653477,1.723261813904856,
    2.8081379964346525,1.526738186095144,1.2813998103395086,1.055,3.2679738562091503,.889,
    .07798388647498593,9.42654028436019,49.67614282940665,24893.49275531675,97084.62174573533,
    123661.27016359147,1.3463472310271418,1.0569971624080239,1.3032217764849205,1861893.4985282072,
    78.50851088404809,31.394295353317954 };
  for (std::size_t i = 0; i < std::size(expected); ++i) ok &= check(close(x[i], expected[i]), "normal Stage 0 fixture output differs");
  ok &= check(close(x[33], 261419.2233253764) && close(x[36], 130709.6116626882), "legacy tensile calculation differs");

  odop::compression_spring::RuntimeState runtime;
  runtime.p.resize(odop::compression_spring::kPSize);
  runtime.x_numbers.resize(odop::compression_spring::kXSize);
  runtime.x_text.resize(odop::compression_spring::kXSize);
  for (std::size_t i = 0; i < p.size(); ++i) runtime.p[i].value = p[i];
  for (std::size_t i = 0; i < x.size(); ++i) runtime.x_numbers[i].value = input_x()[i];
  runtime.x_text[28].value = "mat_us.json";
  odop::DesignSession session(std::make_unique<odop::compression_spring::Model>(runtime), controls);
  odop::compression_spring::evaluate(session);
  const auto& session_model = static_cast<const odop::compression_spring::Model&>(session.model());
  ok &= check(close(session_model.state().x_numbers[2].value, expected[2]), "DesignSession evaluation must update its active model state");

  p = {.4,.2,3.25,10.,10.,39.}; x = input_x();
  odop::compression_spring::evaluate(p, x, "mat_us.json", controls);
  ok &= check(x[12] == 1. && std::isinf(x[14]) && std::isnan(x[19]) && std::isnan(x[20]), "spring-index-one singular fixture differs");

  p = {1.1,.1055,3.25,2.,10.,39.}; x = input_x();
  odop::compression_spring::evaluate(p, x, "mat_us.json", controls);
  ok &= check(x[1] == 0. && std::isinf(x[2]) && std::isinf(x[13]) && std::isnan(x[22]), "zero-active-coils singular fixture differs");

  p = {.4,.4,3.25,10.,10.,39.}; x = input_x();
  odop::compression_spring::evaluate(p, x, "mat_us.json", controls);
  ok &= check(x[0] == 0. && std::isnan(x[2]) && std::isnan(x[3]) && std::isinf(x[9]) && std::isnan(x[22]), "zero-mean-diameter singular fixture differs");
  return ok ? EXIT_SUCCESS : EXIT_FAILURE;
}
