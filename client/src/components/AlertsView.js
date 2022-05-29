import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { getAlertsBySeverity } from './Alerts';

class AlertsView extends Component {
  
    constructor(props) {
//        console.log('In AlertsView.ctor'');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false, // Default: do not display
        };
    }

    toggle(event) {
//        console.log('In AlertsView.toggle this=',this,'event=',event);
        this.setState({
            modal: !this.state.modal
        });
    }
    
    render() {
//        console.log('In AlertsView.render this=',this);
        var line = 1;
        return (
            <>
                <Button variant="primary" disabled={getAlertsBySeverity().length === 0} size="sm" onClick={this.toggle}>Alerts</Button>
                <Modal show={this.state.modal} onHide={this.toggle} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Alerts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Severity</th>
                                    <th>Name</th>
                                    <th>Message</th>
                                    <th>Help URL</th>
                               </tr>
                            </thead>
                            <tbody>
                                {getAlertsBySeverity('Err').map((entry) => {
//                                    console.log('In AlertsView.render entry=',entry,'line=',line);
                                    var match;
                                    if (entry.help_url !== undefined) {
                                        match = entry.help_url.match(/\[(.*)\]\((.*)\)/);
                                    }
                                    return (
                                        <tr className="text-not-feasible" key={line}>
                                            <td>{line++}</td>
                                            <td>{entry.severity}</td>
                                            <td>{entry.name}</td>
                                            <td>{entry.message}</td>
                                            <td>{match !== undefined ? <a className="" href={match[2]} className="btn btn-outline-info" rel="noopener noreferrer" target="_blank">{match[1]}</a> : ''}</td>
                                        </tr>
                                    );
                                })}
                                {getAlertsBySeverity('Warn').map((entry) => {
//                                    console.log('In AlertsView.render entry=',entry,'line=',line);
                                    var match;
                                    if (entry.help_url !== undefined) {
                                        match = entry.help_url.match(/\[(.*)\]\((.*)\)/);
                                    }
                                    return (
                                        <tr className="text-close-to-feasible" key={line}>
                                            <td>{line++}</td>
                                            <td>{entry.severity}</td>
                                            <td>{entry.name}</td>
                                            <td>{entry.message}</td>
                                            <td>{match !== undefined ? <a href={match[2]} className="btn btn-outline-info" rel="noopener noreferrer" target="_blank">{match[1]}</a> : ''}</td>
                                        </tr>
                                    );
                                })}
                                {getAlertsBySeverity('Info').map((entry) => {
//                                    console.log('In AlertsView.render entry=',entry,'line=',line);
                                    var match;
                                    if (entry.help_url !== undefined) {
                                        match = entry.help_url.match(/\[(.*)\]\((.*)\)/);
                                    }
                                    return (
                                        <tr className="text-feasible" key={line}>
                                            <td>{line++}</td>
                                            <td>{entry.severity}</td>
                                            <td>{entry.name}</td>
                                            <td>{entry.message}</td>
                                            <td>{match !== undefined ? <a href={match[2]} className="btn btn-outline-info" rel="noopener noreferrer" target="_blank">{match[1]}</a> : ''}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.toggle}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
});

export default connect(mapStateToProps)(AlertsView);
