import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class FeasibilityIndicator extends Component {
    static defaultProps = { width: 242, height: 24 };
    
    render() {
//        console.log('In FeasibilityIndicator.render this=',this);
        // Coordinate system is 4th quadrant ---x-->
        //                                   | 
        //                                   y 
        //                                   | 
        //                                   V 
        const triangleWidth = 16;
        const triangleHeight = 16;
        const blackWidth = 4;
        const greenWidth = 55;
        const orangeWidth = 55;
        const redWidth = 100;
        const purpleWidth = 4;
        const boxY = 8;
        const boxHeight = 16;
        const xOrigin = triangleWidth+blackWidth;
        const yOrigin = 0;
        var x;
        if (this.props.objective_value <= 0) { // Black
            x = -blackWidth/2; // Center of black
        } else if (!Number.isFinite(this.props.objective_value)) { // Purple
            x = greenWidth + orangeWidth + redWidth + purpleWidth/2; // Scale and shift it
        } else if (this.props.objective_value > 4*this.props.system_controls.objmin) { // Red
            x = this.props.objective_value-4*this.props.system_controls.objmin; // Shift to Zero
            x = Math.log10(x); // log10
            var lowBound = Math.log10(4*this.props.system_controls.objmin); // 0.000200 is approx. 10**(-3.7)
            var highBound = 8 // 10**8
            if (x < lowBound) x = lowBound;
            else if (x > highBound) x = highBound;
            x = ((x-lowBound)/(highBound-lowBound))*redWidth + greenWidth + orangeWidth; // Scale and shift it
        } else if (this.props.objective_value > this.props.system_controls.objmin) { // Orange
            x = ((this.props.objective_value-this.props.system_controls.objmin)/(4*this.props.system_controls.objmin-this.props.system_controls.objmin))*orangeWidth + greenWidth;
        } else { // Green
            x = (this.props.objective_value/this.props.system_controls.objmin)*greenWidth;
        }
//        console.log('In FeasibilityIndicator.render this.props.objective_value=', this.props.objective_value,'x=',x);
        return (
            <>
                <svg width={this.props.width} height={this.props.height}>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>STRICTLY FEASIBLE: no constraints violated</Tooltip>}>
                        <rect x={xOrigin-blackWidth} y={yOrigin+boxY} width={blackWidth} height={boxHeight} fill="black" />
                    </OverlayTrigger>)
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>FEASIBLE: constraints not significantly violated</Tooltip>}>
                        <rect x={xOrigin} y={yOrigin+boxY} width={greenWidth} height={boxHeight} fill="#28a745" />
                    </OverlayTrigger>)
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>CLOSE TO FEASIBLE: constraints slightly violated</Tooltip>}>
                        <rect x={xOrigin+greenWidth} y={yOrigin+boxY} width={orangeWidth} height={boxHeight} fill="#fd7e14" />
                    </OverlayTrigger>)
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>NOT FEASIBLE: constraints significantly violated</Tooltip>}>
                        <rect x={xOrigin+greenWidth+orangeWidth} y={yOrigin+boxY} width={redWidth} height={boxHeight} fill="#dc3545" />
                    </OverlayTrigger>)
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>FEASIBILITY UNDEFINED: computing constraints failed</Tooltip>}>
                        <rect x={xOrigin+greenWidth+orangeWidth+redWidth} y={yOrigin+boxY} width={purpleWidth} height={boxHeight} fill="#8b299e" />
                    </OverlayTrigger>)
                    <OverlayTrigger placement="top" overlay={<Tooltip>Objective Value = {this.props.objective_value.toFixed(7)}</Tooltip>}>
                        <polygon points={[[xOrigin+x, yOrigin+triangleHeight], [xOrigin+triangleWidth/2+x, yOrigin], [xOrigin-triangleWidth/2+x, yOrigin]]} fill="#05a4e8" stroke="white" strokeWidth={1} />
                    </OverlayTrigger>)
                </svg>
            </>
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
