import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';

class HelpIndex extends Component {

    constructor(props) {
        super(props);
        this.onHelp = this.onHelp.bind(this);
    }

    onHelp() {
        window.gtag('event', 'HelpIndex', { 'event_category': 'menu', 'event_label': 'https://thegrumpys.github.io/odop/Help' });
        window.open('https://thegrumpys.github.io/odop/Help', '_blank');
    }

    render() {
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.onHelp}>
                    Index
                </NavDropdown.Item>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(HelpIndex);
