import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import NameValueUnitsTable from './NameValueUnitsTable';
import ConstraintsMinTable from './ConstraintsMinTable';
import ConstraintsMaxTable from './ConstraintsMaxTable';
import NameValueUnitsCalcInputTable from './NameValueUnitsCalcInputTable';
import NameValueUnitsRowIndependentVariable from './NameValueUnitsRowIndependentVariable';
import NameValueUnitsRowCalcInput from './NameValueUnitsRowCalcInput';
import { connect } from 'react-redux';
import * as o from '../designtypes/Spring/Compression/symbol_table_offsets';
import { Table  } from 'react-bootstrap';

class DesignTable extends Component {

    render() {
//        console.log('In DesignTable.render this=',this);
        return (
            <>
                <Row>
                <Table className="col-md-6 border border-secondary" size="sm">
                    <NameValueUnitsRowIndependentVariable key={this.props.symbol_table[o.OD_Free].name} element={this.props.symbol_table[o.OD_Free]} index={o.OD_Free} />
                    <NameValueUnitsRowIndependentVariable key={this.props.symbol_table[o.Wire_Dia].name} element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                    <NameValueUnitsRowIndependentVariable key={this.props.symbol_table[o.L_Free].name} element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                    <NameValueUnitsRowIndependentVariable key={this.props.symbol_table[o.Coils_T].name} element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                    <NameValueUnitsRowCalcInput key={this.props.symbol_table[o.Material_Type].name} element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                    <NameValueUnitsRowCalcInput key={this.props.symbol_table[o.End_Type].name} element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                </Table>
                </Row>
            </>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
});

export default connect(mapStateToProps)(DesignTable);
