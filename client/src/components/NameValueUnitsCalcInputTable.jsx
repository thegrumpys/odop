import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table  } from 'react-bootstrap';
import NameValueUnitsHeaderCalcInput from './NameValueUnitsHeaderCalcInput';
import NameValueUnitsRowCalcInput from './NameValueUnitsRowCalcInput';

export default function NameValueUnitsCalcInputTable() {
//  console.log('NameValueUnitsCalcInputTable - Mounting...');
  const model_symbol_table = useSelector((state) => state.model.symbol_table);

  useEffect(() => {
//    console.log('NameValueUnitsCalcInputTable - Mounted');
//    return () => console.log('NameValueUnitsCalcInputTable - Unmounting ...');
    return () => {};
  }, []);

  return (
    <div id="nvucit">
      <Table className="table-secondary border border-secondary" size="sm">
        <NameValueUnitsHeaderCalcInput />
        {model_symbol_table.map((element,index) => element.type === "calcinput" && !element.hidden && <NameValueUnitsRowCalcInput key={element.name} element={element} index={index} />)}
      </Table>
    </div>
  );
}
