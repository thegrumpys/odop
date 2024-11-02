import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from 'react-bootstrap';
import NameValueUnitsHeaderIndependentVariable from './NameValueUnitsHeaderIndependentVariable';
import NameValueUnitsRowIndependentVariable from './NameValueUnitsRowIndependentVariable';
import NameValueUnitsHeaderDependentVariable from './NameValueUnitsHeaderDependentVariable';
import NameValueUnitsRowDependentVariable from './NameValueUnitsRowDependentVariable';

export default function NameValueUnitsTable() {
//  console.log('NameValueUnitsTable - Mounting...');
  const model_symbol_table = useSelector((state) => state.model.symbol_table);

  return (
    <>
      <Table id="nvut" className="table-secondary border border-secondary">
        <NameValueUnitsHeaderIndependentVariable />
        {model_symbol_table.map((element, index) => element.type === "equationset" && element.input && !element.hidden && <NameValueUnitsRowIndependentVariable key={element.name} element={element} index={index} />)}
        <NameValueUnitsHeaderDependentVariable />
        {model_symbol_table.map((element, index) => element.type === "equationset" && !element.input && !element.hidden && <NameValueUnitsRowDependentVariable key={element.name} element={element} index={index} />)}
      </Table>
    </>
  );

}
