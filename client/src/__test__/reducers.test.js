import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../problems/Piston-Cylinder/initialState';
import { initialSystemControls } from '../initialSystemControls';
import { MIN, MAX, CONSTRAINED, FIXED } from '../store/actionTypes';
import { 
    startup,
    changeDesignParameterValue, changeDesignParameterConstraint, setDesignParameterFlag, resetDesignParameterFlag, 
    changeStateVariableValue, changeStateVariableConstraint, setStateVariableFlag, resetStateVariableFlag, 
    changeResultObjectiveValue
    } from '../store/actionCreators';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';

//=====================================================================
// STARTUP
//=====================================================================

it('reducers without startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // after
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.version).toEqual("1.2");
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
});

it('reducers with startup', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.version).toEqual("1.2");
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
    
    store.dispatch(startup());
    
    var design = store.getState(); // after
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.version).toEqual("1.2");
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
});

//=====================================================================
// DESIGN PARAMETERS
//=====================================================================

it('reducers change design parameter value', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);

    store.dispatch(changeDesignParameterValue("RADIUS", 0.5));
    
    design = store.getState(); // after
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.5);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
});

it('reducers change design parameter constraint min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].cmin).toEqual(0.0);
    expect(design.design_parameters[1].smin).toEqual(0.4);

    store.dispatch(changeDesignParameterConstraint("RADIUS", MIN, 0.1));
    
    design = store.getState(); // after
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].cmin).toEqual(0.1);
    expect(design.design_parameters[1].smin).toEqual(0.1);
});

it('reducers change design parameter constraint max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].cmax).toEqual(0.05);
    expect(design.design_parameters[2].smax).toEqual(0.05);

    store.dispatch(changeDesignParameterConstraint("THICKNESS", MAX, 0.06));
    
    design = store.getState(); // after
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].cmax).toEqual(0.06);
    expect(design.design_parameters[2].smax).toEqual(0.06);
});

it('reducers set design parameter flag min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].lmin).toEqual(CONSTRAINED);

    store.dispatch(setDesignParameterFlag("RADIUS", MIN, FIXED));
    
    design = store.getState(); // after
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].lmin).toEqual(CONSTRAINED|FIXED);
});

it('reducers reset design parameter flag min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].lmin).toEqual(CONSTRAINED);

    store.dispatch(resetDesignParameterFlag("RADIUS", MIN, CONSTRAINED));
    
    design = store.getState(); // after
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].lmin).toEqual(0);
});

it('reducers set design parameter flag max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].lmax).toEqual(CONSTRAINED);

    store.dispatch(setDesignParameterFlag("THICKNESS", MAX, FIXED));
    
    design = store.getState(); // after
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].lmax).toEqual(CONSTRAINED|FIXED);
});

it('reducers reset design parameter flag max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].lmax).toEqual(CONSTRAINED);

    store.dispatch(resetDesignParameterFlag("THICKNESS", MAX, CONSTRAINED));
    
    design = store.getState(); // after
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].lmax).toEqual(0);
});

//=====================================================================
// STATE VARIABLES
//=====================================================================

it('reducers change state variable value', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);

    store.dispatch(changeStateVariableValue("AREA", 0.7853981633974483));
    
    design = store.getState(); // after
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.7853981633974483);
});

it('reducers change state variable constraint min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].cmin).toEqual(1000);
    expect(design.state_variables[0].smin).toEqual(1000);

    store.dispatch(changeStateVariableConstraint("FORCE", MIN, 10000));
    
    design = store.getState(); // after
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].cmin).toEqual(10000);
    expect(design.state_variables[0].smin).toEqual(10000);
});

it('reducers change state variable constraint max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].cmax).toEqual(3000);
    expect(design.state_variables[2].smax).toEqual(3000);

    store.dispatch(changeStateVariableConstraint("STRESS", MAX, 4000));
    
    design = store.getState(); // after
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].cmax).toEqual(4000);
    expect(design.state_variables[2].smax).toEqual(4000);
});

it('reducers set state variable flag min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].lmin).toEqual(CONSTRAINED);

    store.dispatch(setStateVariableFlag("FORCE", MIN, FIXED));
    
    design = store.getState(); // after
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].lmin).toEqual(CONSTRAINED|FIXED);
});

it('reducers reset state variable flag min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].lmin).toEqual(CONSTRAINED);

    store.dispatch(resetStateVariableFlag("FORCE", MIN, CONSTRAINED));
    
    design = store.getState(); // after
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].lmin).toEqual(0);
});

it('reducers set state variable flag max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].lmax).toEqual(CONSTRAINED);

    store.dispatch(setStateVariableFlag("STRESS", MAX, FIXED));
    
    design = store.getState(); // after
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].lmax).toEqual(CONSTRAINED|FIXED);
});

it('reducers reset state variable flag max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].lmax).toEqual(CONSTRAINED);

    store.dispatch(resetStateVariableFlag("STRESS", MAX, CONSTRAINED));
    
    design = store.getState(); // after
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].lmax).toEqual(0);
});

//=====================================================================
// OBJECTIVE FUNCTION
//=====================================================================

it('reducers change result objective value', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.result.objective_value).toEqual(0.5605106435926049);

    store.dispatch(changeResultObjectiveValue(0.987654321));
    
    design = store.getState(); // after
    expect(design.result.objective_value).toEqual(0.987654321);
});