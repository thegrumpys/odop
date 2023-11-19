import React, { Component } from 'react';
import { OverlayTrigger, Tooltip  } from 'react-bootstrap';
import { connect } from 'react-redux';

class NameValueUnitsHeaderDependentVariable extends Component {
    
    render() {
//        console.log('In NameValueUnitsHeaderDependentVariable.render this=',this);
        return (
            <thead>
                <tr>
                    <th className="text-center bg-secondary text-white" colSpan="6" id="DVTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Outputs from design equations</Tooltip>}>
                            <span>Dependent Variable (DV)</span>
                        </OverlayTrigger>
                    </th>
                </tr>
                <tr>
                    <th className="text-left" colSpan="2" id="DVNameTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Variable names</Tooltip>}>
                            <span>Name</span>
                        </OverlayTrigger>
                    </th>
                    <th className="text-center" id="DVValueTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Current values.</Tooltip>}>
                            <span>Value</span>
                        </OverlayTrigger>
                    </th>
                    <th className="text-center">
                        <OverlayTrigger placement="right" overlay={<Tooltip>
                        Check <i className="far fa-check-square"></i> to FIX and hold unchanged.<br /> 
                        Uncheck <i className="far fa-square"></i> to FREE and allow Search to specify.<br /> See Help Terminology FIX</Tooltip>}>
                            <span><i className="fas fa-info-circle text-primary"></i></span>
                        </OverlayTrigger>
                    </th>
                    <th className={"text-left " + (this.props.system_controls.show_units ? "" : "d-none")} id="DVUnitsTitle">
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

export default connect(mapStateToProps)(NameValueUnitsHeaderDependentVariable);
