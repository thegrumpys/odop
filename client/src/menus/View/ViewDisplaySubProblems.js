import React, { Component } from 'react';
import { NavDropdown, Modal, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';
import { changeSubProblem } from '../../store/actionCreators';

class ViewDisplaySubProblems extends Component {

    constructor(props) {
//        console.log('In ViewDisplaySubProblems.constructor');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.changeSubProgram = this.changeSubProgram.bind(this);
        this.state = {
            modal: false,
        };
    }

    toggle() {
//        console.log('In ViewDisplaySubProblems.toggle');
        this.setState({
            modal: !this.state.modal
        });
        if (this.state.modal) logUsage('event', 'ViewDisplaySubProblems', { event_label: 'ViewDisplaySubProblems'});
    }

    changeSubProgram(key, mask) {
//        console.log('In ViewDisplaySubProblems.setSubProblem','key=',key,'mask=',mask);
        this.setState({
            modal: !this.state.modal
        });
        this.props.changeSubProblem(mask)
        logUsage('event', 'ViewDisplaySubProblems', { event_label: 'ViewDisplaySubProblems  key='+key+' mask='+mask});
    }

    render() {
//        console.log('In ViewDisplaySubProblems.render');
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    Display Sub-Problems
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.toggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : Display Sub-Problems
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table borderless>
                            <tbody>
                                {Object.keys(this.props.subproblems).map(key => 
                                    <tr key={key}>
                                        <td>
                                            <Button variant="primary" onClick={() => this.changeSubProgram(key, this.props.subproblems[key].mask)}>{key}</Button>
                                        </td>
                                        <td>
                                            {this.props.subproblems[key].description}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
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
    subproblems: state.model.subproblems,
    subproblem: state.model.subproblem,
});

const mapDispatchToProps = {
    changeSubProblem: changeSubProblem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewDisplaySubProblems);