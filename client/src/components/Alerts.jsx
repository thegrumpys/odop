import { CONSTRAINED, MIN, MAX, FIXED, FDCL } from '../store/actionTypes';
import { toODOPPrecision } from '../toODOPPrecision';
import { addAlert } from '../store/actions';
import store from "../store/store";

export const ERR = 'Err';
export const WARN = 'Warn';
export const NOTICE = 'Notice';
export const INFO = 'Info';

export const check_message = (design, prefix, left, op, right, suffix = '') => {
//  console.log('Alerts.check_message', 'design=', design, 'prefix=', prefix, 'left=', left, 'op=', op, 'right=', right, 'suffix=', suffix);
  return prefix + ': ' + design.model.symbol_table[left].name + ' (' + toODOPPrecision(design.model.symbol_table[left].value) + ') ' + op +
    ' ' + design.model.symbol_table[right].name + ' (' + toODOPPrecision(design.model.symbol_table[right].value) + ')' + (suffix !== '' ? suffix : '');
}

// DCD is Default Constraint Disabled
export const check_DCD_alert = (element, minmax, urlCode) => {
//  console.log('Alerts.check_DCD_alert', 'element=', element, 'minmax=', minmax, 'urlCod', urlCode);
  if (element.lmin & FIXED) {
    return;
  } else if (minmax === MIN && element.lmin & CONSTRAINED) {
    return;
  } else if (minmax === MAX && element.lmax & CONSTRAINED) {
    return;
  }
  var urlString;
  switch (urlCode) {
    case "C":
      urlString = '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#C_DefaultConstraint)'
      break;
    case "E":
      urlString = '[Help](/docs/Help/DesignTypes/Spring/Extension/alerts.html#E_DefaultConstraint)'
      break;
    case "T":
      urlString = '[Help](/docs/Help/DesignTypes/Spring/Torsion/alerts.html#T_DefaultConstraint)'
      break;
    default:
      urlString = '[Help](/docs/Help/DesignTypes/Spring/alerts.html#DefaultConstraint)'
  }
  store.dispatch(addAlert({
    element: element,
    name: element.name,
    message: 'Default ' + minmax + ' constraint not enabled',
    severity: WARN,
    help_url: urlString
  }));
}

