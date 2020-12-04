import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

class Report2 extends ReportBase {

    constructor(props) {
        super(props);
//      console.log('In Report2.constructor this=',this,'props=',props);
    }

    render() {
//        console.log('In Report2.render this.props=',this.props);

        return (
            <React.Fragment>
                <h4>ODOP:Spring &nbsp; Extension Spring Report</h4>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Type].name}</td>
                            <td>=</td>
                            <td className="" colSpan="2">{this.props.symbol_table[o.Spring_Type].value}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Material_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.matTypeValue}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Wire_Dia].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Wire_Dia].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Wire_Dia].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Tensile].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Tensile].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Tensile].units}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Index].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Spring_Index].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Spring_Index].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>Stress Ratio</td>
                            <td>=</td>
                            <td>{(this.props.symbol_table[o.Stress_1].value / this.props.symbol_table[o.Stress_2].value).toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Spring_Index].units}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="6"></th>
                            <th colSpan="5" style={{textAlign: "center"}}>-- kw1 = {this.kw1.toFixed(3)} --</th>
                            <th colSpan="1"></th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>&nbsp; Length </th>
                            <th>&nbsp;Deflect</th>
                            <th>&nbsp;Force</th>
                            <td> &nbsp; &nbsp; </td>
                            <th> &nbsp; </th>
                            <th> &nbsp; </th>
                            <td> &nbsp; &nbsp; </td>
                            <th>&nbsp;Stress</th>
                            <th>&nbsp; %TS </th>
                            <td> &nbsp; &nbsp; </td>
                            <th>Static FS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Initial</b></td>
                            <td>{this.props.symbol_table[o.L_Free].value.toFixed(3)}</td>
                            <td>{(0.0).toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Initial_Tension].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_Initial].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_Initial].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(this.props.symbol_table[o.Stress_Lim_Stat].value / this.props.symbol_table[o.Stress_Initial].value).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_1].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.fs_1.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_2].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.FS_2].value.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>MaxSafe</b></td>
                            <td>{(this.props.symbol_table[o.L_Free].value + this.safe_travel).toFixed(3)}</td>
                            <td>{this.safe_travel.toFixed(4)}</td>
                            <td>{this.safe_load.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Stat].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_Lim_Stat].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(1.0).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.FS_CycleLife].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.FS_CycleLife].value.toFixed(3)}</td>
                            <td className="text-left">&nbsp;{this.props.symbol_table[o.FS_CycleLife].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Stress_Init_Lo].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Stress_Init_Lo].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_Init_Lo].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
                            <td className="text-left">&nbsp;{this.cycle_life_u}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Stress_Init_Hi].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Stress_Init_Hi].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_Init_Hi].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>({this.props.symbol_table[o.Cycle_Life].name}</td>
                            <td className="text-left" colSpan="3">&nbsp; applies to body coils only.)</td>
                        </tr>
                        <tr>
                            <td> &nbsp; </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Stat].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Stat].value.toFixed(0)}</td>
                            <td className="text-left">&nbsp;{this.props.symbol_table[o.Stress_Lim_Stat].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Stress_Lim_Bend].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Bend].value.toFixed(0)}</td>
                            <td className="text-left">&nbsp;{this.props.symbol_table[o.Stress_Lim_Bend].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Endur].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Endur].value.toFixed(0)}</td>
                            <td className="text-left">&nbsp;{this.props.symbol_table[o.Stress_Lim_Endur].units}</td>
                        </tr>
                        <tr>
                            <td>Bending Str @End (Sa)</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Stress_Hook].value.toFixed(0)}</td>
                            <td className="text-left">&nbsp;{this.props.symbol_table[o.Stress_Hook].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>Torsion Str @End (Sb)</td>
                            <td>=</td>
                            <td>{this.sb.toFixed(0)}</td>
                            <td className="text-left">&nbsp;{this.props.symbol_table[o.Stress_Hook].units}</td>
                        </tr>
                    </tbody>
                </table>
                (Torsion value assumes a vertical bend radius (R2) equal twice wire diameter.)<br />
                {this.warnmsg}
                <br /> &nbsp;
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Report2);
