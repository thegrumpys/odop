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
import { changeSystemControlsValue } from '../store/actionCreators';

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
                logUsage('event', 'AlertsAccordion', { event_label: 'Level ' + this.state.level + '->' + eventKey + ' expand'});
             } else { // Otherwise it is already Expanded
                if (this.state.level !== eventKey) {
//                    console.log('In ContextAwareAccordion EXPAND');
                    setActiveKey('0');
                    this.setState({caret: <span className="pb-3 pr-1"><i className="fas fa-caret-down" /></span>});
                    logUsage('event', 'AlertsAccordion', { event_label: 'Level ' + this.state.level + '->' + eventKey + ' expand'});
                } else {
//                    console.log('In ContextAwareAccordion COLLAPSE');
                    setActiveKey(null);
                    this.setState({caret: <span className="pb-3 pr-1"><i className="fas fa-caret-right" /></span>});
                    logUsage('event', 'AlertsAccordion', { event_label: 'Level ' + this.state.level + '->' + eventKey + ' collapse'});
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
        this.onHelpButton = this.onHelpButton.bind(this);
        this.onAutoFixToggle = this.onAutoFixToggle.bind(this);
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

    onHelpButton(event) {
//        console.log('In AlertsAccordion.onHelpButton this=',this,'event=',event,'event.target=',event.target,'event.target.href=',event.target.href);
        logUsage('event', 'AlertsAccordion', { event_label: 'Help button: ' + event.target.href});
        event.preventDefault();
        window.open(event.target.href, '_blank');
    }
    
    setLevel(level) {
//        console.log('In AlertsAccordion.setLevel this=',this,'level=',level);
        this.setState({
            level: level
        });
    }
    
    onAutoFixToggle(event) {
//        console.log('In AlertsAccordion.onAutoFixToggle this=',this,'event=',event);
        var copy = Object.assign({}, this.props.system_controls);
        var label;
        if (copy.enable_auto_fix === 0.0) {
            copy.enable_auto_fix = 1.0;
            label = "enabled";
        } else {
            copy.enable_auto_fix = 0.0;
            label = "disabled";
        }
        this.props.changeSystemControlsValue(copy);
        logUsage('event', 'AlertsAccordion', { event_label: 'AutoFixToggle ' + label});
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
                            <InputGroup as="span">
                                <InputGroup.Text>Alerts</InputGroup.Text>
                                <ButtonGroup>
                                    <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={this.state.level} id="alertLevel"
                                        onClick={() => this.setLevel(this.state.level)}>{this.state.caret}
                                    </Accordion.Toggle>
                                    <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={ERR}
                                        onClick={() => this.setLevel(ERR)} active={this.state.level === ERR || this.state.level === WARN || this.state.level === NOTICE || this.state.level === INFO}>
                                        {ERR}&nbsp;{err_alerts.length > 0 ? <Badge variant="danger">{err_alerts.length}</Badge> : ''}
                                    </Accordion.Toggle>
                                    <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={WARN}
                                        onClick={() => this.setLevel(WARN)} active={this.state.level === WARN || this.state.level === NOTICE || this.state.level === INFO}>
                                        {WARN}&nbsp;{warn_alerts.length > 0 ? <Badge variant="danger">{warn_alerts.length}</Badge> : ''}
                                    </Accordion.Toggle>
                                    <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={NOTICE}
                                        onClick={() => this.setLevel(NOTICE)} active={this.state.level === NOTICE || this.state.level === INFO}>
                                        {NOTICE}&nbsp;{notice_alerts.length > 0 ? <Badge variant="danger">{notice_alerts.length}</Badge> : ''}
                                    </Accordion.Toggle>
                                    <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={INFO}
                                        onClick={() => this.setLevel(INFO)} active={this.state.level === INFO}>
                                        {INFO}&nbsp;{info_alerts.length > 0 ? <Badge variant="danger">{info_alerts.length}</Badge> : ''}
                                    </Accordion.Toggle>
                                </ButtonGroup>
                                <OverlayTrigger placement="bottom" overlay={
                                    <Tooltip className="tooltip-lg">
                                        <p>ALERTS are messages produced in response to design changes.</p>
                                        <p>Severity:</p>
                                        <ul>
                                            <li><b>Err</b> - Error alerts indicate a value outside its validity range.</li>
                                            <li><b>Warn</b> - Warning alerts are produced if the relationship between two values is incorrect.</li>
                                            <li><b>Notice</b> - Notice alerts summarize violated minimum or maximum constraints.</li>
                                            <li><b>Info</b> - Informational alerts highlight other general conditions.</li>
                                        </ul>
                                        <p>A red "badge" on each Alert button indicates the total number of alerts of this type.
                                        Close the Alerts panel by a second click on the same Alerts button.</p>
                                    </Tooltip>}>
                                    <span className="text-primary pl-2 pt-2"><i className="fas fa-info-circle"></i></span>
                                </OverlayTrigger>
                                <InputGroup.Text className="ml-auto">Auto Fix</InputGroup.Text>
                                <InputGroup.Checkbox aria-label="Checkbox for enabling Auto Fix" onChange={this.onAutoFixToggle} checked={this.props.enable_auto_fix}/>
                                <OverlayTrigger placement="bottom" overlay={
                                    <Tooltip className="tooltip-lg">
                                        <p>When checked, sets "Fixed" status of Independent Variables whose values are changed by user input.</p>
                                        <p>Applies only to future value changes. Does not affect any existing variables already in "Fixed" status.</p>
                                        <p>The behavior is the same as the File : Preferences enable_auto_fix value.</p>
                                    </Tooltip>}>
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
                                                <OverlayTrigger placement="bottom" overlay={<Tooltip className="tooltip-lg">
                                                        <p className="text-left">Severity:<ul>
                                                        <li><b>Err</b> - Error alerts indicate a value outside its validity range.</li>
                                                        <li><b>Warn</b> - Warning alerts are produced if the relationship between two values is incorrect.</li>
                                                        <li><b>Notice</b> - Notice alerts summarize violated minimum or maximum constraints.</li>
                                                        <li><b>Info</b> - Informational alerts highlight other general conditions.</li>
                                                        </ul></p>
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
    enable_auto_fix: state.model.system_controls.enable_auto_fix,
    objective_value: state.model.result.objective_value,
});

const mapDispatchToProps = {
    changeSystemControlsValue: changeSystemControlsValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertsAccordion);
