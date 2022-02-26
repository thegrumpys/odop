import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

class ConstraintMaxHeaderIndependentVariable extends Component {

    render() {
//        console.log('In ConstraintMaxHeaderIndependentVariable.render this=',this);
        return (
            <thead>
                <tr>
                    <th className="text-center bg-secondary text-white" colSpan="4" id="IVMaxConstraintTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Upper limits on Independent Variables</Tooltip>}>
                            <span>IV Max Constraint</span>
                        </OverlayTrigger>
                    </th>
                </tr>
                <tr>
                    <th className="text-left d-lg-none" id="IVMaxConstraintNameTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip className="d-lg-none">Variable names</Tooltip>}>
                            <span>Name</span>
                        </OverlayTrigger>
                    </th>
                    <th className="text-left" id="IVMaxConstraintConstrainTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Check box to establish upper limit</Tooltip>}>
                            <span>Constrain</span>
                        </OverlayTrigger>
                    </th>
                    <th className="text-center" id="IVMaxConstraintValueTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Enter value for upper limit</Tooltip>}>
                            <span>Value</span>
                        </OverlayTrigger>
                    </th>
                    <th className={"text-right " + (this.props.system_controls.show_violations > 0 ? "" : "d-none")} id="IVMaxConstraintViolationTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Measure of constraint violation.<br />Set File : Preferences show_violations=2 to show both violation (+) and satisfaction (-).</Tooltip>}>
                            <span>Violation</span>
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

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintMaxHeaderIndependentVariable);
