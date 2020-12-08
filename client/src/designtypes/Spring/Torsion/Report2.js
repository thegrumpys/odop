import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

class Report2 extends ReportBase {

    render() {
        super.render();
//        console.log('In Report2.render this.props=',this.props);
        return (
            <React.Fragment>
                <h4>ODOP:Spring &nbsp; Torsion Spring Report</h4>
                <br />
                <table className="report-table">
                    <tbody>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Type].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Spring_Type].value}</td>
                            <td/>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Material_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.matTypeValue}</td>
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
                <br/>
                <table className="report-table">
                    <thead>
                        <tr>
                            <th colSpan="10"></th>
                            <td>kb</td>
                            <td>=</td>
                            <td>{this.kb.toFixed(3)}</td>
                            <th colSpan="2"></th>
                        </tr>
                        <tr>
                            <th colSpan="10"></th>
                            <th colSpan="3" style={{textAlign: "center"}}>---- kb ----</th>
                            <th colSpan="2"></th>
                        </tr>
                        <tr>
                            <th></th>
                            <th> &nbsp; &nbsp; </th>
                            <th>Length </th>
                            <th> &nbsp; &nbsp; </th>
                            <th>Deflect</th>
                            <th>Moment</th>
                            <th> &nbsp; &nbsp; </th>
                            <th> &nbsp; &nbsp; </th>
                            <th> &nbsp; &nbsp; </th>
                            <th> &nbsp; &nbsp; </th>
                            <th>Stress</th>
                            <th> &nbsp;</th>
                            <th> %TS</th>
                            <th> &nbsp; &nbsp; </th>
                            <th>Static FS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Free</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.L_Body].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; {(0.0).toFixed(3)}</td>
                            <td> &nbsp; {(0.0).toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(0.0).toFixed(0)}</td>
                            <td> &nbsp;</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>infinite</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; {this.props.symbol_table[o.Deflect_1].value.toFixed(3)}</td>
                            <td> &nbsp; {this.props.symbol_table[o.M_1].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                            <td> &nbsp;</td>
                            <td>{(this.props.symbol_table[o.Stress_1].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.fs_1.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; {this.props.symbol_table[o.Deflect_2].value.toFixed(3)}</td>
                            <td> &nbsp; {this.props.symbol_table[o.M_2].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                            <td> &nbsp;</td>
                            <td>{(this.props.symbol_table[o.Stress_2].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.FS_2].value.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>Max Safe</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.l_max.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; {this.def_max.toFixed(3)}</td>
                            <td> &nbsp; {this.safe_load.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Bnd_Stat].value.toFixed(0)}</td>
                            <td> &nbsp;</td>
                            <td>{(this.props.symbol_table[o.Stress_Lim_Bnd_Stat].value / this.dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{1.0.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table className="report-table">
                    <tbody>
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
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>Helix Angle</td>
                            <td>=</td>
                            <td>{this.hlx_ang.toFixed(2)}</td>
                            <td>degrees</td>
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