export const checks = (store) => {
//  console.log('Alerts.checks','store=',store);
  var design = store.getState();

  // OBJECTIVE VALUE CHECKS
  if (design.model.result.objective_value === Number.POSITIVE_INFINITY || design.model.result.objective_value === Number.NEGATIVE_INFINITY) { // Check for objective value of Infinity
    store.dispatch(addAlert({
      name: 'Objective Value',
      message: 'Objective Value is Infinity',
      severity: ERR,
      help_url: '[Help](/docs/Help/alerts.html#OBJ_Infinite)'
    }));
  };
  if (Number.isNaN(design.model.result.objective_value)) { // Check for objective value of NaN
    store.dispatch(addAlert({
      name: 'Objective Value',
      message: 'Objective Value is Not a Number (NaN)',
      severity: ERR,
      help_url: '[Help](/docs/Help/alerts.html#OBJ_NaN)'
    }));
  };

  var total = 0;
  for (let i = 0; i < design.model.symbol_table.length; i++) {
    var element = design.model.symbol_table[i];
//    console.log('name=',element.name,'element=',element);

    // VALUE VALIDITY CHECKS
    var severity = ERR;
    if (element.type === 'equationset' && !element.input) { // Dependent Variable?
      severity = INFO; // Make Invalid Dependent Variable only Info
    }
    if (element.format === undefined && typeof element.value === 'number' && element.value < element.validmin) {
      let validmin;
      if (element.validminchoice !== undefined) {
        validmin = element.validmin === -Number.MIN_VALUE ? 'Number.MIN_VALUE' : element.validminchoices[element.validminchoice] + '(' + toODOPPrecision(element.validmin) + ')';
      } else {
        validmin = element.validmin === -Number.MIN_VALUE ? 'Number.MIN_VALUE' : toODOPPrecision(element.validmin);
      }
      let relational = ' < ';
      store.dispatch(addAlert({
        element: element,
        name: element.name,
        message: 'INVALID VALUE: ' + element.name + ' (' + toODOPPrecision(element.value) + ')' + relational + validmin,
        severity: severity,
        help_url: '[Help](/docs/Help/alerts.html#Validity_Below)'
      }));
    } else if (element.format === undefined && typeof element.value === 'number' && element.value > element.validmax) {
      let validmax;
      if (element.validmaxchoice !== undefined) {
        validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : element.validmaxchoices[element.validmaxchoice] + '(' + toODOPPrecision(element.validmax) + ')';
      } else {
        validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : toODOPPrecision(element.validmax);
      }
      let relational = ' > ';
      store.dispatch(addAlert({
        element: element,
        name: element.name,
        message: 'INVALID VALUE: ' + element.name + ' (' + toODOPPrecision(element.value) + ')' + relational + validmax,
        severity: severity,
        help_url: '[Help](/docs/Help/alerts.html#Validity_Above)'
      }));
    }
    if (element.format === undefined && Number.isNaN(element.value)) { // Not a table and value is not a number
      store.dispatch(addAlert({
        element: element,
        name: element.name,
        message: 'INVALID VALUE: ' + element.name + ' (NaN) is Not a Number',
        severity: severity,
        help_url: '[Help](/docs/Help/alerts.html#NotNumber)'
      }));
    };

    // CONSTRAINT VALIDITY CHECKS (ONLY FOR INDEPENDENT AND DEPENDENT NUMERIC VARIABLES, NOT FOR CALC INPUTS)
    if (element.type === 'equationset' && element.format === undefined && typeof element.cmin === 'number' && (element.lmin & CONSTRAINED) && element.cmin < element.validmin) {
      let validmin;
      if (element.validminchoice !== undefined) {
        validmin = element.validmin === -Number.MIN_VALUE ? 'Number.MIN_VALUE' : element.validminchoices[element.validminchoice] + '(' + toODOPPrecision(element.validmin) + ')';
      } else {
        validmin = element.validmin === -Number.MIN_VALUE ? 'Number.MIN_VALUE' : toODOPPrecision(element.validmin);
      }
      let relational = ' < ';
      store.dispatch(addAlert({
        element: element,
        name: element.name + ' MIN',
        message: 'INVALID CONSTRAINT VALUE: ' + element.name + ' MIN  (' + toODOPPrecision(element.cmin) + ')' + relational + validmin,
        severity: ERR,
        help_url: '[Help](/docs/Help/alerts.html#Constraint_Below)',
        valueName: 'cmin'
      }));
    } else if (element.type === 'equationset' && element.format === undefined && typeof element.cmin === 'number' && (element.lmin & CONSTRAINED) && element.cmin > element.validmax) {
      let validmax;
      if (element.validmaxchoice !== undefined) {
        validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : element.validmaxchoices[element.validmaxchoice] + '(' + toODOPPrecision(element.validmax) + ')';
      } else {
        validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : toODOPPrecision(element.validmax);
      }
      let relational = ' > ';
      store.dispatch(addAlert({
        element: element,
        name: element.name + ' MIN',
        message: 'INVALID CONSTRAINT VALUE: ' + element.name + ' MIN  (' + toODOPPrecision(element.cmin) + ')' + relational + validmax,
        severity: ERR,
        help_url: '[Help](/docs/Help/alerts.html#Constraint_Above)',
        valueName: 'cmin'
      }));
    }
    if (element.type === 'equationset' && element.format === undefined && typeof element.cmax === 'number' && (element.lmax & CONSTRAINED) && element.cmax < element.validmin) {
      let validmin;
      if (element.validminchoice !== undefined) {
        validmin = element.validmin === -Number.MIN_VALUE ? 'Number.MAX_VALUE' : element.validminchoices[element.validminchoice] + '(' + toODOPPrecision(element.validmin) + ')';
      } else {
        validmin = element.validmin === -Number.MIN_VALUE ? 'Number.MIN_VALUE' : toODOPPrecision(element.validmin);
      }
      let relational = ' < ';
      store.dispatch(addAlert({
        element: element,
        name: element.name + ' MAX',
        message: 'INVALID CONSTRAINT VALUE: ' + element.name + ' MAX  (' + toODOPPrecision(element.cmax) + ')' + relational + validmin,
        severity: ERR,
        help_url: '[Help](/docs/Help/alerts.html#Constraint_Below)',
        valueName: 'cmax'
      }));
    } else if (element.type === 'equationset' && element.format === undefined && typeof element.cmax === 'number' && (element.lmax & CONSTRAINED) && element.cmax > element.validmax) {
      let validmax;
      if (element.validmaxchoice !== undefined) {
        validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : element.validmaxchoices[element.validmaxchoice] + '(' + toODOPPrecision(element.validmax) + ')';
      } else {
        validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : toODOPPrecision(element.validmax);
      }
      let relational = ' > ';
      store.dispatch(addAlert({
        element: element,
        name: element.name + ' MAX',
        message: 'INVALID CONSTRAINT VALUE: ' + element.name + ' MAX  (' + toODOPPrecision(element.cmax) + ')' + relational + validmax,
        severity: ERR,
        help_url: '[Help](/docs/Help/alerts.html#Constraint_Above)',
        valueName: 'cmax'
      }));
    }

    // CONSTRAINT CHECKS (ONLY FOR INDEPENDENT AND DEPENDENT VARIABLES, NOT FOR CALC INPUTS)
    if (element.type === "equationset" && !element.input && ((element.lmin & FIXED) && element.vmin > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin.value)) {
      store.dispatch(addAlert({
        element: element,
        name: element.name + ' MIN',
        message: 'FIX VIOLATION: ' + element.name + ' (' + toODOPPrecision(element.value) + ') Value < ' + toODOPPrecision(element.cmin),
        severity: NOTICE,
        help_url: '[Help](/docs/Help/alerts.html#Fix_Violation)',
        valueName: 'cmin'
      }));
    } else if (element.type === "equationset" && (element.lmin & CONSTRAINED) && element.vmin > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin.value) {
      store.dispatch(addAlert({
        element: element,
        name: element.name + ' MIN',
        message: 'CONSTRAINT VIOLATION: ' + element.name + ' (' + toODOPPrecision(element.value) + ') Value < ' + toODOPPrecision(element.cmin),
        severity: NOTICE,
        help_url: '[Help](/docs/Help/alerts.html#MIN_Violation)',
        valueName: 'cmin'
      }));
    }
    if (element.type === "equationset" && !element.input && ((element.lmax & FIXED) && element.vmax > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin.value)) {
      store.dispatch(addAlert({
        element: element,
        name: element.name + ' MAX',
        message: 'FIX VIOLATION: ' + element.name + ' (' + toODOPPrecision(element.value) + ') Value > ' + toODOPPrecision(element.cmax),
        severity: NOTICE,
        help_url: '[Help](/docs/Help/alerts.html#Fix_Violation)',
        valueName: 'cmax'
      }));
    } else if (element.type === "equationset" && (element.lmax & CONSTRAINED) && element.vmax > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin.value) {
      store.dispatch(addAlert({
        element: element,
        name: element.name + ' MAX',
        message: 'CONSTRAINT VIOLATION: ' + element.name + ' (' + toODOPPrecision(element.value) + ') Value > ' + toODOPPrecision(element.cmax),
        severity: NOTICE,
        help_url: '[Help](/docs/Help/alerts.html#MAX_Violation)',
        valueName: 'cmax'
      }));
    }
    if (element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
      store.dispatch(addAlert({
        element: element,
        name: element.name + ' MIN',
        message: 'INVERTED CONSTRAINT RANGE: from ' + toODOPPrecision(element.cmin) + ' to ' + toODOPPrecision(element.cmax) + ' for ' + element.name + ' (' + toODOPPrecision(element.value) + ')',
        severity: ERR,
        help_url: '[Help](/docs/Help/alerts.html#Constraint_Inconsistency)',
        valueName: 'cmin'
      }));
      store.dispatch(addAlert({
        element: element,
        name: element.name + ' MAX',
        message: 'INVERTED CONSTRAINT RANGE: from ' + toODOPPrecision(element.cmin) + ' to ' + toODOPPrecision(element.cmax) + ' for ' + element.name + ' (' + toODOPPrecision(element.value) + ')',
        severity: ERR,
        duplicate: true,
        valueName: 'cmax'
      }));
    }

    // FDCL CHECKS(ONLY FOR INDEPENDENT AND DEPENDENT VARIABLES, NOT FOR CALC INPUTS)
    if (element.type === "equationset" && (element.lmin & FIXED) === 0 && element.cminchoices !== undefined && element.cminchoices.length > 0) {
      if (element.lmin & CONSTRAINED) {
        store.dispatch(addAlert({
          element: element,
          name: element.name + ' MIN',
          message: (element.lmin & FDCL ? 'FDCL: ' : 'Non-FDCL: ') + element.name + ' MIN is currently set to the value of ' + (element.lmin & FDCL ? ('the ' + element.cminchoices[element.cminchoice] + ' variable') : toODOPPrecision(element.cmin)),
          severity: INFO,
          help_url: '[Help](/docs/Help/alerts.html#FDCL)',
          valueName: 'cmin'
        }));
      }
    }
    if (element.type === "equationset" && (element.lmax & FIXED) === 0 && element.cmaxchoices !== undefined && element.cmaxchoices.length > 0) {
      if (element.lmax & CONSTRAINED) {
        store.dispatch(addAlert({
          element: element,
          name: element.name + ' MAX',
          message: (element.lmax & FDCL ? 'FDCL: ' : 'Non-FDCL: ') + element.name + ' MAX is currently set to the value of ' + (element.lmax & FDCL ? ('the ' + element.cmaxchoices[element.cmaxchoice] + ' variable') : toODOPPrecision(element.cmax)),
          severity: INFO,
          help_url: '[Help](/docs/Help/alerts.html#FDCL)',
          valueName: 'cmax'
        }));
      }
    }

    // GENERAL CHECKS (ONLY INDEPENDENT VARIABLES)
    if ((element.type === 'equationset' && element.input) && !(element.lmin & FIXED)) {
      total++;
    }
  }
  if (total === 0) {
    store.dispatch(addAlert({
      message: 'SYSTEM: No free independent variables',
      severity: INFO,
      help_url: '[Help](/docs/Help/alerts.html#NoFreeIV)'
    }));
  }
}

