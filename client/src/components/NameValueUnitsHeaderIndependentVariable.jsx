import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip  } from 'react-bootstrap';

export default function NameValueUnitsHeaderIndependentVariable() {
//  console.log('NameValueUnitsHeaderIndependentVariable - Mounting...');
  const model_show_units = useSelector((state) => state.model.system_controls.show_units.value);

  return (
    <thead id="nvuhiv">
      <tr>
        <th className="text-center bg-secondary text-white" colSpan="6" id="IVTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Inputs to design equations. Search adjusts FREE Independent Variables to obtain a feasible solution.</Tooltip>}>
            <span>Independent Variable (IV)</span>
          </OverlayTrigger>
        </th>
      </tr>
      <tr>
        <th className="text-start" colSpan="2" id="IVNameTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip><p>Variable names</p><p>Click the Design Type icon at the right of the Menu bar for a detailed description.</p></Tooltip>}>
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
        <th className={"text-start " + (model_show_units ? "" : "d-none")} id="IVUnitsTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Units (information only)</Tooltip>}>
            <span>Units</span>
          </OverlayTrigger>
        </th>
      </tr>
    </thead>
  );
}
