import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';

class FileDelete extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileDelete.ctor props=",props)
        this.toggle = this.toggle.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            modal: false,
            designs: [],
            type: this.props.type,
            name: '',
            authenticated: null,
            accessToken: null,
        };
    }

    async componentDidMount() {
//        console.log('In FileDelete.componentDidMount');
        const authenticated = await this.props.auth.isAuthenticated();
//        console.log("In FileDelete.componentDidMount authenticated=",authenticated);
        const accessToken = await this.props.auth.getAccessToken();
//        console.log("In FileDelete.componentDidMount accessToken=",accessToken);
        if (authenticated !== this.state.authenticated) {
            this.setState({
                authenticated: authenticated, 
                accessToken: accessToken,
            });
        }
    }

    getDesigns(type) {
        // Get the designs and store them in state
//        console.log('In FileDelete.getDesigns type=', type);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs', {
                headers: {
                    Authorization: 'Bearer ' + this.state.accessToken
                }
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json()
            })
           .then(designs => this.setState({ 
               designs: designs.filter((design) => {return design !== this.props.name && design !== 'startup'}),
               name: designs.filter((design) => {return design !== this.props.name && design !== 'startup'})[0]
           }))
           .catch(error => {
               displayError('GET of design names failed with message: \''+error.message+'\'');
           });
    }
    
    deleteDesign(type,name) {
//        console.log('In FileDelete.deleteDesign type=', type, ' name=', name);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.state.accessToken
                },
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                logUsage('function=FileDelete,type='+type+',name='+name);
                return res.json()
            })
            .catch(error => {
                displayError('DELETE of \''+name+'\' design  \''+type+'\' design type failed with message: \''+error.message+'\'');
            });
    }
    
    toggle() {
//        console.log('In FileDelete.toggle this.props.type=',this.props.type,' this.props.name=',this.props.name);
        this.setState({
            modal: !this.state.modal,
            type: this.props.type
        });
        this.getDesigns(this.state.type);
    }
    
    onSelect(event) {
//        console.log('In FileDelete.onSelect event.target.value=',event.target.value);
        this.setState({
            name: event.target.value 
        });
    }
    
    onDelete() {
//        console.log('In FileDelete.onDelete this.state.type=',this.state.type,' this.state.name=',this.state.name);
        // Validate name, and delete the database element
        if (this.state.name === '') {
            displayError("Select design to delete.");
            return;
        }
        this.setState({
            modal: !this.state.modal
        });
        this.deleteDesign(this.state.type,this.state.name);
    }
    
    onCancel() {
//        console.log('In FileDelete.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
//        console.log('In FileDelete.render this.state.type=',this.state.type,' this.state.name=',this.state.name);
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Delete&hellip;
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Delete </ModalHeader>
                    <ModalBody>
                        <br />
                        <Label for="fileDeleteSelect">Select design to delete:</Label>
                        <Input type="select" id="fileDeleteSelect" onChange={this.onSelect}>
                            {this.state.designs.map((design, index) => {
                                return <option key={index} value={design}>{design}</option>
                            })}
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onDelete} disabled={this.state.designs.length === 0 ? true : false}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    name: state.name, 
    type: state.type, 
});

export default withAuth(
    connect(
        mapStateToProps
    )(FileDelete)
);
