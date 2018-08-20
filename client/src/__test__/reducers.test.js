import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../designtypes/Piston-Cylinder/initialState';
import { initialSystemControls } from '../initialSystemControls';
import { MIN, MAX, CONSTRAINED, FIXED } from '../store/actionTypes';
import { 
    startup, load, changeName, 
    changeDesignParameterValue, changeDesignParameterViolation, changeDesignParameterConstraint, setDesignParameterFlag, resetDesignParameterFlag, 
    changeStateVariableValue, changeStateVariableViolation, changeStateVariableConstraint, saveStateVariableConstraints, restoreStateVariableConstraints, setStateVariableFlag, resetStateVariableFlag, 
    changeResultObjectiveValue, changeResultTerminationCondition, changeResultViolatedConstraintCount, 
    changeSystemControlsValue, changeLabelsValue, search, seek 
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
    expect(design.name).toEqual("initialState");
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
    
    store.dispatch(startup());
    
    var design = store.getState(); // after
    expect(design.name).toEqual("initialState");
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
});

it('reducers load', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);

    var design = store.getState(); // before
    expect(design.name).toEqual("initialState");
    expect(design.type).toEqual("Piston-Cylinder");

    store.dispatch(load({
        "name": "test",
        "type": "Test-Design"
    }));
    
    var design = store.getState(); // after
    expect(design.name).toEqual("test");
    expect(design.type).toEqual("Test-Design");
});

it('reducers change name', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);

    var design = store.getState(); // before
    expect(design.name).toEqual("initialState");
    expect(design.type).toEqual("Piston-Cylinder");

    store.dispatch(changeName('startup'));
    
    var design = store.getState(); // after
    expect(design.name).toEqual("startup");
    expect(design.type).toEqual("Piston-Cylinder");
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

it('reducers change design parameter violation min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].vmin).toEqual(-17);

    store.dispatch(changeDesignParameterViolation("RADIUS", MIN, -1234));
    
    design = store.getState(); // after
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].vmin).toEqual(-1234);
});

it('reducers change design parameter violation max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].vmax).toEqual(-0.19999999999999996);

    store.dispatch(changeDesignParameterViolation("RADIUS", MAX, 1234));
    
    design = store.getState(); // after
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].vmax).toEqual(1234);
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

it('reducers change state variable violation min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].vmin).toEqual(0.7486725877128165);

    store.dispatch(changeStateVariableViolation("FORCE", MIN, -1234));
    
    design = store.getState(); // after
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].vmin).toEqual(-1234);
});

it('reducers change state variable violation max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].vmin).toEqual(0);

    store.dispatch(changeStateVariableViolation("STRESS", MIN, 1234));
    
    design = store.getState(); // after
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].vmin).toEqual(1234);
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

it('reducers save state variable constraints', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].lmin).toEqual(1);
    expect(design.state_variables[0].cmin).toEqual(1000);
    expect(design.state_variables[0].lmax).toEqual(0);
    expect(design.state_variables[0].cmax).toEqual(0);
    expect(design.state_variables[0].oldlmin).toEqual(undefined);
    expect(design.state_variables[0].oldcmin).toEqual(undefined);
    expect(design.state_variables[0].oldlmax).toEqual(undefined);
    expect(design.state_variables[0].oldcmax).toEqual(undefined);

    store.dispatch(saveStateVariableConstraints("FORCE"));
    
    design = store.getState(); // after
    expect(design.state_variables[0].lmin).toEqual(1);
    expect(design.state_variables[0].cmin).toEqual(1000);
    expect(design.state_variables[0].lmax).toEqual(0);
    expect(design.state_variables[0].cmax).toEqual(0);
    expect(design.state_variables[0].oldlmin).toEqual(1);
    expect(design.state_variables[0].oldcmin).toEqual(1000);
    expect(design.state_variables[0].oldlmax).toEqual(0);
    expect(design.state_variables[0].oldcmax).toEqual(0);
});

it('reducers restore state variable constraints', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].lmin).toEqual(1);
    expect(design.state_variables[0].cmin).toEqual(1000);
    expect(design.state_variables[0].lmax).toEqual(0);
    expect(design.state_variables[0].cmax).toEqual(0);
    expect(design.state_variables[0].oldlmin).toEqual(undefined);
    expect(design.state_variables[0].oldcmin).toEqual(undefined);
    expect(design.state_variables[0].oldlmax).toEqual(undefined);
    expect(design.state_variables[0].oldcmax).toEqual(undefined);

    store.dispatch(restoreStateVariableConstraints("FORCE"));
    
    design = store.getState(); // after
    expect(design.state_variables[0].lmin).toEqual(undefined);
    expect(design.state_variables[0].cmin).toEqual(undefined);
    expect(design.state_variables[0].lmax).toEqual(undefined);
    expect(design.state_variables[0].cmax).toEqual(undefined);
    expect(design.state_variables[0].oldlmin).toEqual(undefined);
    expect(design.state_variables[0].oldcmin).toEqual(undefined);
    expect(design.state_variables[0].oldlmax).toEqual(undefined);
    expect(design.state_variables[0].oldcmax).toEqual(undefined);
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
//CONSTANTS
//=====================================================================

//=====================================================================
// RESULT
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

it('reducers change result termination condition', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.result.termination_condition).toEqual('');

    store.dispatch(changeResultTerminationCondition('Test'));
    
    design = store.getState(); // after
    expect(design.result.termination_condition).toEqual('Test');
});

it('reducers change result violated constaint count', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.result.violated_constraint_count).toEqual(0);

    store.dispatch(changeResultViolatedConstraintCount(3));
    
    design = store.getState(); // after
    expect(design.result.violated_constraint_count).toEqual(3);
});

//=====================================================================
// OTHER
//=====================================================================

it('reducers change system controls value', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.system_controls.ioopt).toEqual(3);

    store.dispatch(changeSystemControlsValue({ioopt: 5}));
    
    design = store.getState(); // after
    expect(design.system_controls.ioopt).toEqual(5);
});

it('reducers change label value', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    var design = store.getState(); // before
    expect(design.labels[0].name).toEqual('COMMENT');
    expect(design.labels[0].value).toEqual('PCYL Default startup file ...');

    store.dispatch(changeLabelsValue([{name: 'COMMENT', value: 'Test'}]));
    
    design = store.getState(); // after
    expect(design.labels[0].name).toEqual('COMMENT');
    expect(design.labels[0].value).toEqual('Test');
});

//=====================================================================
// NO-OP
//=====================================================================

it('reducers search', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    // Without middleware this should do nothing
    store.dispatch(search());
    
    var design = store.getState(); // after
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
});

it('reducers seek stress min', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    // Without middleware this should do nothing
    store.dispatch(seek("STRESS", MIN));
    
    var design = store.getState(); // after
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
});

it('reducers seek stress max', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        state);
    
    // Without middleware this should do nothing
    store.dispatch(seek("STRESS", MAX));
    
    var design = store.getState(); // after
    expect(design.type).toEqual("Piston-Cylinder");
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
});

