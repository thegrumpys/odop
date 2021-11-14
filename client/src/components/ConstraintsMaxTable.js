import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import ConstraintsMaxHeaderIndependentVariable from './ConstraintsMaxHeaderIndependentVariable';
import ConstraintsMaxRowIndependentVariable from './ConstraintsMaxRowIndependentVariable';
import ConstraintsMaxHeaderDependentVariable from './ConstraintsMaxHeaderDependentVariable';
import ConstraintsMaxRowDependentVariable from './ConstraintsMaxRowDependentVariable';
import { connect } from 'react-redux';

class ConstraintsMaxTable extends Component {

    render() {
//        console.log('In ConstraintsMaxTable.render this=',this);
        return (
            <>
                <Table className="col-md-3 border border-secondary" size="sm">
                    <ConstraintsMaxHeaderIndependentVariable />
                    {this.props.symbol_table.map((element,index) => element.type === "equationset" && element.input && !element.hidden && <ConstraintsMaxRowIndependentVariable key={element.name} element={element} index={index} />)}
                    <ConstraintsMaxHeaderDependentVariable />
                    {this.props.symbol_table.map((element,index) => element.type === "equationset" && !element.input && !element.hidden && <ConstraintsMaxRowDependentVariable key={element.name} element={element} index={index} />)}
                </Table>
            </>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
});

export default connect(mapStateToProps)(ConstraintsMaxTable);
