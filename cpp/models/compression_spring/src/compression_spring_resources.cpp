#include "odop/compression_spring_resources.hpp"

namespace odop::compression_spring {
namespace {
constexpr std::array<double, 7> a{{50,36,33,30,42,39,36}}, b{{50,42,40,38,49,47,46}}, c{{36,35,33,30,35,34,33}}, d{{50,45,44,41,50,47,45}}, e{{35,36,33,30,40,39,36}}, f{{40,36,33,30,40,39,36}}, g{{45,36,33,30,42,39,36}}, h{{50,40,38,35,48,46,43}}, z{{0,0,0,0,0,0,0}};
constexpr std::array<MaterialResource, kMaterialResourceCount> us{{
  {"","",0,0,0,0,0,z}, {"A227","",.284,11500,1,310,165,a}, {"A228","QQW-470",.284,11500,1,370,200,a}, {"A229","QQW-428",.284,11500,1,320,185,a},
  {"A232","QQW-412",.284,11500,1,335,200,b}, {"A401","QQW-412",.284,11500,1,330,245,a}, {"A401","QQW-412",.284,11500,1,330,245,a}, {"Type302","QQW-423",.286,10000,1,330,145,c},
  {"Type316","QQW-423B",.288,10000,1,300,135,c}, {"A313","(cond_CH)",.277,11000,1,345,245,d}, {"B134","QQW-321",.308,5500,1,130,120,e}, {"B159","QQW-401",.32,6250,1,145,105,f},
  {"400","(AMS7233)",.319,9500,1,180,145,f}, {"SprTmp","(AMS5698)",.298,11500,1,200,165,f}, {"B197","QQW-530",.298,6500,1,180,170,g}, {"BetaC","(AMS4917)",.175,6100,1,197,170,f},
  {"A125-52","",.284,11500,.91,250,230,h}, {"A125-52","CL-GND",.284,11500,.96,250,230,h}
}};
constexpr std::array<MaterialResource, kMaterialResourceCount> metric{{
  {"","",0,0,0,0,0,z}, {"A227","",.00786,79.293,1,2.13,1.14,a}, {"A228","QQW-470",.00786,79.293,1,2.55,1.38,a}, {"A229","QQW-428",.00786,79.293,1,2.2,1.28,a},
  {"A232","QQW-412",.00786,79.293,1,2.31,1.38,b}, {"A401","QQW-412",.00786,79.293,1,2.28,1.69,a}, {"A401","QQW-412",.00786,79.293,1,2.28,1.69,a}, {"Type302","QQW-423",.00791,68.95,1,2.28,1,c},
  {"Type316","QQW-423B",.00797,68.95,1,2.07,.93,c}, {"A313","(cond_CH)",.00766,75.845,1,2.38,1.69,d}, {"B134","QQW-321",.00852,37.923,1,.9,.83,e}, {"B159","QQW-401",.00885,43.094,1,1,.72,f},
  {"400","(AMS7233)",.00882,65.503,1,1.24,1,f}, {"SprTmp","(AMS5698)",.00825,79.293,1,1.38,1.13,f}, {"B197","QQW-530",.00825,44.818,1,1.24,1.17,g}, {"BetaC","(AMS4917)",.00484,42.06,1,1.36,1.17,f},
  {"A125-52","",.00786,79.293,.91,1.72,1.585,h}, {"A125-52","CL-GND",.00786,79.293,.96,1.72,1.585,h}
}};
constexpr std::array<EndTypeResource, kEndTypeResourceCount> ends{{
  {"End_Type",0,0}, {"Open",0,1}, {"Open&Ground",1,0}, {"Closed",2,1}, {"Closed&Ground",2,0}, {"Tapered_C&G",2,-.5}, {"Pig-tail",2,0}, {"User_Specified",0,0}
}};
}

const MaterialResource* material_resource(std::string_view material_file, int index) {
  if (index < 1 || index >= static_cast<int>(kMaterialResourceCount)) return nullptr;
  const auto& table = material_file == "mat_metric.json" ? metric : us;
  return &table[static_cast<std::size_t>(index)];
}
const EndTypeResource* end_type_resource(int index) {
  return index >= 1 && index < static_cast<int>(kEndTypeResourceCount) ? &ends[static_cast<std::size_t>(index)] : nullptr;
}
double tensile_endurance_for_life_category(const MaterialResource& material, int category) {
  switch (category) { case 2: return material.tensile_endurance[1]; case 3: return material.tensile_endurance[2]; case 4: return material.tensile_endurance[3]; case 6: return material.tensile_endurance[4]; case 7: return material.tensile_endurance[5]; case 8: return material.tensile_endurance[6]; default: return material.tensile_endurance[0]; }
}

}  // namespace odop::compression_spring
