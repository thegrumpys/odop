#include "odop/compression_spring_state.hpp"
#include "odop/compression_spring_model.hpp"
#include "odop/design_session.hpp"

#include <cstdlib>
#include <iostream>
#include <memory>
#include <algorithm>

using namespace odop::compression_spring;

namespace {
FlatSymbol number(std::string id, double value, unsigned int min_flags = 0, unsigned int max_flags = 0) {
  FlatSymbol symbol; symbol.id = std::move(id); symbol.numeric_value = value; symbol.valid_minimum = -1.0; symbol.valid_maximum = 100.0;
  symbol.constraint_minimum = 1.0; symbol.constraint_maximum = 10.0; symbol.scale_denominator_limit = 0.1; symbol.minimum_flags = min_flags; symbol.maximum_flags = max_flags; return symbol;
}
FlatSymbol text(std::string id, std::string value) { FlatSymbol symbol; symbol.id = std::move(id); symbol.text_value = std::move(value); return symbol; }
bool check(bool condition, const char* message) { if (!condition) std::cerr << message << '\n'; return condition; }
FlatSymbol& symbol(FlatDesign& design, const char* id) {
  return *std::find_if(design.symbols.begin(), design.symbols.end(), [id](const FlatSymbol& item) { return item.id == id; });
}
}

int main() {
  bool ok = true;
  const auto* wire = find_slot("Wire_Dia"); const auto* rate = find_slot("Rate"); const auto* material = find_slot("Material_Type"); const auto* material_file = find_slot("Material_File");
  ok &= check(wire && wire->storage == Storage::p && wire->offset == 1 && wire->numeric, "Wire_Dia must map to P[1]");
  ok &= check(rate && rate->storage == Storage::x && rate->offset == 2 && rate->numeric, "Rate must map to X[2]");
  ok &= check(material && material->storage == Storage::x && material->offset == 25 && material->numeric, "Material_Type table index must map to numeric X[25]");
  ok &= check(material_file && material_file->storage == Storage::x && material_file->offset == 28 && !material_file->numeric, "Material_File must map to text X[28]");

  odop::SystemControls controls;
  controls.max_iterations = 1000;
  controls.small_number = 1.0e-8;
  RuntimeState canonical_state;
  canonical_state.p.resize(kPSize);
  canonical_state.x_numbers.resize(kXSize);
  canonical_state.x_text.resize(kXSize);
  FlatDesign input = snapshot(canonical_state);
  symbol(input, "Wire_Dia") = number("Wire_Dia", .1055, 1, 2);
  symbol(input, "Wire_Dia").minimum_scale_denominator = .01;
  symbol(input, "Wire_Dia").maximum_scale_denominator = 2.0000001;
  symbol(input, "Wire_Dia").minimum_violation = .25;
  symbol(input, "Wire_Dia").maximum_violation = .5;
  symbol(input, "Rate") = number("Rate", 22.6315);
  symbol(input, "Material_Type") = number("Material_Type", 2.0);
  symbol(input, "Material_File") = text("Material_File", "mat_us.json");
  const auto hydrated = hydrate(input);
  ok &= check(hydrated.ok(), "representative design should hydrate");
  if (hydrated.state) {
    const auto session_hydration = create_session(input, controls);
    ok &= check(session_hydration.ok(), "Compression Spring session should hydrate");
    const auto& session = *session_hydration.session;
    ok &= check(session.model().design_type() == kDesignType && session.controls().max_iterations == 1000 && session.controls().small_number == 1.0e-8, "design session must own the Compression Spring model and system controls");
    const auto& model = static_cast<const Model&>(session.model());
    ok &= check(model.state().p[1].value == .1055 && model.state().p[1].minimum_flags == 1 && model.state().p[1].maximum_flags == 2 && model.state().p[1].minimum_scale_denominator == .01 && model.state().p[1].maximum_violation == .5, "numeric P slot values, flags, scales, and violations must survive hydration");
    ok &= check(model.state().x_numbers[2].value == 22.6315, "numeric X slot must survive hydration");
    ok &= check(model.state().x_numbers[25].value == 2.0, "numeric table index must survive hydration");
    ok &= check(model.state().x_text[28].value == "mat_us.json", "text X slot must survive hydration");
    const auto output = snapshot(model.state());
    const auto round_trip = hydrate(output);
    ok &= check(round_trip.ok() && round_trip.state->p[1].value == .1055 && round_trip.state->p[1].minimum_flags == 1 && round_trip.state->p[1].constraint_maximum == 10.0 && round_trip.state->p[1].maximum_scale_denominator == 2.0000001 && round_trip.state->p[1].minimum_violation == .25 && round_trip.state->x_numbers[25].value == 2.0 && round_trip.state->x_text[28].value == "mat_us.json", "snapshot must round-trip named values, flags, constraints, scales, and violations");
  }
  FlatDesign bad_version{std::string(kDesignType), 99, {}};
  ok &= check(!hydrate(bad_version).ok(), "unknown schema version must be rejected");
  FlatDesign incomplete{std::string(kDesignType), kSchemaVersion, {number("Wire_Dia", .1055)}};
  ok &= check(!hydrate(incomplete).ok(), "incomplete Compression Spring state must be rejected");
  return ok ? EXIT_SUCCESS : EXIT_FAILURE;
}
