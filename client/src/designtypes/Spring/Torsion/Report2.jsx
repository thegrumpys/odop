import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { Button } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

class Report2 extends ReportBase {

    constructor(props) {
//        console.log("In Report2.constructor props=",props);
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
//        console.log("In Report2.onClick event=",event);
        window.print();
        return false;
    }

    render() {
        super.render();
//        console.log('In Report2.render this.props=',this.props);
        return (
            <>
                <h4 className="d-flex mt-3">
                    <span className="mr-auto">ODOP:Spring &nbsp; Torsion Spring Report &nbsp; &nbsp; <a href="https://www.springdesignsoftware.org"><small>https://www.springdesignsoftware.org</small></a></span>
                    <Button onClick={this.onClick}>Print</Button>
                </h4>
                <br />
                <table id="view1" className="report-table">
                    <tbody>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.props.symbol_table[o.Spring_Type].value}</td>
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
                            <td>{this.props.symbol_table[o.Elastic_Modulus].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Elastic_Modulus].value}</td>
                            <td className="text-left">{this.props.symbol_table[o.Elastic_Modulus].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Index].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Spring_Index].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Spring_Index].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Tensile].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Tensile].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Tensile].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Rate].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Rate].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Rate].units}</td>
                            <td/>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table id="view2" className="report-table">
                    <tbody>
                        <tr>
                            <td colSpan="5"></td>
                            <td colSpan="4"  className="text-center">----- kb = {this.kb.toFixed(3)} -----</td>
                        </tr>
                        <tr>
                            <td/>
                            <td className="text-center"><b>Moment</b><br />{this.props.symbol_table[o.M_1].units}</td>
                            <td className="text-center"><b>Deflect</b><br />{this.props.symbol_table[o.Deflect_1].units}</td>
                            <td className="text-center"><b>Length</b><br />{this.props.symbol_table[o.L_Body].units}</td>
                            <td/>
                            <td/>
                            <td className="text-center"><b>Stress</b><br />{this.props.symbol_table[o.Stress_1].units}</td>
                            <td className="text-center"><b>%TS</b><br />%</td>
                            <td className="text-center"><b>Static&nbsp;FS</b><br />{this.props.symbol_table[o.FS_2].units}</td>
                            <td/>
                            <td className="text-center"><b>Energy</b><br />{this.props.symbol_table[o.Energy].units}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><b>Free</b></td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td>{this.props.symbol_table[o.L_Body].value.toFixed(3)}</td>
                            <td/>
                            <td/>
                            <td>{(0.0).toFixed(0)}</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td>Infinity</td>
                            <td/>
                            <td>{(0.0).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td>{this.props.symbol_table[o.M_1].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(1)}</td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td/>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_1].value / this.dhat).toFixed(1)}</td>
                            <td>{this.fs_1.toFixed(2)}</td>
                            <td/>
                            <td>{this.energy_1.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td>{this.props.symbol_table[o.M_2].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(1)}</td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td/>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_2].value / this.dhat).toFixed(1)}</td>
                            <td>{this.props.symbol_table[o.FS_2].value.toFixed(2)}</td>
                            <td/>
                            <td>{this.energy_2.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>Max Safe</b></td>
                            <td>{this.safe_load.toFixed(2)}</td>
                            <td>{this.def_max.toFixed(1)}</td>
                            <td>{this.l_max.toFixed(3)}</td>
                            <td/>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_Lim_Bnd_Stat].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_Lim_Bnd_Stat].value / this.dhat).toFixed(1)}</td>
                            <td>{1.0.toFixed(2)}</td>
                            <td/>
                            <td>{this.energy_MS.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                Calculations assume: {this.peenValue}, {this.heattreatValue}
                <hr/>
                <b>Stress Details</b>
                <table id="view4" className="report-table">
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
                <b>Cycle Life Details</b>
                <table id="view5" className="report-table">
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
                            <td>{this.props.symbol_table[o.Stress_Lim_Bnd_Stat].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Bnd_Stat].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Stress_Lim_Bnd_Stat].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_Lim_Bnd_Endur].name}<sup>*</sup></td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Bnd_Endur].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Stress_Lim_Bnd_Endur].units}</td>
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
                            <td colSpan="4" className="text-left">Soderberg calculation result:</td>
                            <td/>
                            <td><b>{this.props.symbol_table[o.FS_CycleLife].name}</b></td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.FS_CycleLife].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.FS_CycleLife].units}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                {this.clWarnString === "" ?
                    <>
                        <table id="view7" className="report-table">
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
                                    <td> </td>
                                    <td> &nbsp; </td>
                                    <td colSpan="2" className="text-left">{this.peenValue}</td>
                                </tr>
                                <tr>
                                    <td>{this.props.symbol_table[o.Tensile].name}</td>
                                    <td>=</td>
                                    <td>{this.props.symbol_table[o.Tensile].value.toFixed(0)}</td>
                                    <td className="text-left">{this.props.symbol_table[o.Tensile].units}</td>
                                    <td/>
                                    <td>{this.props.symbol_table[o.PC_Ten_Bnd_Endur].name}<sup>*</sup></td>
                                    <td>=</td>
                                    <td>{this.props.symbol_table[o.PC_Ten_Bnd_Endur].value.toFixed(0)}</td>
                                    <td className="text-left">{this.props.symbol_table[o.PC_Ten_Bnd_Endur].units}</td>
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
                                    <td colSpan="4" className="text-left">Modified Goodman calculation result:</td>
                                    <td/>
                                    <td><b>{this.props.symbol_table[o.Cycle_Life].name}</b></td>
                                    <td>=</td>
                                    <td>{this.props.symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
                                    <td className="text-left">{this.props.symbol_table[o.Cycle_Life].units + " (estimate)"}</td>
                               </tr>
                           </tbody>
                        </table>
                    </>
                :
                    <>{this.clWarnString}</>
                }
                <br/>
                <sup>*</sup>Source data for %_Ten_Bnd_Endur (Stress_Lim_Bnd_Endur) based on Stress Ratio = 0. 
                <br/>
                <br/>
            </>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Report2);
