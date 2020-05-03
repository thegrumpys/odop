import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { getDesigns } from '../../server';
import { withAuth } from '@okta/okta-react';

class FileDelete extends Component {

    constructor(props) {
        super(props);
        console.log('In FileDelete.constructor props=',props);
        this.toggle = this.toggle.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            modal: false,
            names: [],
            item: -1,
            user: this.props.user,
            type: this.props.type,
        };
    }

    async componentDidMount() {
        console.log('In FileDelete.componentDidMount');
        var names = await getDesigns(this.state.user, this.state.type);
        names = names.filter((design) => {return design.user !== null});
        console.log('In FileDelete.componentDidMount names=', names);
        var item = -1;
        if (names.length > 0) {
            item = 0;
        }
        console.log('In FileDelete.componentDidMount item=', item);
        this.setState({
            names: names,
            item: item,
        });
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log('In FileDelete.componentDidUpdate prevProps=',prevProps,'prevState=',prevState);
    }
    
    static async getDerivedStateFromProps(props, state) {
        console.log('In FileDelete.getDerivedStateFromProps props=',props,'state=',state);
        if (props.type !== state.type) {
            var names = await getDesigns(props.user, props.type);
            names = names.filter((design) => {return design.user !== null});
            console.log('In FileDelete.getDerivedStateFromProps names=', names);
            var item = -1;
            if (names.length > 0) {
                item = 0;
            }
            console.log('In FileDelete.getDerivedStateFromProps item=', item);
            return {
                names: names,
                item: item,
            };
        }
        return null; // Return null if the state hasn't changed
    }

    deleteDesign(user, type, name) {
        console.log('In FileDelete.deleteDesign user=', user, 'type=', type, ' name=', name);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user
                },
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                logUsage('event', 'FileDelete', { 'event_label': type + ' ' + name });
                return res.json()
            })
            .catch(error => {
                displayError('DELETE of \''+name+'\' design  \''+type+'\' design type failed with message: \''+error.message+'\'');
            });
    }
    
    toggle() {
        console.log('In FileDelete.toggle');
        this.setState({
            modal: !this.state.modal,
            type: this.props.type
        });
    }
    
    onSelect(event) {
        console.log('In FileDelete.onSelect event=',event);
        this.setState({
            item: event.target.value,
        });
    }
    
    onDelete() {
        console.log('In FileDelete.onDelete');
        // Validate name, and delete the database element
        if (this.state.item === -1) {
            displayError("Select design to delete.");
            return;
        }
        this.setState({
            modal: !this.state.modal
        });
        this.deleteDesign(this.state.user, this.state.type, this.state.names[this.state.item]);
        delete this.state.names[this.state.item];
    }
    
    onCancel() {
        console.log('In FileDelete.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
        console.log('In FileDelete.render');
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle} disabled={this.state.user == null || (this.state.names !== null && this.state.names.length === 0)}>
                    Delete&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.onCancel}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Delete
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        <Form.Label htmlFor="fileDeleteSelect">Select design to delete:</Form.Label>
                        <Form.Control as="select" id="fileDeleteSelect" onChange={this.onSelect}>
                            {this.state.names.map((design, index) => {
                                return <option key={index} value={index}>{design.name}</option>
                            })}
                        </Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onDelete}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user, 
    type: state.type, 
});

export default withAuth(
    connect(
        mapStateToProps
    )(FileDelete)
);
