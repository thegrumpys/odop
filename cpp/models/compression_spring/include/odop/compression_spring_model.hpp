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

struct SessionHydrationResult {
  std::unique_ptr<DesignSession> session;
  std::vector<std::string> diagnostics;
  [[nodiscard]] bool ok() const { return session != nullptr && diagnostics.empty(); }
};

// Host adapters normalize their persisted payload into FlatDesign and
// SystemControls, then use this function to construct the active model/session.
[[nodiscard]] SessionHydrationResult create_session(const FlatDesign& design, SystemControls controls);

}  // namespace odop::compression_spring
