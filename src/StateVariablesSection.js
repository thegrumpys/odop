import React from 'react';
import { StateVariableRow } from './StateVariableRow.js';

export class StateVariablesSection extends React.Component {
    render() {
        var rows = [];
        rows.push(
                <tr>
                    <th colspan="6">State Variables</th>
                </tr>
                );
        this.props.state_variables.forEach((state_variable) => {
            rows.push(<StateVariableRow state_variable={state_variable} />);
        });
        return rows;
    }
}
