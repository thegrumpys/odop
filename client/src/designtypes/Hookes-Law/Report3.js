import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { Button } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

class Report3 extends ReportBase {

    constructor(props) {
//        console.log("In Report3.constructor props=",props);
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
//        console.log("In Report3.onClick event=",event);
        window.print();
        return false;
    }

    render() {
        super.render();
//        console.log('In Report3.render this.props=',this.props);
        return (
            <>
                <h4 className="d-flex mt-3">
                    <span className="mr-auto">ODOP:Spring &nbsp; Hooke's Law Report &nbsp; &nbsp; <a href="https://www.springdesignsoftware.org"><small>https://www.springdesignsoftware.org</small></a></span>
                    <Button onClick={this.onClick}>Print</Button>
                </h4>
                <br />
                <table id="view1" className="report-table">
                    <tbody>
                        <tr>
                            <td>{this.props.labels[o.Contact_person].name}:</td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Contact_person].value}</td>
                            <td/>
                            <td>{this.props.labels[o.Phone___email].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Phone___email].value}</td>
                        </tr>
                        <tr>
                            <td>{this.props.labels[o.Company_name].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Company_name].value}</td>
                            <td/>
                            <td>{this.props.labels[o.Date].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Date].value}</td>
                        </tr>
                        <tr>
                            <td>{this.props.labels[o.Street].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Street].value}</td>
                            <td/>
                            <td>{this.props.labels[o.Part_Number].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Part_Number].value}</td>
                        </tr>
                        <tr>
                            <td>{this.props.labels[o.City__State___Zip].name}: </td>
                            <td/>
                            <td  className="text-left" width="30%">{this.props.labels[o.City__State___Zip].value}</td>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                        </tr>
                    </tbody>
                </table>
                <b>{this.props.labels[o.COMMENT].name}: &nbsp; </b> {this.props.labels[o.COMMENT].value} <br/>
                <br/>
                <table id="view2" className="report-table">
                    <tbody>
                        <tr>
                            <td>{this.props.symbol_table[o.Rate].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Rate].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Rate].units}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table id="view3" className="report-table">
                    <thead>
                        <tr>
                            <th/>
                            <th className="text-right" width="15%">Free </th>
                            <th className="text-right" width="15%">1st&nbsp;Load</th>
                            <th className="text-right" width="15%">2nd&nbsp;Load</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Force</b></td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                            <td className="text-left" colSpan="2">{this.props.symbol_table[o.Force_1].units}</td>
                        </tr>
                        <tr>
                            <td><b>Deflection</b></td>
                            <td>{(0.0).toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Deflect_2].units}</td>
                        </tr>
                        <tr>
                            <td><b>Length</b></td>
                            <td>{this.props.symbol_table[o.L_Free].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.L_1].units}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                {this.pcadmsg}{this.pcadmsg !== undefined && <br />}
                {this.errmsg1}{this.errmsg1 !== undefined && <br />}
                {this.errmsg0}
                <hr/>
                <table id="view4" className="report-table">
                    <tbody>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Data_Source].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Data_Source].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Mandril].name}: </td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Mandril].value}</td>
                            <td/>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Wind].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="2">{this.props.labels[o.Wind].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Shot_peen].name}: </td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Shot_peen].value}</td>
                            <td colSpan="3" className="text-left">{"(calculations assume: " + this.peenValue + ")"}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Stress_relieve_HT].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Stress_relieve_HT].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Pre_set].name}: </td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Pre_set].value}</td>
                            <td className="text-left" colSpan="3">(calculations assume: No pre-set)</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Finish].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Finish].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Squareness].name}: </td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Squareness].value}</td>
                            <td className="text-left">deg.</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.End_use].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.End_use].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Fits_in___Works_over].name}: </td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Fits_in___Works_over].value}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Operating_temp].name}: </td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Operating_temp].value}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Special_notes___tol].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Special_notes___tol].value}</td>
                        </tr>
                        <tr>
                            <td/>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table id="view5" className="report-table">
                    <tbody>
                        <tr>
                            <td className="text-center" colSpan="2">approved for mfg.</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td className="text-center" colSpan="2">approved for mfg.</td>
                            <td/>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td colSpan="2">by {this.props.labels[o.Customer_approval].value}</td>
                            <td>date {this.props.labels[o.Customer_date].value}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td colSpan="2">by {this.props.labels[o.Vendor_approval].value}</td>
                            <td>date {this.props.labels[o.Vendor_date].value}</td>
                        </tr>
                    </tbody>
                </table>
            <br/>
            </>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
    labels: state.model.labels,
});

export default connect(mapStateToProps)(Report3);
