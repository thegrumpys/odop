import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from 'react-bootstrap';
import NameValueUnitsHeaderIndependentVariable from './NameValueUnitsHeaderIndependentVariable';
import NameValueUnitsRowIndependentVariable from './NameValueUnitsRowIndependentVariable';
import NameValueUnitsHeaderDependentVariable from './NameValueUnitsHeaderDependentVariable';
import NameValueUnitsRowDependentVariable from './NameValueUnitsRowDependentVariable';

export default function NameValueUnitsTable() {
//  console.log("NameValueUnitsTable - Mounting...");
  const symbol_table = useSelector((state) => state.modelSlice.model.symbol_table);

  useEffect(() => {
//    console.log("NameValueUnitsTable - Mounted");
//    return () => console.log("NameValueUnitsTable - Unmounting ...");
    return () => {};
  }, []);

  return (
    <>
      <Table id="nvut" className="table-light border border-secondary">
        <NameValueUnitsHeaderIndependentVariable />
        {symbol_table.map((element, index) => element.type === "equationset" && element.input && !element.hidden && <NameValueUnitsRowIndependentVariable key={element.name} element={element} index={index} />)}
        <NameValueUnitsHeaderDependentVariable />
        {symbol_table.map((element, index) => element.type === "equationset" && !element.input && !element.hidden && <NameValueUnitsRowDependentVariable key={element.name} element={element} index={index} />)}
      </Table>
    </>
  );

}
