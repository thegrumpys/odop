import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

class FeasibilityIndicator extends Component {
    static defaultProps = { width: 238, height: 24 };
    
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
        const boxY = 8;
        const boxHeight = 16;
        const xOrigin = triangleWidth+blackWidth;
        const yOrigin = 0;
        const objective_value = this.props.objective_value;
        const objmin = this.props.system_controls.objmin.value;
        console.log('objective_value=',objective_value,'objmin=',objmin);
        var x;
        if (objective_value <= 0) { // Black
            x = -blackWidth/2; // Center of black
        } else if (objective_value > 4*objmin) { // Red
            x = objective_value-4*objmin; // Shift to Zero
            x = Math.log10(x); // log10
            var lowBound = Math.log10(4*objmin); // 0.000200 is approx. 10**(-3.7)
            var highBound = 8 // 10**8
            if (x < lowBound) x = lowBound;
            else if (x > highBound) x = highBound;
            x = ((x-lowBound)/(highBound-lowBound))*redWidth + greenWidth + orangeWidth; // Scale and shift it
        } else if (objective_value > objmin) { // Orange
            x = ((objective_value-objmin)/(4*objmin-objmin))*orangeWidth + greenWidth;
        } else { // Green
            x = (objective_value/objmin)*greenWidth;
        }
//        console.log('In FeasibilityIndicator.render objective_value=', objective_value,'x=',x);
        return (
            <>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Search works to minimize Objective Value.<br />Objective Value = {objective_value.toFixed(6)}<br />Search stops if Objective Value falls below<br />OBJMIN = {objmin.toFixed(6)}</Tooltip>}>
                    <b>Status</b>
                </OverlayTrigger>
                <svg width={this.props.width} height={this.props.height}>
                    <rect x={xOrigin-blackWidth} y={yOrigin+boxY} width={blackWidth} height={boxHeight} fill="black" />
                    <rect x={xOrigin} y={yOrigin+boxY} width={greenWidth} height={boxHeight} fill="#28a745" />
                    <rect x={xOrigin+greenWidth} y={yOrigin+boxY} width={orangeWidth} height={boxHeight} fill="#fd7e14" />
                    <rect x={xOrigin+greenWidth+orangeWidth} y={yOrigin+boxY} width={redWidth} height={boxHeight} fill="#dc3545" />
                    <polygon points={[[xOrigin+x, yOrigin+triangleHeight], [xOrigin+triangleWidth/2+x, yOrigin], [xOrigin-triangleWidth/2+x, yOrigin]]} fill="#05a4e8" stroke="white" strokeWidth={1} />
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
