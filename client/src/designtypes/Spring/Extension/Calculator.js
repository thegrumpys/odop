import React, { Component } from 'react';
import { Container, Row, Table, InputGroup, Form } from 'react-bootstrap';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import ResultTable from '../../../components/ResultTable';
import SymbolName from '../../../components/SymbolName';
import SymbolValue from '../../../components/SymbolValue';
import SymbolUnits from '../../../components/SymbolUnits';
import SymbolValueWireDia from '../SymbolValueWireDia';
import ValueName from '../../../components/ValueName';
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
                    <h4>ODOP:Spring &nbsp; Extension Spring Calculator</h4><br />
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
                                <SymbolValue element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} />
                                <SymbolUnits element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                                {this.props.symbol_table[o.Prop_Calc_Method].value === 1 ?
                                    <SymbolValue element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                                    :
                                    <Value value={this.matTypeValue} />
                                }
                                <SymbolUnits element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} className="text-left" />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <SymbolValueWireDia element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <SymbolUnits element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                                <SymbolValue element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                                <SymbolUnits element={this.props.symbol_table[o.End_Type]} index={o.End_Type} className="text-left" />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <SymbolValue element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <SymbolUnits element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                                <SymbolValue element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                                <SymbolUnits element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} className="text-left" />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <SymbolValue element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <SymbolUnits element={this.props.symbol_table[o.Rate]} index={o.Rate} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} />
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
                                <ValueName name={<><b>Length</b><br />{this.props.symbol_table[o.L_Free].units}</>} tooltip="Length at initial point, point 1, point 2 and maximum safe point" className="text-center" />
                                <ValueName name={<><b>Deflection</b><br />{this.props.symbol_table[o.L_Free].units}</>} tooltip="Deflection at initial point, point 1, point 2 and maximum safe point" className="text-center" />
                                <ValueName name={<><b>Force</b><br />{this.props.symbol_table[o.Force_1].units}</>} tooltip="Force at initial point, point 1, point 2 and maximum safe point" className="text-center" />
                                <ValueName name={<><b>OD</b><br />{this.props.symbol_table[o.OD_Free].units}</>} tooltip="Outside Diameter at initial point, point 1, point 2 and maximum safe point" className="text-center" />
                                <ValueName name={<><b>ID</b><br />{this.props.symbol_table[o.ID_Free].units}</>} tooltip="Inside Diameter at initial point, point 1, point 2 and maximum safe point" className="text-center" />
                                <ValueName name={<><b>Stress</b><br />{this.props.symbol_table[o.Stress_1].units}</>} tooltip="Stress at initial point, point 1, point 2 and maximum safe point" className="text-center" />
                                <ValueName name={<><b>Static FS</b><br />{this.props.symbol_table[o.FS_2].units}</>} tooltip="Static Factor of Safety at initial point, point 1, point 2 and maximum safe point" className="text-center" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <ValueName name={<b>Initial</b>} tooltip="Initial tension point" />
                                <SymbolValue element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                                <Value value={0.0} />
                                <SymbolValue element={this.props.symbol_table[o.Initial_Tension]} index={o.Initial_Tension} />
                                <SymbolValue element={this.props.symbol_table[o.OD_Free]} index={o.OD_Free} />
                                <SymbolValue element={this.props.symbol_table[o.ID_Free]} index={o.ID_Free} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_Initial]} index={o.Stress_Initial} />
                                <Value value={(this.props.symbol_table[o.Stress_Lim_Stat].value / this.props.symbol_table[o.Stress_Initial].value)} />
                            </tr>
                            <tr>
                                <ValueName name={<b>1</b>} tooltip="Tension point 1" />
                                <SymbolValue element={this.props.symbol_table[o.L_1]} index={o.L_1} />
                                <SymbolValue element={this.props.symbol_table[o.Deflect_1]} index={o.Deflect_1} />
                                <SymbolValue element={this.props.symbol_table[o.Force_1]} index={o.Force_1} />
                                <Value value={this.od_1} />
                                <Value value={this.id_1} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_1]} index={o.Stress_1} />
                                <Value value={this.fs_1} />
                            </tr>
                            <tr>
                                <ValueName name={<b>2</b>} tooltip="Tension point 2" />
                                <SymbolValue element={this.props.symbol_table[o.L_2]} index={o.L_2} />
                                <SymbolValue element={this.props.symbol_table[o.Deflect_2]} index={o.Deflect_2} />
                                <SymbolValue element={this.props.symbol_table[o.Force_2]} index={o.Force_2} />
                                <Value value={this.od_2} />
                                <Value value={this.id_2} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_2]} index={o.Stress_2} />
                                <SymbolValue element={this.props.symbol_table[o.FS_2]} index={o.FS_2} />
                            </tr>
                            <tr>
                                <ValueName name={<b>Max Safe</b>} tooltip="Maximum safe tension point" />
                                <Value value={(this.props.symbol_table[o.L_Free].value + this.safe_travel)} />
                                <Value value={this.safe_travel} />
                                <Value value={this.safe_load} />
                                <Value value={this.od_maxsafe} />
                                <Value value={this.id_maxsafe} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_Lim_Stat]} index={o.Stress_Lim_Stat} />
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
                                <ValueName name="Safe Load" tooltip="Safe Load is how far a spring can go safely without suffering damage"/>
                                <Value value={this.safe_load} />
                                <td className="text-left">{this.safe_load_u}</td>
                                <td> &nbsp; &nbsp; </td>
                                <ValueName name={this.len_lbl} tooltip={this.len_lbl + " is the length of wire to form the spring"}/>
                                <Value value={this.wire_len_t} />
                                <SymbolUnits element={this.props.symbol_table[o.L_Free]} index={o.L_Free} className="text-left" />
                                <td />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <SymbolValue element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <SymbolUnits element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Weight]} index={o.Weight} />
                                <SymbolValue element={this.props.symbol_table[o.Weight]} index={o.Weight} />
                                <SymbolUnits element={this.props.symbol_table[o.Weight]} index={o.Weight} className="text-left" />
                                <td />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <SymbolValue element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <td className="text-left">{this.cycle_life_u}</td>
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
                                    <SymbolValue element={this.props.symbol_table[o.PC_Safe_Deflect]} index={o.PC_Safe_Deflect} />
                                <td>
                                    % of total safe deflection.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    <pre>
                        <table className="report-table">
                            <tbody>
                                <tr>
                                    <td className="text-left" colSpan="3">|&lt;---</td>
                                    <SymbolName className="text-right" element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                                    <td>(w/ends)&nbsp;=</td>
                                    <SymbolValue element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                                    <td className="text-right" colSpan="3">----&gt;|</td>
                                </tr>
                                <tr>
                                    <td className="text-left">|&lt;---</td>
                                    <SymbolName className="text-center" element={this.props.symbol_table[o.L_End]} index={o.L_End}/>
                                    <td className="text-center">----&gt;|&lt;---</td>
                                    <SymbolName className="text-center" element={this.props.symbol_table[o.L_Body]} index={o.L_Body}/>
                                    <td className="text-center">----&gt;|&lt;---</td>
                                    <SymbolName className="text-center" element={this.props.symbol_table[o.End_Extension]} index={o.End_Extension}/>
                                    <td className="text-center">----&gt;|&lt;---</td>
                                    <SymbolName className="text-center" element={this.props.symbol_table[o.L_Extended_End]} index={o.L_Extended_End}/>
                                    <td className="text-right">----&gt;|</td>
                                </tr>
                                <tr>
                                    <td />
                                    <SymbolValue className="text-center" element={this.props.symbol_table[o.L_End]} index={o.L_End} />
                                    <td />
                                    <SymbolValue className="text-center" element={this.props.symbol_table[o.L_Body]} index={o.L_Body} />
                                    <td />
                                    <SymbolValue className="text-center" element={this.props.symbol_table[o.End_Extension]} index={o.End_Extension} />
                                    <td />
                                    <SymbolValue className="text-center" element={this.props.symbol_table[o.L_Extended_End]} index={o.L_Extended_End} />
                                    <td />
                                </tr>
                            </tbody>
                        </table>
                    </pre>
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
