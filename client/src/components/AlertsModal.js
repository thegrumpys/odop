import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, OverlayTrigger, Tooltip, Accordion, Card } from 'react-bootstrap';
import { getAlertsBySeverity } from './Alerts';
import { logUsage } from '../logUsage';
import SymbolValue from './SymbolValue';
import Value from './Value';
import config from '../config';

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
        var all_alerts = getAlertsBySeverity();
        return (
            <>
                <Accordion className="col-md-12 mb-3">
                    <Card bg="light">
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="primary" size="sm" eventKey="0" disabled={all_alerts.length === 0} >
                                Alerts&nbsp;{all_alerts.length > 0 ?<span className="badge bg-danger">{all_alerts.length}</span> : ''}
                            </Accordion.Toggle>
                            &nbsp;
                            <OverlayTrigger placement="bottom" overlay={
                                <Tooltip>
                                    ALERTS are error, warning, notice and informational messages that are produced as you change the values of your design.
                                    There are error alerts for each value when it is outside its validity value range.
                                    There are warning alerts if the relationship between two values is incorrect.
                                    There are notice alerts if minimum or maximum constraints are violated.
                                    There are informational alerts for other general conditions.
                                    Etc.
                                </Tooltip>
                            }>
                                <span><i className="fas fa-info-circle text-primary"></i></span>
                            </OverlayTrigger>
                        </Card.Header>
                        {all_alerts.length > 0 ?
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <table className="col-12">
                                    <thead>
                                        <tr key="0">
                                            <th>
                                                <OverlayTrigger placement="top" overlay={<Tooltip>
                                                Alert number<br/>
                                                Alerts are sorted by Severity
                                                </Tooltip>}>
                                                    <span>#</span>
                                                </OverlayTrigger>
                                            </th>
                                            <th>
                                                <OverlayTrigger placement="bottom" overlay={<Tooltip>
                                                <b>Error (Err):</b><br/>
                                                value outside valid range<br/>
                                                <b>Warning (Warn):</b><br/>
                                                relationship between two values is incorrect or invalid<br/>
                                                <b>Notice (Notice):</b><br/>
                                                significantly violated constraints<br/>
                                                <b>Information (Info):</b><br/>
                                                insights about aspects of system operation
                                                </Tooltip>}>
                                                    <span>Severity</span>
                                                </OverlayTrigger>
                                            </th>
                                            <th>
                                                <OverlayTrigger placement="top" overlay={<Tooltip>
                                                Summary of alert<br/>
                                                Color tracks Severity
                                                </Tooltip>}>
                                                            <span>Message</span>
                                                </OverlayTrigger>
                                            </th>
                                            <th>
                                                <OverlayTrigger placement="top" overlay={<Tooltip>
                                                Name of associated variable
                                                
                                                </Tooltip>}>
                                                    <span>Name</span>
                                                </OverlayTrigger>
                                            </th>
                                            <th>
                                                <OverlayTrigger placement="top" overlay={<Tooltip>
                                                Use entry field below to change value of associated variable<br/>
                                                Color below tracks design feasibility or message severity
                                                </Tooltip>}>
                                                    <span>Value</span>
                                                </OverlayTrigger>
                                            </th>
                                            <th>
                                                <OverlayTrigger placement="top" overlay={<Tooltip>
                                                Use "Help" button below to see details of a specific alert
                                                </Tooltip>}>
                                                    <span>Details</span>
                                                </OverlayTrigger>
                                            </th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                        {getAlertsBySeverity('Err').map((entry, index) => {
//                                            console.log('In AlertsModal.render entry=',entry,'line=',line);
                                            var hidden = config.node.env !== "production" ? false : entry.element.hidden;
                                            var match;
                                            if (entry.help_url !== undefined) {
                                                match = entry.help_url.match(/\[(.*)\]\((.*)\)/);
                                            }
                                            return (
                                                (entry.element === undefined || (entry.element !== undefined && !hidden)) &&
                                                <tr key={line}>
                                                    <td>{line++}</td>
                                                    <td className={entry.className}>{entry.severity}</td>
                                                    <td className={entry.className}>{entry.message}</td>
                                                    <td>{entry.name}</td>
                                                    {entry.element !== undefined && entry.value !== undefined && !hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                                    {entry.element !== undefined && entry.value === undefined && !hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                                    {entry.element === undefined && entry.value !== undefined && <Value id={entry.name} value={entry.value} />}
                                                    {entry.element === undefined && entry.value === undefined && <td></td>}
                                                    <td>{match !== undefined ? <Button variant="outline-info" href={match[2]} onClick={this.onHelpButton}>{match[1]}</Button> : ''}</td>
                                                </tr>
                                            );
                                        })}
                                        {getAlertsBySeverity('Warn').map((entry, index) => {
//                                            console.log('In AlertsModal.render entry=',entry,'line=',line);
                                            var hidden = config.node.env !== "production" ? false : entry.element.hidden;
                                            var match;
                                            if (entry.help_url !== undefined) {
                                                match = entry.help_url.match(/\[(.*)\]\((.*)\)/);
                                            }
                                            return (
                                                (entry.element === undefined || (entry.element !== undefined && !hidden)) &&
                                                <tr key={line}>
                                                    <td>{line++}</td>
                                                    <td className={entry.className}>{entry.severity}</td>
                                                    <td className={entry.className}>{entry.message}</td>
                                                    <td>{entry.name}</td>
                                                    {entry.element !== undefined && entry.value !== undefined && !hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                                    {entry.element !== undefined && entry.value === undefined && !hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                                    {entry.element === undefined && entry.value !== undefined && <Value id={entry.name} value={entry.value} />}
                                                    {entry.element === undefined && entry.value === undefined && <td></td>}
                                                    <td>{match !== undefined ? <Button variant="outline-info" href={match[2]} onClick={this.onHelpButton}>{match[1]}</Button> : ''}</td>
                                                </tr>
                                            );
                                        })}
                                        {getAlertsBySeverity('Notice').map((entry, index) => {
//                                            console.log('In AlertsModal.render entry=',entry,'line=',line);
                                            var hidden = config.node.env !== "production" ? false : entry.element.hidden;
                                            var match;
                                            if (entry.help_url !== undefined) {
                                                match = entry.help_url.match(/\[(.*)\]\((.*)\)/);
                                            }
                                            return (
                                                (entry.element === undefined || (entry.element !== undefined && !hidden)) &&
                                                <tr key={line}>
                                                    <td>{line++}</td>
                                                    <td className={entry.className}>{entry.severity}</td>
                                                    <td className={entry.className}>{entry.message}</td>
                                                    <td>{entry.name}</td>
                                                    {entry.element !== undefined && entry.value !== undefined && !hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                                    {entry.element !== undefined && entry.value === undefined && !hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                                    {entry.element === undefined && entry.value !== undefined && <Value id={entry.name} value={entry.value} />}
                                                    {entry.element === undefined && entry.value === undefined && <td></td>}
                                                    <td>{match !== undefined ? <Button variant="outline-info" href={match[2]} onClick={this.onHelpButton}>{match[1]}</Button> : ''}</td>
                                                </tr>
                                            );
                                        })}
                                        {getAlertsBySeverity('Info').map((entry, index) => {
//                                            console.log('In AlertsModal.render entry=',entry,'line=',line);
                                            var hidden = config.node.env !== "production" ? false : entry.element.hidden;
                                            var match;
                                            if (entry.help_url !== undefined) {
                                                match = entry.help_url.match(/\[(.*)\]\((.*)\)/);
                                           }
                                            return (
                                                (entry.element === undefined || (entry.element !== undefined && !hidden)) &&
                                                <tr key={line}>
                                                    <td>{line++}</td>
                                                    <td className={entry.className}>{entry.severity}</td>
                                                    <td className={entry.className}>{entry.message}</td>
                                                    <td>{entry.name}</td>
                                                    {entry.element !== undefined && entry.value !== undefined && !hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                                    {entry.element !== undefined && entry.value === undefined && !hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} />}
                                                    {entry.element === undefined && entry.value !== undefined && <Value id={entry.name} value={entry.value} />}
                                                    {entry.element === undefined && entry.value === undefined && <td></td>}
                                                    <td>{match !== undefined ? <Button variant="outline-info" href={match[2]} onClick={this.onHelpButton}>{match[1]}</Button> : ''}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </Card.Body>
                        </Accordion.Collapse>
                        :
                        ''}
                    </Card>
                </Accordion>
            </>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
});

export default connect(mapStateToProps)(AlertsModal);
