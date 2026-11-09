#pragma once

#include <cstddef>

namespace odop::compression_spring::offsets {

// Compatibility offsets copied directly from the JavaScript Compression
// Spring model. These positions are calculation ABI, not persisted identity.
inline constexpr std::size_t OD_Free = 0, Wire_Dia = 1, L_Free = 2, Coils_T = 3, Force_1 = 4, Force_2 = 5;
inline constexpr std::size_t Mean_Dia = 0, Coils_A = 1, Rate = 2, Deflect_1 = 3, Deflect_2 = 4;
inline constexpr std::size_t L_1 = 5, L_2 = 6, L_Stroke = 7, L_Solid = 8, Slenderness = 9;
inline constexpr std::size_t ID_Free = 10, Weight = 11, Spring_Index = 12, Force_Solid = 13;
inline constexpr std::size_t Stress_1 = 14, Stress_2 = 15, Stress_Solid = 16, FS_2 = 17;
inline constexpr std::size_t FS_Solid = 18, FS_CycleLife = 19, Cycle_Life = 20, PC_Avail_Deflect = 21, Energy = 22;
inline constexpr std::size_t Prop_Calc_Method = 24, Material_Type = 25, Life_Category = 29;
inline constexpr std::size_t Density = 30, Torsion_Modulus = 31, Hot_Factor_Kh = 32, Tensile = 33;
inline constexpr std::size_t PC_Tensile_Endur = 34, PC_Tensile_Stat = 35, Stress_Lim_Endur = 36, Stress_Lim_Stat = 37;
inline constexpr std::size_t End_Type_Method = 38, End_Type = 39, End_Closure = 40, Closed_End_Geometry = 41;
inline constexpr std::size_t Inactive_Coils = 42, Transition_Coils = 43, Taper_Amount = 44, Pigtail_Amount = 45, Grind_Amount = 46;
inline constexpr std::size_t Catalog_Name = 47, Catalog_Number = 48;
inline constexpr std::size_t tbase010 = 49, tbase400 = 50, const_term = 51, slope_term = 52, tensile_010 = 53;

}  // namespace odop::compression_spring::offsets
