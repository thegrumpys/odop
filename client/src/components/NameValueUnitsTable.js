import React, { Component } from 'react';
import { Table  } from 'react-bootstrap';
import NameValueUnitsHeaderIndependentVariable from './NameValueUnitsHeaderIndependentVariable';
import NameValueUnitsRowIndependentVariable from './NameValueUnitsRowIndependentVariable';
import NameValueUnitsHeaderDependentVariable from './NameValueUnitsHeaderDependentVariable';
import NameValueUnitsRowDependentVariable from './NameValueUnitsRowDependentVariable';
import { connect } from 'react-redux';

class NameValueUnitsTable extends Component {
    
    render() {
//        console.log('In NameValueUnitsTable.render this=',this);
        return (
            <>
                <Table className="col-md-6 border border-secondary" size="sm">
                    <NameValueUnitsHeaderIndependentVariable />
                    {this.props.symbol_table.map((element,index) => element.type === "equationset" && element.input && !element.hidden  && (element.subproblem & this.props.subproblem)>0 && <NameValueUnitsRowIndependentVariable key={element.name} element={element} index={index} />)}
                    <NameValueUnitsHeaderDependentVariable />
                    {this.props.symbol_table.map((element,index) => element.type === "equationset" && !element.input && !element.hidden && (element.subproblem & this.props.subproblem)>0 && <NameValueUnitsRowDependentVariable key={element.name} element={element} index={index} />)}
                </Table>
            </>
        );
    }
    
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    subproblem: state.model.subproblem,
});

export default connect(mapStateToProps)(NameValueUnitsTable);
