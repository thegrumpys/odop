import React, { Component } from 'react';
import { Row, Table } from 'react-bootstrap';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import Name from '../../../components/Name';
import Value from '../../../components/Value';
import Units from '../../../components/Units';
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
                <Row>
                    <h4>ODOP:Spring &nbsp; Compression Spring Calculator</h4>
                    <br />
                    <b>
                    {this.hits > 0 && this.errmsg}{this.hits > 0 && <br />}
                    {this.hits > 0 && startpntmsg}{this.hits > 0 && <br />}
                    </b>
                    {this.hits > 0 && NaNmsg}{this.hits > 0 && <br />}
                    {this.hits > 0 && <br />}
                    <table>
                        <tbody>
                            <tr>
                                <Name element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} />
                                <Units element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} />
                                <td> &nbsp; &nbsp; </td>
                                <Name element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                                <Units element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                            </tr>
                            <tr>
                                <Name element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <Units element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <td> &nbsp; &nbsp; </td>
                                <Name element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                                <Units element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                            </tr>
                            <tr>
                                <Name element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <Units element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <td> &nbsp; &nbsp; </td>
                                <Name element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                                <Units element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                            </tr>
                            <tr>
                                <Name element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <Units element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <td> &nbsp; &nbsp; </td>
                                <Name element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} />
                                <Units element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} />
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
                                <td> &nbsp; &nbsp; </td>
                                <th style={{textAlign: 'center'}}>Length</th>
                                <td> &nbsp; &nbsp; </td>
                                <th style={{textAlign: 'center'}}>Deflect</th>
                                <td> &nbsp; &nbsp; </td>
                                <th style={{textAlign: 'center'}}>Force</th>
                                <td> &nbsp; &nbsp; </td>
                                <th style={{textAlign: 'center'}}>OD</th>
                                <td> &nbsp; &nbsp; </td>
                                <th style={{textAlign: 'center'}}>ID</th>
                                <td> &nbsp; &nbsp; </td>
                                <th style={{textAlign: 'center'}}>Stress</th>
                                <td> &nbsp; &nbsp; </td>
                                <th style={{textAlign: 'center'}}>Static FS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Free</b></td>
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{(0.0).toFixed(4)}</td>
                                <td> &nbsp; &nbsp; </td>
                                <td>{(0.0).toFixed(2)}</td>
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.OD_Free]} index={o.OD_Free} />
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.ID_Free]} index={o.ID_Free} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{(0.0).toFixed(0)}</td>
                                <td> &nbsp; &nbsp; </td>
                                <td>infinite</td>
                            </tr>
                            <tr>
                                <td><b>1</b></td>
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.L_1]} index={o.L_1} />
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.Deflect_1]} index={o.Deflect_1} />
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.Force_1]} index={o.Force_1} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{this.od_1.toFixed(4)}</td>
                                <td> &nbsp; &nbsp; </td>
                                <td>{this.id_1.toFixed(4)}</td>
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.Stress_1]} index={o.Stress_1} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{this.fs_1.toFixed(3)}</td>
                            </tr>
                            <tr>
                                <td><b>2</b></td>
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.L_2]} index={o.L_2} />
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.Deflect_2]} index={o.Deflect_2} />
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.Force_2]} index={o.Force_2} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{this.od_2.toFixed(4)}</td>
                                <td> &nbsp; &nbsp; </td>
                                <td>{this.id_2.toFixed(4)}</td>
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.Stress_2]} index={o.Stress_2} />
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.FS_2]} index={o.FS_2} />
                            </tr>
                            <tr>
                                <td><b>Solid</b></td>
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.L_Solid]} index={o.L_Solid} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{(this.props.symbol_table[o.L_Free].value - this.props.symbol_table[o.L_Solid].value).toFixed(4)}</td>
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.Force_Solid]} index={o.Force_Solid} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{this.od_solid.toFixed(4)}</td>
                                <td> &nbsp; &nbsp; </td>
                                <td>{(this.od_solid - 2.0 * this.props.symbol_table[o.Wire_Dia].value).toFixed(4)}</td>
                                <td> &nbsp; &nbsp; </td>
                                <Value element={this.props.symbol_table[o.Stress_Solid]} index={o.Stress_Solid} />
                                <td> &nbsp; &nbsp; </td>
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
                                <td>{this.safe_load.toFixed(3)}</td>
                                <td>{this.safe_load_u}</td>
                                <td> &nbsp; &nbsp; </td>
                                <td>{this.len_lbl}</td>
                                <td>=</td>
                                <td>{this.wire_len_t.toFixed(3)}</td>
                                <Units element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                                <td />
                            </tr>
                            <tr>
                                <Name element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <Units element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <td> &nbsp; &nbsp; </td>
                                <Name element={this.props.symbol_table[o.Weight]} index={o.Weight} />
                                <td>=</td>
                                <td>{this.wgt1000.toFixed(3)}</td>
                                <Units element={this.props.symbol_table[o.Weight]} index={o.Weight} />
                                <td>{this.wgt1000_u}</td>
                            </tr>
                            <tr>
                                <td>Pitch</td>
                                <td>=</td>
                                <td>{this.pitch.toFixed(3)}</td>
                                <Units element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                                <td> &nbsp; &nbsp; </td>
                                <Name element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <td>=</td>
                                <Value element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <td>{this.cycle_life_u}</td>
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
                {this.errmsg3}{this.errmsg0}
           </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Calculator);
