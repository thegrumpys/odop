#include "odop/compression_spring_model.hpp"
#include "odop/compression_spring_offsets.hpp"
#include "odop/compression_spring_resources.hpp"
#include <algorithm>
#include <array>
#include <cmath>
#include <limits>
#include <stdexcept>

namespace odop::compression_spring {
namespace {

double cycle_life(const MaterialResource& material, double category, double tensile, double stress_1, double stress_2, double small_number) {
  const double temp = .67 * tensile;
  double remaining_1 = temp - stress_1;
  if (remaining_1 < small_number) remaining_1 = small_number;
  double remaining_2 = temp - stress_2;
  if (remaining_2 < small_number) remaining_2 = small_number;
  const double ratio = remaining_2 / remaining_1;
  double point = stress_2 - stress_1 * ratio;
  if (point < small_number) point = small_number;
  const int peened = category < 5 ? 0 : 3;
  std::array<double, 4> snx{};
  for (int i = 0; i <= 3; ++i) {
    int table_offset = 3 - i + peened;
    if (peened > 0 && table_offset == 3) table_offset = 0;
    snx[i] = .01 * material.tensile_endurance.at(static_cast<std::size_t>(table_offset)) * tensile;
  }
  constexpr std::array<double, 4> sny{{7., 6., 5., 4.}};
  auto interpolate = [&](int low, int high) {
    const double slope = (sny[high] - sny[low]) / (snx[high] - snx[low]);
    return std::pow(10., slope * (point - snx[low]) + sny[low]);
  };
  if (point < snx[0]) return interpolate(0, 1);
  for (int i = 1; i <= 3; ++i) if (point < snx[i]) return interpolate(i - 1, i);
  return interpolate(2, 3);
}

// Mirror the end geometry in the JavaScript Compression Spring equations.
double end_coil_length(double mean_diameter, double end_diameter, double body_pitch, double end_pitch, double turns) {
  if (turns == 0.) return 0.;
  constexpr std::array nodes{.1834346424956498, .5255324099163290, .7966664774136267, .9602898564975363};
  constexpr std::array weights{.3626837833783620, .3137066458778873, .2223810344533745, .1012285362903763};
  const double pi = std::acos(-1.);
  const double radial_change = (end_diameter - mean_diameter) / (2. * turns);
  const auto speed = [&](double turn) {
    const double fraction = turn / turns;
    const double diameter = mean_diameter + fraction * (end_diameter - mean_diameter);
    const double pitch = body_pitch + fraction * (end_pitch - body_pitch);
    return std::hypot(pi * diameter, radial_change, pitch);
  };
  double sum = 0.;
  for (std::size_t i = 0; i < nodes.size(); ++i) {
    const double offset = nodes[i] * turns / 2.;
    sum += weights[i] * (speed(turns / 2. - offset) + speed(turns / 2. + offset));
  }
  return turns * sum / 2.;
}

double wire_volume(const std::vector<double>& p, const std::vector<double>& x) {
  using namespace offsets;
  const double pi = std::acos(-1.);
  const double diameter = p[Wire_Dia];
  const double mean_diameter = x[Mean_Dia];
  const double coils = p[Coils_T];
  const double free_length = p[L_Free];
  const double taper = x[Taper_Amount], pigtail = x[Pigtail_Amount], grind = x[Grind_Amount];
  const double wire_area = pi * diameter * diameter / 4.;
  constexpr double closed = 2., tapered = 3., pigtail_geometry = 4.;
  double length = std::hypot(free_length, coils * (pi * mean_diameter));
  double end_wire_diameter = diameter;
  double end_mean_diameter = mean_diameter;
  double end_pitch = coils == 0. ? 0. : free_length / coils;
  double terminal_length = 0.;

  if (x[End_Closure] == closed) {
    if (x[Closed_End_Geometry] == tapered) end_wire_diameter *= 1. - taper / 2.;
    end_pitch = (diameter + end_wire_diameter) / 2.;
    if (x[Closed_End_Geometry] == pigtail_geometry) {
      end_mean_diameter *= .5;
      end_pitch = diameter * (1. - pigtail / 2.);
    }
    const double inactive = x[Inactive_Coils];
    const double end_turns = inactive / 2.;
    const double transition_turns = x[Transition_Coils] / 2.;
    const double fully_closed_turns = std::max(0., end_turns - transition_turns);
    const double body_turns = coils - inactive;
    const double end_allowance = ((inactive + 1.) * (1. - taper / 2.) - grind - pigtail) * diameter;
    const double body_pitch = body_turns == 0. ? end_pitch : (free_length - end_allowance) / body_turns;
    const double end_turn_length = std::hypot(pi * end_mean_diameter, end_pitch);
    const double transition_length = end_coil_length(mean_diameter, end_mean_diameter, body_pitch, end_pitch, transition_turns);
    const double closed_length = 2. * fully_closed_turns * end_turn_length;
    length = closed_length + 2. * transition_length + body_turns * std::hypot(pi * mean_diameter, body_pitch);
    terminal_length = end_turns <= 1. ? 2. * (transition_length + fully_closed_turns * end_turn_length) : 2. * end_turn_length;
  } else {
    terminal_length = 2. * std::hypot(pi * end_mean_diameter, end_pitch);
  }
  if (taper == 0. && grind == 0.) return length * wire_area;

  const double radius = end_wire_diameter / 2.;
  const double depth = std::max(0., std::min(2. * radius, grind * diameter / 2.));
  double ground_area = 0.;
  if (radius > 0. && depth > 0.) {
    const double offset = radius - depth;
    ground_area = radius * radius * std::acos(offset / radius) -
        offset * std::sqrt(std::max(0., 2. * radius * depth - depth * depth));
  }
  const double end_area = std::max(0., pi * radius * radius - ground_area);
  return std::max(0., length * wire_area - terminal_length * (wire_area - end_area));
}

}  // namespace

void evaluate(std::vector<double>& p, std::vector<double>& x, std::string_view material_file, const SystemControls& controls) {
  using namespace offsets;
  if (p.size() != kPSize || x.size() != kXSize) throw std::invalid_argument("Compression Spring EQNSET requires the current P and X vector sizes");
  const double zero = 0.;
  x[Mean_Dia] = p[OD_Free] - p[Wire_Dia];
  x[ID_Free] = x[Mean_Dia] - p[Wire_Dia];
  x[Spring_Index] = x[Mean_Dia] / p[Wire_Dia];
  const double kc = (4. * x[Spring_Index] - 1.) / (4. * x[Spring_Index] - 4.);
  const double ks = kc + .615 / x[Spring_Index];
  x[Coils_A] = p[Coils_T] - x[Inactive_Coils];
  double temp = x[Spring_Index] * x[Spring_Index];
  x[Rate] = x[Hot_Factor_Kh] * x[Torsion_Modulus] * x[Mean_Dia] / (8. * x[Coils_A] * temp * temp);
  x[Deflect_1] = p[Force_1] / x[Rate]; x[Deflect_2] = p[Force_2] / x[Rate];
  x[L_1] = p[L_Free] - x[Deflect_1]; x[L_2] = p[L_Free] - x[Deflect_2]; x[L_Stroke] = x[L_1] - x[L_2];
  x[Slenderness] = p[L_Free] / x[Mean_Dia];
  x[L_Solid] = p[Wire_Dia] * (p[Coils_T] + (1. - x[Taper_Amount] - x[Pigtail_Amount] - x[Grind_Amount]));
  x[Force_Solid] = x[Rate] * (p[L_Free] - x[L_Solid]);
  const double stress_factor = ks * 8. * x[Mean_Dia] / (std::acos(-1.) * p[Wire_Dia] * p[Wire_Dia] * p[Wire_Dia]);
  x[Stress_1] = stress_factor * p[Force_1]; x[Stress_2] = stress_factor * p[Force_2]; x[Stress_Solid] = stress_factor * x[Force_Solid];
  if (x[Prop_Calc_Method] == 1.) x[Tensile] = x[slope_term] * (std::log10(p[Wire_Dia]) - x[const_term]) + x[tensile_010];
  if (x[Prop_Calc_Method] <= 2.) { x[Stress_Lim_Endur] = x[Tensile] * x[PC_Tensile_Endur] / 100.; x[Stress_Lim_Stat] = x[Tensile] * x[PC_Tensile_Stat] / 100.; }
  x[FS_2] = x[Stress_2] > zero ? x[Stress_Lim_Stat] / x[Stress_2] : 1.;
  x[FS_Solid] = x[Stress_Solid] > zero ? x[Stress_Lim_Stat] / x[Stress_Solid] : 1.;
  const double stress_avg = (x[Stress_1] + x[Stress_2]) / 2.;
  const double stress_rng = (x[Stress_2] - x[Stress_1]) / 2.;
  const double se2 = x[Stress_Lim_Endur] / 2.;
  x[FS_CycleLife] = x[Stress_Lim_Stat] / (kc * stress_rng * (x[Stress_Lim_Stat] - se2) / se2 + stress_avg);
  if (x[Prop_Calc_Method] == 1. && x[Material_Type] != 0.) {
    const auto* material = material_resource(material_file, static_cast<int>(x[Material_Type]));
    x[Cycle_Life] = material == nullptr ? std::numeric_limits<double>::quiet_NaN() : cycle_life(*material, x[Life_Category], x[Tensile], x[Stress_1], x[Stress_2], controls.small_number);
  } else x[Cycle_Life] = 0.;
  x[Weight] = x[Density] * wire_volume(p, x);
  if (p[L_Free] > x[L_Solid]) {
    x[PC_Avail_Deflect] = 100. * x[Deflect_2] / (p[L_Free] - x[L_Solid]);
    if (p[L_Free] < x[L_Solid] + p[Wire_Dia]) { temp = 100. * x[Deflect_2] / p[Wire_Dia] + 10000. * (x[L_Solid] + p[Wire_Dia] - p[L_Free]); if (temp < x[PC_Avail_Deflect]) x[PC_Avail_Deflect] = temp; }
  } else x[PC_Avail_Deflect] = 100. * x[Deflect_2] / p[Wire_Dia] + 10000. * (x[L_Solid] + p[Wire_Dia] - p[L_Free]);
  x[Energy] = .5 * x[Rate] * (x[Deflect_2] * x[Deflect_2] - x[Deflect_1] * x[Deflect_1]);
}

void evaluate(DesignSession& session) {
  auto* model = dynamic_cast<Model*>(&session.model());
  if (!model) throw std::invalid_argument("Compression Spring EQNSET requires a Compression Spring session");
  const auto before = model->state();
  std::vector<double> p(kPSize), x(kXSize);
  for (std::size_t i = 0; i < kPSize; ++i) p[i] = model->state().p[i].value;
  for (std::size_t i = 0; i < kXSize; ++i) x[i] = model->state().x_numbers[i].value;
  evaluate(p, x, model->state().x_text[28].value, session.controls());
  for (std::size_t i = 0; i < kPSize; ++i) model->state().p[i].value = p[i];
  for (std::size_t i = 0; i < kXSize; ++i) model->state().x_numbers[i].value = x[i];
  apply_propagations(model->state(), before);
}

}  // namespace odop::compression_spring
