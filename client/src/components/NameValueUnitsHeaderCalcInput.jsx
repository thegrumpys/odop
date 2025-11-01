import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip  } from 'react-bootstrap';

export default function NameValueUnitsHeaderCalcInput() {
//  console.log('NameValueUnitsHeaderCalcInput - Mounting...');
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_show_units = useSelector((state) => state.model.system_controls.show_units.value);

  return (
    <>
      { (model_symbol_table.reduce((accum,element)=>{if (element.type === "calcinput" && !element.hidden) return accum+1; else return accum;}, 0) > 0) &&
        (<thead id="nvuhci">
          <tr>
            <th className="text-center bg-secondary text-white" colSpan="6" id="CITitle">
              <OverlayTrigger placement="top" overlay={<Tooltip>Variables that are not subject to constraints, FIX or Search</Tooltip>}>
                <span>Calculation Input</span>
              </OverlayTrigger>
            </th>
          </tr>
          <tr>
            <th className="text-start" colSpan="2" id="CINameTitle">
              <OverlayTrigger placement="top" overlay={<Tooltip>Variable names</Tooltip>}>
                <span>Name</span>
              </OverlayTrigger>
            </th>
            <th className="text-center" colSpan="2" id="CIValueTitle">
              <OverlayTrigger placement="top" overlay={<Tooltip>Current values</Tooltip>}>
                <span>Value</span>
              </OverlayTrigger>
            </th>
            <th className={"text-start " + (model_show_units ? "" : "d-none")} id="CIUnitsTitle">
              <OverlayTrigger placement="top" overlay={<Tooltip>Units (information only)</Tooltip>}>
                <span>Units</span>
              </OverlayTrigger>
            </th>
          </tr>
        </thead>)
      }
    </>
  );
}
