import { Component } from 'react';
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

export var queryAlert = function(name) {
//    console.log('In queryAlert this=',this,'name=',name);
    var alerts = [];
    this.state.alerts.forEach((entry) => {
        if (entry.name === name) {
            alerts.push(entry);
        }
    });
    return alerts;
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

export var getAlerts = function(severity='') {
//    console.log('In getAlerts');
    if (severity === '') {
        return this.state.alerts;
    } else {
        return this.state.alerts.filter(entry => entry.severity === severity);
    }
}

export class Alerts extends Component {
    constructor(props) {
        super(props);
        queryAlert = queryAlert.bind(this); // Bind external function - no 'this'
        clearAlerts = clearAlerts.bind(this); // Bind external function - no 'this'
        addAlert = addAlert.bind(this); // Bind external function - no 'this'
        getAlerts = getAlerts.bind(this); // Bind external function - no 'this'
        this.state = {
            alerts: []
        };
    }

    render() {
//        console.log('In Alerts.render this.state.alerts=',JSON.stringify(this.state.alerts));
        return '';
    }
}
