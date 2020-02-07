import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';

class FileSave extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileSave.ctor props=",props);
        this.onSave = this.onSave.bind(this);
        this.state = {
            modal: false,
            authenticated: null,
            accessToken: null,
        };
    }
    
    async componentDidMount() {
//        console.log('In FileSave.componentDidMount');
        const authenticated = await this.props.auth.isAuthenticated();
//        console.log("In FileSave.componentDidMount authenticated=",authenticated);
        const accessToken = await this.props.auth.getAccessToken();
//        console.log("In FileSave.componentDidMount accessToken=",accessToken);
        if (authenticated !== this.state.authenticated) {
            this.setState({
                authenticated: authenticated, 
                accessToken: accessToken,
            });
        }
    }

    putDesign(type,name) {
//        console.log('In FileSave.putDesign type=', type,' name=', name);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
                method: 'PUT', // Update it
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + this.state.accessToken
                },
                body: JSON.stringify(this.props.state)
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                logUsage('function=FileSave,type='+type+',name='+name);
                return res.json()
            })
            .catch(error => {
                displayError('PUT of \''+name+'\' \''+type+'\' design failed with message: \''+error.message+'\'');
            });
    }

    onSave() {
//        console.log('In FileSave.toggle this.props.state.type=',this.props.state.type, ' this.props.state.name=',this.props.state.name);
        this.setState({
            modal: !this.state.modal
        });
        // Save the model
        var type = this.props.state.type;
        if (type === undefined) type = 'Piston-Cylinder';
        var name = this.props.state.name;
        if (name === undefined) name = 'checkpt';
        this.putDesign(type,name);
    }

    render() {
        return (
            <React.Fragment>
                <Dropdown.Item onClick={this.onSave} disabled={this.props.state.user === null ? true : false}>
                    Save
                </Dropdown.Item>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    state: state 
});

export default withAuth(
    connect(
        mapStateToProps
    )(FileSave)
);
