import React, { Component } from 'react';
import { Button, Modal, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { version } from '../../version';
import { logUsage } from '../../logUsage';
import { withOktaAuth } from '@okta/okta-react';
import config from '../../config';

class HelpAbout extends Component {

    constructor(props) {
//        console.log("In HelpAbout.constructor props=",props);
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
        if (this.state.modal) logUsage('event', 'HelpAbout', { event_label: 'HelpAbout'});
    }

    render() {
//        console.log('In HelpAbout.render this=',this);
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    About
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.toggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>  &nbsp; About ODOP
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Link to <a href={'/docs/About/'} target="_blank" rel="noopener noreferrer">About</a> topics
                        <br/>
                        Link to <a href="https://www.springdesignsoftware.org/" target="_blank" rel="noopener noreferrer">website</a> home page
                        <hr/>
                        This is <a href="https://en.wikipedia.org/wiki/Open-source_software" target="_blank" rel="noopener noreferrer">Open Source </a> software.
                        <br/>
                        About <a href="https://en.wikipedia.org/wiki/MIT_License" target="_blank" rel="noopener noreferrer">MIT License</a>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <a href="https://github.com/thegrumpys/odop/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">ODOP License</a>
                        <hr/>
                        ODOP Software Version: {version()}<br />
                        {config.node.env !== "production" &&
                            <>
                                User Authenticated: {this.props.authState.isAuthenticated ? 'true' : 'false'}<br />
                                User Email: {this.props.authState.isAuthenticated ? this.props.authState.idToken.claims.email : 'Unknown'}<br />
                                User ClientId: {this.props.user === null ? 'Unknown' : this.props.user}<br />
                            </>
                        }
                        Model: {this.props.jsontype} {this.props.type}<br />
                        Model Units: {this.props.units}<br />
                        Model Version: {this.props.version}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.toggle}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    type: state.model.type,
    version: state.model.version,
    jsontype: state.model.jsontype,
    units: state.model.units,
});

export default withOktaAuth(
    connect(
        mapStateToProps)(HelpAbout)
);
