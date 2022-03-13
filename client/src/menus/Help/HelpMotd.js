import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class HelpMotd extends Component {

    constructor(props) {
        super(props);
        this.onHelp = this.onHelp.bind(this);
    }

    onHelp() {
        logUsage('event', 'HelpMotd', { 'event_label': '/docs/About/messageOfTheDay.html' });
        window.open('/docs/About/messageOfTheDay.html', '_blank');
    }

    render() {
//        console.log('In HelpMotd.render this=',this);
        return (
            <>
                <NavDropdown.Item onClick={this.onHelp}>
                    Message of the Day
                </NavDropdown.Item>
            </>
        );
    }
}  

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(HelpMotd);
