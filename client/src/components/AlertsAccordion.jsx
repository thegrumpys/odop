import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, OverlayTrigger, Tooltip, Accordion, Card, ButtonGroup, InputGroup, Badge } from 'react-bootstrap';
import { clearAlerts, getAlertsBySeverity, ERR, WARN, NOTICE, INFO } from './Alerts';
import { logUsage } from '../logUsage';
import SymbolValue from './SymbolValue';
import Value from './Value';
import config from '../config';
import Emitter from './Emitter';
import { useState } from 'react';
import CustomToggle from './CustomToggle'

var ContextAwareAccordion = function({ children }) {
//    console.log('In ContextAwareAccordion state=',this.state);
    const [activeKey, setActiveKey] = useState(null)
//    console.log("In ContextAwareAccordion activeKey=",activeKey);
    return (
        <Accordion className="col-md-12 mb-3" activeKey={activeKey} onSelect={eventKey => {
//            console.log('In ContextAwareAccordion activeket=',activeKey,'level=',this.state.level,'eventKey=',eventKey);
            if (activeKey === null) { // Is it now Collapsed?
//                console.log('In ContextAwareAccordion EXPAND');
                setActiveKey('0');
                this.setState({caret: <span className="pb-3 pr-1"><i className="fas fa-caret-down" /></span>});
             } else { // Otherwise it is already Expanded
                if (this.state.level !== eventKey) {
//                    console.log('In ContextAwareAccordion EXPAND');
                    setActiveKey('0');
                    this.setState({caret: <span className="pb-3 pr-1"><i className="fas fa-caret-down" /></span>});
                } else {
//                    console.log('In ContextAwareAccordion COLLAPSE');
                    setActiveKey(null);
                    this.setState({caret: <span className="pb-3 pr-1"><i className="fas fa-caret-right" /></span>});
                }
            }
         }}>
            {children}
        </Accordion>
    );
}

class AlertsAccordion extends Component {
  
    constructor(props) {
//        console.log('In AlertsAccordion.constructor props=',props);
        super(props);
        this.onOpen = this.onOpen.bind(this);
        this.onHelpButton = this.onHelpButton.bind(this);
        this.onClose = this.onClose.bind(this);
        ContextAwareAccordion = ContextAwareAccordion.bind(this);
        this.state = {
            level: ERR,
            caret: <span className="pb-3 pr-1"><i className="fas fa-caret-right" /></span>,
        };
    }

