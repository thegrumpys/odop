import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SymbolUnits({ className, element, index }) {
//  console.log('SymbolUnits - Mounting...','element=',element,'index=',index);
  const model_show_units = useSelector((state) => state.modelSlice.model.system_controls.show_units);

  return (
    <>
      <td className={"text-nowrap align-middle " + (model_show_units ? "" : "d-none") + (className !== undefined ? className : '')} id={'su_' + element.name}>
        {element.units}
      </td>
    </>
  );
}
