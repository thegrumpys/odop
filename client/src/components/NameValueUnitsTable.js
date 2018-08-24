import React from 'react';
import { Table  } from 'reactstrap';
import NameValueUnitsRowConstant from './NameValueUnitsRowConstant';
import NameValueUnitsRowDesignParameter from './NameValueUnitsRowDesignParameter';
import NameValueUnitsRowStateVariable from './NameValueUnitsRowStateVariable';
import { connect } from 'react-redux';

export class NameValueUnitsTable extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Table className="col-md-5" bordered>
                    <tbody>
                        <tr>
                        <th className="text-left" colSpan="5">Independent Variables</th>
                        </tr>
                        <tr>
                            <th className="text-left" colSpan="2">Name</th>
                            <th className="text-center" colSpan="2">Value</th>
                            <th className="text-elft">Units</th>
                        </tr>
                        <tr>
                            <th colSpan="2"></th>
                            <th className="text-right" colSpan="2">Fix</th>
                            <th></th>
                        </tr>
                        {this.props.design_parameters.map((design_parameter) => <NameValueUnitsRowDesignParameter key={design_parameter.name} design_parameter={design_parameter} />)}
                        <tr>
                            <th className="text-left" colSpan="5">Dependent Variables</th>
                        </tr>
                        {this.props.state_variables.map((state_variable) => <NameValueUnitsRowStateVariable key={state_variable.name} state_variable={state_variable} />)}
                        { this.props.constants.length > 0 &&
                            (<tr>
                                <th className="text-left" colSpan="5">Calculation Inputs</th>
                            </tr>)
                        }
                        {this.props.constants.map((constant) => <NameValueUnitsRowConstant key={constant.name} constant={constant} />)}
                    </tbody>
                </Table>
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
