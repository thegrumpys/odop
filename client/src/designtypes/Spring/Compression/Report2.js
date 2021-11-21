import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

class Report2 extends ReportBase {

    render() {
        super.render();
//        console.log('In Report2.render this.props=',this.props);
        return (
            <React.Fragment>
                <h4>ODOP:Spring &nbsp; Compression Spring Report</h4>
                <br />
                <table id="view1" className="report-table-borders">
                    <tbody>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Type].name}</td>
                            <td>=</td>
                            <td className="" colSpan="2">{this.props.symbol_table[o.Spring_Type].value}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Material_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.matTypeValue}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Wire_Dia].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Wire_Dia].value.toFixed(4)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Wire_Dia].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Torsion_Modulus].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Torsion_Modulus].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Torsion_Modulus].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Index].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Spring_Index].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Spring_Index].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Tensile].name}</td>
                            <td>=</td>
                            <td>{this.tensileFixed0}</td>
                            <td className="text-left">{this.props.symbol_table[o.Tensile].units}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table id="view2" className="report-table-borders">
                    <thead>
                        <tr>
                            <th colSpan="4"></th>
                            <th/>
                            <th colSpan="2" className="text-center">kw2 = {this.kw1.toFixed(3)} (Applies before set removal)</th>
                            <th/>
                            <th colSpan="2" className="text-center">kw1 = {this.kw2.toFixed(3)} (Applies after set removal)</th>
                            <th/>
                            <th/>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="text-center"><b>Length</b><br />{this.props.symbol_table[o.L_Free].units}</td>
                            <td className="text-center"><b>Deflect</b><br />{this.props.symbol_table[o.L_Free].units}</td>
                            <td className="text-center"><b>Force</b><br />{this.props.symbol_table[o.Force_1].units}</td>
                            <td/>
                            <td className="text-center"><b>Stress</b><br />{this.props.symbol_table[o.Stress_1].units}</td>
                            <td className="text-center"><b>%TS</b><br />%</td>
                            <td/>
                            <td className="text-center"><b>Stress</b><br />{this.props.symbol_table[o.Stress_1].units}</td>
                            <td className="text-center"><b>%TS</b><br />%</td>
                            <td/>
                            <td className="text-center"><b>Static FS</b><br />{this.props.symbol_table[o.FS_2].units}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Free</b></td>
                            <td>{this.props.symbol_table[o.L_Free].value.toFixed(3)}</td>
                            <td>{(0.0).toFixed(4)}</td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td/>
                            <td>{(0.0).toFixed(0)}</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td/>
                            <td>{(0.0).toFixed(0)}</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td/>
                            <td>infinite</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                            <td/>
                            <td>{this.kw2str1.toFixed(0)}</td>
                            <td>{(this.kw2str1 / this.dhat).toFixed(1)}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_1].value / this.dhat).toFixed(1)}</td>
                            <td/>
                            <td>{this.fs_1.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                            <td/>
                            <td>{this.kw2str2.toFixed(0)}</td>
                            <td>{(this.kw2str2 / this.dhat).toFixed(1)}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_2].value / this.dhat).toFixed(1)}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.FS_2].value.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>Solid</b></td>
                            <td>{this.props.symbol_table[o.L_Solid].value.toFixed(3)}</td>
                            <td>{(this.props.symbol_table[o.L_Free].value - this.props.symbol_table[o.L_Solid].value).toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_Solid].value.toFixed(2)}</td>
                            <td/>
                            <td>{this.kw2strs.toFixed(0)}</td>
                            <td>{(this.kw2strs / this.dhat).toFixed(1)}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_Solid].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_Solid].value / this.dhat).toFixed(1)}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.FS_Solid].value.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table id="view3" className="report-table-borders">
                    <thead>
                        <tr>
                            <td></td>
                            <td className="text-center"><b>Length</b><br />{this.props.symbol_table[o.L_Free].units}</td>
                            <td className="text-center"><b>Deflect</b><br />{this.props.symbol_table[o.L_Free].units}</td>
                            <td className="text-center"><b>Force</b><br />{this.props.symbol_table[o.Force_1].units}</td>
                            <td/>
                            <td className="text-center"><b>Energy</b><br />{this.props.symbol_table[o.Energy].units}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Free</b></td>
                            <td>{this.props.symbol_table[o.L_Free].value.toFixed(3)}</td>
                            <td>{(0.0).toFixed(4)}</td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td/>
                            <td>{(0.0).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                            <td/>
                            <td>{this.energy_1.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                            <td/>
                            <td>{this.energy_2.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>Solid</b></td>
                            <td>{this.props.symbol_table[o.L_Solid].value.toFixed(3)}</td>
                            <td>{(this.props.symbol_table[o.L_Free].value - this.props.symbol_table[o.L_Solid].value).toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_Solid].value.toFixed(2)}</td>
                            <td/>
                            <td>{this.energy_S.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table id="view4" className="report-table-borders">
                    <tbody>
                        <tr>
                            <td>Helix Angle</td>
                            <td>=</td>
                            <td>{this.hlx_ang.toFixed(2)}</td>
                            <td>degrees</td>
                            <td/>
                            <td colSpan="5"/>
                        </tr>
                        <tr>
                            <td>Stress Amplitude</td>
                            <td>=</td>
                            <td>{((this.props.symbol_table[o.Stress_2].value - this.props.symbol_table[o.Stress_1].value) / 2.0).toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Stress_1].units}</td>
                            <td/>
                            <td>Stress Ratio</td>
                            <td>=</td>
                            <td>{(this.props.symbol_table[o.Stress_1].value / this.props.symbol_table[o.Stress_2].value).toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Spring_Index].units}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <table id="view5" className="report-table-borders">
                    <tbody>
                        <tr>
                            <td colSpan="4" className="text-left">Soderburg calculation inputs:</td>
                            <td/>
                            <td colSpan="4"/>
                        </tr>
                        <tr>
                            <td>Stress Mean</td>
                            <td>=</td>
                            <td>{((this.props.symbol_table[o.Stress_1].value + this.props.symbol_table[o.Stress_2].value) / 2.0).toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Stress_1].units}</td>
                            <td/>
                            <td>Stress Range</td>
                            <td>=</td>
                            <td>{(this.props.symbol_table[o.Stress_2].value - this.props.symbol_table[o.Stress_1].value).toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Stress_1].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Stress_Lim_Stat].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Stat].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Stress_Lim_Stat].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_Lim_Endur].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Endur].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Stress_Lim_Endur].units}</td>
                        </tr>
                        <tr>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td>{this.props.symbol_table[o.Life_Category].name}</td>
                            <td>=</td>
                            <td colSpan="2" className="text-left">{this.lifeTargValue}</td>
                        </tr>
                        <tr>
                            <td colSpan="4" className="text-left">Soderberg calculation output:</td>
                            <td/>
                            <td>{this.props.symbol_table[o.FS_CycleLife].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.FS_CycleLife].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.FS_CycleLife].units}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <table id="view7" className="report-table-borders">
                    <tbody>
                        <tr>
                            <td colSpan="4">Modified Goodman calculation inputs:</td>
                            <td/>
                            <td colSpan="4"/>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Material_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.matTypeValue}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Life_Category].name}</td>
                            <td>=</td>
                            <td colSpan="2" className="text-left">{this.lifeTargValue}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Tensile].name}</td>
                            <td>=</td>
                            <td>{this.tensileFixed0}</td>
                            <td className="text-left">{this.props.symbol_table[o.Tensile].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.PC_Tensile_Endur].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.PC_Tensile_Endur].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.PC_Tensile_Endur].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Stress_1].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Stress_1].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_2].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Stress_2].units}</td>
                       </tr>
                        <tr>
                            <td colSpan="4" className="text-left">Modified Goodman calculation output:</td>
                            <td/>
                            {this.clWarnString === "" ?
                                <>
                                    <td>{this.props.symbol_table[o.Cycle_Life].name}</td>
                                    <td>=</td>
                                    <td>{this.props.symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
                                    <td className="text-left">{this.props.symbol_table[o.Cycle_Life].units + " (estimate)"}</td>
                                </>
                            :
                                <td colSpan="5">{this.clWarnString}</td>
                            }
                       </tr>
                   </tbody>
                </table>
                <br/>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Report2);
