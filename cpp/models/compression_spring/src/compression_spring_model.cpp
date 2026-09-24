#include "odop/compression_spring_model.hpp"

#include <memory>

namespace odop::compression_spring {

SessionHydrationResult create_session(const FlatDesign& design, SystemControls controls) {
  const auto hydration = hydrate(design);
  if (!hydration.ok()) return {nullptr, hydration.diagnostics};
  return {std::make_unique<DesignSession>(std::make_unique<Model>(*hydration.state), controls), {}};
}

}  // namespace odop::compression_spring
