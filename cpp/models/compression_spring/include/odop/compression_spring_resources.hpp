#pragma once

#include <array>
#include <cstddef>
#include <string_view>

namespace odop::compression_spring {

struct MaterialResource {
  std::string_view astm;
  std::string_view federal_specification;
  double density;
  double torsion_modulus;
  double hot_factor;
  double tensile_at_010;
  double tensile_at_400;
  std::array<double, 7> tensile_endurance;
};

struct EndTypeResource {
  std::string_view name;
  double closure;
  double geometry;
  double inactive_coils;
  double transition_coils;
  double taper;
  double pigtail;
  double grind;
};

inline constexpr std::size_t kMaterialResourceCount = 18;
inline constexpr std::size_t kEndTypeResourceCount = 11;

[[nodiscard]] const MaterialResource* material_resource(std::string_view material_file, int index);
[[nodiscard]] const EndTypeResource* end_type_resource(int index);
[[nodiscard]] double tensile_endurance_for_life_category(const MaterialResource& material, int life_category);

}  // namespace odop::compression_spring
