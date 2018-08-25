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
                            <th className="text-center bg-secondary text-white" colSpan="6" id="IVTitle">Independent Variables</th>
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
                            <th className="text-center bg-secondary text-white" colSpan="6" id="DVTitle">Dependent Variables</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.state_variables.map((state_variable,index) => <NameValueUnitsRowStateVariable key={state_variable.name} state_variable={state_variable} index={index} />)}
                    </tbody>
                    <thead>
                        { this.props.constants.length > 0 &&
                            (<tr>
                                <th className="text-center bg-secondary text-white" colSpan="6" id="CITitle">Calculation Inputs</th>
                                <UncontrolledTooltip placement="top" target="CITitle">Calculation Inputs <br /> (pending restructure)</UncontrolledTooltip>
                            </tr>)
                        }
                    </thead>
                    <tbody>
                        {this.props.constants.map((constant,index) => <NameValueUnitsRowConstant key={constant.name} constant={constant} index={index} />)}
                    </tbody>
                </Table>
                <UncontrolledTooltip placement="top" target="IVTitle">Inputs to design equations</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="NameTitle">Variable names</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="ValueTitle">Current values <br /> (Check box at right to FIX)</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="UnitsTitle">Units (information only)</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="DVTitle">Outputs from design equations</UncontrolledTooltip>
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
