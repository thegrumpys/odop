import React from 'react';
import { Table } from 'reactstrap';

class DesignParameterRow extends React.Component {
    render() {
        var vmin = this.props.design_parameter.vmin > 0.0 ? <span style={{color: "red"}}>VIOLATED</span> : '';
        var vmax = this.props.design_parameter.vmax > 0.0 ? <span style={{color: "red"}}>VIOLATED</span> : '';
        return (
                <tr>
                <td>{this.props.design_parameter.name}</td>
                <td>{this.props.design_parameter.value}</td>
                <td>{this.props.design_parameter.units}</td>
                <td></td>
                <td>{this.props.design_parameter.cmin}</td>
                <td>{this.props.design_parameter.cmax}</td>
                <td>{vmin}</td>
                <td>{vmax}</td>
                </tr>
        );
    }
}

class DesignParametersSection extends React.Component {
    render() {
        var rows = [];
        rows.push(
                <tr colspan="6">
                Design Parameters
                </tr>
                );
        this.props.design_parameters.forEach((design_parameter) => {
            rows.push(<DesignParameterRow design_parameter={design_parameter} />);
        });
        return rows;
    }
}

class StateVariableRow extends React.Component {
    render() {
        var vmin = this.props.state_variable.vmin > 0.0 ? <span style={{color: "red"}}>VIOLATED</span> : '';
        var vmax = this.props.state_variable.vmax > 0.0 ? <span style={{color: "red"}}>VIOLATED</span> : '';
        return (
                <tr>
                <td>{this.props.state_variable.name}</td>
                <td>{this.props.state_variable.value}</td>
                <td>{this.props.state_variable.units}</td>
                <td></td>
                <td>{this.props.state_variable.cmin}</td>
                <td>{this.props.state_variable.cmax}</td>
                <td>{vmin}</td>
                <td>{vmax}</td>
                </tr>
        );
    }
}

class StateVariablesSection extends React.Component {
    render() {
        var rows = [];
        rows.push(
                <tr colspan="6">
                State Variables
                </tr>
                );
        this.props.state_variables.forEach((state_variable) => {
            rows.push(<StateVariableRow state_variable={state_variable} />);
        });
        return rows;
    }
}

export class DesignTable extends React.Component {
    render() {
        return (
                <Table>
                <thead>
                <th>Name</th>
                <th>Value</th>
                <th>Units</th>
                <th>fnx</th>
                <th>Min</th>
                <th>Max</th>
                <th>Min?</th>
                <th>Max?</th>
                </thead>
                <tbody>
                <DesignParametersSection design_parameters={this.props.design.design_parameters} />
                <StateVariablesSection state_variables={this.props.design.state_variables} />
                </tbody>
                </Table>
        );
    }
}
