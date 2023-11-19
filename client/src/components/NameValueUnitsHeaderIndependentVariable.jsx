import React, { Component } from 'react';
import { OverlayTrigger, Tooltip  } from 'react-bootstrap';
import { connect } from 'react-redux';

class NameValueUnitsHeaderIndependentVariable extends Component {
    
    render() {
//        console.log('In NameValueUnitsHeaderIndependentVariable.render this=',this);
        return (
            <thead>
                <tr>
                    <th className="text-center bg-secondary text-white" colSpan="6" id="IVTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Inputs to design equations. Search adjusts FREE Independent Variables to obtain a feasible solution.</Tooltip>}>
                            <span>Independent Variable (IV)</span>
                        </OverlayTrigger>
                    </th>
                </tr>
                <tr>
                    <th className="text-left" colSpan="2" id="IVNameTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Variable names</Tooltip>}>
                            <span>Name</span>
                        </OverlayTrigger>
                    </th>
                    <th className="text-center" id="IVValueTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Current values.</Tooltip>}>
                            <span>Value</span>
                        </OverlayTrigger>
                    </th>
                    <th className="text-center">
                        <OverlayTrigger placement="top" overlay={<Tooltip>
                            Check <i className="far fa-check-square"></i> to FIX it and hold it unchanged at this value.<br /> 
                            Uncheck <i className="far fa-square"></i> to FREE it and allow Search to find a value within its constraints.<br /> See Help Terminology FIX
                            </Tooltip>}>
                            <span><i className="fas fa-info-circle text-primary"></i></span>
                        </OverlayTrigger>
                    </th>
                    <th className={"text-left " + (this.props.system_controls.show_units ? "" : "d-none")} id="IVUnitsTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Units (information only)</Tooltip>}>
                            <span>Units</span>
                        </OverlayTrigger>
                    </th>
                </tr>
            </thead>
        );
    }
    
}

const mapStateToProps = state => ({
    system_controls: state.model.system_controls
});

export default connect(mapStateToProps)(NameValueUnitsHeaderIndependentVariable);
