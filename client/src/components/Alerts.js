import { Component } from 'react';
import { connect } from 'react-redux';
import { CONSTRAINED, FIXED, FDCL } from '../store/actionTypes';

export var commonChecks = function(store) {
//    console.log('In Alerts.commonChecks store=',store);
    var design = store.getState();
    var total = 0;
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        var element = design.model.symbol_table[i];
//        console.log('name=',element.name);

        // VALUE VALIDITY CHECKS
        if (element.format === undefined && typeof element.value === 'number' && element.value <= element.validmin) { 
            let validmin = element.validmin === -Number.MIN_VALUE ? '-Number.MIN_VALUE' : element.validmin;
            addAlert({
                element: element,
                name: element.name,
                message: 'INVALID VALUE: ' + element.name + ' (' + element.value.toODOPPrecision() + ') <= ' + validmin,
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Validity_Below)'
            });
        } else if (element.format === undefined && typeof element.value === 'number' && element.value >= element.validmax) {
            let validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : element.validmax;
            addAlert({
                element: element,
                name: element.name,
                message: 'INVALID VALUE: ' + element.name + ' (' + element.value.toODOPPrecision() + ') >= ' + validmax,
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Validity_Above)'
            });
        }

        // CONSTRAINT VALIDITY CHECKS
        if (element.format === undefined && typeof element.cmin === 'number' && (element.lmin & CONSTRAINED) && element.cmin <= element.validmin) { 
            let validmin = element.validmin === -Number.MIN_VALUE ? '-Number.MIN_VALUE' : element.validmin;
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'INVALID VALUE: ' + element.name+' MIN  (' + element.cmin.toODOPPrecision() + ') <= ' + validmin,
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Constraint_Below)'
            });
        } else if (element.format === undefined && typeof element.cmin === 'number' && (element.lmin & CONSTRAINED) && element.cmin >= element.validmax) {
            let validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : element.validmax;
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'INVALID VALUE: ' + element.name+' MIN  (' + element.cmin.toODOPPrecision() + ') >= ' + validmax,
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Validity_Above)'
            });
        }
        if (element.format === undefined && typeof element.cmax === 'number' && (element.lmax & CONSTRAINED) && element.cmax <= element.validmin) { 
            let validmin = element.validmin === -Number.MIN_VALUE ? '-Number.MIN_VALUE' : element.validmin;
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'INVALID VALUE: ' + element.name+' MAX  (' + element.cmax.toODOPPrecision() + ') <= ' + validmin,
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Constraint_Below)'
            });
        } else if (element.format === undefined && typeof element.cmax === 'number' && (element.lmax & CONSTRAINED) && element.cmax >= element.validmax) {
            let validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : element.validmax;
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'INVALID VALUE: ' + element.name+' MAX  (' + element.cmax.toODOPPrecision() + ') >= ' + validmax,
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Validity_Above)'
            });
        }

        // CONSTRAINT CHECKS
        if (element.type === "equationset" && !element.input && ((element.lmin & FIXED) && element.vmin > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin)) {
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'FIX VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value < '+element.cmin.toODOPPrecision(),
                severity: 'Notice',
                help_url: '[Help](/docs/Help/alerts.html#Fix_Violation)'
            });
        } else if (element.type === "equationset" && (element.lmin & CONSTRAINED) && element.vmin > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin) {
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'CONSTRAINT VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value < '+element.cmin.toODOPPrecision(),
                severity: 'Notice',
                help_url: '[Help](/docs/Help/alerts.html#MIN_Violation)'
            });
        }
        if (element.type === "equationset" && !element.input && ((element.lmax & FIXED) && element.vmax > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin)) {
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'FIX VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value > '+element.cmax.toODOPPrecision(),
                severity: 'Notice',
                help_url: '[Help](/docs/Help/alerts.html#Fix_Violation)'
            });
        } else if (element.type === "equationset" && (element.lmax & CONSTRAINED) && element.vmax > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin) {
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'CONSTRAINT VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value > '+element.cmax.toODOPPrecision(),
                severity: 'Notice',
                help_url: '[Help](/docs/Help/alerts.html#MAX_Violation)'
            });
        }
        if (element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'INVERTED CONSTRAINT RANGE: from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision()+' for ' + element.name + ' (' + element.value.toODOPPrecision() + ')',
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Constraint_Inconsistency)'
            });
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'INVERTED CONSTRAINT RANGE: from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision()+' for ' + element.name + ' (' + element.value.toODOPPrecision() + ')',
                severity: 'Err',
                duplicate: true
            });
        }

        // FDCL CHECKS
        if (element.type === "equationset" && (element.lmin & FIXED) === 0 && element.cminchoices !== undefined && element.cminchoices.length > 0) {
            if (element.lmin & CONSTRAINED) {
                addAlert({
                    element: element,
                    name: element.name+' MIN',
                    message: element.lmin & FDCL ? 'FDCL =' + element.cminchoices[element.cminchoice] : '=' + element.cmin + ' (non-FDCL)',
                    severity: 'Info',
                    help_url: '[Help](/docs/Help/alerts.html#FDCL)'
                });
            }
        }
        if (element.type === "equationset" && (element.lmax & FIXED) === 0 && element.cmaxchoices !== undefined && element.cmaxchoices.length > 0) {
            if (element.lmax & CONSTRAINED) {
                addAlert({
                    element: element,
                    name: element.name+' MAX',
                    message: element.lmax & FDCL ? 'FDCL =' + element.cmaxchoices[element.cmaxchoice] : '=' + element.cmax + ' (non-FDCL)',
                    severity: 'Info',
                    help_url: '[Help](/docs/Help/alerts.html#FDCL)'
                });
            }
        }

        // GENERAL CHECKS
        if ((element.type === 'equationset' && element.input) && !(element.lmin & FIXED)) {
            total++;
        }
    }
    if (total === 0) {
            addAlert({
                message: 'SYSTEM: No free independent variables', 
                severity: 'Info',
                help_url: '[Help](/docs/Help/alerts.html#NoFreeIV)'
             });
    }
}

