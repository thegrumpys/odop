import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, OverlayTrigger, Tooltip, Accordion, Card, ButtonGroup, InputGroup, Badge } from 'react-bootstrap';
import { clearAlerts } from '../store/alertsSlice';
import { getAlertsBySeverity, ERR, WARN, NOTICE, INFO } from './Alerts';
import { logUsage } from '../logUsage';
import SymbolValue from './SymbolValue';
import Value from './Value';
import config from '../config';
import { changeSystemControlsValue } from '../store/modelSlice';

const ContextAwareAccordion = ({ children }) => {
  const [activeKey, setActiveKey] = useState(null)
//  console.log("In ContextAwareAccordion activeKey=",activeKey);
  return (
    <Accordion className="mb-3" activeKey={activeKey} onSelect={eventKey => {
//      console.log('In ContextAwareAccordion activeket=',activeKey,'level=',level,'eventKey=',eventKey);
      if (activeKey === null) { // Is it now Collapsed?
//        console.log('In ContextAwareAccordion EXPAND');
        setActiveKey('0');
        setCaret(<span className="pb-3 pr-1"><i className="fas fa-caret-down" /></span>);
        logUsage('event', 'AlertsAccordion', { event_label: 'Level ' + level + '->' + eventKey + ' expand' });
      } else { // Otherwise it is already Expanded
        if (level !== eventKey) {
//          console.log('In ContextAwareAccordion EXPAND');
          setActiveKey('0');
          setCaret(<span className="pb-3 pr-1"><i className="fas fa-caret-down" /></span>);
          logUsage('event', 'AlertsAccordion', { event_label: 'Level ' + level + '->' + eventKey + ' expand' });
        } else {
//          console.log('In ContextAwareAccordion COLLAPSE');
          setActiveKey(null);
          setCaret(<span className="pb-3 pr-1"><i className="fas fa-caret-right" /></span>);
          logUsage('event', 'AlertsAccordion', { event_label: 'Level ' + level + '->' + eventKey + ' collapse' });
        }
      }
    }}>
      {children}
    </Accordion>
  );
}

