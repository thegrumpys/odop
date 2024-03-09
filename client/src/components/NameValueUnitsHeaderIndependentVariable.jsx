import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Tooltip  } from 'react-bootstrap';

export default NameValueUnitsHeaderIndependentVariable = () => {
//  console.log("NameValueUnitsHeaderIndependentVariable - Mounting...");
  const system_controls = useSelector((state) => state.model.model.system_controls);

  useEffect(() => {
//    console.log("NameValueUnitsHeaderIndependentVariable - Mounted");
//    return () => console.log("NameValueUnitsHeaderIndependentVariable - Unmounting ...");
    return () => {};
  }, []);

  return (
    <thead>
      <tr>
        <th className="text-center bg-secondary text-white" colSpan="6" id="IVTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Inputs to design equations. Search adjusts FREE Independent Variables to obtain a feasible solution.</Tooltip>}>
            <span>Independent Variable (IV)</span>
          </OverlayTrigger>
        </th>
      </tr>
      <tr>
        <th className="text-left" colSpan="2" id="IVNameTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Variable names</Tooltip>}>
            <span>Name</span>
          </OverlayTrigger>
        </th>
        <th className="text-center" id="IVValueTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Current values.</Tooltip>}>
            <span>Value</span>
          </OverlayTrigger>
        </th>
        <th className="text-center">
          <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-lg">
            <p>Check <i className="far fa-check-square"></i> to FIX the variable and hold it unchanged at this value.</p>
            <p>Uncheck <i className="far fa-square"></i> to FREE it and allow Search to find a value within its constraints.</p>
            <p>See Help Terminology FIX.</p>
            </Tooltip>}>
            <span>Fix</span>
          </OverlayTrigger>
        </th>
        <th className={"text-left " + (system_controls.show_units ? "" : "d-none")} id="IVUnitsTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Units (information only)</Tooltip>}>
            <span>Units</span>
          </OverlayTrigger>
        </th>
      </tr>
    </thead>
  );
}