export var getColorNumberByName = function(name) {
//    console.log('In Alerts.getColorNumberByName this=',this,'name=',name);
    var colorNumber = 0;
    if (name !== undefined && (name.endsWith(' MIN') || name.endsWith(' MAX'))) {
        if (this.props.objective_value > 4*this.props.system_controls.objmin) {
            colorNumber = 3;
        } else if (this.props.objective_value > this.props.system_controls.objmin) {
            colorNumber = 2;
        } else if (this.props.objective_value > 0.0) {
            colorNumber = 1;
       }
    }
//    console.log('In Alerts.getColorNumberByName name-',name,'severity=',severity,'colorNumber=',colorNumber);
    return colorNumber;
}

export var getColorClassByColorNumber = function(colorNumber) {
//    console.log('In Alerts.getColorClassByColorNumber this=',this,'colorNumber=',colorNumber);
    var colorClasses = ["", "text-feasible ", "text-close-to-feasible ", "text-not-feasible "];
//    var colorClasses = ["text-alert-info ", "text-alert-notice ", "text-alert-warn ", "text-alert-err "];
    return colorClasses[colorNumber];
}

export var getColorClassByColorNumber2 = function(colorNumber) {
//    console.log('In Alerts.getColorClassByColorNumber this=',this,'colorNumber=',colorNumber);
//    var colorClasses = ["", "text-feasible ", "text-close-to-feasible ", "text-not-feasible "];
    var colorClasses = ["", "text-alert-notice ", "text-alert-warn ", "text-alert-err "];
    return colorClasses[colorNumber];
}

