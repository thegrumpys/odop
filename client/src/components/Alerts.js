import { Component } from 'react';

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
