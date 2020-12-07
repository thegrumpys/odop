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
                    <h4>ODOP:Spring &nbsp; Compression Spring Calculator</h4>
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
                                <td style={{textAlign: 'center'}}><b>Length</b><br />{this.props.symbol_table[o.L_Free].units}</td>
                                <td style={{textAlign: 'center'}}><b>Deflect</b><br />{this.props.symbol_table[o.L_Free].units}</td>
                                <td style={{textAlign: 'center'}}><b>Force</b><br />{this.props.symbol_table[o.Force_1].units}</td>
                                <td style={{textAlign: 'center'}}><b>OD</b><br />{this.props.symbol_table[o.OD_Free].units}</td>
                                <td style={{textAlign: 'center'}}><b>ID</b><br />{this.props.symbol_table[o.ID_Free].units}</td>
                                <td style={{textAlign: 'center'}}><b>Stress</b><br />{this.props.symbol_table[o.Stress_1].units}</td>
                                <td style={{textAlign: 'center'}}><b>Static FS</b><br />{this.props.symbol_table[o.FS_2].units}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Free</b></td>
                                <SymbolValue element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                                <Value value={0.0} />
                                <Value value={0.0} />
                                <SymbolValue element={this.props.symbol_table[o.OD_Free]} index={o.OD_Free} />
                                <SymbolValue element={this.props.symbol_table[o.ID_Free]} index={o.ID_Free} />
                                <Value value={0.0} />
                                <td className="align-middle">
                                    <InputGroup>
                                        <Form.Control type="text" disabled={true} className="text-right text-muted" value={"infinite"} />
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td><b>1</b></td>
                                <SymbolValue element={this.props.symbol_table[o.L_1]} index={o.L_1} />
                                <SymbolValue element={this.props.symbol_table[o.Deflect_1]} index={o.Deflect_1} />
                                <SymbolValue element={this.props.symbol_table[o.Force_1]} index={o.Force_1} />
                                <Value value={this.od_1} />
                                <Value value={this.id_1} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_1]} index={o.Stress_1} />
                                <Value value={this.fs_1} />
                            </tr>
                            <tr>
                                <td><b>2</b></td>
                                <SymbolValue element={this.props.symbol_table[o.L_2]} index={o.L_2} />
                                <SymbolValue element={this.props.symbol_table[o.Deflect_2]} index={o.Deflect_2} />
                                <SymbolValue element={this.props.symbol_table[o.Force_2]} index={o.Force_2} />
                                <Value value={this.od_2} />
                                <Value value={this.id_2} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_2]} index={o.Stress_2} />
                                <SymbolValue element={this.props.symbol_table[o.FS_2]} index={o.FS_2} />
                            </tr>
                            <tr>
                                <td><b>Solid</b></td>
                                <SymbolValue element={this.props.symbol_table[o.L_Solid]} index={o.L_Solid} />
                                <Value value={(this.props.symbol_table[o.L_Free].value - this.props.symbol_table[o.L_Solid].value)} />
                                <SymbolValue element={this.props.symbol_table[o.Force_Solid]} index={o.Force_Solid} />
                                <Value value={this.od_solid} />
                                <Value value={(this.od_solid - 2.0 * this.props.symbol_table[o.Wire_Dia].value)} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_Solid]} index={o.Stress_Solid} />
                                <SymbolValue element={this.props.symbol_table[o.FS_Solid]} index={o.FS_Solid} />
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
                                <SymbolUnits element={this.props.symbol_table[o.L_Free]} index={o.L_Free} className="text-left" />
                                <td />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <SymbolUnits element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} className="text-left" />
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
                                <SymbolUnits element={this.props.symbol_table[o.L_Free]} index={o.L_Free} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <td>=</td>
                                <SymbolValue element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <td className="text-left">{this.cycle_life_u}</td>
                                <td />
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
                                <SymbolValue element={this.props.symbol_table[o.PC_Avail_Deflect]} index={o.PC_Avail_Deflect} />
                                <td>
                                    % of total available deflection.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    {this.pcadmsg}{this.pcadmsg !== undefined && <br />}
                    {this.errmsg1}{this.errmsg1 !== undefined && <br />}
                    {this.errmsg2}{this.errmsg2 !== undefined && <br />}
                    {this.errmsg3}
                    {this.errmsg0}
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
