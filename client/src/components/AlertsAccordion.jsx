import { useDispatch, useSelector } from "react-redux";
import { Button, OverlayTrigger, Tooltip, Accordion, Card, ButtonGroup, InputGroup, Badge } from 'react-bootstrap';
import { getAlertsBySeverity, ERR, WARN, NOTICE, INFO } from './Alerts';
import { logUsage } from '../logUsage';
import SymbolValue from './SymbolValue';
import Value from './Value';
import { changeSystemControlsValue } from '../store/actions';
import { setActiveKey, setCaret, setLevel } from '../store/actions';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { useAuth } from './AuthProvider';

const ContextAwareAccordion = ({ children }) => {
  const activeKey = useSelector((state) => state.alertsSlice.activeKey);
  const level = useSelector((state) => state.alertsSlice.level);
  const dispatch = useDispatch();
  return (
    <Accordion flush className="mb-3" activeKey={activeKey} onSelect={eventKey => {
      if (activeKey === null) { // Is it now Collapsed?
//        console.log('ContextAwareAccordion EXPAND');
        dispatch(setActiveKey('0'));
        dispatch(setCaret("fas fa-caret-down"));
        logUsage('event', 'AlertsAccordion', { event_label: 'Level ' + level + '->' + eventKey + ' expand' });
      } else { // Otherwise it is already Expanded
        if (level !== eventKey) {
//          console.log('ContextAwareAccordion EXPAND');
          dispatch(setActiveKey('0'));
          dispatch(setCaret("fas fa-caret-down"));
          logUsage('event', 'AlertsAccordion', { event_label: 'Level ' + level + '->' + eventKey + ' expand' });
        } else {
//          console.log('ContextAwareAccordion COLLAPSE');
          dispatch(setActiveKey(null));
          dispatch(setCaret("fas fa-caret-right" ));
          logUsage('event', 'AlertsAccordion', { event_label: 'Level ' + level + '->' + eventKey + ' collapse' });
        }
      }
    }}>
      {children}
    </Accordion>
  );
}

function ContextAwareToggle({ children, variant, size, disabled, eventKey, onClick, active }) {
//  console.log('AlertsAccordion - Mounting...','variant=',variant,'size=',size,'disabled=',disabled,'eventKey=',eventKey,'onClick=',onClick,'active=',active);
  const decoratedOnClick = useAccordionButton(eventKey, onClick);

  return (
    <Button variant={variant} size={size} disabled={disabled} onClick={decoratedOnClick} active={active}>
      {children}
    </Button>
  );
}

