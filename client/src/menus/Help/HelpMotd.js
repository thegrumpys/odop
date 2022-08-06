import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class HelpMotd extends Component {

    constructor(props) {
//        console.log("In HelpMotd.constructor props=",props);
        super(props);
        this.onHelp = this.onHelp.bind(this);
    }

    onHelp() {
        logUsage('event', 'HelpMotd', { event_label: 'https://thegrumpys.github.io/odop/About/messageOfTheDay.html' });
        window.open('https://thegrumpys.github.io/odop/About/messageOfTheDay.html', '_blank');
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
