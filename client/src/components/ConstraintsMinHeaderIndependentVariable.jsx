import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default ConstraintsMinHeaderIndependentVariable = () => {
  console.log("ConstraintsMinHeaderIndependentVariable - Mounting...");
  const system_controls = useSelector((state) => state.model.model.system_controls);

  useEffect(() => {
    console.log("ConstraintsMinHeaderIndependentVariable - Mounted");
    return () => console.log("ConstraintsMinHeaderIndependentVariable - Unmounting ...");
    return () => { };
  }, []);

  return (
    <thead>
      <tr>
        <th className="text-center bg-secondary text-white" colSpan="4" id="IVMinConstraintTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Lower limits on Independent Variables</Tooltip>}>
            <span>IV Min Constraint</span>
          </OverlayTrigger>
        </th>
      </tr>
      <tr>
        <th className="text-left d-lg-none" id="IVMinConstraintNameTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip className="d-lg-none">Variable names</Tooltip>}>
            <span>Name</span>
          </OverlayTrigger>
        </th>
        <th className="text-left" id="IVMinConstraintConstrainTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Check box to establish lower limit</Tooltip>}>
            <span>Constrain</span>
          </OverlayTrigger>
        </th>
        <th className="text-center" id="IVMinConstraintValueTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Enter value for lower limit</Tooltip>}>
            <span>Value</span>
          </OverlayTrigger>
        </th>
        <th className={"text-right " + (system_controls.show_violations > 0 ? "" : "d-none")} id="IVMinConstraintViolationTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Measure of constraint violation.<br />Set File : Preferences show_violations=2 to show both violation (+) and satisfaction (-).</Tooltip>}>
            <span>Violation</span>
          </OverlayTrigger>
        </th>
      </tr>
    </thead>
  );
}
