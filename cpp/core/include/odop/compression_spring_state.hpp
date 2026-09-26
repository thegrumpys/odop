#pragma once

#include <cstddef>
#include <optional>
#include <string>
#include <string_view>
#include <vector>

namespace odop::compression_spring {

inline constexpr std::string_view kDesignType = "Spring/Compression";
inline constexpr int kSchemaVersion = 1;
inline constexpr std::size_t kPSize = 6;
inline constexpr std::size_t kXSize = 48;

enum class Storage { p, x };
enum class PropagationTarget { valid_minimum, valid_maximum, constraint_minimum, constraint_maximum };
struct PropagationRule { std::string source_id; std::string target_id; PropagationTarget target; };

struct NumericSlot {
  double value = 0.0;
  double valid_minimum = 0.0;
  double valid_maximum = 0.0;
  double constraint_minimum = 0.0;
  double constraint_maximum = 0.0;
  double scale_denominator_limit = 0.0;
  double minimum_scale_denominator = 0.0;
  double maximum_scale_denominator = 0.0;
  double minimum_violation = 0.0;
  double maximum_violation = 0.0;
  unsigned int minimum_flags = 0;
  unsigned int maximum_flags = 0;
};

struct TextSlot {
  std::string value;
};

struct SlotLocation {
  Storage storage;
  std::size_t offset;
  bool numeric;
};

struct FlatSymbol {
  // This is the host-normalized persistence representation. UI-only fields
  // (label, units, help, visibility) are intentionally retained separately.
  std::string id;
  std::optional<double> numeric_value;
  std::optional<std::string> text_value;
  std::optional<double> valid_minimum;
  std::optional<double> valid_maximum;
  std::optional<double> constraint_minimum;
  std::optional<double> constraint_maximum;
  std::optional<double> scale_denominator_limit;
  std::optional<double> minimum_scale_denominator;
  std::optional<double> maximum_scale_denominator;
  std::optional<double> minimum_violation;
  std::optional<double> maximum_violation;
  unsigned int minimum_flags = 0;
  unsigned int maximum_flags = 0;
};

struct FlatDesign {
  std::string design_type;
  int schema_version = 0;
  std::vector<FlatSymbol> symbols;
  std::vector<PropagationRule> propagations;
};

struct UiSymbolView {
  std::string id;
  SlotLocation location;
  bool numeric;
  std::optional<double> numeric_value;
  std::optional<std::string> text_value;
  unsigned int minimum_flags = 0;
  unsigned int maximum_flags = 0;
  std::optional<double> constraint_minimum;
  std::optional<double> constraint_maximum;
};

struct RuntimeState {
  std::vector<NumericSlot> p;
  std::vector<NumericSlot> x_numbers;
  std::vector<TextSlot> x_text;
  std::vector<UiSymbolView> ui_symbols;
  std::vector<PropagationRule> propagations;
};

struct HydrationResult {
  std::optional<RuntimeState> state;
  std::vector<std::string> diagnostics;
  [[nodiscard]] bool ok() const { return state.has_value() && diagnostics.empty(); }
};

[[nodiscard]] const SlotLocation* find_slot(std::string_view stable_id);
// The order is the established 54-entry persisted Compression Spring table.
// Narrow hosts use it to enumerate a snapshot without depending on offsets.
[[nodiscard]] std::string_view symbol_id(std::size_t ordinal);
inline constexpr std::size_t kSymbolCount = 54;
[[nodiscard]] HydrationResult hydrate(const FlatDesign& design);
[[nodiscard]] FlatDesign snapshot(const RuntimeState& state);
void apply_propagations(RuntimeState& state, const RuntimeState& before);

}  // namespace odop::compression_spring
