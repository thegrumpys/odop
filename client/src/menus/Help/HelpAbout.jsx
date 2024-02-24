import React, { Component } from 'react';
import { Button, Modal, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { version } from '../../version';
import { logUsage } from '../../logUsage';
import { withOktaAuth } from '@okta/okta-react';
import config from '../../config';
import { displayMessage } from '../../components/MessageModal';
import { displaySpinner } from '../../components/Spinner';

class HelpAbout extends Component {

    constructor(props) {
//        console.log("In HelpAbout.constructor props=",props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.getDBSize = this.getDBSize.bind(this);
        this.state = {
            modal: false,
            sizes: '',
            size: ''
        };
    }

    componentDidMount() {
//        console.log('In HelpAbout.componentDidMount this=',this);
        this.getDBSize(this.props.user);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        if (this.state.modal) logUsage('event', 'HelpAbout', { event_label: 'HelpAbout'});
    }

    getDBSize(user) {
//        console.log('In HelpAbout.getSize');
        displaySpinner(true);
        fetch('/api/v1/db_size', {
            headers: {
                Authorization: 'Bearer ' + this.props.user
            }
        })
        .then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json()
        })
        .then(sizes => {
//            console.log('In HelpAbout.getSize sizes=',sizes);
            this.setState({
                sizes: sizes
            });
            var size = '';
            if (this.state.sizes.length > 0)
                size = this.state.sizes[0]; // Default to first name
//            console.log('In HelpAbout.getSize size=',size);
            this.setState({ 
                size: size
            });
            logUsage('event', 'HelpAbout', { event_label: 'getDBSize: ' + size});
        })
        .catch(error => {
            displayMessage('GET of DB Size failed with message: \''+error.message+'\'');
        })
        .finally(() => {
            displaySpinner(false);
        });
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
                        Link to <a href="/docs/About/index.html" target="_blank" rel="noopener noreferrer">About</a> topics
                        <br/>
                        Link to <a href={'/docs/Help/DesignTypes/' + this.props.type + '/description.html'} target="_blank" rel="noopener noreferrer">{this.props.type} Design Type</a> description
                        <br/>
                        Link to <a href="https://www.springdesignsoftware.org/" target="_blank" rel="noopener noreferrer">Spring Design Software Website</a> home page
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
                        Model Version: {this.props.version}<br />
                        {config.node.env !== "production" && <span>DB Size: {this.state.size} MB</span>}
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
