#include "odop/optimization.hpp"
#include "odop/compression_spring_model.hpp"
#include "odop/design_session.hpp"

#include <algorithm>
#include <cmath>

namespace odop::optimization {
namespace { constexpr unsigned constrained = 1, fixed = 2; }
double scale_denominator(const SystemControls& controls, const double level,
                         const double limit, const unsigned flags) {
  const double weight = (flags & fixed) ? controls.fixed_weight
                                         : controls.constraint_weight;
  return std::max(std::abs(level) / weight + controls.small_number, limit);
}
void recompute_scales(DesignSession& session) {
  auto* model = dynamic_cast<compression_spring::Model*>(&session.model());
  if (!model) return;
  const auto update = [&](compression_spring::NumericSlot& slot) {
    slot.minimum_scale_denominator = scale_denominator(session.controls(), slot.constraint_minimum, slot.scale_denominator_limit, slot.minimum_flags);
    slot.maximum_scale_denominator = scale_denominator(session.controls(), slot.constraint_maximum, slot.scale_denominator_limit, slot.maximum_flags);
  };
  for (auto& slot : model->state().p) update(slot);
  for (auto& slot : model->state().x_numbers) update(slot);
}
Problem compile_problem(const DesignSession& session) {
  const auto* model = dynamic_cast<const compression_spring::Model*>(&session.model());
  if (!model) return {};
  Problem result;
  const auto add = [&](Source source, std::size_t offset, const compression_spring::NumericSlot& s) {
    result.descriptors.push_back({source, offset, s.valid_minimum, s.valid_maximum, s.constraint_minimum, s.constraint_maximum, s.minimum_scale_denominator, s.maximum_scale_denominator, s.minimum_flags, s.maximum_flags});
  };
  for (std::size_t i=0;i<model->state().p.size();++i) add(Source::p,i,model->state().p[i]);
  for (std::size_t i=0;i<model->state().x_numbers.size();++i) add(Source::x,i,model->state().x_numbers[i]);
  return result;
}
Evaluation evaluate(DesignSession& session, const Problem& problem) {
  Evaluation result;
  auto* model = dynamic_cast<compression_spring::Model*>(&session.model());
  if (!model) { result.diagnostics.push_back("objective requires a Compression Spring session"); return result; }
  const auto penalty = [](const double value) { return value * value; };
  const auto fixed_penalty = [&](const double valid, const double feasibility) {
    if (valid > 0. && feasibility > 0.) {
      const double combined = valid + feasibility;
      return combined > 1. ? combined : penalty(combined);
    }
    if (valid > 0.) return penalty(valid);
    if (feasibility > 0.) return feasibility > 1. ? feasibility : penalty(feasibility);
    return 0.;
  };
  for (const auto& d : problem.descriptors) {
    auto& slot = d.source == Source::p ? model->state().p.at(d.offset) : model->state().x_numbers.at(d.offset);
    const double value = slot.value;
    const double valid_min = d.valid_min - value, valid_max = value - d.valid_max;
    const bool is_fixed = d.source == Source::x && (d.min_flags & fixed);
    const double min = (is_fixed || (d.min_flags & constrained)) ? (d.constraint_min - value) / d.smin : 0.;
    const double max = is_fixed ? -min : ((d.max_flags & constrained) ? (value - d.constraint_max) / d.smax : 0.);
    slot.minimum_violation = min; slot.maximum_violation = max;
    result.invalid |= valid_min > 0. || valid_max > 0.; result.infeasible |= min > 0. || max > 0.;
    if (is_fixed) {
      result.objective += fixed_penalty(valid_min, min);
      result.objective += fixed_penalty(valid_max, max);
    } else {
      const auto add = [&](double valid, double feasibility) { if (valid > 0. && feasibility > 0.) result.objective += penalty(valid + feasibility); else if (valid > 0.) result.objective += penalty(valid); else if (feasibility > 0.) result.objective += penalty(feasibility); };
      add(valid_min, min); add(valid_max, max);
    }
  }
  result.objective *= session.controls().violation_weight;
  return result;
}
}
