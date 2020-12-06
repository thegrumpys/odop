import React, { Component } from 'react';
import { Row, Table, InputGroup, Form } from 'react-bootstrap';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import ResultTable from '../../../components/ResultTable';
import Name from '../../../components/Name';
import Value from '../../../components/Value';
import Units from '../../../components/Units';
import Computed_Value from '../../../components/Computed_Value';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

export class Calculator extends ReportBase {

    constructor(props) {
      super(props);
//      console.log('In Calculator.constructor props=',props);
    }

    render() {
//        console.log('In Calculator.render this.props=',this.props);

        return (
            <React.Fragment>
                <h4>ODOP:Spring &nbsp; Compression Spring Calculator</h4>
                <b>
                {this.hits > 0 && this.errmsg}{this.hits > 0 && <br />}
                {this.hits > 0 && this.startpntmsg}{this.hits > 0 && <br />}
                </b>
                {this.hits > 0 && this.NaNmsg}{this.hits > 0 && <br />}
                {this.hits > 0 && <br />}
                <Row>
                    <ResultTable />
                </Row>
                <Row>
                    <table>
                        <tbody>
                            <tr>
                                <Name element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} />
                                <Units element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} style={{textAlign: 'left'}} />
                                <td> &nbsp; &nbsp; </td>
                                <Name element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                                <Units element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} style={{textAlign: 'left'}} />
                            </tr>
                            <tr>
                                <Name element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <Units element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} style={{textAlign: 'left'}} />
                                <td> &nbsp; &nbsp; </td>
                                <Name element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                                <Units element={this.props.symbol_table[o.End_Type]} index={o.End_Type} style={{textAlign: 'left'}} />
                            </tr>
                            <tr>
                                <Name element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <Units element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} style={{textAlign: 'left'}} />
                                <td> &nbsp; &nbsp; </td>
                                <Name element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                                <Units element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} style={{textAlign: 'left'}} />
                            </tr>
                            <tr>
                                <Name element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <Units element={this.props.symbol_table[o.Rate]} index={o.Rate} style={{textAlign: 'left'}} />
                                <td> &nbsp; &nbsp; </td>
                                <Name element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} />
                                <Units element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} style={{textAlign: 'left'}} />
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    <table>
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
                                <Value element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                                <Computed_Value value={0.0} />
                                <Computed_Value value={0.0} />
                                <Value element={this.props.symbol_table[o.OD_Free]} index={o.OD_Free} />
                                <Value element={this.props.symbol_table[o.ID_Free]} index={o.ID_Free} />
                                <Computed_Value value={0.0} />
                                <td className="align-middle">
                                    <InputGroup>
                                        <Form.Control type="text" disabled={true} className={"text-right text-muted"} value={"infinite"} />
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td><b>1</b></td>
                                <Value element={this.props.symbol_table[o.L_1]} index={o.L_1} />
                                <Value element={this.props.symbol_table[o.Deflect_1]} index={o.Deflect_1} />
                                <Value element={this.props.symbol_table[o.Force_1]} index={o.Force_1} />
                                <Computed_Value value={this.od_1} />
                                <Computed_Value value={this.id_1} />
                                <Value element={this.props.symbol_table[o.Stress_1]} index={o.Stress_1} />
                                <Computed_Value value={this.fs_1} />
                            </tr>
                            <tr>
                                <td><b>2</b></td>
                                <Value element={this.props.symbol_table[o.L_2]} index={o.L_2} />
                                <Value element={this.props.symbol_table[o.Deflect_2]} index={o.Deflect_2} />
                                <Value element={this.props.symbol_table[o.Force_2]} index={o.Force_2} />
                                <Computed_Value value={this.od_2} />
                                <Computed_Value value={this.id_2} />
                                <Value element={this.props.symbol_table[o.Stress_2]} index={o.Stress_2} />
                                <Value element={this.props.symbol_table[o.FS_2]} index={o.FS_2} />
                            </tr>
                            <tr>
                                <td><b>Solid</b></td>
                                <Value element={this.props.symbol_table[o.L_Solid]} index={o.L_Solid} />
                                <Computed_Value value={(this.props.symbol_table[o.L_Free].value - this.props.symbol_table[o.L_Solid].value)} />
                                <Value element={this.props.symbol_table[o.Force_Solid]} index={o.Force_Solid} />
                                <Computed_Value value={this.od_solid} />
                                <Computed_Value value={(this.od_solid - 2.0 * this.props.symbol_table[o.Wire_Dia].value)} />
                                <Value element={this.props.symbol_table[o.Stress_Solid]} index={o.Stress_Solid} />
                                <Value element={this.props.symbol_table[o.FS_Solid]} index={o.FS_Solid} />
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    <table>
                        <tbody>
                            <tr>
                                <td>Safe Load</td>
                                <td>=</td>
                                <Computed_Value value={this.safe_load} />
                                <td style={{textAlign: 'left'}}>{this.safe_load_u}</td>
                                <td> &nbsp; &nbsp; </td>
                                <td>{this.len_lbl}</td>
                                <td>=</td>
                                <Computed_Value value={this.wire_len_t} />
                                <Units element={this.props.symbol_table[o.L_Free]} index={o.L_Free} style={{textAlign: 'left'}} />
                                <td />
                            </tr>
                            <tr>
                                <Name element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <Units element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} style={{textAlign: 'left'}} />
                                <td> &nbsp; &nbsp; </td>
                                <Name element={this.props.symbol_table[o.Weight]} index={o.Weight} />
                                <td>=</td>
                                <Computed_Value value={this.wgt1000} />
                                <Units element={this.props.symbol_table[o.Weight]} index={o.Weight} style={{textAlign: 'left'}} />
                                <td style={{textAlign: 'left'}}>{this.wgt1000_u}</td>
                            </tr>
                            <tr>
                                <td>Pitch</td>
                                <td>=</td>
                                <Computed_Value value={this.pitch} />
                                <Units element={this.props.symbol_table[o.L_Free]} index={o.L_Free} style={{textAlign: 'left'}} />
                                <td> &nbsp; &nbsp; </td>
                                <Name element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <td style={{textAlign: 'left'}}>{this.cycle_life_u}</td>
                                <td />
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
                                    Deflection at load point 2 is
                                </td>
                                <Value element={this.props.symbol_table[o.PC_Avail_Deflect]} index={o.PC_Avail_Deflect} />
                                <td>
                                    % of total available deflection.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                {this.pcadmsg}{this.pcadmsg !== undefined && <br />}
                {this.errmsg1}{this.errmsg1 !== undefined && <br />}
                {this.errmsg2}{this.errmsg2 !== undefined && <br />}
                {this.errmsg3}
                {this.errmsg0}
           </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Calculator);
