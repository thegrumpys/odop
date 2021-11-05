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
                <table className="report-table">
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
                            <td>{this.tensileFixed0}</td>
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
                            <td>Helix Angle</td>
                            <td>=</td>
                            <td>{this.hlx_ang.toFixed(2)}</td>
                            <td>degrees</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                kw1 = {this.kw1.toFixed(3)} &nbsp; &nbsp; (Applies before set removal)
                <br/>
                kw2 = {this.kw2.toFixed(3)} &nbsp; &nbsp; (Applies &nbsp;after &nbsp; set removal)
                <br/>
                <table className="report-table">
                    <thead>
                        <tr>
                            <th colSpan="5"></th>
                            <th colSpan="3" style={{textAlign: 'center'}}>---- kw2 ----</th>
                            <th colSpan="3" style={{textAlign: 'center'}}>---- kw1 ----</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td style={{textAlign: 'center'}}><b>Length</b><br />{this.props.symbol_table[o.L_Free].units}</td>
                            <td style={{textAlign: 'center'}}><b>Deflect</b><br />{this.props.symbol_table[o.L_Free].units}</td>
                            <td style={{textAlign: 'center'}}><b>Force</b><br />{this.props.symbol_table[o.Force_1].units}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td style={{textAlign: 'center'}}><b>Stress</b><br />{this.props.symbol_table[o.Stress_1].units}</td>
                            <td style={{textAlign: 'center'}}><b>%TS</b><br />"%"</td>
                            <td> &nbsp; &nbsp; </td>
                            <td style={{textAlign: 'center'}}><b>Stress</b><br />{this.props.symbol_table[o.Stress_1].units}</td>
                            <td style={{textAlign: 'center'}}><b>%TS</b><br />"%"</td>
                            <td> &nbsp; &nbsp; </td>
                            <td style={{textAlign: 'center'}}><b>Static FS</b><br />{this.props.symbol_table[o.FS_2].units}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Free</b></td>
                            <td>{this.props.symbol_table[o.L_Free].value.toFixed(3)}</td>
                            <td>{(0.0).toFixed(4)}</td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(0.0).toFixed(0)}</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(0.0).toFixed(0)}</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>infinite</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.kw2str1.toFixed(0)}</td>
                            <td>{(this.kw2str1 / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_1].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.fs_1.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.kw2str2.toFixed(0)}</td>
                            <td>{(this.kw2str2 / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_2].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.FS_2].value.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>Solid</b></td>
                            <td>{this.props.symbol_table[o.L_Solid].value.toFixed(3)}</td>
                            <td>{(this.props.symbol_table[o.L_Free].value - this.props.symbol_table[o.L_Solid].value).toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_Solid].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.kw2strs.toFixed(0)}</td>
                            <td>{(this.kw2strs / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_Solid].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_Solid].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.FS_Solid].value.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table className="report-table">
                    <thead>
                        <tr>
                            <td></td>
                            <td style={{textAlign: 'center'}}><b>Length</b><br />{this.props.symbol_table[o.L_Free].units}</td>
                            <td style={{textAlign: 'center'}}><b>Deflect</b><br />{this.props.symbol_table[o.L_Free].units}</td>
                            <td style={{textAlign: 'center'}}><b>Force</b><br />{this.props.symbol_table[o.Force_1].units}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td style={{textAlign: 'center'}}><b>Energy</b><br />{this.props.symbol_table[o.Energy].units}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Free</b></td>
                            <td>{this.props.symbol_table[o.L_Free].value.toFixed(3)}</td>
                            <td>{(0.0).toFixed(4)}</td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(0.0).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.energy_1.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.energy_2.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>Solid</b></td>
                            <td>{this.props.symbol_table[o.L_Solid].value.toFixed(3)}</td>
                            <td>{(this.props.symbol_table[o.L_Free].value - this.props.symbol_table[o.L_Solid].value).toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Force_Solid].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.energy_S.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table className="report-table">
                    <tbody>
                        <tr>
                            <td>Stress Mean</td>
                            <td>=</td>
                            <td>{((this.props.symbol_table[o.Stress_1].value + this.props.symbol_table[o.Stress_2].value) / 2.0).toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_1].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>Stress Ratio</td>
                            <td>=</td>
                            <td>{(this.props.symbol_table[o.Stress_1].value / this.props.symbol_table[o.Stress_2].value).toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Spring_Index].units}</td>
                        </tr>
                        <tr>
                            <td>Stress Amplitude</td>
                            <td>=</td>
                            <td>{((this.props.symbol_table[o.Stress_2].value - this.props.symbol_table[o.Stress_1].value) / 2.0).toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_1].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>Stress Range</td>
                            <td>=</td>
                            <td>{(this.props.symbol_table[o.Stress_2].value - this.props.symbol_table[o.Stress_1].value).toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_1].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.FS_CycleLife].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.FS_CycleLife].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.FS_CycleLife].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
                            <td>{this.cycle_life_u}</td>
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
});

export default connect(mapStateToProps)(Report2);
