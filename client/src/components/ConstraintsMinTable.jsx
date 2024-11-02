import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from 'react-bootstrap';
import ConstraintsMinHeaderIndependentVariable from './ConstraintsMinHeaderIndependentVariable';
import ConstraintsMinRowIndependentVariable from './ConstraintsMinRowIndependentVariable';
import ConstraintsMinHeaderDependentVariable from './ConstraintsMinHeaderDependentVariable';
import ConstraintsMinRowDependentVariable from './ConstraintsMinRowDependentVariable';

export default function ConstraintsMinTable() {
//  console.log('ConstraintsMinTable - Mounting...');
  const model_symbol_table = useSelector((state) => state.model.symbol_table);

  return (
    <>
      <Table id="cmnt" className="table-secondary border border-secondary">
        <ConstraintsMinHeaderIndependentVariable />
        {model_symbol_table.map((element,index) => element.type === "equationset" && element.input && !element.hidden && <ConstraintsMinRowIndependentVariable key={element.name} element={element} index={index} />)}
        <ConstraintsMinHeaderDependentVariable />
        {model_symbol_table.map((element,index) => element.type === "equationset" && !element.input && !element.hidden && <ConstraintsMinRowDependentVariable key={element.name} element={element} index={index} />)}
      </Table>
    </>
  );
}
