import React, { Component } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { Route, withRouter } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import config from '../config';
import MainPage from './MainPage';
import SignInPage from './SignInPage';
import { OktaAuth } from '@okta/okta-auth-js'
import { connect } from 'react-redux';
import { load, loadInitialState, restoreAutoSave, deleteAutoSave, changeName } from '../store/actionCreators';
import { logUsage } from '../logUsage';
import { displayMessage } from './MessageModal';
import { displaySpinner } from './Spinner';

class Routes extends Component {

  constructor(props) {
    super(props);
//    console.log('In Routes.constructor props=',props);
    this.loadRedirect = this.loadRedirect.bind(this);
    this.promptLoadAutoSave = this.promptLoadAutoSave.bind(this);
    this.loadAutoSaveDesign = this.loadAutoSaveDesign.bind(this);
    this.loadDefaultDesign = this.loadDefaultDesign.bind(this);
    this.loadInitialState = this.loadInitialState.bind(this);
    this.getDesign = this.getDesign.bind(this);
    this.onAuthRequired = this.onAuthRequired.bind(this);
        this.state = {
            modal: false,
        };
  }

  componentDidMount() {
//      console.log('In Routes.componentDidMount this=',this);
      if (typeof(Storage) !== "undefined" && localStorage.getItem("redirect") !== null) {
//          console.log('In Routes.componentDidMount restore "redirect" file')
          this.loadRedirect();
      } else if (typeof(Storage) !== "undefined" && localStorage.getItem("autosave") !== null) {
//          console.log('In Routes.componentDidMount restore "autosave" file')
          this.promptLoadAutoSave();
      } else {
          this.loadDefaultDesign();
      }
  }
  
  componentDidUpdate(prevProps) {
//      console.log('In Routes.componentDidUpdate this=',this,'prevProps=',prevProps);
      if (prevProps.user !== this.props.user) {
//          console.log('In Routes.componentDidUpdate prevProps.user=',prevProps.user,'this.props.user=',this.props.user);
      }
      if (prevProps.name !== this.props.name) {
//          console.log('In Routes.componentDidUpdate prevProps.name=',prevProps.name,'this.props.name=',this.props.name);
      }
      if (prevProps.type !== this.props.type) {
//          console.log('In Routes.componentDidUpdate prevProps.type=',prevProps.type,'this.props.type=',this.props.type);
      }
  }
  
  loadRedirect() {
//      console.log('In Routes.loadRedirect this=',this);
      this.props.restoreAutoSave("redirect");
      this.props.deleteAutoSave("redirect");
      this.props.deleteAutoSave(); // Get rid of any AutoSave data too
      config.url.prompt = false; // Turn off prompt
      config.url.view = this.props.view; // Use model view
      config.url.type = this.props.type; // Use model type
      config.url.name = this.props.name; // Use model name
      config.url.execute = undefined; // Turn off execute
      this.props.history.push('/');
      logUsage('event', 'Routes', { 'event_label': this.props.type + ' load redirect' });
  }
  
  promptLoadAutoSave() {
//      console.log('In Routes.promptLoadAutoSave this=',this);
        this.setState({
            modal: true,
        });
  }
  
  loadAutoSaveDesign() {
//      console.log('In Routes.loadAutoSave this=',this);
      this.setState({
          modal: false,
      });
      this.props.restoreAutoSave();
      this.props.deleteAutoSave();
      config.url.prompt = false; // Turn off prompt
      config.url.view = this.props.view; // Use model view
      config.url.type = this.props.type; // Use model type
      config.url.name = this.props.name; // Use model name
      config.url.execute = undefined; // Turn off execute
      this.props.history.push('/')
      logUsage('event', 'Routes', { 'event_label': this.props.type + ' load autoSave' });
//      displayMessage(
//          'Design restored from AutoSave data after interruption.  See Help AutoSave for details.  Use File Save, File SaveAs or File Export to save the design permanently.',
//          'info');
  }
  
  loadDefaultDesign() {
      this.setState({
          modal: false,
      });
      if (config.url.type === config.env.type && config.url.name === config.env.name) { // If defaults used then just load initial state
//          console.log('In Routes.componentDidMount loadInitialState config.env.type=',config.env.type,'config.env.units=',config.env.units);
          this.loadInitialState(config.env.type,config.env.units);
      } else {
//          console.log('In Routes.componentDidMount getDesign config.url.type=',config.url.type,'config.url.name=',config.url.name);
          this.getDesign(this.props.user, config.url.type, config.url.name);
      }
  }
  
  loadInitialState(type, units) {
//      console.log('In Routes.loadInitialState this=',this,'type=',type,'units=',units);
      this.props.loadInitialState(type, units);
      this.props.changeName('Startup');
      this.props.deleteAutoSave();
      logUsage('event', 'Routes', { 'event_label': type + ' load initialState ' + units});
  }
  
  getDesign(user, type, name) {
//      console.log('In Routes.getDesign user=',user,'type=',type,'name=',name);
      displaySpinner(true);
      fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/' + encodeURIComponent(name), {
          headers: {
              Authorization: 'Bearer ' + user
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
              logUsage('event', 'Routes', { 'event_label': type + ' ' + name });
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

  onContextHelp() {
//      console.log('In ActionSeek.onContextHelp this=',this);
      window.open('/docs/Help/autoSave.html', '_blank');
  }

  render() {
//    console.log('In Routes.render this=',this);
    const oktaAuth = new OktaAuth({...config.oidc});
    return (
        <>
            <Security oktaAuth={oktaAuth}
                      onAuthRequired={this.onAuthRequired} >
              <Route path='/' exact={true} component={MainPage} />
              <Route path='/login' render={() => <SignInPage />} />
              <Route path='/implicit/callback' component={LoginCallback} />
            </Security>
            <Modal show={this.state.modal}>
                <Modal.Body>
                    <Alert variant="info">Restore AutoSave design available after interruption?</Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-info" onClick={this.onContextHelp}>Help</Button>{' '}
                    <Button variant="secondary" onClick={this.loadDefaultDesign}>Delete AutoSave</Button>{' '}
                    <Button variant="primary" onClick={this.loadAutoSaveDesign}>Restore AutoSave</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user,
    name: state.name,
    view: state.view,
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
