import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import config from '../config';
import MainPage from './MainPage';
import SignInPage from './SignInPage';
import { OktaAuth } from '@okta/okta-auth-js'
import { connect } from 'react-redux';
import { load, loadInitialState, restoreAutoSave, deleteAutoSave, changeName } from '../store/actionCreators';
import { logUsage } from '../logUsage';
import { displayMessage } from './ErrorModal';
import queryString from 'query-string';
import { displaySpinner } from './Spinner';

class Routes extends Component {

  constructor(props) {
    super(props);
//    console.log('In Routes.constructor props=',props);
    this.loadRedirect = this.loadRedirect.bind(this);
    this.loadAutoSave = this.loadAutoSave.bind(this);
    this.loadInitialState = this.loadInitialState.bind(this);
    this.getDesign = this.getDesign.bind(this);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  componentDidMount() {
//      console.log('In Routes.componentDidMount this=',this);
      if (typeof(Storage) !== "undefined" && localStorage.getItem("redirect") !== null) {
//          console.log('In Routes.componentDidMount restore "redirect" file')
          this.loadRedirect();
      } else if (typeof(Storage) !== "undefined" && localStorage.getItem("autosave") !== null) {
//          console.log('In Routes.componentDidMount restore "autosave" file')
          this.loadAutoSave();
      } else {
          var { type, name } = queryString.parse(location.search);
          if (type !== undefined || name !== undefined) {
              type = type !== undefined ? type : config.design.type;
              name = name !== undefined ? name : config.design.name;
//              console.log('In Routes.componentDidMount getDesign type=',type,'name=',name);
              this.getDesign(type, name);
          } else {
//              console.log('In Routes.componentDidMount loadInitialState config.design.type=',config.design.type,'config.design.units=',config.design.units);
              this.loadInitialState(config.design.type,config.design.units);
          }
      }
  }
  
  componentDidUpdate(prevProps) {
//      console.log('In Routes.componentDidUpdate this=',this,'prevProps=',prevProps);
      if (prevProps.user != this.props.user) {
//          console.log('In Routes.componentDidUpdate prevProps.user=',prevProps.user,'this.props.user=',this.props.user);
      }
      if (prevProps.name != this.props.name) {
//          console.log('In Routes.componentDidUpdate prevProps.name=',prevProps.name,'this.props.name=',this.props.name);
      }
      if (prevProps.type != this.props.type) {
//          console.log('In Routes.componentDidUpdate prevProps=',prevProps,'this.props=',this.props);
      }
  }
  
  loadRedirect() {
//      console.log('In Routes.loadRedirect this=',this);
      this.props.restoreAutoSave("redirect");
      this.props.deleteAutoSave("redirect");
      logUsage('event', 'Routes', { 'event_label': this.props.type + ' load redirect' });
  }
  
  loadAutoSave() {
//      console.log('In Routes.loadAutoSave this=',this);
      this.props.restoreAutoSave();
      this.props.deleteAutoSave();
      logUsage('event', 'Routes', { 'event_label': this.props.type + ' load autoSave' });
      displayMessage('Autosave file restored after interruption. Use FileSave, FileSaveAs or FileExport to save it permanently');
  }
  
  loadInitialState(type, units) {
//      console.log('In Routes.loadInitialState this=',this,'type=',type,'units=',units);
      this.props.loadInitialState(type, units);
      this.props.changeName('StartUp');
      this.props.deleteAutoSave();
      logUsage('event', 'Routes', { 'event_label': this.props.type + ' load initialState ' + units});
  }
  
  getDesign(type, name) {
//      console.log('In Routes.getDesign type=', type, ' name=', name);
      displaySpinner(true);
      fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/' + encodeURIComponent(name), {
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
      .then((design) => {
//          console.log('In Routes.getDesign design=', design);
          var { migrate } = require('../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
          var migrated_design = migrate(design);
          if (migrated_design.jsontype === "ODOP") {
              this.props.load({name: name, model: migrated_design});
              this.props.deleteAutoSave();
              logUsage('event', 'FileOpen', { 'event_label': type + ' ' + name });
          } else {
              displayMessage('Invalid JSON type, function ignored');
          }
      })
      .catch(error => {
          displayMessage('GET of \''+name+'\' design failed with message: \''+error.message+'\'');
      });
  }

  onAuthRequired() {
//    console.log('In Routes.onAuthRequired this=',this);
    this.props.history.push('/login')
  }

  render() {
//    console.log('In Routes.render this=',this);
    const oktaAuth = new OktaAuth({...config.oidc});
    return (
        <Security oktaAuth={oktaAuth}
                  onAuthRequired={this.onAuthRequired} >
          <Route path='/' exact={true} component={MainPage} />
          <Route path='/login' render={() => <SignInPage />} />
          <Route path='/implicit/callback' component={LoginCallback} />
        </Security>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user,
    name: state.name,
    type: state.model.type,
});

const mapDispatchToProps = {
    load: load,
    loadInitialState: loadInitialState,
    restoreAutoSave: restoreAutoSave,
    deleteAutoSave: deleteAutoSave,
    changeName: changeName,
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Routes)
);
