import React from 'react';
import { Table, UncontrolledTooltip  } from 'reactstrap';
import NameValueUnitsRowConstant from './NameValueUnitsRowConstant';
import NameValueUnitsRowDesignParameter from './NameValueUnitsRowDesignParameter';
import NameValueUnitsRowStateVariable from './NameValueUnitsRowStateVariable';
import { connect } from 'react-redux';

export class NameValueUnitsTable extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Table className="col-md-6 border border-secondary" size="sm">
                    <thead>
                        <tr>
                            <th className="text-center bg-dark text-white" colSpan="6" id="IVTitle">Independent Variables</th>
                        </tr>
                        <tr>
                            <th className="text-left" colSpan="2" id="NameTitle">Name</th>
                            <th className="text-center" colSpan="2" id="ValueTitle">Value (Fix)</th>
                            <th className="text-left" id="UnitsTitle">Units</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.design_parameters.map((design_parameter,index) => <NameValueUnitsRowDesignParameter key={design_parameter.name} design_parameter={design_parameter} index={index} />)}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center bg-dark text-white" colSpan="6" id="DVTitle">Dependent Variables</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.state_variables.map((state_variable,index) => <NameValueUnitsRowStateVariable key={state_variable.name} state_variable={state_variable} index={index} />)}
                    </tbody>
                    <thead>
                        { this.props.constants.length > 0 &&
                            (<tr>
                                <th className="text-center bg-dark text-white" colSpan="6" id="CITitle">Calculation Inputs</th>
                                <UncontrolledTooltip placement="top" target="CITitle">Calculation Inputs Title ToolTip</UncontrolledTooltip>
                            </tr>)
                        }
                    </thead>
                    <tbody>
                        {this.props.constants.map((constant,index) => <NameValueUnitsRowConstant key={constant.name} constant={constant} index={index} />)}
                    </tbody>
                </Table>
                <UncontrolledTooltip placement="top" target="IVTitle">Independent Variables Title ToolTip</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="NameTitle">Name Title ToolTip</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="ValueTitle">Value(Fix) Title ToolTip</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="UnitsTitle">Units Title ToolTip</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="DVTitle">Dependent Variables Title ToolTip</UncontrolledTooltip>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    constants: state.constants,
    design_parameters: state.design_parameters,
    state_variables: state.state_variables
});

export default connect(mapStateToProps)(NameValueUnitsTable);
