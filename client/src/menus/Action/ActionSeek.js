import React, { Component } from 'react';
import { Dropdown.Item, Modal, Modal.Header, Modal.Body, Modal.Footer, InputGroup, InputGroupAddon, InputGroupText, Input, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED } from '../../store/actionTypes';
import { seek } from '../../store/actionCreators';

class ActionSeek extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onMinMax = this.onMinMax.bind(this);
        this.onNameSelect = this.onNameSelect.bind(this);
        this.onSeek = this.onSeek.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onContextHelp = this.onContextHelp.bind(this);
        this.state = {
            modal: false,
            name: this.props.symbol_table[0].name, // TODO: A fudge
            minmax: MIN // TODO: A fudge
        };
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    
    onMinMax(minmax) {
        this.setState({
            minmax: minmax
        });
    }

    onNameSelect(event) {
        this.setState({
            name: event.target.value 
        });
    }
    
    onSeek() {
        this.setState({
            modal: !this.state.modal
        });
        // Do seek
        this.props.seek(this.state.name, this.state.minmax);
    }
    
    onCancel() {
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }
    
    onContextHelp() {
        this.setState({
            modal: !this.state.modal
        });
        window.open('https://thegrumpys.github.io/odop/Help/seek', '_blank');
    }

    render() {
        return (
            <React.Fragment>
                <Dropdown.Item onClick={this.toggle}>
                    Seek&hellip;
                </Dropdown.Item>
                <Modal.Dialog isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <Modal.Header toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Seek </Modal.Header>
                    <Modal.Body>
                        <InputGroup>
                            <ButtonGroup>
                                <Button color="primary" onClick={() => this.onMinMax(MIN)} active={this.state.minmax === MIN}>Min</Button>
                                <Button color="primary" onClick={() => this.onMinMax(MAX)} active={this.state.minmax === MAX}>Max</Button>
                            </ButtonGroup>
                            &nbsp;
                            <InputGroupAddon addonType="prepend">
                               <InputGroupText>Name: </InputGroupText>
                            </InputGroupAddon>
                            <Form.Control as="select" className="align-middle" onChange={this.onNameSelect} value={this.state.name}>
                                {this.props.symbol_table.map((element, index) =>
                                    (element.equationset && !element.hidden && !(element.lmin & FIXED)) ? <option key={index} value={element.name}>{element.name}</option> : ''
                                )}
                            </Form.Control>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button outline color="info" onClick={this.onContextHelp}>Help</Button>{' '}
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onSeek}>Seek</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    symbol_table: state.symbol_table
});

const mapDispatchToProps = {
    seek: seek
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSeek);
