import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withOktaAuth } from '@okta/okta-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class FileTest extends Component {

    constructor(props) {
      console.log('In FileTest.constructor props=',props);
      super(props);
      this.onSignIn = this.onSignIn.bind(this);
      this.onCancel = this.onCancel.bind(this);
      this.state = {
          modal: true,
      };
    }
    
    onSignIn() {
        console.log('In FileTest.onSignIn');
        this.setState({
            modal: !this.state.modal
        });
        this.props.history.push('/login');
    }
    
    onCancel() {
      console.log('In FileTest.onCancel');
      this.setState({
          modal: !this.state.modal
      });
      this.props.history.goBack();
    }

    render() {
      console.log('In FileTest.render this.props=',this.props);
      const signIn = this.props.authState.isAuthenticated ? null : <Button variant="secondary" onClick={this.onSignIn}>Sign In&hellip;</Button>;
      return (
          <React.Fragment>
              <Modal show={this.state.modal} className={this.props.className} onHide={this.onCancel}>
                  <Modal.Header>
                      <Modal.Title>
                          <img src="/favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Test
                      </Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                      {signIn}{' '}
                      <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                  </Modal.Footer>
              </Modal>
          </React.Fragment>
      );
    }

}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default withRouter(withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileTest)
));
