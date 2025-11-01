import { useSelector } from "react-redux";

export default function SymbolUnits({ className, element, index }) {
//  console.log('SymbolUnits - Mounting...','element=',element,'index=',index);
  const model_show_units = useSelector((state) => state.model.system_controls.show_units.value);

  return (
    <>
      <td className={"text-nowrap align-middle " + (model_show_units ? "" : "d-none") + (className !== undefined ? className : '')} id={'su_' + element.name}>
        {element.units}
      </td>
    </>
  );
}
