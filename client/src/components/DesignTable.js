import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import NameValueUnitsTable from './NameValueUnitsTable';
import ConstraintsMinTable from './ConstraintsMinTable';
import ConstraintsMaxTable from './ConstraintsMaxTable';
import ResultTable from './ResultTable';

export class DesignTable extends Component {
    
    render() {
        console.log("In DesignTable.render");
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