export const getSeverityNumberByNameAndObjValue = (name, severity) => {
//  console.log('Alerts.getSeverityNumberByNameAndObjValue', 'name=', name, 'severity=', severity);
  var design = store.getState();
//  console.log('### design=',design)
  var severityNumber = 0;
  if (name !== undefined && (name.endsWith(' MIN') || name.endsWith(' MAX')) && severity !== INFO) {
    if (design.model.result.objective_value > 8 * design.model.system_controls.objmin.value) {
      severityNumber = 3;
    } else if (design.model.result.objective_value > design.model.system_controls.objmin.value) {
      severityNumber = 2;
    } else if (design.model.result.objective_value > 0.0) {
      severityNumber = 1;
    }
  }
//  console.log('Alerts.getSeverityNumberByNameAndObjValue', 'severityNumber=', severityNumber);
  return severityNumber;
}

export const getFeasibilityClassBySeverityNumber = (severityNumber) => {
//  console.log('Alerts.getFeasibilityClassBySeverityNumber', 'severityNumber=', severityNumber);
  var feasibilityClasses = ["", "text-feasible ", "text-close-to-feasible ", "text-not-feasible "];
  return feasibilityClasses[severityNumber];
}

export const getFontClassBySeverityNumber = (severityNumber) => {
//  console.log('Alerts.getFeasibilityClassBySeverityNumber', 'severityNumber=', severityNumber);
  var fontClasses = ["text-alert-info ", "text-alert-notice ", "text-alert-warn ", "text-alert-err "];
  return fontClasses[severityNumber];
}

