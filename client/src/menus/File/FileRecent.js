import React, { Component } from 'react';
import { Button, Modal, Dropdown, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

class FileRecent extends Component {

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
                <Dropdown.Item onClick={this.toggle} disabled>
                    Recent
                </Dropdown.Item>
                <Modal.Dialog isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <Modal.Header toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Recent </Modal.Header>
                    <Modal.Body>
                        Not implemented
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
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FileRecent);
