import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from 'react-bootstrap';
import ConstraintsMaxHeaderIndependentVariable from './ConstraintsMaxHeaderIndependentVariable';
import ConstraintsMaxRowIndependentVariable from './ConstraintsMaxRowIndependentVariable';
import ConstraintsMaxHeaderDependentVariable from './ConstraintsMaxHeaderDependentVariable';
import ConstraintsMaxRowDependentVariable from './ConstraintsMaxRowDependentVariable';

export default function ConstraintsMaxTable() {
//  console.log("ConstraintsMaxTable - Mounting...");
  const symbol_table = useSelector((state) => state.model.model.symbol_table);

  useEffect(() => {
//    console.log("ConstraintsMaxTable - Mounted");
//    return () => console.log("ConstraintsMaxTable - Unmounting ...");
    return () => {};
  }, []);

  return (
    <>
      <Table id="cmxt" className="table-light border border-secondary">
        <ConstraintsMaxHeaderIndependentVariable />
        {symbol_table.map((element,index) => element.type === "equationset" && element.input && !element.hidden && <ConstraintsMaxRowIndependentVariable key={element.name} element={element} index={index} />)}
        <ConstraintsMaxHeaderDependentVariable />
        {symbol_table.map((element,index) => element.type === "equationset" && !element.input && !element.hidden && <ConstraintsMaxRowDependentVariable key={element.name} element={element} index={index} />)}
      </Table>
    </>
  );
}
