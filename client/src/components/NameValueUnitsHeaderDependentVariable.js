import React, { Component } from 'react';
import { OverlayTrigger, Tooltip  } from 'react-bootstrap';
import { connect } from 'react-redux';

class NameValueUnitsHeaderDependentVariable extends Component {
    
    render() {
//        console.log('In NameValueUnitsHeaderDependentVariable.render this=',this);
        return (
            <thead>
                <tr>
                    <th className="text-center bg-secondary text-white" colSpan="6" id="IVTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Outputs from design equations</Tooltip>}>
                            <span>Dependent Variable (DV)</span>
                        </OverlayTrigger>
                    </th>
                </tr>
                <tr>
                    <th className="text-left" colSpan="2" id="IVNameTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Variable names</Tooltip>}>
                            <span>Name</span>
                        </OverlayTrigger>
                    </th>
                    <th className="text-center" colSpan="2" id="IVValueTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Current values.<br />Check box at right to FIX. (Hold unchanged) <br /> Uncheck box to FREE <br /> (Allow Search to specify) <br /> See Help Terminology FIX</Tooltip>}>
                            <span>Value (&nbsp;<i className="far fa-check-square"></i>&nbsp;Fix&nbsp;-&nbsp;<i className="far fa-square"></i>&nbsp;Free&nbsp;)</span>
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

export default connect(mapStateToProps)(NameValueUnitsHeaderDependentVariable);
