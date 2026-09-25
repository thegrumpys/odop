#pragma once

#include "odop/compression_spring_state.hpp"
#include "odop/design_session.hpp"

#include <string_view>
#include <utility>
#include <vector>

namespace odop::compression_spring {

// Stage 2 model holder. Stage 3 adds the EQNSET evaluation implementation;
// this class already establishes DesignSession ownership and model identity.
class Model final : public DesignModel {
 public:
  explicit Model(RuntimeState state) : state_(std::move(state)) {}

  [[nodiscard]] std::string_view design_type() const override { return kDesignType; }
  [[nodiscard]] const RuntimeState& state() const { return state_; }
  [[nodiscard]] RuntimeState& state() { return state_; }

 private:
  RuntimeState state_;
};

// Runs the legacy Compression Spring EQNSET against session-owned state.
// INIT remains intentionally out of scope until Stage 4.
void evaluate(DesignSession& session);

// Array form for narrow hosts such as the Stage 3 Wasm smoke binding. X uses
// its established 48-number layout; text configuration is supplied separately.
void evaluate(std::vector<double>& p, std::vector<double>& x, std::string_view material_file,
    const SystemControls& controls);

struct SessionHydrationResult {
  std::unique_ptr<DesignSession> session;
  std::vector<std::string> diagnostics;
  [[nodiscard]] bool ok() const { return session != nullptr && diagnostics.empty(); }
};

// Host adapters normalize their persisted payload into FlatDesign and
// SystemControls, then use this function to construct the active model/session.
[[nodiscard]] SessionHydrationResult create_session(const FlatDesign& design, SystemControls controls);

}  // namespace odop::compression_spring
