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
            addAlert({ name: element.name, message: 'INVALID VALUE: Less than or equal to ' + validmin });
        } else if (element.format === undefined && typeof element.value === 'number' && element.value >= element.validmax) {
            let validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : element.validmax;
            addAlert({ name: element.name, message: 'INVALID VALUE: Greater than or equal to ' + validmax });
        }

        if (!element.input && (element.lmin & FIXED && element.vmin > 0.0) && (element.lmax & FIXED && element.vmax > 0.0)) {
            addAlert({ name: element.name, message: "FIX VIOLATION: Value outside the range from "+element.cmin.toODOPPrecision()+" to "+element.cmax.toODOPPrecision() });
        } else if (!element.input && (element.lmin & FIXED && element.vmin > 0.0)) {
            addAlert({ name: element.name, message: "FIX VIOLATION: Value less than "+element.cmin.toODOPPrecision() });
        } else if (!element.input && (element.lmax & FIXED && element.vmax > 0.0)) {
            addAlert({ name: element.name, message: "FIX VIOLATION: Value greater than "+element.cmax.toODOPPrecision() });
        } else if ((element.lmin & CONSTRAINED && element.vmin > 0.0) && (element.lmax & CONSTRAINED && element.vmax > 0.0)) {
            addAlert({ name: element.name, message: "CONSTRAINT VIOLATION: Value outside the range from "+element.cmin.toODOPPrecision()+" to "+element.cmax.toODOPPrecision() });
        } else if (element.lmin & CONSTRAINED && element.vmin > 0.0) {
            addAlert({ name: element.name, message: "CONSTRAINT VIOLATION: Value less than "+element.cmin.toODOPPrecision() });
        } else if (element.lmax & CONSTRAINED && element.vmax > 0.0) {
            addAlert({ name: element.name, message: "CONSTRAINT VIOLATION: Value greater than "+element.cmax.toODOPPrecision() });
        }

        if ((element.type === "equationset" && element.input) && !(element.lmin & FIXED)) {
            total++;
        }
    }
    if (total === 0) {
        addAlert({ message: 'SYSTEM: No free independent variables'});
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

export var getAlerts = function() {
//    console.log('In getAlerts');
    return this.state.alerts;
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
