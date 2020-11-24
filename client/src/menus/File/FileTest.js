import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class FileTest extends Component {

    constructor(props) {
      console.log('In FileTest.constructor props=',props);
      super(props);
      this.onCancel = this.onCancel.bind(this);
      this.state = {
          modal: true,
      };
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
      return (
          <React.Fragment>
              <Modal show={this.state.modal} className={this.props.className} onHide={this.onCancel}>
                  <Modal.Header>
                      <Modal.Title>
                          <img src="/favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Test
                      </Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                  </Modal.Footer>
              </Modal>
          </React.Fragment>
      );
    }

}