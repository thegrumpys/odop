import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from 'react-bootstrap';
import NameValueUnitsTable from './NameValueUnitsTable';
import ConstraintsMinTable from './ConstraintsMinTable';
import ConstraintsMaxTable from './ConstraintsMaxTable';
import NameValueUnitsCalcInputTable from './NameValueUnitsCalcInputTable';

export default function DesignTable() {
//  console.log("DesignTable - Mounting...");

  useEffect(() => {
//    console.log("DesignTable - Mounted");
//    return () => console.log("DesignTable - Unmounting ...");
    return () => { };
  }, []);

  return (
    <>
      <Row>
        <Col className="p-0" lg="6">
          <NameValueUnitsTable />
        </Col>
        <Col className="p-0" lg="3">
          <ConstraintsMinTable />
        </Col>
        <Col className="p-0" lg="3">
          <ConstraintsMaxTable />
        </Col>
      </Row>
      <Row>
        <Col className="p-0" lg="12">
          <NameValueUnitsCalcInputTable />
        </Col>
      </Row>
    </>
  );
}