export var getAlertsByName = function(name, includeViolations = false) {
//    console.log('In Alerts.getAlertsByName this=',this,'name=',name,'includeViolations=',includeViolations);
    var alerts = [];
    var maxColorNumber = 0;
    getAlertsBySeverity('Err').forEach((entry) => {
        var colorNumber = 0;
        if (entry.name === name) { // Matches exactly
            colorNumber = getColorNumberByName(entry.name);
            maxColorNumber = Math.max(maxColorNumber, colorNumber);
            entry.color = getColorClassByColorNumber2(colorNumber);
            alerts.push(entry);
        } else if (includeViolations && (entry.name === name+' MIN' || entry.name === name+' MAX')) { // Matches name prefix
            colorNumber = getColorNumberByName(entry.name);
            maxColorNumber = Math.max(maxColorNumber, colorNumber);
            entry.color = getColorClassByColorNumber2(colorNumber);
            alerts.push(entry);
        }
    });
    getAlertsBySeverity('Warn').forEach((entry) => {
        var colorNumber = 0;
        if (entry.name === name) { // Matches exactly
            colorNumber = getColorNumberByName(entry.name);
            maxColorNumber = Math.max(maxColorNumber, colorNumber);
            entry.color = getColorClassByColorNumber2(colorNumber);
            alerts.push(entry);
        } else if (includeViolations && (entry.name === name+' MIN' || entry.name === name+' MAX')) { // Matches name prefix
            colorNumber = getColorNumberByName(entry.name);
            maxColorNumber = Math.max(maxColorNumber, colorNumber);
            entry.color = getColorClassByColorNumber2(colorNumber);
            alerts.push(entry);
        }
    });
    getAlertsBySeverity('Notice').forEach((entry) => {
        var colorNumber = 0;
        if (entry.name === name) { // Matches exactly
            colorNumber = getColorNumberByName(entry.name);
            maxColorNumber = Math.max(maxColorNumber, colorNumber);
            entry.color = getColorClassByColorNumber2(colorNumber);
            alerts.push(entry);
        } else if (includeViolations && (entry.name === name+' MIN' || entry.name === name+' MAX')) { // Matches name prefix
            colorNumber = getColorNumberByName(entry.name);
            maxColorNumber = Math.max(maxColorNumber, colorNumber);
            entry.color = getColorClassByColorNumber2(colorNumber);
            alerts.push(entry);
        }
    });
    getAlertsBySeverity('Info').forEach((entry) => {
        var colorNumber = 0;
        if (entry.name === name) { // Matches exactly
            colorNumber = getColorNumberByName(entry.name);
            maxColorNumber = Math.max(maxColorNumber, colorNumber);
            entry.color = getColorClassByColorNumber2(colorNumber);
            alerts.push(entry);
        } else if (includeViolations && (entry.name === name+' MIN' || entry.name === name+' MAX')) { // Matches name prefix
            colorNumber = getColorNumberByName(entry.name);
            maxColorNumber = Math.max(maxColorNumber, colorNumber);
            entry.color = getColorClassByColorNumber2(colorNumber);
            alerts.push(entry);
        }
    });
//    console.log('In Alerts.getAlertsByName maxColorNumber=',maxColorNumber,'alerts=',alerts);
    return {colorClass: getColorClassByColorNumber(maxColorNumber), alerts: alerts};
}

export var getAlertsBySeverity = function(severity='') {
//    console.log('In Alerts.getAlertsBySeverity');
    var results;
    if (severity === '') {
        results = this.state.alerts.filter(entry => entry.duplicate === undefined || entry.duplicate === false);
    } else {
        results = this.state.alerts.filter(entry => entry.severity === severity && (entry.duplicate === undefined || entry.duplicate === false));
    }
//    console.log('In Alerts.getAlertsBySeverity results=',results);
    return results;
}

export var clearAlerts = function() {
//    console.log('In Alerts.clearAlerts');
    this.setState((prevState, props) => {
        return {
            alerts: []
        };
    });
}

export var addAlert = function(alert) {
//    console.log('In Alerts.addAlert alert=',alert);
    this.setState((prevState, props) => {
        return {
            alerts: [...prevState.alerts, alert]
        };
    });
}

class Alerts extends Component {
    constructor(props) {
        super(props);
        getColorNumberByName = getColorNumberByName.bind(this); // Bind external function - no 'this'
        getColorClassByColorNumber = getColorClassByColorNumber.bind(this); // Bind external function - no 'this'
        getAlertsByName = getAlertsByName.bind(this); // Bind external function - no 'this'
        getAlertsBySeverity = getAlertsBySeverity.bind(this); // Bind external function - no 'this'
        clearAlerts = clearAlerts.bind(this); // Bind external function - no 'this'
        addAlert = addAlert.bind(this); // Bind external function - no 'this'
        this.state = {
            alerts: []
        };
    }

    render() {
//        console.log('In Alerts.render this.state.alerts=',JSON.stringify(this.state.alerts));
        return '';
    }
}

const mapStateToProps = state => ({
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value
});

export default connect(mapStateToProps)(Alerts);
