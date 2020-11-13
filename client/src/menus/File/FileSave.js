import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeName, changeUser, deleteAutoSave } from '../../store/actionCreators';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';

class FileSave extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileSave.constructor props=",props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            names: [],
            authenticated: null,
            user: this.props.user,
        };
    }
    
    async componentDidMount() {
//        console.log('In FileSave.componentDidMount');
        var authenticated = await this.props.auth.isAuthenticated();
//        console.log("In FileSave.componentDidMount before authenticated=",authenticated);
        if (authenticated !== this.state.authenticated) { // Did authentication change?
            this.setState({ authenticated }); // Remember our current authentication state
            if (authenticated) { // We have become authenticated
                var user = await this.props.auth.getUser();
//                console.log('In FileSave.componentDidMount user=',user);
                this.setState({
                    user: user.sub,
                });
            } else { // We have become unauthenticated
                this.setState({
                    user: null,
                });
            }
        }
//        this.getDesignNames(this.props.state.type);
    }

    componentDidUpdate(prevProps) {
//        console.log('In FileSave.componentDidUpdate');
        if (prevProps.user !== this.props.user || prevProps.type !== this.props.type) {
//            console.log('In FileSave.componentDidUpdate prevProps.user=',prevProps.user,'props.user=',this.props.user,'prevProps.type=',prevProps.type,'props.type=',this.props.type);
            this.setState({ 
                user: this.props.user,
            });
            this.getDesignNames(this.props.state.type);
        }
    }

    getDesignNames(type) {
//        console.log('In FileSave.getDesignNames type=', type);
        // Get the names and store them in state
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs', {
            headers: {
                Authorization: 'Bearer ' + this.state.user
            }
        })
        .then(res => {
            displaySpinner(false);
            if (!res.ok) {
               throw Error(res.statusText);
            }
            return res.json()
        })
        .then(names => {
//            console.log('In FileSave.getDesignNames type=',type,'names=', names);
            this.setState({ names })
        })
        .catch(error => {
            displayError('GET of design names failed with message: \''+error.message+'\'');
        });
    }
    
    postDesign(type,name) {
//        console.log('In FileSave.postDesign type=', type,' name=', name);
        this.props.changeName(name);
        this.props.changeUser(this.state.user);
        // First fetch the current list of names
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs', {
            headers: {
                Authorization: 'Bearer ' + this.state.user
            }
        })
        .then(res => {
            displaySpinner(false);
            if (!res.ok) {
               throw Error(res.statusText);
            }
            return res.json()
        })
        .then(names => {
            // Second create or update the design 
//            console.log('In FileSave.postDesign type=',type,'names=', names);
            this.setState({ names })
//            console.log('In FileSave.postDesign this.state.names=',this.state.names);
            var method = 'POST'; // Create it
            if (this.state.names.filter(e => e.name === name && e.user === this.state.user).length > 0) { // Does it already exist?
                method = 'PUT'; // Update it
            }
//            console.log('In FileSave.postDesign method=', method);
            displaySpinner(true);
            fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.state.user
                },
                body: JSON.stringify(this.props.state, null, 2)
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                if (method === 'POST') {
                    var names = Array.from(this.state.names); // clone it
                    names.push({user: this.state.user, name: name}); // If create and successful then sdd name to the array of names
//                    console.log('In FileSave.postDesign type=',type,'name=',name,'names=', names);
                    this.setState({
                        names: names,
                    });
                }
                logUsage('event', 'FileSave', { 'event_label': type + ' ' + name });
                return res.json()
            })
            .catch(error => {
                displayError(method+' of \''+name+'\' \''+type+'\' design failed with message: \''+error.message+'\'');
            });
        })
        .catch(error => {
            displayError('GET of design names failed with message: \''+error.message+'\'');
        });
    }

    toggle() {
//        console.log('In FileSave.toggle this.props.state.type=',this.props.state.type,' this.props.state.name=',this.props.state.name);
        // Save the model
        this.postDesign(this.props.state.type, this.props.state.name);
        this.props.deleteAutoSave();
    }

    render() {
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Save
                </NavDropdown.Item>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    type: state.model.type, 
    state: state.model,
});

const mapDispatchToProps = {
    changeName: changeName,
    changeUser: changeUser,
    deleteAutoSave: deleteAutoSave
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileSave)
);
