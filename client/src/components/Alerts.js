import { Component } from 'react';
import { connect } from 'react-redux';
import { CONSTRAINED, FIXED } from '../store/actionTypes';

export var commonChecks = function(store) {
//    console.log('In commonChecks store=',store);
    var design = store.getState();
    var total = 0;
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        var element = design.model.symbol_table[i];

        if (element.format === undefined && typeof element.value === 'number' && element.value <= element.validmin) { 
            let validmin = element.validmin === -Number.MAX_VALUE ? '-Number.MAX_VALUE' : element.validmin;
            addAlert({ name: element.name, message: 'INVALID VALUE: ' + element.name + ' (' + element.value.toODOPPrecision() + ') <= ' + validmin, severity: 'Err' });
        } else if (element.format === undefined && typeof element.value === 'number' && element.value >= element.validmax) {
            let validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : element.validmax;
            addAlert({ name: element.name, message: 'INVALID VALUE: ' + element.name + ' (' + element.value.toODOPPrecision() + ') >- ' + validmax, severity: 'Err' });
        }

        if (!element.input && (element.lmin & FIXED && element.vmin > 0.0) && (element.lmax & FIXED && element.vmax > 0.0)) {
            addAlert({ name: element.name+' MIN', message: 'FIX INCONSISTENT: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value outside the range from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision(), severity: 'Info' });
            addAlert({ name: element.name+' MAX', message: 'FIX INCONSISTENT: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value outside the range from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision(), severity: 'Info' });
        } else if (!element.input && (element.lmin & FIXED && element.vmin > 0.0)) {
            addAlert({ name: element.name+' MIN', message: 'FIX VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value < '+element.cmin.toODOPPrecision(), severity: 'Info' });
        } else if (!element.input && (element.lmax & FIXED && element.vmax > 0.0)) {
            addAlert({ name: element.name+' MAX', message: 'FIX VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value > '+element.cmax.toODOPPrecision(), severity: 'Info'  });
        } else if ((element.lmin & CONSTRAINED && element.vmin > 0.0) && (element.lmax & CONSTRAINED && element.vmax > 0.0)) {
            addAlert({ name: element.name+' MIN', message: 'CONSTRAINT INCONSISTENT: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value outside the range from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision(), severity: 'Info' });
            addAlert({ name: element.name+' MAX', message: 'CONSTRAINT INCONSISTENT: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value outside the range from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision(), severity: 'Info' });
        } else if (element.lmin & CONSTRAINED && element.vmin > 0.0) {
            addAlert({ name: element.name+' MIN', message: 'CONSTRAINT VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value < '+element.cmin.toODOPPrecision(), severity: 'Info' });
        } else if (element.lmax & CONSTRAINED && element.vmax > 0.0) {
            addAlert({ name: element.name+' MAX', message: 'CONSTRAINT VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value > '+element.cmax.toODOPPrecision(), severity: 'Info' });
        }

        if ((element.lmin & FIXED) === 0 && element.cminchoices !== undefined && element.cminchoices.length > 0) {
            value_alerts = [{ name: element.name+' MIN', message: element.lmin & FDCL ? 'FDCL =' + element.cminchoices[element.cminchoice] : '=' + element.cmin + ' (non-FDCL)', severity: 'Info' }];
        }
        if ((element.lmax & FIXED) === 0 && element.cmaxchoices !== undefined && element.cmaxchoices.length > 0) {
            value_alerts = [{ name: element.name+' MAX', message: element.lmax & FDCL ? 'FDCL =' + element.cmaxchoices[element.cmaxchoice] : '=' + element.cmax + ' (non-FDCL)', severity: 'Info' }];
        }

        if ((element.type === 'equationset' && element.input) && !(element.lmin & FIXED)) {
            total++;
        }
    }
    if (total === 0) {
        addAlert({ message: 'SYSTEM: No free independent variables', severity: 'Info'});
    }
}

export var getAlertsByName = function(name, includeViolations = false) {
//    console.log('In getAlertsByName this=',this,'name=',name);
    var alerts = [];
    var color_classes = ["text-strictly-feasible ", "text-feasible ", "text-close-to-feasible ", "text-not-feasible "];
    var max_color = 0;
    this.state.alerts.forEach((entry) => {
        var color = 0;
        if (entry.name === name) { // Matches exactly
            if (name.endsWith(' MIN') || name.endsWith(' MAX')) {
                if (this.props.objective_value > 4*this.props.system_controls.objmin) {
                    color = 3;
                    max_color = max_color > 3 ? max_color : 3;
                } else if (this.props.objective_value > this.props.system_controls.objmin) {
                    color = 2;
                    max_color = max_color > 2 ? max_color : 2;
                } else if (this.props.objective_value > 0.0) {
                    color = 1;
                    max_color = max_color > 1 ? max_color : 1;
               }
            } else {
                if (entry.severity === 'Err') {
                    color = 3;
                    max_color = max_color > 3 ? max_color : 3;
                } else if (entry.severity === 'Warn') {
                    color = 2;
                    max_color = max_color > 2 ? max_color : 2;
                } else if (entry.severity === 'Info') {
                    color = 1;
                    max_color = max_color > 1 ? max_color : 1;
                }
            }
            entry.color = color_classes[color];
            alerts.push(entry);
        } else if (includeViolations && (entry.name === name+' MIN' || entry.name === name+' MAX')) { // Matches prefix
            if (this.props.objective_value > 4*this.props.system_controls.objmin) {
                color = 3;
                max_color = max_color > 3 ? max_color : 3;
            } else if (this.props.objective_value > this.props.system_controls.objmin) {
                color = 2;
                max_color = max_color > 2 ? max_color : 2;
            } else if (this.props.objective_value > 0.0) {
                color = 1;
                max_color = max_color > 1 ? max_color : 1;
            }
            entry.color = color_classes[color];
            alerts.push(entry);
        }
    });
//    console.log('In getAlertsByName max_color=',max_color,'alerts=',alerts);
    return {color_class: color_classes[max_color], alerts: alerts};
}

export var getAlertsBySeverity = function(severity='') {
//    console.log('In getAlertsBySeverity');
    var results;
    if (severity === '') {
        results = this.state.alerts;
    } else {
        results = this.state.alerts.filter(entry => entry.severity === severity);
    }
//    console.log('In getAlertsBySeverity results=',results);
    return results;
}

export var clearAlerts = function() {
//    console.log('In clearAlerts');
    this.setState((prevState, props) => {
        return {
            alerts: []
        };
    });
}

export var addAlert = function(alert) {
//    console.log('In addAlert alert=',alert);
    this.setState((prevState, props) => {
        return {
            alerts: [...prevState.alerts, alert]
        };
    });
}

class Alerts extends Component {
    constructor(props) {
        super(props);
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