export const getSeverityNumberBySeverity = (severity) => {
//  console.log('Alerts.getSeverityNumberBySeverity', 'severity=', severity);
  var severityNumber = { Err: 3, Warn: 2, Notice: 1, Info: 0 };
  return severityNumber[severity];
}

export const getAlertsByName = (name, includeViolations = false) => {
//  console.log('Alerts.getAlertsByName', 'name=', name, 'includeViolations=', includeViolations);
  var alerts = [];
  var maxSeverityNumber = 0;
  var alertsSlice = store.getState().alertsSlice;
//  console.log('### alertsSlice=',alertsSlice)
  alertsSlice.alerts.filter(entry => entry.severity === ERR).forEach((entry) => {
    if (entry.name === name) { // Matches exactly
      maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name, entry.severity));
      alerts.push(entry);
    } else if (includeViolations && (entry.name === name + ' MIN' || entry.name === name + ' MAX')) { // Matches name prefix
      maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name, entry.severity));
      alerts.push(entry);
    }
  });
  alertsSlice.alerts.filter(entry => entry.severity === WARN).forEach((entry) => {
    if (entry.name === name) { // Matches exactly
      maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name, entry.severity));
      alerts.push(entry);
    } else if (includeViolations && (entry.name === name + ' MIN' || entry.name === name + ' MAX')) { // Matches name prefix
      maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name, entry.severity));
      alerts.push(entry);
    }
  });
  alertsSlice.alerts.filter(entry => entry.severity === NOTICE).forEach((entry) => {
    if (entry.name === name) { // Matches exactly
      maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name, entry.severity));
      alerts.push(entry);
    } else if (includeViolations && (entry.name === name + ' MIN' || entry.name === name + ' MAX')) { // Matches name prefix
      maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name, entry.severity));
      alerts.push(entry);
    }
  });
  alertsSlice.alerts.filter(entry => entry.severity === INFO).forEach((entry) => {
    if (entry.name === name) { // Matches exactly
      maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name, entry.severity));
      alerts.push(entry);
    } else if (includeViolations && (entry.name === name + ' MIN' || entry.name === name + ' MAX')) { // Matches name prefix
      maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name, entry.severity));
      alerts.push(entry);
    }
  });
//  console.log('Alerts.getAlertsByName maxSeverityNumber=',maxSeverityNumber,'alerts=',alerts);
  return { className: getFeasibilityClassBySeverityNumber(maxSeverityNumber), alerts: alerts };
}

export const getAlertsBySeverity = (severity = '*') => {
//  console.log('Alerts.getAlertsBySeverity', 'severity=', severity);
  var alertsSlice = store.getState().alertsSlice;
//  console.log('### alertsSlice=',alertsSlice)
  var results;
  if (severity === '*') {
    results = alertsSlice.alerts.filter(entry => {
//      console.log('severity=',severity,'entry=',entry);
      return entry.duplicate === undefined || entry.duplicate === false;
    });
  } else {
    results = alertsSlice.alerts.filter(entry => {
//      console.log('severity=',severity,'entry=',entry);
      return entry.severity === severity && (entry.duplicate === undefined || entry.duplicate === false);
    });
  }
//  console.log('Alerts.getAlertsBySeverity', 'results=', results);
  return results;
}
