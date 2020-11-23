import React, { Component } from 'react';
import App from './App';
import { withOktaAuth } from '@okta/okta-react';
import config from '../config';
import { displaySpinner } from './Spinner';
import { displayError } from './ErrorModal';
import { load, loadInitialState, deleteAutoSave } from '../store/actionCreators';
import { connect } from 'react-redux';
import { logUsage } from '../logUsage';

class FEHome extends Component {
  constructor(props) {
//    console.log('In FEHome.constructor props=',props);
    super(props);
  }
  
  componentDidMount() {
//    console.log('In FEHome.componentDidMount this.props=',this.props);
    this.getDesign(config.design.type, config.design.name);
  }

  getDesign(type, name) {
//    console.log('In FEHome.getDesign type=', type, ' name=', name, ' user=', this.props.user);
    displaySpinner(true);
//    console.log('In FEHome.getDesign this.props.user=',this.props.user);
    fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
        headers: {
            Authorization: 'Bearer ' + this.props.user
        }
    })
    .then(res => {
        displaySpinner(false);
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json()
    })
    .then(design => {
//            console.log('In FEHome.getDesign design=', design);
        var { migrate } = require('../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
        var migrated_design = migrate(design);
        if (migrated_design.jsontype === "ODOP") {
            this.props.load({name: name, model: migrated_design});
            this.props.deleteAutoSave();
            logUsage('event', 'FEHome', { 'event_label': type + ' ' + name });
        } else {
            throw Error('Invalid JSON type, function ignored');
        }
    })
    .catch(error => {
        displayError('GET of \''+name+'\' design failed with message: \''+error.message+'\'');
        this.props.loadInitialState(type, 'US');
    });
}

  render() {
//    console.log('In FEHome.render this.props=',this.props);
    // If you're not logged in then there is nothing to display
    // If there is no name then there is no model therefore these is nothing to display
    if (this.props.authState.isPending || this.props.name === null) return null;
    return (
      <div>
        <App />
      </div>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user,
    name: state.name,
});

const mapDispatchToProps = {
    load: load,
    loadInitialState: loadInitialState,
    deleteAutoSave: deleteAutoSave
};

export default withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FEHome)
);
