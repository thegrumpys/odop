import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class HelpIndex extends Component {

    constructor(props) {
//        console.log("In HelpIndex.constructor props=",props);
        super(props);
        this.onHelp = this.onHelp.bind(this);
    }

    onHelp() {
        logUsage('event', 'HelpIndex', { event_label: '/docs/Help' });
        window.open('/docs/Help', '_blank');
    }

    render() {
//        console.log('In HelpIndex.render this=',this);
        return (
            <>
                <NavDropdown.Item onClick={this.onHelp}>
                    Index
                </NavDropdown.Item>
            </>
        );
    }
}  

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(HelpIndex);
