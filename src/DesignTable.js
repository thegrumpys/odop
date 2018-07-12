import React from 'react';
import { Table } from 'reactstrap';
import DesignParametersSection from './DesignParametersSection.js';
import StateVariablesSection from './StateVariablesSection.js';
import { connect } from 'react-redux';

export class DesignTable extends React.Component {
    
    render() {
        return (
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th className="text-center">Value</th>
                            <th>Units</th>
                            <th className="text-center">Fixed</th>
                            <th className="text-center">Min</th>
                            <th className="text-center">Max</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DesignParametersSection />
                        <StateVariablesSection />
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="4"></th>
                            <th>Objective Value</th>
                            <td>{this.props.objective_value}</td>
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
