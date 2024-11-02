import { Row, Col } from 'react-bootstrap';
import NameValueUnitsTable from './NameValueUnitsTable';
import ConstraintsMinTable from './ConstraintsMinTable';
import ConstraintsMaxTable from './ConstraintsMaxTable';
import NameValueUnitsCalcInputTable from './NameValueUnitsCalcInputTable';

export default function DesignTable() {
//  console.log('DesignTable - Mounting...');

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
        <Col className="p-0" lg="6">
          <NameValueUnitsCalcInputTable />
        </Col>
      </Row>
    </>
  );
}
