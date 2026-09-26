#include "odop/compression_spring_model.hpp"
#include "odop/compression_spring_offsets.hpp"
#include "odop/compression_spring_resources.hpp"
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

}  // namespace

void evaluate(std::vector<double>& p, std::vector<double>& x, std::string_view material_file, const SystemControls& controls) {
  using namespace offsets;
  if (p.size() != kPSize || x.size() != kXSize) throw std::invalid_argument("Compression Spring EQNSET requires six P and 48 X numeric slots");
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
  x[L_Solid] = p[Wire_Dia] * (p[Coils_T] + x[Add_Coils_Solid]);
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
  double wire_length = std::sqrt(p[L_Free] * p[L_Free] + std::pow(p[Coils_T] * std::acos(-1.) * x[Mean_Dia], 2));
  if (x[End_Type] == 5.) wire_length -= 3.926 * p[Wire_Dia];
  x[Weight] = x[Density] * (std::acos(-1.) * p[Wire_Dia] * p[Wire_Dia] / 4.) * wire_length;
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
