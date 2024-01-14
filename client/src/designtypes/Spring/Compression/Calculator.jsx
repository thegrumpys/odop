import React from 'react';
import { Container, Row, InputGroup, Form } from 'react-bootstrap';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import SymbolName from '../../../components/SymbolName';
import SymbolValue from '../../../components/SymbolValue';
import SymbolUnits from '../../../components/SymbolUnits';
import SymbolValueWireDia from '../SymbolValueWireDia';
import ValueName from '../../../components/ValueName';
import Value from '../../../components/Value';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

export class Calculator extends ReportBase {

    render() {
        super.render();
//        console.log('In Calculator.render this=',this);
        return (
            <Container>
                <Row>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <ValueName name={<><b>Length</b><br />{this.props.symbol_table[o.L_Free].units}</>} tooltip="Length at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Deflection</b><br />{this.props.symbol_table[o.L_Free].units}</>} tooltip="Deflection at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Force</b><br />{this.props.symbol_table[o.Force_1].units}</>} tooltip="Force at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>OD</b><br />{this.props.symbol_table[o.OD_Free].units}</>} tooltip="Outside Diameter at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>ID</b><br />{this.props.symbol_table[o.ID_Free].units}</>} tooltip="Inside Diameter at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Stress</b><br />{this.props.symbol_table[o.Stress_1].units}</>} tooltip="Stress at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Static FS</b><br />{this.props.symbol_table[o.FS_2].units}</>} tooltip="Static Factor of Safety at free point, point 1, point 2 and solid point" className="text-center" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <ValueName name={<b>Free</b>} tooltip="Free or no load point" />
                                <SymbolValue element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                                <Value id="Deflection_Free" value={0.0} />
                                <Value id="Force_Free" value={0.0} />
                                <SymbolValue element={this.props.symbol_table[o.OD_Free]} index={o.OD_Free} />
                                <SymbolValue element={this.props.symbol_table[o.ID_Free]} index={o.ID_Free} />
                                <Value id="Stress_Free" value={0.0} />
                                <td className="align-middle">
                                    <InputGroup>
                                        <Form.Control type="text" disabled={true} className="text-right text-muted" value={"Infinity"} />
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <ValueName name={<b>Solid</b>} tooltip="Fully compressed" />
                                <SymbolValue element={this.props.symbol_table[o.L_Solid]} index={o.L_Solid} />
                                <Value id="Deflection_Solid" value={(this.props.symbol_table[o.L_Free].value - this.props.symbol_table[o.L_Solid].value)} />
                                <SymbolValue element={this.props.symbol_table[o.Force_Solid]} index={o.Force_Solid} />
                                <Value id="OD_Solid" value={this.od_solid} />
                                <Value id="ID_Solid" value={(this.od_solid - 2.0 * this.props.symbol_table[o.Wire_Dia].value)} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_Solid]} index={o.Stress_Solid} />
                                <SymbolValue element={this.props.symbol_table[o.FS_Solid]} index={o.FS_Solid} />
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    <table>
                        <tbody>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <SymbolValue element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <SymbolUnits element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <SymbolValueWireDia element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <SymbolUnits element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} className="text-left" />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                                <SymbolValue element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                                <SymbolUnits element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <SymbolValue element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <SymbolUnits element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} className="text-left" />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} />
                                <SymbolValue element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} />
                                <SymbolUnits element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <SymbolValue element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <SymbolUnits element={this.props.symbol_table[o.Rate]} index={o.Rate} className="text-left" />
                            </tr>
                            <tr>
                                <ValueName name="Safe Load" tooltip="Greatest static load that can be supported without exceeding maximum allowable stress (Stress_Lim_Stat)"/>
                                <Value id="Safe_Load" value={this.safe_load} />
                                <td className="text-left">{this.safe_load_u}</td>
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Weight]} index={o.Weight} />
                                <SymbolValue element={this.props.symbol_table[o.Weight]} index={o.Weight} />
                                <SymbolUnits element={this.props.symbol_table[o.Weight]} index={o.Weight} className="text-left" />
                            </tr>
                            <tr>
                                <ValueName name="Pitch" tooltip="Pitch is the distance between two adjacent coils"/>
                                <Value id="Pitch" value={this.pitch} />
                                <SymbolUnits element={this.props.symbol_table[o.L_Free]} index={o.L_Free} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <SymbolValue element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <td className="text-left">{this.cycle_life_u}</td>
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    Deflection at point 2 (maximum operating load) is
                                </td>
                                <SymbolValue element={this.props.symbol_table[o.PC_Avail_Deflect]} index={o.PC_Avail_Deflect} />
                                <td>
                                    % of total available deflection.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
           </Container>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Calculator);
