import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Label, ReferenceLine } from 'recharts';
import SymbolName from '../../../components/SymbolName';
import SymbolValue from '../../../components/SymbolValue';
import SymbolUnits from '../../../components/SymbolUnits';
import ValueName from '../../../components/ValueName';
import Value from '../../../components/Value';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

function CustomTooltip({ payload, label, active }) {
//    console.log('In Calculator.CustomTooltip payload=',payload,'label=',label,'active=',active);
    if (active) {
        return (
            <div>
                <b>{`${payload[0].payload.title}`}</b><br/>
                {`Force: ${payload[0].payload.force}`}<br/>
                {`Deflection: ${payload[0].payload.deflection}`}<br/>
                {`Length: ${payload[0].payload.length}`}
            </div>
        );
    }
    return null;
}

export class Calculator extends ReportBase {

    render() {
        super.render();
//        console.log('In Calculator.render this=',this);
        var data = [];
        data.push({ title: 'Free position', force: 0.0, deflection: 0.0, length: this.props.symbol_table[o.L_Free].value });
        data.push({ title: 'Position 1', force: this.props.symbol_table[o.Force_1].value, deflection: this.props.symbol_table[o.Deflect_1].value, length: this.props.symbol_table[o.L_1].value });
        data.push({ title: 'Position 2', force: this.props.symbol_table[o.Force_2].value, deflection: this.props.symbol_table[o.Deflect_2].value, length: this.props.symbol_table[o.L_2].value });
        return (
            <Container>
                <Row>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th></th>
                                <ValueName name={<><b>Length</b><br />{this.props.symbol_table[o.L_Free].units}</>} tooltip="Length at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Deflection</b><br />{this.props.symbol_table[o.L_Free].units}</>} tooltip="Deflection at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Force</b><br />{this.props.symbol_table[o.Force_1].units}</>} tooltip="Force at free point, point 1, point 2 and solid point" className="text-center" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <ValueName name={<b>Free</b>} tooltip="Free or no load point" />
                                <SymbolValue element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                                <Value id="Deflection_Free" value={0.0} />
                                <Value id="Force_Free" value={0.0} />
                            </tr>
                            <tr>
                                <ValueName name={<b>1</b>} tooltip="Point 1 (minimum operating load)" />
                                <SymbolValue element={this.props.symbol_table[o.L_1]} index={o.L_1} />
                                <SymbolValue element={this.props.symbol_table[o.Deflect_1]} index={o.Deflect_1} />
                                <SymbolValue element={this.props.symbol_table[o.Force_1]} index={o.Force_1} />
                            </tr>
                            <tr>
                                <ValueName name={<b>2</b>} tooltip="Point 2 (maximum operating load)" />
                                <SymbolValue element={this.props.symbol_table[o.L_2]} index={o.L_2} />
                                <SymbolValue element={this.props.symbol_table[o.Deflect_2]} index={o.Deflect_2} />
                                <SymbolValue element={this.props.symbol_table[o.Force_2]} index={o.Force_2} />
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    <table className="report-table">
                        <tbody>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <SymbolValue element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <SymbolUnits element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <SymbolValue element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <SymbolUnits element={this.props.symbol_table[o.Rate]} index={o.Rate} className="text-left" />
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row className="justify-content-lg-center">
                    <Col lg="6"><h2>Force-Deflection Analysis</h2></Col>
                </Row>
                <Row>
                    <LineChart width={912}
                               height={912}
                               data={data}
                               margin={{ top: 50, right: 50, bottom: 50, left: 50 }}>
                        <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                        <XAxis xAxisId={0} dataKey="deflection" type="number"><Label value="Deflection" offset={10} position="left" /></XAxis>
                        <XAxis xAxisId={1} dataKey="length" type="number" reversed="true"><Label value="Length" offset={10} position="left" /></XAxis>
                        <YAxis dataKey="force" type="number" domain={[0, dataMax => (Math.round(dataMax))]}><Label value="Force" angle={-90} position="left" /></YAxis>
                        <Tooltip content={<CustomTooltip />}/>
                        <Line type="linear" dataKey="force" stroke="#2b3f79" strokeWidth="3"/>
                        <ReferenceLine x={data[1].deflection} stroke="red" label="Deflect_1" strokeDasharray="3 3" />
                        <ReferenceLine y={data[1].force} stroke="red" label="Force_1" strokeDasharray="3 3" />
                        <ReferenceLine x={data[2].deflection} stroke="red" label="Deflect_2" strokeDasharray="3 3" />
                        <ReferenceLine y={data[2].force} stroke="red" label="Force_2" strokeDasharray="3 3" />
                    </LineChart>
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
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Calculator);
