import React, { Component } from 'react';
import { Container, Row, Table, InputGroup, Form } from 'react-bootstrap';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import ResultTable from '../../../components/ResultTable';
import SymbolName from '../../../components/SymbolName';
import SymbolValue from '../../../components/SymbolValue';
import SymbolUnits from '../../../components/SymbolUnits';
import Value from '../../../components/Value';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

export class Calculator extends ReportBase {

    constructor(props) {
      super(props);
//      console.log('In Calculator.constructor props=',props);
    }

    render() {
        super.render();
//        console.log('In Calculator.render this.props=',this.props);
        return (
            <Container>
                <Row>
                    <h4>ODOP:Spring &nbsp; Torsion Spring Calculator</h4><br />
                    <b>
                    {this.hits > 0 && this.errmsg}{this.hits > 0 && <br />}
                    {this.hits > 0 && this.startpntmsg}{this.hits > 0 && <br />}
                    </b>
                    {this.hits > 0 && this.NaNmsg}{this.hits > 0 && <br />}
                    {this.hits > 0 && <br />}
                </Row>
                <Row>
                    <ResultTable />
                </Row>
                <Row>
                    <table className="report-table">
                        <tbody>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} />
                                <SymbolUnits element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                                <SymbolUnits element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} className="text-left" />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <SymbolUnits element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                                <SymbolUnits element={this.props.symbol_table[o.End_Type]} index={o.End_Type} className="text-left" />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <SymbolUnits element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                                <SymbolUnits element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} className="text-left" />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <SymbolUnits element={this.props.symbol_table[o.Rate]} index={o.Rate} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} />
                                <SymbolUnits element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} className="text-left" />
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th></th>
                                <td style={{textAlign: 'center'}}><b>Length</b><br />{this.props.symbol_table[o.L_1].units}</td>
                                <td style={{textAlign: 'center'}}><b>Deflect</b><br />{this.props.symbol_table[o.Deflect_1].units}</td>
                                <td style={{textAlign: 'center'}}><b>Moment</b><br />{this.props.symbol_table[o.M_1].units}</td>
                                <td style={{textAlign: 'center'}}><b>OD</b><br />{this.props.symbol_table[o.OD_Free].units}</td>
                                <td style={{textAlign: 'center'}}><b>ID</b><br />{this.props.symbol_table[o.ID_Free].units}</td>
                                <td style={{textAlign: 'center'}}><b>Stress</b><br />{this.props.symbol_table[o.Stress_1].units}</td>
                                <td style={{textAlign: 'center'}}><b>Static FS</b><br />{this.props.symbol_table[o.FS_2].units}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Free</b></td>
                                <SymbolValue element={this.props.symbol_table[o.L_Body]} index={o.L_Body} />
                                <Value value={0.0} />
                                <Value value={0.0} />
                                <SymbolValue element={this.props.symbol_table[o.OD_Free]} index={o.OD_Free} />
                                <SymbolValue element={this.props.symbol_table[o.ID_Free]} index={o.ID_Free} />
                                <Value value={0.0} />
                                <td>infinite</td>
                            </tr>
                            <tr>
                                <td><b>1</b></td>
                                <SymbolValue element={this.props.symbol_table[o.L_1]} index={o.L_1} />
                                <SymbolValue element={this.props.symbol_table[o.Deflect_1]} index={o.Deflect_1} />
                                <SymbolValue element={this.props.symbol_table[o.M_1]} index={o.M_1} />
                                <Value value={this.od_1} />
                                <Value value={this.id_1} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_1]} index={o.Stress_1} />
                                <Value value={this.fs_1} />
                            </tr>
                            <tr>
                                <td><b>2</b></td>
                                <SymbolValue element={this.props.symbol_table[o.L_2]} index={o.L_2} />
                                <SymbolValue element={this.props.symbol_table[o.Deflect_2]} index={o.Deflect_2} />
                                <SymbolValue element={this.props.symbol_table[o.M_2]} index={o.M_2} />
                                <Value value={this.od_2} />
                                <Value value={this.id_2} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_2]} index={o.Stress_2} />
                                <SymbolValue element={this.props.symbol_table[o.FS_2]} index={o.FS_2} />
                            </tr>
                            <tr>
                                <td><b>Max Safe</b></td>
                                <Value value={this.l_max} />
                                <Value value={this.def_max} />
                                <Value value={this.safe_load} />
                                <Value value={this.od_max} />
                                <Value value={this.od_max - (2.0 * this.props.symbol_table[o.Wire_Dia].value)} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_Lim_Bnd_Stat]} index={o.Stress_Lim_Bnd_Stat} />
                                <Value value={1.0} />
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    <table className="report-table">
                        <tbody>
                            <tr>
                                <td>Safe Load</td>
                                <td>=</td>
                                <Value value={this.safe_load} />
                                <td className="text-left">{this.safe_load_u}</td>
                                <td> &nbsp; &nbsp; </td>
                                <td>{this.len_lbl}</td>
                                <td>=</td>
                                <Value value={this.wire_len_t} />
                                <SymbolUnits element={this.props.symbol_table[o.L_Body]} index={o.L_Body} className="text-left" />
                                <td />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Stroke]} index={o.Stroke} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.Stroke]} index={o.Stroke} />
                                <SymbolUnits element={this.props.symbol_table[o.Stroke]} index={o.Stroke} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Weight]} index={o.Weight} />
                                <td>=</td>
                                <Value value={this.wgt1000} />
                                <SymbolUnits element={this.props.symbol_table[o.Weight]} index={o.Weight} className="text-left" />
                                <td className="text-left">{this.wgt1000_u}</td>
                            </tr>
                            <tr>
                                <td>Pitch</td>
                                <td>=</td>
                                <Value value={this.pitch} />
                                <SymbolUnits element={this.props.symbol_table[o.L_Body]} index={o.L_Body} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.End_Angle_Free]} index={o.End_Angle_Free} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.End_Angle_Free]} index={o.End_Angle_Free} />
                                <SymbolUnits element={this.props.symbol_table[o.End_Angle_Free]} index={o.End_Angle_Free} className="text-left" />
                                <td />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Arm_2]} index={o.Arm_2} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.Arm_2]} index={o.Arm_2} />
                                <SymbolUnits element={this.props.symbol_table[o.Arm_2]} index={o.Arm_2} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <SymbolUnits element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} className="text-left" />
                                <td>(est.)</td>
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Force_Arm_2]} index={o.Force_Arm_2} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.Force_Arm_2]} index={o.Force_Arm_2} />
                                <SymbolUnits element={this.props.symbol_table[o.Force_Arm_2]} index={o.Force_Arm_2} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <td className="text-left" colSpan="5">({this.props.symbol_table[o.Cycle_Life].name} applies to body coils only.)</td>
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    <table className="report-table">
                        <tbody>
                            <tr>
                                <td>
                                    Deflection at load point 2 is
                                </td>
                                    <Value value={100.0 * this.props.symbol_table[o.Deflect_2].value / this.def_max} />
                                <td>
                                    % of total safe deflection.
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
