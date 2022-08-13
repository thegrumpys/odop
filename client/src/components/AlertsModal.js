import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, OverlayTrigger, Tooltip, Accordion, Card, ButtonGroup, InputGroup, Badge } from 'react-bootstrap';
import { clearAlerts, getAlertsBySeverity } from './Alerts';
import { logUsage } from '../logUsage';
import SymbolValue from './SymbolValue';
import Value from './Value';
import config from '../config';
import Emitter from './Emitter';
import { useState, useContext } from 'react';
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

function ContextAwareAccordion({ children }) {
    const [activeKey, setActiveKey] = useState(null)
    console.log("In ContextAwareAccordion activeKey=",activeKey);
    const currentEventKey = useContext(AccordionContext);
    console.log("In ContextAwareAccordion currentEventKey=",currentEventKey);
    return (
        <Accordion className="col-md-12 mb-3" activeKey={activeKey} onSelect={eventKey => {
            console.log('In ContextAwareAccordion currentEventKey=',currentEventKey,'eventKey=',eventKey);
            if (currentEventKey !== eventKey) {
                setActiveKey('0');
            } else {
                setActiveKey(null);
            }
         }}>
            {children}
        </Accordion>
    );
}

//function ContextAwareToggle({ children, eventKey, callback }) {
//    console.log("In ContextAwareToggle eventKey=",eventKey,'callback=',callback);
//    const currentEventKey = useContext(AccordionContext);
//    console.log("In ContextAwareToggle AccordionContext=",AccordionContext,"currentEventKey=",currentEventKey);
//    const decoratedOnClick = useAccordionToggle(
//        eventKey,
//        () => {
//            console.log("In ContextAwareToggle.decoratedOnClick currentEventKey=",currentEventKey,"eventKey=",eventKey);
//            callback && currentEventKey !== eventKey && callback(eventKey)
//        },
//    );
//    const isCurrentEventKey = currentEventKey === eventKey;
//    console.log("In ContextAwareToggle isCurrentEventKey=",isCurrentEventKey);
//    return (
//        <button
//            type="button"
//            style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
//            onClick={decoratedOnClick}
//        >
//            {children}
//        </button>
//    );
//}

class AlertsModal extends Component {
  
    constructor(props) {
//        console.log('In AlertsModal.constructor props=',props);
        super(props);
        this.onOpen = this.onOpen.bind(this);
        this.onHelpButton = this.onHelpButton.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            modal: false, // Default: do not display
            level: 'Error',
        };
    }

    componentDidMount() {
        Emitter.on('clearAlerts', () => {
//            console.log('clearAlerts');
            this.forceUpdate();
        });
        Emitter.on('addAlert', (alert) => {
//            console.log('addAlert', alert);
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        Emitter.off('clearAlerts');
        Emitter.off('addAlerts');
    }

    componentDidUpdate(prevProps) {
//        console.log('In Alerts.componentDidUpdate this=',this,'prevProps=',prevProps);
        if (prevProps.type !== this.props.type) {
//            console.log('In Alerts.componentDidUpdate prevProps.type=',prevProps.type,'props.type=',this.props.type);
//            console.log('In Alerts.componentDidUpdate this.state.alerts=',this.state.alerts);
            clearAlerts();
        }
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
    
    setLevel(level) {
        this.setState({
            level: level
        });
    }
    
    render() {
//        console.log('In AlertsModal.render this=',this);
        var line = 1;
        var err_alerts;
        var warning_alerts;
        var notice_alerts;
        var info_alerts;
        var all_alerts = [];
        err_alerts = getAlertsBySeverity('Err');
        warning_alerts = getAlertsBySeverity('Warning');
        notice_alerts = getAlertsBySeverity('Notice');
        info_alerts = getAlertsBySeverity('Info');
        all_alerts = all_alerts.concat(err_alerts,warning_alerts,notice_alerts,info_alerts)
//        console.log('In AlertsModal.render all_alerts=',all_alerts);
        return (
            <>
                <ContextAwareAccordion>
                    <Card bg="light">
                        <Card.Header>
                                            <InputGroup>
                                                <InputGroup.Text id="alertLevel" size="sm"><i class="fas fa-caret-right"></i>&nbsp;&nbsp;Alerts</InputGroup.Text>
                                                <ButtonGroup>
                                                    <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0}  eventKey="0"
                                                        onClick={() => this.setLevel("Error")} active={this.state.level === "Error" || this.state.level === "Warning" || this.state.level === "Notice" || this.state.level === "Info"}>
                                                        Err&nbsp;{err_alerts.length > 0 ? <Badge variant="danger">{err_alerts.length}</Badge> : ''}
                                                    </Accordion.Toggle>
                                                    <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0}  eventKey="1"
                                                        onClick={() => this.setLevel("Warning")} active={this.state.level === "Warning" || this.state.level === "Notice" || this.state.level === "Info"}>
                                                        Warn&nbsp;{warning_alerts.length > 0 ? <Badge variant="danger">{warning_alerts.length}</Badge> : ''}
                                                    </Accordion.Toggle>
                                                    <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0}  eventKey="2"
                                                        onClick={() => this.setLevel("Notice")} active={this.state.level === "Notice" || this.state.level === "Info"}>
                                                        Notice&nbsp;{notice_alerts.length > 0 ? <Badge variant="danger">{notice_alerts.length}</Badge> : ''}
                                                    </Accordion.Toggle>
                                                    <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0}  eventKey="3"
                                                        onClick={() => this.setLevel("Info")} active={this.state.level === "Info"}>
                                                        Info&nbsp;{info_alerts.length > 0 ? <Badge variant="danger">{info_alerts.length}</Badge> : ''}
                                                    </Accordion.Toggle>
                                                </ButtonGroup>
                                                &nbsp;
                                                <OverlayTrigger placement="bottom" overlay={
                                                    <Tooltip>
                                                        ALERTS are error, warning, notice and informational messages produced in response to design changes.
                                                        Error alerts indicate a value outside its validity range.
                                                        Warning alerts are produced if the relationship between two values is incorrect.
                                                        Notice alerts summarize violated minimum or maximum constraints.
                                                        Informational alerts highlight other general conditions.
                                                        A red "badge" on the Alerts button indicates the total number of pending alerts.
                                                        Close the Alerts panel with a second click on the Alerts button.
                                                    </Tooltip>
                                                }>
                                                    <span><i className="fas fa-info-circle text-primary mt-2"></i></span>
                                                </OverlayTrigger>
                                            </InputGroup>
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
                                                        Brief summary of alert<br/>
                                                        Font tracks Severity
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
                                                        Use entry field below to change value of the associated variable or constraint.<br/>
                                                       Where possible, the color below tracks design feasibility.
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
                                        {(this.state.level === "Error" || this.state.level === "Warning" || this.state.level === "Notice" || this.state.level === "Info") && 
                                            err_alerts.map((entry, index) => {
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
                                        {(this.state.level === "Warning" || this.state.level === "Notice" || this.state.level === "Info") && 
                                            warning_alerts.map((entry, index) => {
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
                                        {(this.state.level === "Notice" || this.state.level === "Info") && 
                                            notice_alerts.map((entry, index) => {
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
                                        {(this.state.level === "Info") && 
                                            info_alerts.map((entry, index) => {
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
                </ContextAwareAccordion>
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
