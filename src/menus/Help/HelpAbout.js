import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { version } from '../../version';

class HelpAbout extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false
        };
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    About
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" /> &nbsp; About {this.props.name}</ModalHeader>
                    <ModalBody>
                        This is <a href="https://en.wikipedia.org/wiki/Open-source_software" target="_blank">Open Source </a> software. &nbsp; 
                        <a href="https://github.com/thegrumpys/pcyl-web/blob/master/LICENSE" target="_blank">MIT License.</a> <br />
                        Software version &nbsp; {version()}  <br />
                        Design Model version &nbsp; {this.props.version}<br />
                        <a href="https://thegrumpys.github.io/pcyl-web/About/" target="_blank">Link to website home page</a>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    name: state.name, 
    version: state.version
  });

export default connect(mapStateToProps)(HelpAbout);