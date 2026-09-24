#include "odop/design_session.hpp"

#include <stdexcept>
#include <utility>

namespace odop {

DesignSession::DesignSession(std::unique_ptr<DesignModel> model, SystemControls controls)
    : model_(std::move(model)), controls_(controls) {
  if (!model_) throw std::invalid_argument("a design session requires a model");
}

const DesignModel& DesignSession::model() const { return *model_; }
DesignModel& DesignSession::model() { return *model_; }
const SystemControls& DesignSession::controls() const { return controls_; }
void DesignSession::set_controls(SystemControls controls) { controls_ = controls; }

}  // namespace odop
