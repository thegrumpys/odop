#include "odop/compression_spring_state.hpp"

#include <array>
#include <unordered_map>

namespace odop::compression_spring {
namespace {

struct SchemaEntry { std::string_view id; Storage storage; std::size_t offset; bool numeric; };

constexpr std::array kSchema = {
  SchemaEntry{"OD_Free", Storage::p, 0, true},
  SchemaEntry{"Wire_Dia", Storage::p, 1, true},
  SchemaEntry{"L_Free", Storage::p, 2, true},
  SchemaEntry{"Coils_T", Storage::p, 3, true},
  SchemaEntry{"Force_1", Storage::p, 4, true},
  SchemaEntry{"Force_2", Storage::p, 5, true},
  SchemaEntry{"Mean_Dia", Storage::x, 0, true},
  SchemaEntry{"Coils_A", Storage::x, 1, true},
  SchemaEntry{"Rate", Storage::x, 2, true},
  SchemaEntry{"Deflect_1", Storage::x, 3, true},
  SchemaEntry{"Deflect_2", Storage::x, 4, true},
  SchemaEntry{"L_1", Storage::x, 5, true},
  SchemaEntry{"L_2", Storage::x, 6, true},
  SchemaEntry{"L_Stroke", Storage::x, 7, true},
  SchemaEntry{"L_Solid", Storage::x, 8, true},
  SchemaEntry{"Slenderness", Storage::x, 9, true},
  SchemaEntry{"ID_Free", Storage::x, 10, true},
  SchemaEntry{"Weight", Storage::x, 11, true},
  SchemaEntry{"Spring_Index", Storage::x, 12, true},
  SchemaEntry{"Force_Solid", Storage::x, 13, true},
  SchemaEntry{"Stress_1", Storage::x, 14, true},
  SchemaEntry{"Stress_2", Storage::x, 15, true},
  SchemaEntry{"Stress_Solid", Storage::x, 16, true},
  SchemaEntry{"FS_2", Storage::x, 17, true},
  SchemaEntry{"FS_Solid", Storage::x, 18, true},
  SchemaEntry{"FS_CycleLife", Storage::x, 19, true},
  SchemaEntry{"Cycle_Life", Storage::x, 20, true},
  SchemaEntry{"%_Avail_Deflect", Storage::x, 21, true},
  SchemaEntry{"Energy", Storage::x, 22, true},
  SchemaEntry{"Spring_Type", Storage::x, 23, false},
  SchemaEntry{"Prop_Calc_Method", Storage::x, 24, true},
  SchemaEntry{"Material_Type", Storage::x, 25, true},
  SchemaEntry{"ASTM/Fed_Spec", Storage::x, 26, false},
  SchemaEntry{"Process", Storage::x, 27, false},
  SchemaEntry{"Material_File", Storage::x, 28, false},
  SchemaEntry{"Life_Category", Storage::x, 29, true},
  SchemaEntry{"Density", Storage::x, 30, true},
  SchemaEntry{"Torsion_Modulus", Storage::x, 31, true},
  SchemaEntry{"Hot_Factor_Kh", Storage::x, 32, true},
  SchemaEntry{"Tensile", Storage::x, 33, true},
  SchemaEntry{"%_Tensile_Endur", Storage::x, 34, true},
  SchemaEntry{"%_Tensile_Stat", Storage::x, 35, true},
  SchemaEntry{"Stress_Lim_Endur", Storage::x, 36, true},
  SchemaEntry{"Stress_Lim_Stat", Storage::x, 37, true},
  SchemaEntry{"End_Type", Storage::x, 38, true},
  SchemaEntry{"Inactive_Coils", Storage::x, 39, true},
  SchemaEntry{"Add_Coils@Solid", Storage::x, 40, true},
  SchemaEntry{"Catalog_Name", Storage::x, 41, false},
  SchemaEntry{"Catalog_Number", Storage::x, 42, false},
  SchemaEntry{"tbase010", Storage::x, 43, true},
  SchemaEntry{"tbase400", Storage::x, 44, true},
  SchemaEntry{"const_term", Storage::x, 45, true},
  SchemaEntry{"slope_term", Storage::x, 46, true},
  SchemaEntry{"tensile_010", Storage::x, 47, true},
};

const SchemaEntry* entry_for(std::string_view id) {
  for (const auto& entry : kSchema) if (entry.id == id) return &entry;
  return nullptr;
}

}  // namespace

const SlotLocation* find_slot(std::string_view stable_id) {
  static const std::unordered_map<std::string, SlotLocation> locations = [] {
    std::unordered_map<std::string, SlotLocation> result;
    for (const auto& entry : kSchema) result.emplace(std::string(entry.id), SlotLocation{entry.storage, entry.offset, entry.numeric});
    return result;
  }();
  const auto found = locations.find(std::string(stable_id));
  return found == locations.end() ? nullptr : &found->second;
}

HydrationResult hydrate(const FlatDesign& design) {
  HydrationResult result;
  if (design.design_type != kDesignType) result.diagnostics.emplace_back("unsupported design type: " + design.design_type);
  if (design.schema_version != kSchemaVersion) result.diagnostics.emplace_back("unsupported Compression Spring schema version");
  if (!result.diagnostics.empty()) return result;

  RuntimeState state;
  state.p.resize(kPSize);
  state.x_numbers.resize(kXSize);
  state.x_text.resize(kXSize);
  std::unordered_map<std::string, bool> seen;
  for (const auto& symbol : design.symbols) {
    const auto* entry = entry_for(symbol.id);
    if (!entry) { result.diagnostics.emplace_back("unknown Compression Spring symbol: " + symbol.id); continue; }
    if (seen.emplace(symbol.id, true).second == false) { result.diagnostics.emplace_back("duplicate Compression Spring symbol: " + symbol.id); continue; }
    UiSymbolView view{symbol.id, {entry->storage, entry->offset, entry->numeric}, entry->numeric, symbol.numeric_value, symbol.text_value, symbol.minimum_flags, symbol.maximum_flags, symbol.constraint_minimum, symbol.constraint_maximum};
    state.ui_symbols.push_back(std::move(view));
    if (entry->numeric) {
      if (!symbol.numeric_value) { result.diagnostics.emplace_back("numeric value required for " + symbol.id); continue; }
      NumericSlot slot{*symbol.numeric_value, symbol.valid_minimum.value_or(0), symbol.valid_maximum.value_or(0), symbol.constraint_minimum.value_or(0), symbol.constraint_maximum.value_or(0), symbol.scale_denominator_limit.value_or(0), symbol.minimum_scale_denominator.value_or(0), symbol.maximum_scale_denominator.value_or(0), symbol.minimum_violation.value_or(0), symbol.maximum_violation.value_or(0), symbol.minimum_flags, symbol.maximum_flags};
      if (entry->storage == Storage::p) state.p[entry->offset] = slot; else state.x_numbers[entry->offset] = slot;
    } else {
      if (!symbol.text_value) { result.diagnostics.emplace_back("text value required for " + symbol.id); continue; }
      state.x_text[entry->offset] = {*symbol.text_value};
    }
  }
  for (const auto& entry : kSchema) {
    if (!seen.contains(std::string(entry.id))) {
      result.diagnostics.emplace_back("missing Compression Spring symbol: " + std::string(entry.id));
    }
  }
  if (!result.diagnostics.empty()) return result;
  result.state = std::move(state);
  return result;
}

FlatDesign snapshot(const RuntimeState& state) {
  FlatDesign design{std::string(kDesignType), kSchemaVersion, {}};
  for (const auto& entry : kSchema) {
    FlatSymbol symbol; symbol.id = std::string(entry.id);
    if (entry.numeric) {
      const auto& slot = entry.storage == Storage::p ? state.p.at(entry.offset) : state.x_numbers.at(entry.offset);
      symbol.numeric_value = slot.value; symbol.valid_minimum = slot.valid_minimum; symbol.valid_maximum = slot.valid_maximum;
      symbol.constraint_minimum = slot.constraint_minimum; symbol.constraint_maximum = slot.constraint_maximum;
      symbol.scale_denominator_limit = slot.scale_denominator_limit; symbol.minimum_flags = slot.minimum_flags; symbol.maximum_flags = slot.maximum_flags;
      symbol.minimum_scale_denominator = slot.minimum_scale_denominator; symbol.maximum_scale_denominator = slot.maximum_scale_denominator;
      symbol.minimum_violation = slot.minimum_violation; symbol.maximum_violation = slot.maximum_violation;
    } else symbol.text_value = state.x_text.at(entry.offset).value;
    design.symbols.push_back(std::move(symbol));
  }
  return design;
}

}  // namespace odop::compression_spring
