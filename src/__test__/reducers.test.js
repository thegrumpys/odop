import { createStore, applyMiddleware } from 'redux';
import { pcylWebApp } from '../reducers';
import { initialState } from '../initialState';
import { equationsMiddleware } from '../equationsMiddleware';
import { 
    startup,
    changeDesignParameterValue, changeDesignParameterConstraint, setDesignParameterFlag, resetDesignParameterFlag, 
    changeStateVariableValue, changeStateVariableConstraint, setStateVariableFlag, resetStateVariableFlag, 
    changeObjectiveValue
    } from '../actionCreators';
import { MIN, MAX } from '../actionTypes';
import { CONSTRAINED, FIXED } from '../globals';

//=====================================================================
// STARTUP
//=====================================================================

it('without startup', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    // Nothing changed, subscribe not possible, so just use the store directly
    var design = store.getState();
    expect(design.name).toEqual("Piston-Cylinder");
    expect(design.version).toEqual("1.2");
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
});

it('with startup', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    // Nothing changed, subscribe not possible, so just use the store directly
    var design = store.getState();
    expect(design.name).toEqual("Piston-Cylinder");
    expect(design.version).toEqual("1.2");
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
    
    store.dispatch(startup());
    
    var design = store.getState();
    expect(design.name).toEqual("Piston-Cylinder");
    expect(design.version).toEqual("1.2");
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
});

//=====================================================================
// DESIGN PARAMETERS
//=====================================================================

it('change design parameter value', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4); // before
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);

    store.dispatch(changeDesignParameterValue("RADIUS", 0.5));
    
    design = store.getState();
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.5); // after
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
});

it('change design parameter constraint min', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].cmin).toEqual(0.0); // before
    expect(design.design_parameters[1].smin).toEqual(0.4);

    store.dispatch(changeDesignParameterConstraint("RADIUS", MIN, 0.1));
    
    design = store.getState();
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].cmin).toEqual(0.1); // after
    expect(design.design_parameters[1].smin).toEqual(0.1);
});

it('change design parameter constraint max', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].cmax).toEqual(0.05); // before
    expect(design.design_parameters[2].smax).toEqual(0.05);

    store.dispatch(changeDesignParameterConstraint("THICKNESS", MAX, 0.06));
    
    design = store.getState();
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].cmax).toEqual(0.06); // after
    expect(design.design_parameters[2].smax).toEqual(0.06);
});

it('set design parameter flag min', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].lmin).toEqual(CONSTRAINED); // before

    store.dispatch(setDesignParameterFlag("RADIUS", MIN, FIXED));
    
    design = store.getState();
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].lmin).toEqual(CONSTRAINED|FIXED); // after
});

it('reset design parameter flag min', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].lmin).toEqual(CONSTRAINED); // before

    store.dispatch(resetDesignParameterFlag("RADIUS", MIN, CONSTRAINED));
    
    design = store.getState();
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].lmin).toEqual(0); // after
});

it('set design parameter flag max', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].lmax).toEqual(CONSTRAINED); // before

    store.dispatch(setDesignParameterFlag("THICKNESS", MAX, FIXED));
    
    design = store.getState();
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].lmax).toEqual(CONSTRAINED|FIXED); // after
});

it('reset design parameter flag max', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].lmax).toEqual(CONSTRAINED); // before

    store.dispatch(resetDesignParameterFlag("THICKNESS", MAX, CONSTRAINED));
    
    design = store.getState();
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].lmax).toEqual(0); // after
});

//=====================================================================
// STATE VARIABLES
//=====================================================================

it('change state variable value', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);

    store.dispatch(changeStateVariableValue("AREA", 0.7853981633974483));
    
    design = store.getState();
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.7853981633974483);
});

it('change state variable constraint min', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].cmin).toEqual(1000);
    expect(design.state_variables[0].smin).toEqual(1000);

    store.dispatch(changeStateVariableConstraint("FORCE", MIN, 10000));
    
    design = store.getState();
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].cmin).toEqual(10000);
    expect(design.state_variables[0].smin).toEqual(10000);
});

it('change state variable constraint max', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].cmax).toEqual(3000);
    expect(design.state_variables[2].smax).toEqual(3000);

    store.dispatch(changeStateVariableConstraint("STRESS", MAX, 4000));
    
    design = store.getState();
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].cmax).toEqual(4000);
    expect(design.state_variables[2].smax).toEqual(4000);
});

it('set state variable flag min', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].lmin).toEqual(CONSTRAINED); // before

    store.dispatch(setStateVariableFlag("FORCE", MIN, FIXED));
    
    design = store.getState();
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].lmin).toEqual(CONSTRAINED|FIXED); // after
});

it('reset state variable flag min', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].lmin).toEqual(CONSTRAINED); // before

    store.dispatch(resetStateVariableFlag("FORCE", MIN, CONSTRAINED));
    
    design = store.getState();
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].lmin).toEqual(0); // after
});

it('set state variable flag max', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].lmax).toEqual(CONSTRAINED); // before

    store.dispatch(setStateVariableFlag("STRESS", MAX, FIXED));
    
    design = store.getState();
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].lmax).toEqual(CONSTRAINED|FIXED); // after
});

it('reset state variable flag max', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].lmax).toEqual(CONSTRAINED); // before

    store.dispatch(resetStateVariableFlag("STRESS", MAX, CONSTRAINED));
    
    design = store.getState();
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].lmax).toEqual(0); // after
});

//=====================================================================
// OBJECTIVE FUNCTION
//=====================================================================

it('change objective value', () => {
    const store = createStore(
        pcylWebApp,
        initialState);
    
    var design = store.getState();
    expect(design.objective_value).toEqual(0.5605106435926049);

    store.dispatch(changeObjectiveValue(0.987654321));
    
    design = store.getState();
    expect(design.objective_value).toEqual(0.987654321);
});