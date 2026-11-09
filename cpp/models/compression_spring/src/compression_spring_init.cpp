#include "odop/compression_spring_model.hpp"
#include "odop/compression_spring_offsets.hpp"
#include "odop/compression_spring_resources.hpp"

#include <cmath>

namespace odop::compression_spring {

InitResult init(DesignSession& session) {
  auto* model = dynamic_cast<Model*>(&session.model());
  if (model == nullptr) return {{"Compression Spring init requires a Compression Spring session"}};
  auto candidate = model->state(); // no partial resource update on an error
  const auto& p = candidate.p;
  auto& x = candidate.x_numbers;
  auto& text = candidate.x_text;
  using namespace offsets;
  text[23].value = "Compression";

  // Material and end geometry can each be specified independently.
  if (x[Prop_Calc_Method].value == 1.) {
    const int material_index = static_cast<int>(x[Material_Type].value);
    const auto* material = material_resource(text[28].value, material_index);
    if (material == nullptr) return {{"invalid Compression Spring material index"}};
    text[26].value = std::string(material->astm) + "/" + std::string(material->federal_specification);
    text[27].value = material->hot_factor < 1. ? "Hot_Wound" : "Cold_Coiled";
    x[Density].value = material->density;
    x[Torsion_Modulus].value = 1000. * material->torsion_modulus;
    x[Hot_Factor_Kh].value = material->hot_factor;
    x[tensile_010].value = 1000. * material->tensile_at_010;
    const double tensile_400 = 1000. * material->tensile_at_400;
    x[PC_Tensile_Endur].value = tensile_endurance_for_life_category(*material, static_cast<int>(x[Life_Category].value));
    x[PC_Tensile_Stat].value = material->tensile_endurance[0];
    x[const_term].value = std::log10(x[tbase010].value);
    x[slope_term].value = (tensile_400 - x[tensile_010].value) / (std::log10(x[tbase400].value) - x[const_term].value);
    x[Tensile].value = x[slope_term].value * (std::log10(p[Wire_Dia].value) - x[const_term].value) + x[tensile_010].value;
    x[Stress_Lim_Endur].value = x[Tensile].value * x[PC_Tensile_Endur].value / 100.;
    x[Stress_Lim_Stat].value = x[Tensile].value * x[PC_Tensile_Stat].value / 100.;
  }

  if (x[End_Type_Method].value != 2.) {
    const auto* end_type = end_type_resource(static_cast<int>(x[End_Type].value));
    if (end_type == nullptr) return {{"invalid Compression Spring end type index"}};
    x[End_Closure].value = end_type->closure;
    x[Closed_End_Geometry].value = end_type->geometry;
    x[Inactive_Coils].value = end_type->inactive_coils;
    x[Transition_Coils].value = end_type->transition_coils;
    x[Taper_Amount].value = end_type->taper;
    x[Pigtail_Amount].value = end_type->pigtail;
    x[Grind_Amount].value = end_type->grind;
  }
  model->state() = std::move(candidate);
  return {};
}

}  // namespace odop::compression_spring
