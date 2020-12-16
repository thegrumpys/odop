import React, { Component } from 'react';
import { Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

class FeasibilityIndicator extends Component {
    static defaultProps = { width: 222, height: 32 };
    
    render() {
//        console.log('In FeasibilityIndicator.render this=', this);
        const xOrigin = 8;
        var x;
        if (this.props.objective_value <= 0) { // Black
            x = -2; // Center of black
        } else if (this.props.objective_value > 4*this.props.system_controls.objmin) { // Red
            x = this.props.objective_value-4*this.props.system_controls.objmin; // Shift to Zero
            x = Math.log10(x); // log10 
            if (x < 0) x = 0; // set low limit 10**0
            else if (x > 15) x = 15; // set high limit 10**15
            x = (x/15)*70+140; // Scale and shift it
        } else if (this.props.objective_value > this.props.system_controls.objmin) { // Orange
            x = ((this.props.objective_value-this.props.system_controls.objmin)/(4*this.props.system_controls.objmin-this.props.system_controls.objmin))*70+70;
        } else { // Green
            x = (this.props.objective_value/this.props.system_controls.objmin)*70+0;
        }
//        console.log('In FeasibilityIndicator.render this.props.objective_value=', this.props.objective_value,'x=',x);
        return (
            <React.Fragment>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Objective Value = {this.props.objective_value.toFixed(6)}<br />OBJMIN = {this.props.system_controls.objmin.toFixed(6)}</Tooltip>}>
                    <b>Status</b>
                </OverlayTrigger>
                <svg width={this.props.width} height={this.props.height}>
                    <polygon points={[[xOrigin+x,8], [xOrigin+x+4,0], [xOrigin+x-4,0]]} fill="#05a4e8" />
                    <rect x={xOrigin-4} y={8} width={4} height={16} fill="black" />
                    <rect x={xOrigin} y={8} width={70} height={16} fill="#28a745" />
                    <rect x={xOrigin+70} y={8} width={70} height={16} fill="#fd7e14" />
                    <rect x={xOrigin+140} y={8} width={70} height={16} fill="#dc3545" />
                </svg>
            </React.Fragment>
        );
    }
    
}
const mapStateToProps = state => ({
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FeasibilityIndicator);
