import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { load } from '../../store/actionCreators';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';

class FileOpen extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileOpen .ctor props=",props);
        this.toggle = this.toggle.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            modal: false,
            designs: [],
            type: this.props.type,
            name: this.props.name,
            authenticated: null,
            accessToken: null,
        };
    }

    async componentDidMount() {
//        console.log('In FileOpen.componentDidMount');
        const authenticated = await this.props.auth.isAuthenticated();
//        console.log("In FileOpen.componentDidMount authenticated=",authenticated);
        const accessToken = await this.props.auth.getAccessToken();
//        console.log("In FileOpen.componentDidMount accessToken=",accessToken);
        if (authenticated !== this.state.authenticated) {
            this.setState({
                authenticated: authenticated, 
                accessToken: accessToken,
            });
        }
    }

    getDesigns(type) {
//        console.log('In FileOpen.getDesigns type=', type);
        // Get the designs and store them in state
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
            .then(designs => this.setState({ designs }))
            .catch(error => {
                displayError('GET of design names failed with message: \''+error.message+'\'');
            });
    }
    
    getDesign(type,name) {
//        console.log('In FileOpen.getDesign type=', type, ' name=', name);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/' + encodeURIComponent(name), {
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
            .then((design) => {
//                console.log('In FileOpen.getDesigns design=', design);
                var { migrate } = require('../../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
                var migrated_design = migrate(design);
                this.props.load(migrated_design)
                logUsage('function=FileOpen,type='+type+',name='+name);
            })
            .catch(error => {
                displayError('GET of \''+name+'\' design failed with message: \''+error.message+'\'');
            });
    }
    
    toggle() {
//        console.log('In FileOpen.toggle this.props.type=',this.props.type,' this.props.name=',this.props.name);
        this.getDesigns(this.props.type);
        this.setState({
            modal: !this.state.modal,
            type: this.props.type,
            name: this.props.name
        });
    }
    
    onSelect(event) {
//        console.log('In FileOpen.onSelect event.target.value=',event.target.value);
        this.setState({
            name: event.target.value 
        });
    }
    
    onOpen() {
//        console.log('In FileOpen.onOpen this.state.type=',this.state.type,' this.state.name=',this.state.name);
        this.setState({
            modal: !this.state.modal
        });
        // Load the model
        var type = this.state.type;
        if (type === undefined) type = 'Piston-Cylinder';
        var name = this.state.name;
        if (name === undefined) name = 'Startup';
        this.getDesign(type,name);
    }
    
    onCancel() {
//        console.log('In FileOpen.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
//        console.log('In FileOpen.render');
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Open&hellip;
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Open </ModalHeader>
                    <ModalBody>
                        <br />
                        <Label for="fileOpenSelect">Select design to open:</Label>
                        <Input type="select" id="fileOpenSelect" onChange={this.onSelect} value={this.state.name}>
                            {this.state.designs.filter((design,index,self) => {return self.map(design => {return design.name}).indexOf(design.name) === index}).map((design, index) =>
                                <option key={index} value={design.name}>{design.name}{design.user === null ? ' [ReadOnly]' : ''}</option>
                            )}
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onOpen}>Open</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    type: state.type, 
    name: state.name, 
});

const mapDispatchToProps = {
    load: load
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileOpen)
);
