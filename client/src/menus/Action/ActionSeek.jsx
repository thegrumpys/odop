import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown, Modal, InputGroup, ButtonGroup, Button, Form } from 'react-bootstrap';
import { CONSTRAINED, FIXED, MIN, MAX } from '../../store/actionTypes';
import { seek, saveAutoSave } from '../../store/actions';
import { logUsage } from '../../logUsage';
import { displayMessage } from '../../components/Message';

export default function ActionSeek() {
//  console.log('ActionSeek - Mounting...');
  const [seekShow, setSeekShow] = useState(false);
  const [seekName, setSeekName] = useState(null);
  const [seekMinMax, setSeekMinMax] = useState(MIN);
  const type = useSelector((state) => state.model.type);
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_objmin = useSelector((state) => state.model.system_controls.objmin.value);
  const model_objective_value = useSelector((state) => state.model.result.objective_value);
  const dispatch = useDispatch();

  const  onSeekRequest = () => {
//       console.log('ActionSeek.onSeekRequest');
        if (model_symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
            displayMessage('Seek cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
            return;
        }
        var inverted_constraint = false;
        model_symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
            if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
                inverted_constraint = true;
                displayMessage((element.name + ' constraints are inconsistent. Help button provides more information.'), 'danger', 'Errors', '/docs/Help/alerts.html#Constraint_Inconsistency');
                return;
            }
        });
        if (inverted_constraint) {
            return;
        }
        var result = model_symbol_table.find( // Find free variable matching the current variable name
            (element) => seekName === element.name && element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)
        );
        if (result === undefined) { // Was matching free variable not found
            // Set default name to the First free variable. There must be at least one
            // This duplicates the UI render code algorithm - be careful and make them match!
            result = model_symbol_table.find( // Find first free variable
                (element) => element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)
            );
        }
        setSeekShow(!seekShow);
        setSeekName(result.name);
    }

  const  onSeekContextHelpButton = (event) => {
//        console.log('ActionSeek.onSeekContextHelpButton','event=',event);
        setSeekShow(!seekShow);
        window.open('/docs/Help/seek.html', '_blank');
    }

  const  onSeekCancelButton = (event) => {
//        console.log('ActionSeek.onSeekCancelButton','event=',event);
        setSeekShow(!seekShow);
    }

  const  onSeekMinMaxSelect = (seekMinMax) => {
//        console.log('ActionSeek.onSeekMinMaxSelect','seekMinMax=',seekMinMax);
        setSeekMinMax(seekMinMax);
    }

  const   onSeekNameSelect = (event) => {
//        console.log('ActionSeek.onSeekNameSelect','event=',event);
        setSeekName(event.target.value);
    }

  const  onSeekButton = (event) => {
//        console.log('ActionSeek.onSeekButton','event=',event);
        setSeekShow(!seekShow);
        // Do seek
        dispatch(saveAutoSave());
        dispatch(seek(seekName, seekMinMax));
        logUsage('event', 'ActionSeek', { event_label: seekMinMax + ' ' + seekName });
    }

        var ResultTableOptimize = require('../../designtypes/'+type+'/ResultTableOptimize.jsx'); // Dynamically load ResultTableOptimize

        var display_search_button;
        if (model_objective_value > model_objmin) {
            display_search_button = true;
        } else {
            display_search_button = false;
        }

        return (
            <>
                <NavDropdown.Item onClick={onSeekRequest} disabled={display_search_button}>
                    Seek (optimize)&hellip;
                </NavDropdown.Item>
                {seekShow && <Modal show={seekShow} onHide={onSeekCancelButton}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Seek (optimize)
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>This may be a long running operation. Please be patient.</p>
                        <ResultTableOptimize.default onClick={onSeekCancelButton}/>
                        <InputGroup>
                            <ButtonGroup>
                                <Button variant="outline-secondary" onClick={() => onSeekMinMaxSelect(MIN)} active={seekMinMax === MIN}> Min </Button>
                                <Button variant="outline-secondary" onClick={() => onSeekMinMaxSelect(MAX)} active={seekMinMax === MAX}> Max </Button>
                            </ButtonGroup>
                            &nbsp;
                            <InputGroup.Text>Name: </InputGroup.Text>
                            <Form.Select className="align-middle" onChange={onSeekNameSelect} value={seekName}>
                                {model_symbol_table.map((element, index) =>
                                    (element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)) ? <option key={index} value={element.name}>{element.name}</option> : ''
                                )}
                            </Form.Select>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={onSeekContextHelpButton}>Help</Button>{' '}
                        <Button variant="secondary" onClick={onSeekCancelButton}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={onSeekButton}>Seek</Button>
                    </Modal.Footer>
                </Modal>}
            </>
        );
}
