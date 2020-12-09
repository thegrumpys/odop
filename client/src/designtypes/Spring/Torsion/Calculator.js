import React, { Component } from 'react';
import { Container, Row, Table, InputGroup, Form } from 'react-bootstrap';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import ResultTable from '../../../components/ResultTable';
import SymbolName from '../../../components/SymbolName';
import SymbolValue from '../../../components/SymbolValue';
import SymbolUnits from '../../../components/SymbolUnits';
import Value from '../../../components/Value';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

export class Calculator extends ReportBase {

    constructor(props) {
      super(props);
//      console.log('In Calculator.constructor props=',props);
    }

    render() {
        super.render();
//        console.log('In Calculator.render this.props=',this.props);
        return (
            <Container>

            </Container>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Calculator);
