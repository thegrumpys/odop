import React, { Component } from 'react';
import { Button, Modal, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { version } from '../../version';
import { logUsage } from '../../logUsage';

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
                        ODOP software version &nbsp; {version()} 
                        <br />
                        Model: &nbsp; {this.props.jsontype} {this.props.type}, Version: {this.props.version}, Units: {this.props.units}<br />
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
    type: state.model.type, 
    version: state.model.version,
    jsontype: state.model.jsontype,
    units: state.model.units,
});

export default connect(mapStateToProps)(HelpAbout);
