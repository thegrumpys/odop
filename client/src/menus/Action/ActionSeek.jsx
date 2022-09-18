import React, { Component } from 'react';
import { NavDropdown, Modal, InputGroup, ButtonGroup, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CONSTRAINED, FIXED, MIN, MAX } from '../../store/actionTypes';
import { seek, saveAutoSave } from '../../store/actionCreators';
import { logUsage } from '../../logUsage';
import { displayMessage } from '../../components/MessageModal';

class ActionSeek extends Component {

    constructor(props) {
//        console.log('In ActionSeek.constructor this=',this);
        super(props);
        this.onSeekRequest = this.onSeekRequest.bind(this);
        this.onSeekContextHelpButton = this.onSeekContextHelpButton.bind(this);
        this.onSeekCancelButton = this.onSeekCancelButton.bind(this);
        this.onSeekMinMaxSelect = this.onSeekMinMaxSelect.bind(this);
        this.onSeekNameSelect = this.onSeekNameSelect.bind(this);
        this.onSeekButton = this.onSeekButton.bind(this);
        this.state = {
            seek_modal: false, // Default: do not display optimize modal
        };
    }
    
    onSeekRequest() {
//       console.log('In ActionSeek.onSeekRequest this=',this);
        if (this.props.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
            displayMessage('No free independent variables', 'danger', 'Errors', '/docs/Help/errors.html#seekErr');
        }
        this.props.symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
            if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
                displayMessage((element.name + ' constraints are inconsistent'), 'danger', 'Errors', '/docs/Help/errors.html#seekErr');
            }
        });
        var result = this.props.symbol_table.find( // Find free variable matching the current variable name
            (element) => this.state.seek_name === element.name && element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)
        );
        if (result === undefined) { // Was matching free variable not found
            // Set default name to the First free variable. There must be at least one
            // This duplicates the UI render code algorithm - be careful and make them match!
            result = this.props.symbol_table.find( // Find first free variable
                (element) => element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)
            );
        }
        this.setState({
            seek_modal: !this.state.seek_modal,
            seek_name: result.name,
            seek_minmax: MIN,
        });
    }

    onSeekContextHelpButton(event) {
//        console.log('In ActionSeek.onSeekContextHelpButton this=',this,'event=',event);
        this.setState({
            seek_modal: !this.state.seek_modal,
        });
        window.open('/docs/Help/seek.html', '_blank');
    }

    onSeekCancelButton(event) {
//        console.log('In ActionSeek.onSeekCancelButton this=',this,'event=',event);
        this.setState({
            seek_modal: !this.state.seek_modal,
        });
    }

    onSeekMinMaxSelect(seek_minmax) {
//        console.log('In ActionSeek.onSeekMinMaxSelect this=',this,'seek_minmax=',seek_minmax);
        this.setState({
            seek_minmax: seek_minmax
        });
    }

    onSeekNameSelect(event) {
//        console.log('In ActionSeek.onSeekNameSelect this=',this,'event=',event);
        this.setState({
            seek_name: event.target.value 
        });
    }
    
    onSeekButton(event) {
//        console.log('In ActionSeek.onSeekButton this=',this,'event=',event);
        this.setState({
            seek_modal: !this.state.seek_modal
        });
        // Do seek
        this.props.saveAutoSave();
        this.props.seek(this.state.seek_name, this.state.seek_minmax);
        logUsage('event', 'ActionSeek', { event_label: this.state.seek_minmax + ' ' + this.state.seek_name });
    }

    render() {
//        console.log('In ActionSeek.render this=',this);

        var ResultTableOptimize = require('../../designtypes/'+this.props.type+'/ResultTableOptimize.jsx'); // Dynamically load ResultTableOptimize

        var display_search_button;
        if (this.props.objective_value > this.props.system_controls.objmin) {
            display_search_button = true;
        } else {
            display_search_button = false;
        }

        return (
            <>
                <NavDropdown.Item onClick={this.onSeekRequest} disabled={display_search_button}>
                    Seek (optimize)&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.seek_modal} onHide={this.onSeekCancelButton}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Seek (optimize)
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>This may be a long running operation. Please be patient.</p>
                        <ResultTableOptimize.default onClick={this.onSeekCancelButton}/>
                        <InputGroup>
                            <ButtonGroup>
                                <Button variant="outline-secondary" onClick={() => this.onSeekMinMaxSelect(MIN)} active={this.state.seek_minmax === MIN}> Min </Button>
                                <Button variant="outline-secondary" onClick={() => this.onSeekMinMaxSelect(MAX)} active={this.state.seek_minmax === MAX}> Max </Button>
                            </ButtonGroup>
                            &nbsp;
                            <InputGroup.Prepend>
                                <InputGroup.Text>Name: </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control as="select" className="align-middle" onChange={this.onSeekNameSelect} value={this.state.seek_name}>
                                {this.props.symbol_table.map((element, index) =>
                                    (element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)) ? <option key={index} value={element.name}>{element.name}</option> : ''
                                )}
                            </Form.Control>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={this.onSeekContextHelpButton}>Help</Button>{' '}
                        <Button variant="secondary" onClick={this.onSeekCancelButton}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onSeekButton}>Seek</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    type: state.model.type,
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
});

const mapDispatchToProps = {
    seek: seek,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSeek);
