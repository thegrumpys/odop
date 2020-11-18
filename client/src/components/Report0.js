import React, { Component } from 'react';
import { Row, Table } from 'react-bootstrap';
import NameValueUnitsRowIndependentVariable from './NameValueUnitsRowIndependentVariable';
import Report0Name from './Report0Name';
import Report0Value from './Report0Value';
import Report0Units from './Report0Units';
import * as o from '../designtypes/Spring/Compression/symbol_table_offsets';
import { connect } from 'react-redux';

export class Report0 extends Component {

    constructor(props) {
//      console.log('In Report0.constructor props=',props);
      super(props);
    }

    render() {
//        console.log('In Report0.render this.props=',this.props);
        return (
            <React.Fragment>
                <Row>
                    <h4>ODOP:Spring   Compression Spring Report</h4><br />
                    <table>
                        <tbody>
                            <tr>
                                <Report0Name element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} />
                                <td>=</td>
                                <Report0Value element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} />
                                <Report0Units element={this.props.symbol_table[o.Spring_Type]} index={o.Spring_Type} />
                                <td> &nbsp; &nbsp; </td>
                                <Report0Name element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                                <td>=</td>
                                <Report0Value element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                                <Report0Units element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                            </tr>
                            <tr>
                                <Report0Name element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <td>=</td>
                                <Report0Value element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <Report0Units element={this.props.symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
                                <td> &nbsp; &nbsp; </td>
                                <Report0Name element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                                <td>=</td>
                                <Report0Value element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                                <Report0Units element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                            </tr>
                            <tr>
                                <Report0Name element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <td>=</td>
                                <Report0Value element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <Report0Units element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <td> &nbsp; &nbsp; </td>
                                <Report0Name element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                                <td>=</td>
                                <Report0Value element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                                <Report0Units element={this.props.symbol_table[o.Coils_T]} index={o.Coils_T} />
                            </tr>
                            <tr>
                                <Report0Name element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <td>=</td>
                                <Report0Value element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <Report0Units element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <td> &nbsp; &nbsp; </td>
                                <Report0Name element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} />
                                <td>=</td>
                                <Report0Value element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} />
                                <Report0Units element={this.props.symbol_table[o.Coils_A]} index={o.Coils_A} />
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <hr />
                <Row>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <td> &nbsp; &nbsp; </td>
                                <th>Length</th>
                                <td> &nbsp; &nbsp; </td>
                                <th>Deflect</th>
                                <td> &nbsp; &nbsp; </td>
                                <th>Force</th>
                                <td> &nbsp; &nbsp; </td>
                                <th>&nbsp; OD &nbsp;</th>
                                <td> &nbsp; &nbsp; </td>
                                <th>&nbsp; ID &nbsp; </th>
                                <td> &nbsp; &nbsp; </td>
                                <th>&nbsp;Stress</th>
                                <td> &nbsp; &nbsp; </td>
                                <th>Static FS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Free</b></td>
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{(0.0).toFixed(4)}</td>
                                <td> &nbsp; &nbsp; </td>
                                <td>{(0.0).toFixed(2)}</td>
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.OD_Free]} index={o.OD_Free} />
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.ID_Free]} index={o.ID_Free} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{(0.0).toFixed(0)}</td>
                                <td> &nbsp; &nbsp; </td>
                                <td>infinite</td>
                            </tr>
                            <tr>
                                <td><b>1</b></td>
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.L_1]} index={o.L_1} />
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.Deflect_1]} index={o.Deflect_1} />
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.Force_1]} index={o.Force_1} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{"@@@"/*od_1.toFixed(4)*/}</td>
                                <td> &nbsp; &nbsp; </td>
                                <td>{"@@@"/*id_1.toFixed(4)*/}</td>
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.Stress_1]} index={o.Stress_1} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{"@@@"/*fs_1.toFixed(3)*/}</td>
                            </tr>
                            <tr>
                                <td><b>2</b></td>
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.L_2]} index={o.L_2} />
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.Deflect_2]} index={o.Deflect_2} />
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.Force_2]} index={o.Force_2} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{"@@@"/*od_2.toFixed(4)*/}</td>
                                <td> &nbsp; &nbsp; </td>
                                <td>{"@@@"/*id_2.toFixed(4)*/}</td>
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.Stress_2]} index={o.Stress_2} />
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.FS_2]} index={o.FS_2} />
                            </tr>
                            <tr>
                                <td><b>Solid</b></td>
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.L_Solid]} index={o.L_Solid} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{"@@@"/*(st[o.L_Free].value - st[o.L_Solid].value).toFixed(4)*/}</td>
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.Force_Solid]} index={o.Force_Solid} />
                                <td> &nbsp; &nbsp; </td>
                                <td>{"@@@"/*od_solid.toFixed(4)*/}</td>
                                <td> &nbsp; &nbsp; </td>
                                <td>{"@@@"/*(od_solid - 2.0 * st[o.Wire_Dia].value).toFixed(4)*/}</td>
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.Stress_Solid]} index={o.Stress_Solid} />
                                <td> &nbsp; &nbsp; </td>
                                <Report0Value element={this.props.symbol_table[o.FS_Solid]} index={o.FS_Solid} />
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <hr />
                <Row>
                    <table>
                        <tbody>
                            <tr>
                                <td>Safe Load</td>
                                <td>=</td>
                                <td>{"@@@"/*safe_load.toFixed(3)*/}</td>
                                <td>{"@@@"/*safe_load_u*/}</td>
                                <td/>
                                <td> &nbsp; &nbsp; </td>
                                <td>{"@@@"/*len_lbl*/}</td>
                                <td>=</td>
                                <td>{"@@@"/*wire_len_t.toFixed(3)*/}</td>
                                <Report0Value element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                            </tr>
                            <tr>
                                <Report0Name element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <td>=</td>
                                <Report0Value element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <Report0Units element={this.props.symbol_table[o.L_Stroke]} index={o.L_Stroke} />
                                <td/>
                                <td> &nbsp; &nbsp; </td>
                                <Report0Name element={this.props.symbol_table[o.Weight]} index={o.Weight} />
                                <td>=</td>
                                <td>{"@@@"/*wgt1000.toFixed(3)*/}</td>
                                <Report0Units element={this.props.symbol_table[o.Weight]} index={o.Weight} />
                                <td>{"@@@"/*wgt1000_u*/}</td>
                            </tr>
                            <tr>
                                <td>Pitch</td>
                                <td>=</td>
                                <td>{"@@@"/*pitch.toFixed(3)*/}</td>
                                <Report0Units element={this.props.symbol_table[o.L_Free]} index={o.L_Free} />
                                <td/>
                                <td> &nbsp; &nbsp; </td>
                                <Report0Name element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <td>=</td>
                                <Report0Value element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <td>{"@@@"/*cycle_life_u*/}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    Deflection at load point 2 is <Report0Value element={this.props.symbol_table[o.PC_Avail_Deflect]} index={o.PC_Avail_Deflect} />% of total available deflection.<br />
                </Row>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls
});

export default connect(mapStateToProps)(Report0);
