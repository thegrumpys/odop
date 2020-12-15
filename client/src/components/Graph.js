import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

class Graph extends Component {
    
    render() {
//        console.log('In Graph.render this=', this);
        var data = [];
        for (var objval=0.000001; objval < 0.000500; objval=objval+0.000001) {
            data.push({
                x: objval, 
                y: Math.log10(objval), 
                f1: objval > 4*this.props.system_controls.objmin ? -3 : -6,
                f2: objval > this.props.system_controls.objmin ? -4 : -6,
                f3: objval > 0 ? -5 : -6,
            });
        }
        return (
            <React.Fragment>
                <Row>
                    <LineChart width={912}
                               height={912}
                               data={data}
                               margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="x" />
                    <YAxis dataKey="y" />
                    <YAxis dataKey="f1" />
                    <YAxis dataKey="f2" />
                    <YAxis dataKey="f3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="y" stroke="#000000" />
                    <Line type="monotone" dataKey="f1" stroke="#dc3545" />
                    <Line type="monotone" dataKey="f2" stroke="#fd7e14" />
                    <Line type="monotone" dataKey="f3" stroke="#28a745" />
                  </LineChart>
                </Row>
            </React.Fragment>
        );
    }
    
}
const mapStateToProps = state => ({
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
