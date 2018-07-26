import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';

class FileOpen extends React.Component {
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
                    Open
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="The Grumpys"/> &nbsp; File : Open </ModalHeader>
                    <ModalBody>
                        Implementation in progress for software version 0.4. <br />
                        <br />
                        <FormGroup>
                        <Label for="fileOpenSelect">Select design to open:</Label>
                        <Input type="select" name="select" id="fileOpenSelect">
                          <option>design 1</option>
                          <option>design 2</option>
                          <option>design 3</option>
                          <option>design 4</option>
                          <option>design 5</option>
                          <option>design 6</option>
                          <option>design 7</option>
                          <option>design 8</option>
                          <option>design 9</option>
                          <option>design 10</option>
                          <option>design 11</option>
                          <option>design 12</option>
                          <option>design 13</option>
                          <option>design 14</option>
                          <option>design 15</option>
                          <option>design 16</option>
                          <option>design 17</option>
                          <option>design 18</option>
                          <option>design 19</option>
                          <option>design 20</option>
                          <option>design 21</option>
                          <option>design 22</option>
                          <option>design 23</option>
                          <option>design 24</option>
                          <option>design 25</option>
                          <option>design 26</option>
                          <option>design 27</option>
                          <option>design 28</option>
                          <option>design 29</option>
                          <option>design 30</option>
                          <option>design 31</option>
                          <option>design 32</option>
                          <option>design 33</option>
                          <option>design 34</option>
                          <option>design 35</option>
                          <option>design 36</option>
                          <option>design 37</option>
                          <option>design 38</option>
                          <option>design 39</option>
                          <option>design 40</option>
                        </Input>
                      </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Open</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
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

export default connect(mapStateToProps)(FileOpen);