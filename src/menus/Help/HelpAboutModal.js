import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class HelpAboutModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Software version 0.2 <br />
            Design Model version 1.2<br />
            <a href="https://github.com/thegrumpys/pcyl-web">Link to website home page</a>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
    );
  }
}

export default HelpAboutModal;