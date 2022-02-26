import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

class ConstraintMinHeaderDependentVariable extends Component {

    render() {
//        console.log('In ConstraintMinHeaderDependentVariable.render this=',this);
        return (
            <thead>
                <tr>
                    <th className="text-center bg-secondary text-white" colSpan="4" id="DVMinConstraintTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Lower limits on Dependent Variables</Tooltip>}>
                            <span>DV Min Constraint</span>
                        </OverlayTrigger>
                    </th>
                </tr>
                <tr>
                    <th className="text-left d-lg-none" id="DVMinConstraintNameTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip className="d-lg-none">Variable names</Tooltip>}>
                            <span>Name</span>
                        </OverlayTrigger>
                    </th>
                    <th className="text-left" id="DVMinConstraintConstrainTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Check box to establish lower limit</Tooltip>}>
                            <span>Constrain</span>
                        </OverlayTrigger>
                    </th>
                    <th className="text-center" id="DVMinConstraintValueTitle">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Enter value for lower limit</Tooltip>}>
                            <span>Value</span>
                        </OverlayTrigger>
                    </th>
                    <th className={"text-right " + (this.props.system_controls.show_violations > 0 ? "" : "d-none")} id="DVMinConstraintViolationTitle">
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

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintMinHeaderDependentVariable);
