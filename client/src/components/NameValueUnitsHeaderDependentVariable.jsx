import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip  } from 'react-bootstrap';

export default function NameValueUnitsHeaderDependentVariable() {
//  console.log('NameValueUnitsHeaderDependentVariable - Mounting...');
  const model_show_units = useSelector((state) => state.model.system_controls.show_units.value);

  return (
    <thead id="nvuhdv">
      <tr>
        <th className="text-center bg-secondary text-white" colSpan="6" id="DVTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Outputs from design equations</Tooltip>}>
            <span>Dependent Variable (DV)</span>
          </OverlayTrigger>
        </th>
      </tr>
      <tr>
        <th className="text-start" colSpan="2" id="DVNameTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip><p>Variable names</p><p>Copy/Paste a variable name into Help lookup for more details</p></Tooltip>}>
            <span>Name</span>
          </OverlayTrigger>
        </th>
        <th className="text-center" id="DVValueTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Current values.</Tooltip>}>
            <span>Value</span>
          </OverlayTrigger>
        </th>
        <th className="text-center">
          <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-lg">
            <p>Check <i className="far fa-check-square"></i> to FIX the variable and hold it unchanged at the value specified by its constraints.</p>
            <p>Uncheck <i className="far fa-square"></i> to FREE it and allow Search to find a value within its constraints.</p>
            <p>See Help Terminology FIX</p>
            </Tooltip>}>
            <span>Fix</span>
          </OverlayTrigger>
        </th>
        <th className={"text-start " + (model_show_units ? "" : "d-none")} id="DVUnitsTitle">
          <OverlayTrigger placement="top" overlay={<Tooltip>Units (information only)</Tooltip>}>
            <span>Units</span>
          </OverlayTrigger>
        </th>
      </tr>
    </thead>
  );
}