export default function AlertsAccordion() {
//  console.log('AlertsAccordion - Mounting...');
  const caret = useSelector((state) => state.alertsSlice.caret);
  const level = useSelector((state) => state.alertsSlice.level);
  const model_system_controls = useSelector((state) => state.model.system_controls);
  const dispatch = useDispatch();
  const { authState } = useAuth();

  const onHelpButton = (event) => {
//    console.log('AlertsAccordion.onHelpButton', 'event=', event, 'event.target=', event.target, 'event.target.href=', event.target.href);
    logUsage('event', 'AlertsAccordion', { event_label: 'Help button: ' + event.target.href });
    event.preventDefault();
    window.open(event.target.href, '_blank');
  }

  const onAutoFixToggle = (event) => {
//    console.log('AlertsAccordion.onAutoFixToggle', 'event=', event);
    var copy_enable_auto_fix_value = model_system_controls.enable_auto_fix.value;
    var label;
    if (copy_enable_auto_fix_value === 0.0) {
      copy_enable_auto_fix_value = 1.0;
      label = "enabled";
    } else {
      copy_enable_auto_fix_value = 0.0;
      label = "disabled";
    }
    dispatch(changeSystemControlsValue({ enable_auto_fix: copy_enable_auto_fix_value}));
    logUsage('event', 'AlertsAccordion', { event_label: 'AutoFixToggle ' + label });
  }

  const onAutoSearchToggle = (event) => {
//    console.log('AlertsAccordion.onAutoSearchToggle', 'event=', event);
    var copy_enable_auto_search_value = model_system_controls.enable_auto_search.value;
    var label;
    if (copy_enable_auto_search_value === 0.0) {
      copy_enable_auto_search_value = 1.0;
      label = "enabled";
    } else {
      copy_enable_auto_search_value = 0.0;
      label = "disabled";
    }
    dispatch(changeSystemControlsValue({ enable_auto_search: copy_enable_auto_search_value}));
    logUsage('event', 'AlertsAccordion', { event_label: 'AutoSearchToggle ' + label });
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
//  console.log('AlertsAccordion.render', 'err_alerts=', err_alerts, 'warn_alerts=', warn_alerts, 'notice_alerts=', notice_alerts, 'info_alerts=', info_alerts, 'all_alerts=', all_alerts);
  return (
    <>
      <ContextAwareAccordion>
        <Card style={{ backgroundColor: '#eeeeee' }}>
          <Card.Header>
            <InputGroup as="span">
              <InputGroup.Text>Alerts</InputGroup.Text>
              <ButtonGroup>
                <ContextAwareToggle variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={level}
                  onClick={() => dispatch(setLevel(level))}>
                  <span className="pb-3 pe-1"><i className={caret} /></span>
                </ContextAwareToggle>
                <ContextAwareToggle variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={ERR}
                  onClick={() => dispatch(setLevel(ERR))} active={level === ERR || level === WARN || level === NOTICE || level === INFO}>
                  {ERR}&nbsp;{err_alerts.length > 0 ? <Badge bg="danger">{err_alerts.length}</Badge> : ''}
                </ContextAwareToggle>
                <ContextAwareToggle variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={WARN}
                  onClick={() => dispatch(setLevel(WARN))} active={level === WARN || level === NOTICE || level === INFO}>
                  {WARN}&nbsp;{warn_alerts.length > 0 ? <Badge bg="danger">{warn_alerts.length}</Badge> : ''}
                </ContextAwareToggle>
                <ContextAwareToggle variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={NOTICE}
                  onClick={() => dispatch(setLevel(NOTICE))} active={level === NOTICE || level === INFO}>
                  {NOTICE}&nbsp;{notice_alerts.length > 0 ? <Badge bg="danger">{notice_alerts.length}</Badge> : ''}
                </ContextAwareToggle>
                <ContextAwareToggle variant="outline-primary" size="sm" disabled={all_alerts.length === 0} eventKey={INFO}
                  onClick={() => dispatch(setLevel(INFO))} active={level === INFO}>
                  {INFO}&nbsp;{info_alerts.length > 0 ? <Badge bg="danger">{info_alerts.length}</Badge> : ''}
                </ContextAwareToggle>
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
                <span className="text-primary px-2 pt-2"><i className="fas fa-info-circle"></i></span>
              </OverlayTrigger>
              
              <InputGroup.Text className="ms-auto">Auto Fix</InputGroup.Text>
              <InputGroup.Checkbox id="auto_fix" aria-label="Checkbox for enabling Auto Fix" onChange={onAutoFixToggle} checked={model_system_controls.enable_auto_fix.value} />
              <OverlayTrigger placement="bottom" overlay={
                <Tooltip className="tooltip-lg">
                  <p>When checked, sets "Fixed" status of Independent Variables whose values are changed by user input.</p>
                  <p>Applies only to future value changes. Does not affect any existing variables already in "Fixed" status.</p>
                  <p>The behavior is the same as the File : Preferences enable_auto_fix value.</p>
                </Tooltip>}>
                <span className="text-primary px-2 py-2 pt-2 pe-5"><i className="fas fa-info-circle"></i></span>
              </OverlayTrigger>

              <InputGroup.Text>Auto Search</InputGroup.Text>
              <InputGroup.Checkbox id="auto_search" aria-label="Checkbox for enabling Auto Search" onChange={onAutoSearchToggle} checked={model_system_controls.enable_auto_search.value} />
              <OverlayTrigger placement="bottom" overlay={
                <Tooltip className="tooltip-lg">
                <p>When checked, a Search is automatically triggered when the the user changes a value, the current design is not feasible and the user:</p>
                <ul>
                  <li>pushes the "Enter" key <br/> or</li>
                  <li>pushes the "Tab" key <br/> or</li>
                  <li>clicks out of the field containing the changed value</li>
                </ul>
                  <p>Enter <i>AutoSearch</i> in Help lookup (above) for more detail.</p>
                  <p>When unchecked, the Search feature executes only when a Search (solve) button is pushed or the
                     Action : Search (solve) menu entry is invoked.</p>
                  <p>The behavior is the same as the File : Preferences enable_auto_search value.</p>
                </Tooltip>}>
                <span className="text-primary px-2 py-2 pt-2"><i className="fas fa-info-circle"></i></span>
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
                          <p className="text-start">Severity:</p>
                          <ul>
                            <li><b>Err</b> - Error alerts indicate a value outside its validity range.</li>
                            <li><b>Warn</b> - Warning alerts are produced if the relationship between two values is incorrect.</li>
                            <li><b>Notice</b> - Notice alerts summarize violated minimum or maximum constraints.</li>
                            <li><b>Info</b> - Informational alerts highlight other general conditions.</li>
                          </ul>
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
//                        console.log('AlertsAccordion.render entry=',entry,'line=',line);
                        var hidden = authState.isAdmin                ? false : (entry.element === undefined ? false : entry.element.hidden);
                        var match = null;
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
                            {entry.element !== undefined && !hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} valueName={entry.valueName} />}
                            {entry.element === undefined && entry.value !== undefined && <Value id={entry.name} value={entry.value} />}
                            {entry.element === undefined && entry.value === undefined && <td></td>}
                            <td>{match !== null ? <Button variant="outline-info" href={match[2]} onClick={onHelpButton}>{match[1]}</Button> : ''}</td>
                          </tr>
                        );
                      })}
                    {(level === WARN || level === NOTICE || level === INFO) &&
                      warn_alerts.map((entry, index) => {
//                        console.log('AlertsAccordion.render entry=',entry,'line=',line);
                        var hidden = authState.isAdmin ? false : (entry.element === undefined ? false : entry.element.hidden);
                        var match = null;
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
                            {entry.element !== undefined && !hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} valueName={entry.valueName} />}
                            {entry.element === undefined && entry.value !== undefined && <Value id={entry.name} value={entry.value} />}
                            {entry.element === undefined && entry.value === undefined && <td></td>}
                            <td>{match !== null ? <Button variant="outline-info" href={match[2]} onClick={onHelpButton}>{match[1]}</Button> : ''}</td>
                          </tr>
                        );
                      })}
                    {(level === NOTICE || level === INFO) &&
                      notice_alerts.map((entry, index) => {
//                        console.log('AlertsAccordion.render entry=',entry,'line=',line);
                        var hidden = authState.isAdmin ? false : (entry.element === undefined ? false : entry.element.hidden);
                        var match = null;
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
                            {entry.element !== undefined && !hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} valueName={entry.valueName} />}
                            {entry.element === undefined && entry.value !== undefined && <Value id={entry.name} value={entry.value} />}
                            {entry.element === undefined && entry.value === undefined && <td></td>}
                            <td>{match !== null ? <Button variant="outline-info" href={match[2]} onClick={onHelpButton}>{match[1]}</Button> : ''}</td>
                          </tr>
                        );
                      })}
                    {(level === INFO) &&
                      info_alerts.map((entry, index) => {
//                        console.log('AlertsAccordion.render entry=',entry,'line=',line);
                        var hidden = authState.isAdmin ? false : (entry.element === undefined ? false : entry.element.hidden);
                        var match = null;
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
                            {entry.element !== undefined && !hidden && <SymbolValue key={entry.element.name} element={entry.element} index={index} valueName={entry.valueName} />}
                            {entry.element === undefined && entry.value !== undefined && <Value id={entry.name} value={entry.value} />}
                            {entry.element === undefined && entry.value === undefined && <td></td>}
                            <td>{match !== null ? <Button variant="outline-info" href={match[2]} onClick={onHelpButton}>{match[1]}</Button> : ''}</td>
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
