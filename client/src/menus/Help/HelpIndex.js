import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';
import config from '../../config';

class HelpIndex extends Component {

    constructor(props) {
        super(props);
        this.onHelp = this.onHelp.bind(this);
    }

    onHelp() {
        logUsage('event', 'HelpIndex', { 'event_label': config.documentation.prefix + '/Help' });
        console.log('In HelpIndex.onHelp config.documentation.prefix=',config.documentation.prefix + '/Help');
        window.open(config.documentation.prefix + '/Help', '_blank');
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
