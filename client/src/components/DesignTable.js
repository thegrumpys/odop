import React, { Component } from 'react';
import { Row } from 'reactstrap';
import NameValueUnitsTable from './NameValueUnitsTable';
import ConstraintsMinTable from './ConstraintsMinTable';
import ConstraintsMaxTable from './ConstraintsMaxTable';
import ResultTable from './ResultTable';

export class DesignTable extends Component {
    
    render() {
        return (
            <React.Fragment>
                <Row>
                    <ResultTable />
                </Row>
                <Row>
                    <NameValueUnitsTable />
                    <ConstraintsMinTable />
                    <ConstraintsMaxTable />
                </Row>
            </React.Fragment>
        );
    }
    
}
