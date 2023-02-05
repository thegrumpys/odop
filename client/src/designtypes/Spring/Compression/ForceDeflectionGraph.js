import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, Form } from 'react-bootstrap';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { connect } from 'react-redux';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Label, ReferenceLine } from 'recharts';
import SymbolName from '../../../components/SymbolName';
import SymbolValue from '../../../components/SymbolValue';
import SymbolUnits from '../../../components/SymbolUnits';
import SymbolValueWireDia from '../SymbolValueWireDia';
import ValueName from '../../../components/ValueName';
import Value from '../../../components/Value';
import * as o from './symbol_table_offsets';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

function CustomTooltip({ payload, label, active }) {
//    console.log('In Calculator.CustomTooltip payload=',payload,'label=',label,'active=',active);
    if (active) {
        return (
            <div>
                <b>{`${payload[0].payload.title}`}</b><br/>
                {`Force: ${payload[0].payload.force.toODOPPrecision()}`}<br/>
                {`Deflection: ${payload[0].payload.deflection.toODOPPrecision()}`}<br/>
                {`Length: ${payload[0].payload.length.toODOPPrecision()}`}
            </div>
        );
    }
    return null;
}

const formatXAxis = (tickItem) => {
    return tickItem.toODOPPrecision();
}

class ForceDeflectionGraph extends ReportBase {

    render() {
//        console.log('In ForceDeflectionGraph.render this=', this);
        var data = [];
        data.push({ title: 'Free position', force: 0.0, deflection: 0.0, length: this.props.symbol_table[o.L_Free].value });
        data.push({ title: 'Position 1', force: this.props.symbol_table[o.Force_1].value, deflection: this.props.symbol_table[o.Deflect_1].value, length: this.props.symbol_table[o.L_1].value });
        data.push({ title: 'Position 2', force: this.props.symbol_table[o.Force_2].value, deflection: this.props.symbol_table[o.Deflect_2].value, length: this.props.symbol_table[o.L_2].value });
        data.push({ title: 'Solid position', force: this.props.symbol_table[o.Force_Solid].value, deflection: this.props.symbol_table[o.L_Free].value - this.props.symbol_table[o.L_Solid].value, length: this.props.symbol_table[o.L_Solid].value });
        return (
            <Container>
                <Row className="justify-content-lg-center">
                    <Col lg="6"><h2>Force-Deflection Analysis</h2></Col>
                </Row>
                <Row>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th className="text-center" style={{color: '#d6361c'}} colspan="3">From Force - Deflection Specification</th>
                                <th className="text-center" style={{color: '#2b3f79'}} colspan="3">Rate from OD_Free, Wire_Dia, Coils_T, and Torsion_Modulus</th>
                            </tr>
                            <tr>
                                <th></th>
                                <ValueName name={<><b>Deflection</b><br />{this.props.symbol_table[o.L_Free].units}</>} tooltip="Deflection at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Force</b><br />{this.props.symbol_table[o.Force_1].units}</>} tooltip="Force at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Length</b><br />{this.props.symbol_table[o.L_Free].units}</>} tooltip="Length at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Deflection</b><br />{this.props.symbol_table[o.L_Free].units}</>} tooltip="Deflection at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Force</b><br />{this.props.symbol_table[o.Force_1].units}</>} tooltip="Force at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Length</b><br />{this.props.symbol_table[o.L_Free].units}</>} tooltip="Length at free point, point 1, point 2 and solid point" className="text-center" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <ValueName name={<b>Free</b>} tooltip="Free or no load point" />
                                <td></td>
                                <td></td>
                                <td></td>
                                <Value id="Deflection_Free" value={0.0} />
                                <Value id="Force_Free" value={0.0} />
                                <SymbolValue element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                            </tr>
                            <tr>
                                <ValueName name={<b>1</b>} tooltip="Point 1 (minimum operating load)" />
                                <td></td>
                                <td></td>
                                <td></td>
                                <SymbolValue element={this.props.symbol_table[o.Deflect_1]} index={o.Deflect_1} />
                                <SymbolValue element={this.props.symbol_table[o.Force_1]} index={o.Force_1} />
                                <SymbolValue element={this.props.symbol_table[o.L_1]} index={o.L_1} />
                            </tr>
                            <tr>
                                <ValueName name={<b>2</b>} tooltip="Point 2 (maximum operating load)" />
                                <td></td>
                                <td></td>
                                <td></td>
                                <SymbolValue element={this.props.symbol_table[o.Deflect_2]} index={o.Deflect_2} />
                                <SymbolValue element={this.props.symbol_table[o.Force_2]} index={o.Force_2} />
                                <SymbolValue element={this.props.symbol_table[o.L_2]} index={o.L_2} />
                            </tr>
                            <tr>
                                <ValueName name={<b>Solid</b>} tooltip="Fully compressed" />
                                <td></td>
                                <td></td>
                                <td></td>
                                <Value id="Deflection_Solid" value={(this.props.symbol_table[o.L_Free].value - this.props.symbol_table[o.L_Solid].value)} />
                                <SymbolValue element={this.props.symbol_table[o.Force_Solid]} index={o.Force_Solid} />
                                <SymbolValue element={this.props.symbol_table[o.L_Solid]} index={o.L_Solid} />
                            </tr>
                            <tr>
                                <br />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <td></td>
                                <td></td>
                                <td>TBD</td>
                                <td></td>
                                <td></td>
                                <SymbolValue element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <td></td>
                                <td>TBD</td>
                                <td></td>
                                <td></td>
                                <SymbolValue element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h4>Force-Deflection Graph</h4>
                        <LineChart width={600}
                                   height={600}
                                   data={data}
                                   margin={{ top: 10, right: 50, bottom: 10, left: 50 }}>
                            <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                            <XAxis xAxisId={0} dataKey="deflection" type="number" domain={['dataMin', 'dataMax']} interval="preserveStartEnd" tickFormatter={formatXAxis}><Label value="Deflection" offset={30} position="left" /></XAxis>
                            <XAxis xAxisId={1} dataKey="length" type="number" reversed={true} domain={['dataMin', 'dataMax']} interval="preserveStartEnd" tickFormatter={formatXAxis}><Label value="Length" offset={30} position="left" /></XAxis>
                            <YAxis dataKey="force" type="number" ><Label value="Force" angle={-90} position="left" /></YAxis>
                            <Tooltip content={<CustomTooltip />}/>
                            <Line type="linear" dataKey="force" stroke="#2b3f79" strokeWidth="3"/>
                            <ReferenceLine x={data[1].deflection} stroke="red" label="Deflect_1" strokeDasharray="3 3" />
                            <ReferenceLine y={data[1].force} stroke="red" label="Force_1" strokeDasharray="3 3" />
                            <ReferenceLine x={data[2].deflection} stroke="red" label="Deflect_2" strokeDasharray="3 3" />
                            <ReferenceLine y={data[2].force} stroke="red" label="Force_2" strokeDasharray="3 3" />
                        </LineChart>
                    </Col>
                </Row>
                <Row className="justify-content-lg-left">
                    <span style={{color: '#d6361c'}}>Red Line: User specified Force - Deflection</span>
                </Row>
                <Row className="justify-content-lg-left">
                    <span style={{color: '#2b3f79'}}>Blue Line: Rate as determined by OD_Free, Wire_Dia, Coils_T, and Torsion_Modulus</span>
                </Row>
            </Container>
        );
    }
    
}
const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ForceDeflectionGraph);
