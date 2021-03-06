import React, { Component } from 'react';
import { Button, Modal, NavDropdown } from 'react-bootstrap';
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
//        console.log('In FileRecent.render this=',this);
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle} disabled>
                    Recent
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.toggle}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>  &nbsp; File : Recent
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Not implemented
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
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FileRecent);
