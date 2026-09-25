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
inline constexpr std::size_t End_Type = 38, Inactive_Coils = 39, Add_Coils_Solid = 40;
inline constexpr std::size_t tbase010 = 43, tbase400 = 44, const_term = 45, slope_term = 46, tensile_010 = 47;

}  // namespace odop::compression_spring::offsets
