import React from 'react';
import DesignParameterRow from './DesignParameterRow.js';
import { connect } from 'react-redux';

export class DesignParametersSection extends React.Component {
    
    render() {
        var rows = [];
        rows.push(
                <tr key="Design Parameters">
                    <th colSpan="6">Design Parameters</th>
                </tr>
                );
        this.props.design_parameters.forEach((design_parameter) => {
            rows.push(<DesignParameterRow key={design_parameter.name} design_parameter={design_parameter} />);
        });
        return rows;
    }
    
}

const mapStateToProps = state => ({
    design_parameters: state.design_parameters
});

export default connect(mapStateToProps)(DesignParametersSection);
