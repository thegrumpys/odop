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
            <React.Fragment>
                <Table className="col-md-3 border border-secondary" size="sm">
                    <thead>
                        <ConstraintsMaxHeaderIndependentVariable />
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => element.type === "equationset" && element.input && !element.hidden && <ConstraintsMaxRowIndependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                    <thead>
                        <ConstraintsMaxHeaderDependentVariable />
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => element.type === "equationset" && !element.input && !element.hidden && <ConstraintsMaxRowDependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
});

export default connect(mapStateToProps)(ConstraintsMaxTable);
