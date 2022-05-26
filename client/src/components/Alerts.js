import { Component } from 'react';

export var queryAlert = function(name) {
//    console.log('In queryAlert this=',this,'name=',name);
    var messages = '';
    this.state.alerts.forEach((entry) => {
        if (entry.name === name) {
            messages += entry.message;
        }
    });
    return messages;
}

export class Alerts extends Component {
    constructor(props) {
        super(props);
        queryAlert = queryAlert.bind(this); // Bind external function - no 'this'
        this.state = {
            alerts: [
              {name: 'L_2', message:'L_2 < L_Solid'},
              {name: 'L_Solid', message:'L_Solid >= L_2'}
            ]
        };
    }

    render() {
//        console.log('In Alerts.render this=',this);
        return '';
    }
}
