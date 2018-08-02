import React from 'react';
import { Row } from 'reactstrap';
import NameValueUnitsTable from './NameValueUnitsTable';
import ConstraintsMinTable from './ConstraintsMinTable';
import ConstraintsMaxTable from './ConstraintsMaxTable';
import ResultTable from './ResultTable';

export class DesignTable extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Row>
                    <NameValueUnitsTable />
                    <ConstraintsMinTable />
                    <ConstraintsMaxTable />
                </Row>
                <ResultTable />
            </React.Fragment>
        );
    }
    
}
