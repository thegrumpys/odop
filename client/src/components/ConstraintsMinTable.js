import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import ConstraintsMinHeaderIndependentVariable from './ConstraintsMinHeaderIndependentVariable';
import ConstraintsMinRowIndependentVariable from './ConstraintsMinRowIndependentVariable';
import ConstraintsMinHeaderDependentVariable from './ConstraintsMinHeaderDependentVariable';
import ConstraintsMinRowDependentVariable from './ConstraintsMinRowDependentVariable';
import { connect } from 'react-redux';

class ConstraintsMinTable extends Component {

    render() {
//        console.log('In ConstraintsMinTable.render this=',this);
        return (
            <>
                <Table className="col-md-3 border border-secondary" size="sm">
                    <ConstraintsMinHeaderIndependentVariable />
                    {Object.entries(this.props.symbol_table).map(([name,element],index) => element.type === "equationset" && element.input && !element.hidden && <ConstraintsMinRowIndependentVariable key={name} element={element} index={index} />)}
                    <ConstraintsMinHeaderDependentVariable />
                    {Object.entries(this.props.symbol_table).map(([name,element],index) => element.type === "equationset" && !element.input && !element.hidden && <ConstraintsMinRowDependentVariable key={name} element={element} index={index} />)}
                </Table>
            </>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
});

export default connect(mapStateToProps)(ConstraintsMinTable);
