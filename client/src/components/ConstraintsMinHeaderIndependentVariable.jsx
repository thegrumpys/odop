import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function ConstraintsMinHeaderIndependentVariable() {
//  console.log('ConstraintsMinHeaderIndependentVariable - Mounting...');
  const model_show_violations = useSelector((state) => state.model.system_controls.show_violations.value);

  return (
    <thead id="cmnhiv">
      <tr>
        <th className="text-center bg-secondary text-white" colSpan="4" id="IVMinConstraintTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Lower limits on Independent Variables</Tooltip>}>
            <span>IV Min Constraint</span>
          </OverlayTrigger>
        </th>
      </tr>
      <tr>
        <th className="text-start d-lg-none" id="IVMinConstraintNameTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip className="d-lg-none">Variable names</Tooltip>}>
            <span>Name</span>
          </OverlayTrigger>
        </th>
        <th className="text-start" id="IVMinConstraintConstrainTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Check box to establish lower limit</Tooltip>}>
            <span>Constrain</span>
          </OverlayTrigger>
        </th>
        <th className="text-center" id="IVMinConstraintValueTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Enter value for lower limit</Tooltip>}>
            <span>Value</span>
          </OverlayTrigger>
        </th>
        <th className={"text-end " + (model_show_violations > 0 ? "" : "d-none")} id="IVMinConstraintViolationTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Measure of constraint violation.<br />Set File : Preferences show_violations=2 to show both violation (+) and satisfaction (-).</Tooltip>}>
            <span>Violation</span>
          </OverlayTrigger>
        </th>
      </tr>
    </thead>
  );
}