    componentDidMount() {
//        console.log('In componentDidMount');
        Emitter.on('clearAlerts', () => {
//            console.log('In componentDidMount clearAlerts handler');
            this.forceUpdate();
        });
        Emitter.on('addAlert', (alert) => {
//            console.log('In componentDidMount addAlert handler', alert);
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
//        console.log('In componentWillUnmount');
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
//        console.log('In AlertsAccordion.onOpen this=',this,'event=',event);
        logUsage('event', 'AlertsAccordion', { event_label: 'Button' });
    }
    
    onHelpButton(event) {
//        console.log('In AlertsAccordion.onHelpButton this=',this,'event=',event,'event.target=',event.target,'event.target.href=',event.target.href);
        logUsage('event', 'AlertsAccordion', { event_label: 'Help button: ' + event.target.href});
        event.preventDefault();
        window.open(event.target.href, '_blank');
    }
    
    onClose(event) {
//        console.log('In AlertsAccordion.onClose this=',this,'event=',event);
    }
    
    setLevel(level) {
//        console.log('In AlertsAccordion.setLevel this=',this,'level=',level);
        this.setState({
            level: level
        });
    }
    
    render() {
//        console.log('In AlertsAccordion.render this=',this);
        var line = 1;
        var err_alerts;
        var warn_alerts;
        var notice_alerts;
        var info_alerts;
        var all_alerts = [];
        err_alerts = getAlertsBySeverity(ERR);
        warn_alerts = getAlertsBySeverity(WARN);
        notice_alerts = getAlertsBySeverity(NOTICE);
        info_alerts = getAlertsBySeverity(INFO);
        all_alerts = all_alerts.concat(err_alerts,warn_alerts,notice_alerts,info_alerts)
//        console.log('In AlertsAccordion.render','err_alerts=',err_alerts,'warn_alerts=',warn_alerts,'notice_alerts=',notice_alerts,'info_alerts=',info_alerts,'all_alerts=',all_alerts);
        return (
            <>
                <ContextAwareAccordion>
                    <Card bg="light">
                        <Card.Header>
                            <InputGroup>
                                <ButtonGroup>
                                    <CustomToggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={this.state.level} id="alertLevel"
                                        onClick={() => this.setLevel(this.state.level)}>{this.state.caret}&nbsp;&nbsp;Alerts
                                    </CustomToggle>
                                    <CustomToggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={ERR}
                                        onClick={() => this.setLevel(ERR)} active={this.state.level === ERR || this.state.level === WARN || this.state.level === NOTICE || this.state.level === INFO}>
                                        {ERR}&nbsp;{err_alerts.length > 0 ? <Badge bg="danger" text='white'>{err_alerts.length}</Badge> : ''}
                                    </CustomToggle>
                                    <CustomToggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={WARN}
                                        onClick={() => this.setLevel(WARN)} active={this.state.level === WARN || this.state.level === NOTICE || this.state.level === INFO}>
                                        {WARN}&nbsp;{warn_alerts.length > 0 ? <Badge bg="danger" text='white'>{warn_alerts.length}</Badge> : ''}
                                    </CustomToggle>
                                    <CustomToggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={NOTICE}
                                        onClick={() => this.setLevel(NOTICE)} active={this.state.level === NOTICE || this.state.level === INFO}>
                                        {NOTICE}&nbsp;{notice_alerts.length > 0 ? <Badge bg="danger" text='white'>{notice_alerts.length}</Badge> : ''}
                                    </CustomToggle>
                                    <CustomToggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={INFO}
                                        onClick={() => this.setLevel(INFO)} active={this.state.level === INFO}>
                                        {INFO}&nbsp;{info_alerts.length > 0 ? <Badge bg="danger" text='white'>{info_alerts.length}</Badge> : ''}
                                    </CustomToggle>
                                </ButtonGroup>
                                <OverlayTrigger placement="bottom" overlay={
                                    <Tooltip>
                                        ALERTS are error, warning, notice and informational messages produced in response to design changes.
                                        Error alerts indicate a value outside its validity range.
                                        Warning alerts are produced if the relationship between two values is incorrect.
                                        Notice alerts summarize violated minimum or maximum constraints.
                                        Informational alerts highlight other general conditions.
                                        A red "badge" on each Alert button indicates the total number of alerts of this type.
                                        Close the Alerts panel by a second click on the same Alerts button.
                                    </Tooltip>
                                }>
                                    <span className="text-primary pl-2 pt-2"><i className="fas fa-info-circle"></i></span>
                                </OverlayTrigger>
                            </InputGroup>
                        </Card.Header>
                        {(this.state.level === ERR && (err_alerts.length > 0)) ||
                         (this.state.level === WARN && (err_alerts.length > 0 || warn_alerts.length > 0)) ||
                         (this.state.level === NOTICE && (err_alerts.length > 0 || warn_alerts.length > 0 || notice_alerts.length > 0)) ||
                         (this.state.level === INFO && (err_alerts.length > 0 || warn_alerts.length > 0 || notice_alerts.length > 0 || info_alerts.length > 0)) ?
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
                                        {(this.state.level === ERR || this.state.level === WARN || this.state.level === NOTICE || this.state.level === INFO) &&
                                            err_alerts.map((entry, index) => {
//                                            console.log('In AlertsAccordion.render entry=',entry,'line=',line);
                                            var hidden = config.node.env !== "production" ? false : (entry.element === undefined ? false : entry.element.hidden);
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
                                        {(this.state.level === WARN || this.state.level === NOTICE || this.state.level === INFO) &&
                                            warn_alerts.map((entry, index) => {
//                                            console.log('In AlertsAccordion.render entry=',entry,'line=',line);
                                            var hidden = config.node.env !== "production" ? false : (entry.element === undefined ? false : entry.element.hidden);
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
                                        {(this.state.level === NOTICE || this.state.level === INFO) &&
                                            notice_alerts.map((entry, index) => {
//                                            console.log('In AlertsAccordion.render entry=',entry,'line=',line);
                                            var hidden = config.node.env !== "production" ? false : (entry.element === undefined ? false : entry.element.hidden);
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
                                        {(this.state.level === INFO) &&
                                            info_alerts.map((entry, index) => {
//                                            console.log('In AlertsAccordion.render entry=',entry,'line=',line);
                                            var hidden = config.node.env !== "production" ? false : (entry.element === undefined ? false : entry.element.hidden);
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

export default connect(mapStateToProps)(AlertsAccordion);
