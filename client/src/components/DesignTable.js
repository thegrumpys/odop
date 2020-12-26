import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import NameValueUnitsTable from './NameValueUnitsTable';
import ConstraintsMinTable from './ConstraintsMinTable';
import ConstraintsMaxTable from './ConstraintsMaxTable';
import ResultTable from './ResultTable';
import { connect } from 'react-redux';

class DesignTable extends Component {
    
    render() {
//        console.log('In DesignTable.render this=',this);
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

export default connect()(DesignTable);
