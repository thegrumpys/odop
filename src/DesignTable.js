import React from 'react';
import { Table } from 'reactstrap';
import DesignParametersSection from './DesignParametersSection.js';
import StateVariablesSection from './StateVariablesSection.js';
import { connect } from 'react-redux';

export class DesignTable extends React.Component {
    
    render() {
        return (
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th className="text-center" colSpan="2">Value</th>
                            <th>Units</th>
                            <th className="text-center" colSpan="3">Min</th>
                            <th className="text-center" colSpan="3">Max</th>
                        </tr>
                        <tr>
                          <th></th>
                          <th className="text-left">&nbsp;</th>
                          <th className="text-right">Fix</th>
                          <th></th>
                          <th className="text-left">Constrain</th>
                          <th className="text-right">Value</th>
                          <th className="text-center">Violation</th>
                          <th className="text-left">Constrain</th>
                          <th className="text-right">Value</th>
                          <th className="text-center">Violation</th>
                      </tr>
                    </thead>
                    <tbody>
                        <DesignParametersSection />
                        <StateVariablesSection />
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="7"></th>
                            <th colSpan="2">Objective Value</th>
                            <td>{this.props.objective_value.toFixed(4)}</td>
                        </tr>
                    </tfoot>
                </Table>
        );
    }
    
}


const mapStateToProps = state => ({
    objective_value: state.objective_value
});

export default connect(mapStateToProps)(DesignTable);
