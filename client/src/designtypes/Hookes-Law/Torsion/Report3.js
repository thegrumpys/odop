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
                    <span className="mr-auto">ODOP &nbsp; Torsion Hooke's Law Report &nbsp; &nbsp; <a href="https://www.springdesignsoftware.org"><small>https://www.springdesignsoftware.org</small></a></span>
                    <Button onClick={this.onClick}>Print</Button>
                </h4>
                <br />
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
                <table id="view3" className="report-table">
                    <tbody>
                        <tr>
                            <td>{this.props.symbol_table[o.L_Stroke].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.L_Stroke].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.L_Stroke].units}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                {this.pcadmsg}{this.pcadmsg !== undefined && <br />}
                {this.errmsg1}{this.errmsg1 !== undefined && <br />}
                {this.errmsg0}
                <hr/>
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
