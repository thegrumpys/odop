import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { Button } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';
import { getAlertsBySeverity, ERR, WARN, NOTICE, INFO } from '../../../components/Alerts';

class Report1 extends ReportBase {

    constructor(props) {
//        console.log("In Report1.constructor props=",props);
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
//        console.log("In Report1.onClick event=",event);
        window.print();
        return false;
    }

    render() {
        super.render();
//        console.log('In Report1.render this=',this);
        var line = 1;
        return (
            <>
                <h4 className="d-flex mt-3">
                    <span className="mr-auto">ODOP:Spring &nbsp; Compression Spring Report &nbsp; &nbsp; <a href="https://www.springdesignsoftware.org"><small>https://www.springdesignsoftware.org</small></a></span>
                    <Button onClick={this.onClick}>Print</Button>
                </h4>
                <br />
                {this.hits > 0 ?
                    <><b>Alerts:</b><ul>
                        { getAlertsBySeverity(ERR   ).map((entry) => <li key={line++} className={entry.className}>{entry.severity}: {entry.message}</li> ) }
                        { getAlertsBySeverity(WARN  ).map((entry) => <li key={line++} className={entry.className}>{entry.severity}: {entry.message}</li> ) }
                        { getAlertsBySeverity(NOTICE).map((entry) => <li key={line++} className={entry.className}>{entry.severity}: {entry.message}</li> ) }
                        { getAlertsBySeverity(INFO  ).map((entry) => <li key={line++} className={entry.className}>{entry.severity}: {entry.message}</li> ) }
                    </ul></>
                : '' }
                {this.hits > 0 && this.startpntmsg}{this.hits > 0 && <br />}
                {this.hits > 0 && <br />}
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
                            <td>{this.props.symbol_table[o.End_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.et_tab[this.props.symbol_table[o.End_Type].value][0]}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Index].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Spring_Index].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Spring_Index].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Coils_T].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Coils_T].value.toFixed(3)}</td>
                            <td className="text-left">{"total " + this.props.symbol_table[o.Coils_T].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Rate].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Rate].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Rate].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Coils_A].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Coils_A].value.toFixed(3)}</td>
                            <td className="text-left">{"active " + this.props.symbol_table[o.Coils_A].units}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table id="view2" className="report-table">
                    <thead>
                        <tr>
                            <td></td>
                            <td className="text-center"><b>Force</b><br />{this.props.symbol_table[o.Force_1].units}</td>
                            <td className="text-center"><b>Deflect</b><br />{this.props.symbol_table[o.L_Free].units}</td>
                            <td className="text-center"><b>Length</b><br />{this.props.symbol_table[o.L_Free].units}</td>
                            <td/>
                            <td className="text-center"><b>OD</b><br />{this.props.symbol_table[o.OD_Free].units}</td>
                            <td className="text-center"><b>ID</b><br />{this.props.symbol_table[o.ID_Free].units}</td>
                            <td/>
                            <td className="text-center"><b>Stress</b><br />{this.props.symbol_table[o.Stress_1].units}</td>
                            <td className="text-center"><b>Static&nbsp;FS</b><br />{this.props.symbol_table[o.FS_2].units}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Free</b></td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td>{(0.0).toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.L_Free].value.toFixed(3)}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.OD_Free].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.ID_Free].value.toFixed(4)}</td>
                            <td/>
                            <td>{(0.0).toFixed(0)}</td>
                            <td>Infinity</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td/>
                            <td>{this.od_1.toFixed(4)}</td>
                            <td>{this.id_1.toFixed(4)}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                            <td>{this.fs_1.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td/>
                            <td>{this.od_2.toFixed(4)}</td>
                            <td>{this.id_2.toFixed(4)}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.FS_2].value.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>Solid</b></td>
                            <td>{this.props.symbol_table[o.Force_Solid].value.toFixed(2)}</td>
                            <td>{(this.props.symbol_table[o.L_Free].value - this.props.symbol_table[o.L_Solid].value).toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.L_Solid].value.toFixed(3)}</td>
                            <td/>
                            <td>{this.od_solid.toFixed(4)}</td>
                            <td>{(this.od_solid - 2.0 * this.props.symbol_table[o.Wire_Dia].value).toFixed(4)}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_Solid].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.FS_Solid].value.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table id="view3" className="report-table">
                    <tbody>
                        <tr>
                            <td>Safe Load</td>
                            <td>=</td>
                            <td>{this.safe_load.toFixed(3)}</td>
                            <td className="text-left">{this.safe_load_u}</td>
                            <td/>
                            <td>{this.len_lbl}</td>
                            <td>=</td>
                            <td>{this.wire_len_t.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.L_Free].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.L_Stroke].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.L_Stroke].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.L_Stroke].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Weight].name}</td>
                            <td>=</td>
                            <td>{this.wgt1000.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Weight].units + "/1000"}</td>
                        </tr>
                        <tr>
                            <td>Pitch</td>
                            <td>=</td>
                            <td>{this.pitch.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.L_Free].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Cycle_Life].units + " (estimate)"}</td>
                            <td/>
                        </tr>
                    </tbody>
                </table>
                <br />
                Deflection at load point 2 is {this.props.symbol_table[o.PC_Avail_Deflect].value.toFixed(0)}% of total available deflection.<br />
                {this.pcadmsg}{this.pcadmsg !== undefined && <br />}
                <br />
            </>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Report1);
