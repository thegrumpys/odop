import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { Button } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';
import { getAlertsBySeverity, ERR, WARN, NOTICE, INFO } from '../../components/Alerts';
import { UNINITIALIZED } from '../../store/actionTypes';

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
                    <span className="mr-auto">ODOP:Spring &nbsp; Hooke's Law Report &nbsp; &nbsp; <a href="https://www.springdesignsoftware.org"><small>https://www.springdesignsoftware.org</small></a></span>
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
                            <td>{this.props.symbol_table[o.Rate].name}</td>
                            <td>=</td>
                            <td>{(this.props.symbol_table[o.Rate].lmin & UNINITIALIZED) ? '?' : this.props.symbol_table[o.Rate].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Rate].units}</td>
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Free</b></td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td>{(0.0).toFixed(4)}</td>
                            <td>{(this.props.symbol_table[o.L_Free].lmin & UNINITIALIZED) ? '?' : this.props.symbol_table[o.L_Free].value.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td>{(this.props.symbol_table[o.Force_1].lmin & UNINITIALIZED) ? '?' : this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                            <td>{(this.props.symbol_table[o.Deflect_1].lmin & UNINITIALIZED) ? '?' : this.props.symbol_table[o.Deflect_1].value.toFixed(4)}</td>
                            <td>{(this.props.symbol_table[o.L_1].lmin & UNINITIALIZED) ? '?' : this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td>{(this.props.symbol_table[o.Force_2].lmin & UNINITIALIZED) ? '?' : this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                            <td>{(this.props.symbol_table[o.Deflect_2].lmin & UNINITIALIZED) ? '?' : this.props.symbol_table[o.Deflect_2].value.toFixed(4)}</td>
                            <td>{(this.props.symbol_table[o.L_2].lmin & UNINITIALIZED) ? '?' : this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table id="view3" className="report-table">
                    <tbody>
                        <tr>
                            <td>{this.props.symbol_table[o.L_Stroke].name}</td>
                            <td>=</td>
                            <td>{(this.props.symbol_table[o.L_Stroke].lmin & UNINITIALIZED) ? '?' : this.props.symbol_table[o.L_Stroke].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.L_Stroke].units}</td>
                        </tr>
                    </tbody>
                </table>
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
