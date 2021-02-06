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
            <React.Fragment>
                <Table className="col-md-3 border border-secondary" size="sm">
                    <thead>
                        <ConstraintsMinHeaderIndependentVariable />
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => element.type === "equationset" && element.input && !element.hidden && <ConstraintsMinRowIndependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                    <thead>
                        <ConstraintsMinHeaderDependentVariable />
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => element.type === "equationset" && !element.input && !element.hidden && <ConstraintsMinRowDependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
});

export default connect(mapStateToProps)(ConstraintsMinTable);
