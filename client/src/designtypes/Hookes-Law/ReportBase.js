import { Component } from 'react';
import { getAlertsBySeverity } from '../../components/Alerts';

export class ReportBase extends Component {

    render() {
//        console.log('In ReportBase.render this=',this);

        this.hits = getAlertsBySeverity().length;
        this.startpntmsg = "Alert details are available via the Alert button on the main page of Advanced and Calculator Views.";

        return null;
    }

}
