import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getAlertsBySeverity } from './Alerts';
import { getFeasibilitySpanByName } from './Alerts';
import { logUsage } from '../logUsage';
import SymbolValue from './SymbolValue';

class AlertsModal extends Component {
  
    constructor(props) {
//        console.log('In AlertsModal.ctor'');
        super(props);
        this.onOpen = this.onOpen.bind(this);
        this.onHelpButton = this.onHelpButton.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            modal: false, // Default: do not display
        };
    }

    onOpen(event) {
//        console.log('In AlertsModal.onOpen this=',this,'event=',event);
        this.setState({
            modal: !this.state.modal
        });
        logUsage('event', 'AlertsModal', { event_label: 'Button' });
    }
    
    onHelpButton(event) {
//        console.log('In AlertsModal.onHelpButton this=',this,'event=',event,'event.target=',event.target,'event.target.href=',event.target.href);
        logUsage('event', 'AlertsModal', { event_label: 'Help button: ' + event.target.href});
        event.preventDefault();
        window.open(event.target.href, '_blank');
    }
    
    onClose(event) {
//        console.log('In AlertsModal.onClose this=',this,'event=',event);
        this.setState({
            modal: !this.state.modal
        });
    }
    
    render() {
//        console.log('In AlertsModal.render this=',this);
        var line = 1;
        return (
            <>
                <Button variant="primary" disabled={getAlertsBySeverity().length === 0} size="sm" onClick={this.onOpen}>Alerts&nbsp;
                    <span className="badge bg-danger">
                        {getAlertsBySeverity().length}
                    </span>
                </Button>&nbsp;
                <OverlayTrigger placement="bottom" overlay={<Tooltip>
                    ALERTS are error, warning and informational messages that are produced as you change the values of your design.
                    There are error alerts for each value when it is outside its validity value range.
                    There are warning alerts if the relationship between two values is incorrect.
                    There are informational alerts for each value when it is outside its constraint value range.
                    Etc.
                    </Tooltip>}>
                    <span><i className="fas fa-info-circle text-primary"></i></span>
                </OverlayTrigger>
                <Modal show={this.state.modal} onHide={this.onClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Alerts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className="report-table-borders">
                            <thead>
                                <tr key="0">
                                    <th>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>#</Tooltip>}>
                                            <span>#</span>
                                        </OverlayTrigger>
                                    </th>
                                    <th>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Severity</Tooltip>}>
                                            <span>Severity</span>
                                        </OverlayTrigger>
                                    </th>
                                    <th>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Message</Tooltip>}>
                                            <span>Message</span>
                                        </OverlayTrigger>
                                    </th>
                                    <th>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Name</Tooltip>}>
                                            <span>Name &amp;<br/>Feasiblity</span>
                                        </OverlayTrigger>
                                    </th>
                                    <th>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Change Value</Tooltip>}>
                                            <span>Value</span>
                                        </OverlayTrigger>
                                    </th>
                                    <th>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Details</Tooltip>}>
                                            <span>Details</span>
                                        </OverlayTrigger>
                                    </th>
                               </tr>
                            </thead>
                            <tbody>
                                {getAlertsBySeverity('Err').map((entry, index) => {
//                                    console.log('In AlertsModal.render entry=',entry,'line=',line);
                                    var match;
                                    if (entry.help_url !== undefined) {
                                        match = entry.help_url.match(/\[(.*)\]\((.*)\)/);
                                    }
                                    return (
                                        (entry.element === undefined || (entry.element !== undefined && !entry.element.hidden)) &&
                                        <tr key={line}>
                                            <td>{line++}</td>
                                            <td className="text-not-feasible">{entry.severity}</td>
                                            <td className="text-not-feasible">{entry.message}</td>
                                            <td>{entry.name}<br/>{getFeasibilitySpanByName(entry.name)}</td>
                                            {entry.element !== undefined && entry.element.type === "equationset" && entry.element.input  && !entry.element.hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                            {entry.element !== undefined && entry.element.type === "equationset" && !entry.element.input && !entry.element.hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                            {entry.element !== undefined && entry.element.type === "calcinput"   && entry.element.input  && !entry.element.hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                            {entry.element === undefined && <td></td>}
                                            <td>{match !== undefined ? <Button variant="outline-info" href={match[2]} onClick={this.onHelpButton}>{match[1]}</Button> : ''}</td>
                                        </tr>
                                    );
                                })}
                                {getAlertsBySeverity('Warn').map((entry, index) => {
//                                    console.log('In AlertsModal.render entry=',entry,'line=',line);
                                    var match;
                                    if (entry.help_url !== undefined) {
                                        match = entry.help_url.match(/\[(.*)\]\((.*)\)/);
                                    }
                                    return (
                                        (entry.element === undefined || (entry.element !== undefined && !entry.element.hidden)) &&
                                        <tr key={line}>
                                            <td>{line++}</td>
                                            <td className="text-close-to-feasible">{entry.severity}</td>
                                            <td className="text-close-to-feasible">{entry.message}</td>
                                            <td>{entry.name}<br/>{getFeasibilitySpanByName(entry.name)}</td>
                                            {entry.element !== undefined && entry.element.type === "equationset" && entry.element.input  && !entry.element.hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                            {entry.element !== undefined && entry.element.type === "equationset" && !entry.element.input && !entry.element.hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                            {entry.element !== undefined && entry.element.type === "calcinput"   && entry.element.input  && !entry.element.hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                            {entry.element === undefined && <td></td>}
                                            <td>{match !== undefined ? <Button variant="outline-info" href={match[2]} onClick={this.onHelpButton}>{match[1]}</Button> : ''}</td>
                                        </tr>
                                    );
                                })}
                                {getAlertsBySeverity('Viol').map((entry, index) => {
//                                    console.log('In AlertsModal.render entry=',entry,'line=',line);
                                    var match;
                                    if (entry.help_url !== undefined) {
                                        match = entry.help_url.match(/\[(.*)\]\((.*)\)/);
                                    }
                                    return (
                                        (entry.element === undefined || (entry.element !== undefined && !entry.element.hidden)) &&
                                        <tr key={line}>
                                            <td>{line++}</td>
                                            <td className="text-feasible">{entry.severity}</td>
                                            <td className="text-feasible">{entry.message}</td>
                                            <td>{entry.name}<br/>{getFeasibilitySpanByName(entry.name)}</td>
                                            {entry.element !== undefined && entry.element.type === "equationset" && entry.element.input  && !entry.element.hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                            {entry.element !== undefined && entry.element.type === "equationset" && !entry.element.input && !entry.element.hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                            {entry.element !== undefined && entry.element.type === "calcinput"   && entry.element.input  && !entry.element.hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                            {entry.element === undefined && <td></td>}
                                            <td>{match !== undefined ? <Button variant="outline-info" href={match[2]} onClick={this.onHelpButton}>{match[1]}</Button> : ''}</td>
                                        </tr>
                                    );
                                })}
                                {getAlertsBySeverity('Info').map((entry, index) => {
//                                    console.log('In AlertsModal.render entry=',entry,'line=',line);
                                    var match;
                                    if (entry.help_url !== undefined) {
                                        match = entry.help_url.match(/\[(.*)\]\((.*)\)/);
                                    }
                                    return (
                                        (entry.element === undefined || (entry.element !== undefined && !entry.element.hidden)) &&
                                        <tr key={line}>
                                            <td>{line++}</td>
                                            <td className="text-strictly-feasible">{entry.severity}</td>
                                            <td className="text-strictly-feasible">{entry.message}</td>
                                            <td>{entry.name}<br/>{getFeasibilitySpanByName(entry.name)}</td>
                                            {entry.element !== undefined && entry.element.type === "equationset" && entry.element.input  && !entry.element.hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                            {entry.element !== undefined && entry.element.type === "equationset" && !entry.element.input && !entry.element.hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                            {entry.element !== undefined && entry.element.type === "calcinput"   && entry.element.input  && !entry.element.hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                            {entry.element === undefined && <td></td>}
                                            <td>{match !== undefined ? <Button variant="outline-info" href={match[2]} onClick={this.onHelpButton}>{match[1]}</Button> : ''}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.onClose}>Close</Button>
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

export default connect(mapStateToProps)(AlertsModal);
