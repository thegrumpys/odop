import React from 'react';
import { Row, Col } from 'reactstrap';
import NameValueUnitsTable from './NameValueUnitsTable';
import ConstraintsMinTable from './ConstraintsMinTable';
import ConstraintsMaxTable from './ConstraintsMaxTable';
import ResultSection from './ResultSection';

export class DesignTable extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Row>
                    <NameValueUnitsTable />
                    <ConstraintsMinTable />
                    <ConstraintsMaxTable />
                </Row>
                <ResultSection />
            </React.Fragment>
        );
    }
    
}
