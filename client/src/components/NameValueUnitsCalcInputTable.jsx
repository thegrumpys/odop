import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table  } from 'react-bootstrap';
import NameValueUnitsHeaderCalcInput from './NameValueUnitsHeaderCalcInput';
import NameValueUnitsRowCalcInput from './NameValueUnitsRowCalcInput';

export default NameValueUnitsCalcInputTable = () => {
//  console.log("NameValueUnitsCalcInputTable - Mounting...");
  const symbol_table = useSelector((state) => state.model.model.symbol_table);

  useEffect(() => {
//    console.log("NameValueUnitsCalcInputTable - Mounted");
//    return () => console.log("NameValueUnitsCalcInputTable - Unmounting ...");
    return () => {};
  }, []);

  return (
    <>
      <Table className="<Table className=col-md-6 border border-secondary" size="sm">
        <NameValueUnitsHeaderCalcInput />
        {symbol_table.map((element,index) => element.type === "calcinput" && !element.hidden && <NameValueUnitsRowCalcInput key={element.name} element={element} index={index} />)}
      </Table>
    </>
  );
}
