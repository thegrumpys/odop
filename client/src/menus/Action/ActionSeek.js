import React, { Component } from 'react';
import { NavDropdown, Modal, InputGroup, ButtonGroup, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED } from '../../store/actionTypes';
import { seek, saveAutoSave } from '../../store/actionCreators';
import { logUsage } from '../../logUsage';
import { displayMessage } from '../../components/MessageModal';

class ActionSeek extends Component {

    constructor(props) {
        super(props);
//        console.log('In ActionSeek.constructor this=',this);
        this.toggle = this.toggle.bind(this);
        this.onMinMax = this.onMinMax.bind(this);
        this.onNameSelect = this.onNameSelect.bind(this);
        this.onSeek = this.onSeek.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onContextHelp = this.onContextHelp.bind(this);
        this.state = {
            modal: false,
            name: undefined, // TODO: A fudge
            minmax: MIN // TODO: A fudge
        };
    }
    
    toggle() {
//       console.log('In ActionSeek.toggle this=',this);
        var warnMsg = '';
        if (this.props.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
            warnMsg += 'No free independent variables; ';
        }
        if (this.props.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && Number.isNaN(element.value) ? total+1 : total+0}, 0) !== 0) {
            warnMsg += 'One (or more) Independent Variable(s) is (are) Not a Number; ';
        }
        if (Number.isNaN(this.props.objective_value)) {
            warnMsg += 'Objective Value is Not a Number. Check constraint values; ';
        }
        this.props.symbol_table.forEach((element) => { // For each Symbol Table entry
            if (element.type !== undefined && element.type !== "table" && element.cmin > element.cmax) {
                warnMsg += (element.name + ' constraints are inconsistent; ');
            }
        });
        if (warnMsg !== '') {
            displayMessage(warnMsg,'warning');
        } else {
            var result = this.props.symbol_table.find( // Find free variable matching the current variable name
                (element) => this.state.name === element.name && element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)
            );
            if (result === undefined) { // Was matching free variable not found
                // Set default name to the First free variable. There must be at least one
                // This duplicates the UI render code algorithm - be careful and make them match!
                result = this.props.symbol_table.find( // Find first free variable
                    (element) => element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)
                );
            }
            this.setState({
                modal: !this.state.modal,
                name: result.name,
            });
        }
    }
    
    onMinMax(minmax) {
//        console.log('In ActionSeek.onMinMax this=',this,'minmax=',minmax);
        this.setState({
            minmax: minmax
        });
    }

    onNameSelect(event) {
//        console.log('In ActionSeek.onNameSelect this=',this,'event=',event);
        this.setState({
            name: event.target.value 
        });
    }
    
    onSeek() {
//        console.log('In ActionSeek.onSeek this=',this);
        this.setState({
            modal: !this.state.modal
        });
        // Do seek
        logUsage('event', 'ActionSeek', { 'event_label': this.state.minmax + ' ' + this.state.name });
        this.props.saveAutoSave();
        this.props.seek(this.state.name, this.state.minmax);
    }
    
    onCancel() {
//        console.log('In ActionSeek.onCancel this=',this);
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }
    
    onContextHelp() {
//        console.log('In ActionSeek.onContextHelp this=',this);
        this.setState({
            modal: !this.state.modal
        });
        window.open('https://thegrumpys.github.io/odop/Help/seek', '_blank');
    }

    render() {
//        console.log('In ActionSeek.render this=',this);
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Seek&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.onCancel}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Seek
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup>
                            <ButtonGroup>
                                <Button variant="primary" onClick={() => this.onMinMax(MIN)} active={this.state.minmax === MIN}>Min</Button>
                                <Button variant="primary" onClick={() => this.onMinMax(MAX)} active={this.state.minmax === MAX}>Max</Button>
                            </ButtonGroup>
                            &nbsp;
                            <InputGroup.Prepend>
                               <InputGroup.Text>Name: </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control as="select" className="align-middle" onChange={this.onNameSelect} value={this.state.name}>
                                {this.props.symbol_table.map((element, index) =>
                                    (element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)) ? <option key={index} value={element.name}>{element.name}</option> : ''
                                )}
                            </Form.Control>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button outline="true" variant="info" onClick={this.onContextHelp}>Help</Button>{' '}
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onSeek}>Seek</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
});

const mapDispatchToProps = {
    seek: seek,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSeek);
