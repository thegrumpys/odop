import React, { Component } from 'react';
import { Button, Modal, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { version } from '../../version';
import { logUsage } from '../../logUsage';
import { withOktaAuth } from '@okta/okta-react';

class HelpAbout extends Component {

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
        if (this.state.modal) logUsage('event', 'HelpAbout', { 'event_label': 'HelpAbout'});
    }

    render() {
//        console.log('In HelpAbout.render this.props=', this.props);
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    About
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.toggle}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>  &nbsp; About ODOP
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Link to <a href="https://thegrumpys.github.io/odop/About/" target="_blank" rel="noopener noreferrer">About</a> topics
                        <br/> 
                        Link to <a href="https://www.springdesignsoftware.org/" target="_blank" rel="noopener noreferrer">website</a> home page
                        <hr/>
                        This is <a href="https://en.wikipedia.org/wiki/Open-source_software" target="_blank" rel="noopener noreferrer">Open Source </a> software.  
                        <br/> 
                        About <a href="https://en.wikipedia.org/wiki/MIT_License" target="_blank" rel="noopener noreferrer">MIT License</a> 
                        &nbsp; &nbsp; &nbsp; &nbsp; 
                        <a href="https://github.com/thegrumpys/odop/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">ODOP License</a> 
                        <hr/>
                        ODOP software version: {version()} 
                        <br />
                        {process.env.NODE_ENV !== "production" && 
                        <React.Fragment>
                            Authenticated: {this.props.authState.isAuthenticated ? 'true' : 'false'}, User: {this.props.user === null ? 'Not Signed In' : this.props.user} 
                            <br />
                        </React.Fragment>}
                        Model: {this.props.jsontype} {this.props.type}, Units: {this.props.units}, Version: {this.props.version}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.toggle}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
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
