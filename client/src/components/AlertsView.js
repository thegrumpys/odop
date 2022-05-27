import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { getAlerts } from './Alerts';

class AlertsView extends Component {

    render() {
        var alerts = getAlerts();
//        console.log('In AlertsView.render this.state.alerts=',JSON.stringify(alerts));
        return (
            <>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Message</th>
                       </tr>
                    </thead>
                    <tbody>
                        {alerts.map((entry,i) => {
//                            console.log('In AlertsView.render entry=',entry,'i=',i);
                            return (
                                <tr key={i}>
                                    <td>{i}</td>
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