export default function AlertsAccordion() {
//  console.log("AlertsAccordion - Mounting...");
  const [level, setLevel] = useState(ERR)
  const [caret, setCaret] = useState(<span className="pb-3 pr-1"><i className="fas fa-caret-right" /></span>)
  const alerts = useSelector((state) => state.alertsSlice.alerts);
  const type = useSelector((state) => state.modelSlice.model.type);
  const symbol_table = useSelector((state) => state.modelSlice.model.symbol_table);
  const system_controls = useSelector((state) => state.modelSlice.model.system_controls);
  const enable_auto_fix = useSelector((state) => state.modelSlice.model.system_controls.enable_auto_fix);
  const objective_value = useSelector((state) => state.modelSlice.model.result.objective_value);
  const dispatch = useDispatch();

  useEffect(() => {
//    console.log("AlertsAccordion - Mounted");
//    return () => console.log("AlertsAccordion - Unmounting ...");
    return () => { };
  }, []);

  useEffect(() => {
//    console.log("AlertsAccordion - alerts changed");
//    return () => console.log("AlertsAccordion - Unmounting ...");
    return () => { };
  }, [alerts]);

  useEffect(() => {
//    console.log("AlertsAccordion - type changed");
    dispatch(clearAlerts());
//    return () => console.log("AlertsAccordion - Unmounting ...");
    return () => { };
  }, [type]);

  const onHelpButton = (event) => {
//        console.log('In AlertsAccordion.onHelpButton','event=',event,'event.target=',event.target,'event.target.href=',event.target.href);
    logUsage('event', 'AlertsAccordion', { event_label: 'Help button: ' + event.target.href });
    event.preventDefault();
    window.open(event.target.href, '_blank');
  }

  const onAutoFixToggle = (event) => {
//    console.log('In AlertsAccordion.onAutoFixToggle','event=',event);
    var copy = Object.assign({}, system_controls);
    var label;
    if (copy.enable_auto_fix === 0.0) {
      copy.enable_auto_fix = 1.0;
      label = "enabled";
    } else {
      copy.enable_auto_fix = 0.0;
      label = "disabled";
    }
    disoatch(changeSystemControlsValue(copy));
    logUsage('event', 'AlertsAccordion', { event_label: 'AutoFixToggle ' + label });
  }

  var line = 1;
  var err_alerts;
  var warn_alerts;
  var notice_alerts;
  var info_alerts;
  var all_alerts = [];
  err_alerts = getAlertsBySeverity(ERR);
  warn_alerts = getAlertsBySeverity(WARN);
  notice_alerts = getAlertsBySeverity(NOTICE);
  info_alerts = getAlertsBySeverity(INFO);
  all_alerts = all_alerts.concat(err_alerts, warn_alerts, notice_alerts, info_alerts)
//        console.log('In AlertsAccordion.render','err_alerts=',err_alerts,'warn_alerts=',warn_alerts,'notice_alerts=',notice_alerts,'info_alerts=',info_alerts,'all_alerts=',all_alerts);
  return (
    <>
      <ContextAwareAccordion>
        <Card bg="light">
          <Card.Header>
            <InputGroup as="span">
              <InputGroup.Text>Alerts</InputGroup.Text>
              <ButtonGroup>
                <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={level} id="alertLevel"
                  onClick={() => setLevel(level)}>{caret}
                </Accordion.Toggle>
                <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={ERR}
                  onClick={() => setLevel(ERR)} active={level === ERR || level === WARN || level === NOTICE || level === INFO}>
                  {ERR}&nbsp;{err_alerts.length > 0 ? <Badge variant="danger">{err_alerts.length}</Badge> : ''}
                </Accordion.Toggle>
                <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={WARN}
                  onClick={() => setLevel(WARN)} active={level === WARN || level === NOTICE || level === INFO}>
                  {WARN}&nbsp;{warn_alerts.length > 0 ? <Badge variant="danger">{warn_alerts.length}</Badge> : ''}
                </Accordion.Toggle>
                <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={NOTICE}
                  onClick={() => setLevel(NOTICE)} active={level === NOTICE || level === INFO}>
                  {NOTICE}&nbsp;{notice_alerts.length > 0 ? <Badge variant="danger">{notice_alerts.length}</Badge> : ''}
                </Accordion.Toggle>
                <Accordion.Toggle as={Button} variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={INFO}
                  onClick={() => setLevel(INFO)} active={level === INFO}>
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
              <InputGroup.Checkbox aria-label="Checkbox for enabling Auto Fix" onChange={onAutoFixToggle} checked={enable_auto_fix} />
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
          {(level === ERR && (err_alerts.length > 0)) ||
            (level === WARN && (err_alerts.length > 0 || warn_alerts.length > 0)) ||
            (level === NOTICE && (err_alerts.length > 0 || warn_alerts.length > 0 || notice_alerts.length > 0)) ||
            (level === INFO && (err_alerts.length > 0 || warn_alerts.length > 0 || notice_alerts.length > 0 || info_alerts.length > 0)) ?
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <table className="col-12">
                  <thead>
                    <tr key="0">
                      <th>
                        <OverlayTrigger placement="top" overlay={<Tooltip>
                          Alert number<br />
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
                          Brief summary of alert<br />
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
                          Use entry field below to change value of the associated variable or constraint.<br />
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
                    {(level === ERR || level === WARN || level === NOTICE || level === INFO) &&
                      err_alerts.map((entry, index) => {
//                        console.log('In AlertsAccordion.render entry=',entry,'line=',line);
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
                            <td>{match !== undefined ? <Button variant="outline-info" href={match[2]} onClick={onHelpButton}>{match[1]}</Button> : ''}</td>
                          </tr>
                        );
                      })}
                    {(level === WARN || level === NOTICE || level === INFO) &&
                      warn_alerts.map((entry, index) => {
//                        console.log('In AlertsAccordion.render entry=',entry,'line=',line);
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
                            <td>{match !== undefined ? <Button variant="outline-info" href={match[2]} onClick={onHelpButton}>{match[1]}</Button> : ''}</td>
                          </tr>
                        );
                      })}
                    {(level === NOTICE || level === INFO) &&
                      notice_alerts.map((entry, index) => {
//                        console.log('In AlertsAccordion.render entry=',entry,'line=',line);
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
                            <td>{match !== undefined ? <Button variant="outline-info" href={match[2]} onClick={onHelpButton}>{match[1]}</Button> : ''}</td>
                          </tr>
                        );
                      })}
                    {(level === INFO) &&
                      info_alerts.map((entry, index) => {
//                        console.log('In AlertsAccordion.render entry=',entry,'line=',line);
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
                            <td>{match !== undefined ? <Button variant="outline-info" href={match[2]} onClick={onHelpButton}>{match[1]}</Button> : ''}</td>
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
