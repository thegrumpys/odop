import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import * as mo from '../mat_ips_offsets';
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
                <h4>ODOP:Spring &nbsp; Compression Spring Report</h4>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td>{this.st[o.Spring_Type].name}</td>
                            <td>=</td>
                            <td className="" colSpan="2">{this.st[o.Spring_Type].value}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.st[o.Material_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.matTypeValue}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{this.st[o.Wire_Dia].name}</td>
                            <td>=</td>
                            <td>{this.st[o.Wire_Dia].value.toFixed(4)}</td>
                            <td>{this.st[o.Wire_Dia].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.st[o.Tensile].name}</td>
                            <td>=</td>
                            <td>{this.tensileFixed0}</td>
                            <td>{this.st[o.Tensile].units}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{this.st[o.Spring_Index].name}</td>
                            <td>=</td>
                            <td>{this.st[o.Spring_Index].value.toFixed(3)}</td>
                            <td>{this.st[o.Spring_Index].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>Stress Ratio</td>
                            <td>=</td>
                            <td>{(this.st[o.Stress_1].value / this.st[o.Stress_2].value).toFixed(3)}</td>
                            <td>{this.st[o.Spring_Index].units}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                this.kw1 = {this.kw1.toFixed(3)} &nbsp; &nbsp; (Applies before set removal)
                <br/>
                this.kw2 = {this.kw2.toFixed(3)} &nbsp; &nbsp; (Applies &nbsp;after &nbsp; set removal)
                <br/>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                ---- this.kw2 ----- &nbsp; &nbsp; ---- this.kw1 -----
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Length &nbsp; </th>
                            <th>Deflect</th>
                            <th>Force</th>
                            <td> &nbsp; &nbsp; </td>
                            <th>Stress</th>
                            <th>%TS &nbsp;</th>
                            <td> &nbsp; &nbsp; </td>
                            <th>Stress</th>
                            <th>%TS &nbsp;</th>
                            <td> &nbsp; &nbsp; </td>
                            <th>Static FS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Free</b></td>
                            <td>{this.st[o.L_Free].value.toFixed(3)}</td>
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
                            <td>{this.st[o.L_1].value.toFixed(3)}</td>
                            <td>{this.st[o.Deflect_1].value.toFixed(4)}</td>
                            <td>{this.st[o.Force_1].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.kw2str1.toFixed(0)}</td>
                            <td>{(this.kw2str1 / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.st[o.Stress_1].value.toFixed(0)}</td>
                            <td>{(this.st[o.Stress_1].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.fs_1.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td>{this.st[o.L_2].value.toFixed(3)}</td>
                            <td>{this.st[o.Deflect_2].value.toFixed(4)}</td>
                            <td>{this.st[o.Force_2].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.kw2str2.toFixed(0)}</td>
                            <td>{(this.kw2str2 / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.st[o.Stress_2].value.toFixed(0)}</td>
                            <td>{(this.st[o.Stress_2].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.st[o.FS_2].value.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>Solid</b></td>
                            <td>{this.st[o.L_Solid].value.toFixed(3)}</td>
                            <td>{(this.st[o.L_Free].value - this.st[o.L_Solid].value).toFixed(4)}</td>
                            <td>{this.st[o.Force_Solid].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.kw2strs.toFixed(0)}</td>
                            <td>{(this.kw2strs / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.st[o.Stress_Solid].value.toFixed(0)}</td>
                            <td>{(this.st[o.Stress_Solid].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.st[o.FS_Solid].value.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table>
                    <tbody>
                        <tr>
                            <td>{this.st[o.FS_CycleLife].name}</td>
                            <td>=</td>
                            <td>{this.st[o.FS_CycleLife].value.toFixed(3)}</td>
                            <td>{this.st[o.FS_CycleLife].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.st[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{this.st[o.Cycle_Life].value.toFixed(0)}</td>
                            <td>{this.cycle_life_u}</td>
                        </tr>
                        <tr>
                            <td>Helix Angle</td>
                            <td>=</td>
                            <td>{this.hlx_ang.toFixed(2)}</td>
                            <td>degrees</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    labels: state.model.labels,
});

export default connect(mapStateToProps)(Report2);
