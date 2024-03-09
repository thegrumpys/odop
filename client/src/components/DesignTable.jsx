import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from 'react-bootstrap';
import NameValueUnitsTable from './NameValueUnitsTable';
import NameValueUnitsCalcInputTable from './NameValueUnitsCalcInputTable';

export default function DesignTable() {
//  console.log("DesignTable - Mounting...");

  useEffect(() => {
//    console.log("DesignTable - Mounted");
//    return () => console.log("DesignTable - Unmounting ...");
    return () => {};
  }, []);

  return (
    <>
      <Row>
        <NameValueUnitsTable />
      </Row>
      <Row>
        <NameValueUnitsCalcInputTable />
      </Row>
    </>
  );
}
