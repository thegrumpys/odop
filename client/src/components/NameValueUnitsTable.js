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
                    {Object.entries(this.props.symbol_table).map(([name,element],index) => element.type === "equationset" && element.input && !element.hidden && <NameValueUnitsRowIndependentVariable key={name} element={element} index={index} />)}
                    <NameValueUnitsHeaderDependentVariable />
                    {Object.entries(this.props.symbol_table).map(([name,element],index) => element.type === "equationset" && !element.input && !element.hidden && <NameValueUnitsRowDependentVariable key={name} element={element} index={index} />)}
                </Table>
            </>
        );
    }
    
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls
});

export default connect(mapStateToProps)(NameValueUnitsTable);
