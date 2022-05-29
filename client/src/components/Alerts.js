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
            addAlert({ name: element.name+'.cmin', message: 'FIX INCONSISTENT: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value outside the range from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision(), severity: 'Info' });
            addAlert({ name: element.name+'.cmax', message: 'FIX INCONSISTENT: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value outside the range from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision(), severity: 'Info' });
        } else if (!element.input && (element.lmin & FIXED && element.vmin > 0.0)) {
            addAlert({ name: element.name+'.cmin', message: 'FIX VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value < '+element.cmin.toODOPPrecision(), severity: 'Info' });
        } else if (!element.input && (element.lmax & FIXED && element.vmax > 0.0)) {
            addAlert({ name: element.name+'.cmax', message: 'FIX VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value > '+element.cmax.toODOPPrecision(), severity: 'Info'  });
        } else if ((element.lmin & CONSTRAINED && element.vmin > 0.0) && (element.lmax & CONSTRAINED && element.vmax > 0.0)) {
            addAlert({ name: element.name+'.cmin', message: 'CONSTRAINT INCONSISTENT: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value outside the range from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision(), severity: 'Info' });
            addAlert({ name: element.name+'.cmax', message: 'CONSTRAINT INCONSISTENT: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value outside the range from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision(), severity: 'Info' });
        } else if (element.lmin & CONSTRAINED && element.vmin > 0.0) {
            addAlert({ name: element.name+'.cmin', message: 'CONSTRAINT VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value < '+element.cmin.toODOPPrecision(), severity: 'Info' });
        } else if (element.lmax & CONSTRAINED && element.vmax > 0.0) {
            addAlert({ name: element.name+'.cmax', message: 'CONSTRAINT VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value > '+element.cmax.toODOPPrecision(), severity: 'Info' });
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
        if (entry.name === name) {
            alerts.push(entry);
            if (entry.severity === 'Err') {
                max_color = max_color > 3 ? max_color : 3;
            } else if (entry.severity === 'Warn') {
                max_color = max_color > 2 ? max_color : 2;
            } else if (entry.severity === 'Info') {
                max_color = max_color > 1 ? max_color : 1;
            }
        } else if (includeViolations && (entry.name === name+'.cmin' || entry.name === name+'.cmax')) {
            alerts.push(entry);
            if (this.props.objective_value > 4*this.props.system_controls.objmin) {
                max_color = max_color > 3 ? max_color : 3;
            } else if (this.props.objective_value > this.props.system_controls.objmin) {
                max_color = max_color > 2 ? max_color : 2;
            } else if (this.props.objective_value > 0.0) {
                max_color = max_color > 1 ? max_color : 1;
            }
        }
    });
//    console.log('In getAlertsByName max_color=',max_color,'alerts=',alerts);
    return {color_class: color_classes[max_color], alerts: alerts};
}

export var getAlertsBySeverity = function(severity='') {
//    console.log('In getAlertsBySeverity');
    if (severity === '') {
        return this.state.alerts;
    } else {
        return this.state.alerts.filter(entry => entry.severity === severity);
    }
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
