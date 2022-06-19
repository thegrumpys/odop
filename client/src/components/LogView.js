import React, { Component } from 'react';
import { Container, Row, InputGroup, Form, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

export class LogView extends Component {

    constructor(props) {
//        console.log("In LogView.constructor props=",props);
        super(props);
        this.onCancelButton = this.onCancelButton.bind(this);
        this.onSelectIPAddrButton = this.onSelectIPAddrButton.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        var now = new Date();
        this.state = {
            modal: true,
            startDate: now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate(),
            endDate: now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate(),
        };
    }

    onCancelButton() {
//        console.log("In LogView.onCancelButton');
        this.setState({
            modal: !this.state.modal,
        });
    }

    onSelectIPAddrButton() {
//        console.log("In LogView.onChangeStartDate');
        this.setState({
            modal: !this.state.modal,
        });
    }
    
    onChangeStartDate(event) {
        console.log("In LogView.onChangeStartDate event.target.value=",event.target.value);
        this.setState({
            startDate: event.target.value,
            endDate: event.target.value,
        });
    }

    onChangeEndDate(event) {
        console.log("In LogView.onChangeEndDate event.target.value=",event.target.value);
        this.setState({
            endDate: event.target.value,
        });
    }

    render() {
//        console.log('In LogView.render this=',this);
        return (
            <>
                <Container>
                    <Row>
                        Log View
                    </Row>
                </Container>
                <Modal show={this.state.modal} onHide={this.onCancelButton}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Log View
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                   Start Date
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="date" name='start_date' value={this.state.startDate} onChange={this.onChangeStartDate} />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                   End Date
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="date" name='end_date' value={this.state.endDate} onChange={this.onChangeEndDate} />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancelButton}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onSelectIPAddrButton}>Seek</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(LogView);
