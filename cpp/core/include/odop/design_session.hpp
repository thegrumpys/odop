#pragma once

#include "odop/system_controls.hpp"

#include <memory>
#include <string_view>

namespace odop {

// The model contract is intentionally small until Stage 3 adds evaluation.
// A DesignSession owns one model and the shared computational controls used by
// that model; controls are never process-global or model-specific state.
class DesignModel {
 public:
  virtual ~DesignModel() = default;
  [[nodiscard]] virtual std::string_view design_type() const = 0;
};

class DesignSession {
 public:
  DesignSession(std::unique_ptr<DesignModel> model, SystemControls controls = {});

  [[nodiscard]] const DesignModel& model() const;
  [[nodiscard]] DesignModel& model();
  [[nodiscard]] const SystemControls& controls() const;

  // Replacing the complete value is an atomic control update from the
  // session's perspective. The host performs field-level patch merging.
  void set_controls(SystemControls controls);

 private:
  std::unique_ptr<DesignModel> model_;
  SystemControls controls_;
};

}  // namespace odop
