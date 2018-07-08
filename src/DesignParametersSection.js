import React from 'react';
import { DesignParameterRow } from './DesignParameterRow.js';

export class DesignParametersSection extends React.Component {
    render() {
        var rows = [];
        rows.push(
                <tr>
                    <th colspan="6">Design Parameters</th>
                </tr>
                );
        this.props.design_parameters.forEach((design_parameter) => {
            rows.push(<DesignParameterRow design_parameter={design_parameter} />);
        });
        return rows;
    }
}
