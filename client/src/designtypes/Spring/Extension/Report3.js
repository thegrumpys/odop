import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

class Report3 extends ReportBase {

    render() {
        super.render();
//        console.log('In Report3.render this.props=',this.props);
        return (
            <React.Fragment>
                <h4>ODOP:Spring &nbsp; Extension Spring Report</h4>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td>{this.props.labels[o.Contact_person].name}:</td>
                            <td> &nbsp; </td>
                            <td>{this.props.labels[o.Contact_person].value}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.labels[o.Phone].name}: </td>
                            <td> &nbsp; </td>
                            <td>{this.props.labels[o.Phone].value}</td>
                        </tr>
                        <tr>
                            <td>{this.props.labels[o.Company_name].name}: </td>
                            <td> &nbsp; </td>
                            <td>{this.props.labels[o.Company_name].value}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.labels[o.Date].name}: </td>
                            <td> &nbsp; </td>
                            <td>{this.props.labels[o.Date].value}</td>
                        </tr>
                        <tr>
                            <td>{this.props.labels[o.Street].name}: </td>
                            <td> &nbsp; </td>
                            <td>{this.props.labels[o.Street].value}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.labels[o.Part_Number].name}: </td>
                            <td> &nbsp; </td>
                            <td>{this.props.labels[o.Part_Number].value}</td>
                        </tr>
                        <tr>
                            <td>{this.props.labels[o.City].name}: </td>
                            <td> &nbsp; </td>
                            <td>{this.props.labels[o.City].value}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.labels[o.Finish].name}: </td>
                            <td> &nbsp; </td>
                            <td>{this.props.labels[o.Finish].value}</td>
                        </tr>
                        <tr>
                            <td>{this.props.labels[o.State___Zip].name}: </td>
                            <td> &nbsp; </td>
                            <td>{this.props.labels[o.State___Zip].value}</td>
                        </tr>
                    </tbody>
                </table>
                <b>Comment: &nbsp; </b> {this.props.labels[o.COMMENT].value} <br/>
                <br/>
                <table>
                    <tbody>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.props.symbol_table[o.Spring_Type].value}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Material_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.matTypeValue}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Wire_Dia].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Wire_Dia].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Wire_Dia].units}</td>
                            <td/>
                            <td> &nbsp; </td>
                            <td>{this.props.symbol_table[o.ASTM_Fed_Spec].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.astmFedSpecValue}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Mean_Dia].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Mean_Dia].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Mean_Dia].units}</td>
                            <td/>
                            <td> &nbsp; </td>
                            <td>{this.props.symbol_table[o.Tensile].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Tensile].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Tensile].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Index].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Spring_Index].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Spring_Index].units}</td>
                            <td/>
                            <td> &nbsp; </td>
                            <td>{this.props.symbol_table[o.End_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.et_tab[this.props.symbol_table[o.End_Type].value][0]}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Coils_T].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Coils_T].value.toFixed(3)}</td>
                            <td>{"total " + this.props.symbol_table[o.Coils_T].units}</td>
                            <td/>
                            <td> &nbsp; </td>
                            <td>{this.props.symbol_table[o.End_Extension].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.End_Extension].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.End_Extension].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Coils_A].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Coils_A].value.toFixed(3)}</td>
                            <td>{"active " + this.props.symbol_table[o.Coils_A].units}</td>
                            <td/>
                            <td> &nbsp; </td>
                            <td>{this.props.symbol_table[o.Rate].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Rate].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Rate].units}</td>
                        </tr>
                        <tr>
                            <td>{this.len_lbl}</td>
                            <td>=</td>
                            <td>{this.wire_len_t.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_Free].units}</td>
                            <td/>
                            <td> &nbsp; </td>
                            <td>{this.props.symbol_table[o.Weight].name}</td>
                            <td>=</td>
                            <td>{this.wgt1000.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Weight].units}{this.wgt1000_u}</td>
                        </tr>
                        <tr>
                            <td>Safe Load</td>
                            <td>=</td>
                            <td>{this.safe_load.toFixed(3)}</td>
                            <td>{this.safe_load_u}</td>
                            <td/>
                            <td> &nbsp; </td>
                            <td>{this.props.symbol_table[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
                            <td className="text-left" colSpan="4">{this.cycle_life_u}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Safe Travel</td>
                            <td>=</td>
                            <td>{this.safe_travel.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_Free].units}</td>
                            <td/>
                            <td> &nbsp; </td>
                            <td>({this.props.symbol_table[o.Cycle_Life].name}</td>
                            <td className="text-left" colSpan="3">&nbsp; applies to body coils only.)</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th/>
                            <th/>
                            <th>Initial</th>
                            <th>&nbsp; 1st Load</th>
                            <th>&nbsp; 2nd Load</th>
                            <td></td>
                            <th>&nbsp;MaxSafe</th>
                            <th></th>
                            <th> &nbsp; &nbsp; </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Force</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Initial_Tension].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.safe_load.toFixed(2)}</td>
                            <td className="text-left" colSpan="2">&nbsp;{this.props.symbol_table[o.Force_1].units}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td><b>Length</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.L_Free].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(this.props.symbol_table[o.L_Free].value + this.safe_travel).toFixed(3)}</td>
                            <td>&nbsp;{this.props.symbol_table[o.L_Free].units}</td>
                        </tr>
                        <tr>
                            <td><b>Deflection</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(0.0).toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.safe_travel.toFixed(3)}</td>
                            <td>&nbsp;{this.props.symbol_table[o.Deflect_2].units}</td>
                        </tr>
                        <tr>
                            <td><b>Outside Dia.</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.OD_Free].value.toFixed(3)}</td>
                            <td>{this.od_1.toFixed(3)}</td>
                            <td>{this.od_2.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.od_maxsafe.toFixed(3)}</td>
                            <td>&nbsp;{this.props.symbol_table[o.OD_Free].units}</td>
                        </tr>
                        <tr>
                            <td><b>Inside Dia.</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.ID_Free].value.toFixed(3)}</td>
                            <td>{this.id_1.toFixed(3)}</td>
                            <td>{this.id_2.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.id_maxsafe.toFixed(3)}</td>
                            <td>&nbsp;{this.props.symbol_table[o.ID_Free].units}</td>
                        </tr>
                        <tr>
                            <td>kw = </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.kw1.toFixed(3)}</td>
                            <td></td>
                            <td></td>
                            <td> &nbsp; &nbsp; </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td> ... <b>Stress</b></td>
                            <td></td>
                            <td>{this.props.symbol_table[o.Stress_Initial].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Stat].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_1].units}</td>
                        </tr>
                        <tr>
                            <td> ... <b>% Tensile</b></td>
                            <td></td>
                            <td>{(100.0 * this.props.symbol_table[o.Stress_Initial].value / this.props.symbol_table[o.Tensile].value).toFixed(1)}</td>
                            <td>{(this.props.symbol_table[o.Stress_1].value / this.dhat).toFixed(1)}</td>
                            <td>{(this.props.symbol_table[o.Stress_2].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(this.props.symbol_table[o.Stress_Lim_Stat].value / this.dhat).toFixed(1)}</td>
                            <td>% &nbsp; &nbsp; </td>
                        </tr>
                        <tr>
                            <td> ... <b>Static F.S.</b></td>
                            <td></td>
                            <td>{(this.props.symbol_table[o.Stress_Lim_Stat].value / this.props.symbol_table[o.Stress_Initial].value).toFixed(2)}</td>
                            <td>{this.fs_1.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.FS_2].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(1.0).toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.FS_2].units}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                Deflection at load point 2 is {this.pc_avail_deflect.toFixed(0)}% of total safe deflection.<br />
                {this.warnmsg}{this.warnmsg !== "" && <br />}
                <br />
                <pre>
                |&lt;--------------------------- {this.props.symbol_table[o.L_Free].name} (w/ends) = {this.props.symbol_table[o.L_Free].value.toFixed(3)} ---------------------------&gt;|<br />
                |&lt;--- {this.props.symbol_table[o.L_End].name} ---&gt;|&lt;--- {this.props.symbol_table[o.L_Body].name} ---&gt;|&lt;--- {this.props.symbol_table[o.End_Extension].name} ---&gt;|&lt;--- {this.props.symbol_table[o.L_Extended_End].name} ---&gt;|<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.symbol_table[o.L_End].value.toFixed(3)}      
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.symbol_table[o.L_Body].value.toFixed(3)}      
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.symbol_table[o.End_Extension].value.toFixed(3)}     
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.symbol_table[o.L_Extended_End].value.toFixed(3)} 
                </pre>
                <hr/>
                <table>
                    <tbody>
                        <tr>
                            <td>Wind: </td>
                            <td> &nbsp; </td>
                            <td>rh</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>lh</td>
                            <td> &nbsp; </td>
                            <td>opt</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Data source: </td>
                            <td> &nbsp; </td>
                            <td>print </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>sample </td>
                            <td> &nbsp; </td>
                            <td>verbal</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Mandrel: </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>Fits in: </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td>Works over:</td>
                        </tr>
                        <tr>
                            <td>Stress relieve</td>
                            <td className="text-left">/ HT: </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td></td>
                            <td className="text-left"></td>
                        </tr>
                        <tr>
                            <td>Relative loop </td>
                            <td className="text-left">&nbsp;position: </td>
                            <td></td>
                            <td> &nbsp; </td>
                            <td></td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> Gaps: </td>
                        </tr>
                        <tr>
                            <td>Relative loop </td>
                            <td>&nbsp;tolerance: </td>
                            <td></td>
                            <td> &nbsp; </td>
                            <td></td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> Operating temp: </td>
                        </tr>
                        <tr>
                            <td>Special notes</td>
                            <td className="text-left" colSpan="2">& tolerances: </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> End use: </td>
                            <td> &nbsp; </td>
                        </tr>
                        <tr>
                            <td> &nbsp; </td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table>
                    <tbody>
                        <tr>
                            <td> &nbsp; approved for mfg.&nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; approved for mfg.&nbsp; </td>
                        </tr>
                        <tr>
                            <td> &nbsp; </td>
                        </tr>
                        <tr>
                            <td> by _______________________ &nbsp; </td>
                            <td> &nbsp; date _______ &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> by _______________________ &nbsp; </td>
                            <td> &nbsp; date _______ &nbsp; </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
    labels: state.model.labels,
});

export default connect(mapStateToProps)(Report3);
