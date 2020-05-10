import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class HelpMotd extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false
        };
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        logUsage('event', 'HelpMotd');
    }

    render() {
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                </NavDropdown.Item>
                <a href="https://thegrumpys.github.io/odop/About/messageOfTheDay" target="_blank" rel="noopener noreferrer"> &nbsp; Message of the Day</a>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    type: state.type, 
    version: state.version
  });

export default connect(mapStateToProps)(HelpMotd);
