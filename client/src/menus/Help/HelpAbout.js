import React, { Component } from 'react';
import { Button, Modal, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { version } from '../../version';

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
    }

    render() {
        return (
            <React.Fragment>
                <Dropdown.Item onClick={this.toggle}>
                    About
                </Dropdown.Item>
                <Modal.Dialog isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <Modal.Header toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; About {this.props.type}</Modal.Header>
                    <Modal.Body>
                        This is <a href="https://en.wikipedia.org/wiki/Open-source_software" target="_blank" rel="noopener noreferrer">Open Source </a> software. &nbsp; 
                        <a href="https://github.com/thegrumpys/odop/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">MIT License.</a> <br />
                        Software version &nbsp; {version()}  <br />
                        Design Model version &nbsp; {this.props.version}<br />
                        Link to <a href="https://thegrumpys.github.io/odop/About/" target="_blank" rel="noopener noreferrer">website home page</a>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="primary" onClick={this.toggle}>Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    type: state.type, 
    version: state.version
  });

export default connect(mapStateToProps)(HelpAbout);
