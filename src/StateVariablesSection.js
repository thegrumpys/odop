import React from 'react';
import { StateVariableRow } from './StateVariableRow.js';

export class StateVariablesSection extends React.Component {
    
    render() {
        var rows = [];
        rows.push(
                <tr key="State Variables">
                    <th colSpan="6">State Variables</th>
                </tr>
                );
        this.props.state_variables.forEach((state_variable) => {
            rows.push(<StateVariableRow key={state_variable.name} state_variable={state_variable} />);
        });
        return rows;
    }
    
}
