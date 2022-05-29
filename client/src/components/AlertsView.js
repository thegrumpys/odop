import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { getAlertsBySeverity } from './Alerts';

class AlertsView extends Component {
    render() {
        var line = 1;
        return (
            <>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Severity</th>
                            <th>Name</th>
                            <th>Message</th>
                       </tr>
                    </thead>
                    <tbody>
                        {getAlertsBySeverity('Err').map((entry) => {
//                            console.log('In AlertsView.render entry=',entry,'line=',line);
                            return (
                                <tr className="text-not-feasible" key={line}>
                                    <td>{line++}</td>
                                    <td>{entry.severity}</td>
                                    <td>{entry.name}</td>
                                    <td>{entry.message}</td>
                                </tr>
                            );
                        })}
                        {getAlertsBySeverity('Warn').map((entry) => {
//                            console.log('In AlertsView.render entry=',entry,'line=',line);
                            return (
                                <tr className="text-close-to-feasible" key={line}>
                                    <td>{line++}</td>
                                    <td>{entry.severity}</td>
                                    <td>{entry.name}</td>
                                    <td>{entry.message}</td>
                                </tr>
                            );
                        })}
                        {getAlertsBySeverity('Info').map((entry) => {
//                            console.log('In AlertsView.render entry=',entry,'line=',line);
                            return (
                                <tr className="text-feasible" key={line}>
                                    <td>{line++}</td>
                                    <td>{entry.severity}</td>
                                    <td>{entry.name}</td>
                                    <td>{entry.message}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
});

export default connect(mapStateToProps)(AlertsView);
