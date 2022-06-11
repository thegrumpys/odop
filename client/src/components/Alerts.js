import { Component } from 'react';
import { connect } from 'react-redux';
import { CONSTRAINED, FIXED, FDCL } from '../store/actionTypes';

export var commonChecks = function(store) {
//    console.log('In Alerts.commonChecks store=',store);
    var design = store.getState();
    var total = 0;
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        var element = design.model.symbol_table[i];

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
                message: 'INVALID VALUE: ' + element.name + ' (' + element.value.toODOPPrecision() + ') >- ' + validmax,
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Validity_Above)'
            });
        }

        // CONTRAINT CHECKS
        if (!element.input && (element.lmin & FIXED && element.vmin > 0.0) && (element.lmax & FIXED && element.vmax > 0.0)) {
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'FIX INCONSISTENT: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value outside the range from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision(),
                severity: 'Notice'
            });
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'FIX INCONSISTENT: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value outside the range from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision(),
                severity: 'Notice'
            });
        } else if (!element.input && (element.lmin & FIXED && element.vmin > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin)) {
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'FIX VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value < '+element.cmin.toODOPPrecision(),
                severity: 'Notice',
                help_url: '[Help](/docs/Help/alerts.html#Fix_Violation)'
            });
        } else if (!element.input && (element.lmax & FIXED && element.vmax > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin)) {
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'FIX VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value > '+element.cmax.toODOPPrecision(),
                severity: 'Notice',
                help_url: '[Help](/docs/Help/alerts.html#Fix_Violation)'
            });
        } else if ((element.lmin & CONSTRAINED && element.vmin > 0.0) && (element.lmax & CONSTRAINED && element.vmax > 0.0)) {
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'CONSTRAINT INCONSISTENT: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value outside the range from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision(),
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Constraint_Inconsistency)'
            });
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'CONSTRAINT INCONSISTENT: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value outside the range from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision(),
                severity: 'Notice',
                duplicate: true
            });
        } else if (element.lmin & CONSTRAINED && element.vmin > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin) {
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'CONSTRAINT VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value < '+element.cmin.toODOPPrecision(),
                severity: 'Notice',
                help_url: '[Help](/docs/Help/alerts.html#MIN_Violation)'
            });
        } else if (element.lmax & CONSTRAINED && element.vmax > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin) {
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'CONSTRAINT VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value > '+element.cmax.toODOPPrecision(),
                severity: 'Notice',
                help_url: '[Help](/docs/Help/alerts.html#MAX_Violation)'
            });
        }

        // FDCL CHECKS
        if ((element.lmin & FIXED) === 0 && element.cminchoices !== undefined && element.cminchoices.length > 0) {
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
        if ((element.lmax & FIXED) === 0 && element.cmaxchoices !== undefined && element.cmaxchoices.length > 0) {
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

export var getColorNumberByNameAndSeverity = function(name, severity) {
//    console.log('In Alerts.getColorNumberByNameAndSeverity this=',this,'name=',name,'severity=',severity);
    var color = 0;
    if (name !== undefined && (name.endsWith(' MIN') || name.endsWith(' MAX'))) {
        if (this.props.objective_value > 4*this.props.system_controls.objmin) {
            color = 3;
        } else if (this.props.objective_value > this.props.system_controls.objmin) {
            color = 2;
        } else if (this.props.objective_value > 0.0) {
            color = 1;
       }
    } else {
        if (severity === 'Err') {
            color = 3;
        } else if (severity === 'Warn') {
            color = 2;
        } else if (severity === 'Info') {
            color = 1;
        }
    }
//    console.log('In Alerts.getColorNumberByNameAndSeverity name-',name,'severity=',severity,'color=',color);
    return color;
}

export var getAlertsByName = function(name, includeViolations = false) {
//    console.log('In Alerts.getAlertsByName this=',this,'name=',name);
    var alerts = [];
    var color_classes = ["", "text-feasible ", "text-close-to-feasible ", "text-not-feasible "];
    var max_color = 0;
    this.state.alerts.forEach((entry) => {
        var color = 0;
        if (entry.name === name) { // Matches exactly
            color = getColorNumberByNameAndSeverity(entry.name, entry.severity);
            max_color = Math.max(max_color, color);
            entry.color = color_classes[color];
            alerts.push(entry);
        } else if (includeViolations && (entry.name === name+' MIN' || entry.name === name+' MAX')) { // Matches name prefix
            color = getColorNumberByNameAndSeverity(entry.name, entry.severity);
            max_color = Math.max(max_color, color);
            entry.color = color_classes[color];
            alerts.push(entry);
        }
    });
//    console.log('In Alerts.getAlertsByName max_color=',max_color,'alerts=',alerts);
    return {color_class: color_classes[max_color], alerts: alerts};
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
        getColorNumberByNameAndSeverity = getColorNumberByNameAndSeverity.bind(this); // Bind external function - no 'this'
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
