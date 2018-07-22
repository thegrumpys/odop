import { createStore, applyMiddleware } from 'redux';
import { pcylWebApp } from '../reducers';
import { initialState } from '../initialState';
import { equationsMiddleware } from '../equationsMiddleware';
import { 
    startup,
    changeDesignParameterValue, changeDesignParameterConstraint, setDesignParameterFlag, resetDesignParameterFlag, 
    changeStateVariableValue, changeStateVariableConstraint, setStateVariableFlag, resetStateVariableFlag, 
    changeSearchResultsObjectiveValue
    } from '../actionCreators';
import { MIN, MAX } from '../actionTypes';
import { CONSTRAINED, FIXED } from '../globals';

//=====================================================================
// STARTUP
//=====================================================================

it('middleware with startup', () => {
    const store = createStore(
        pcylWebApp,
        initialState,
        applyMiddleware(equationsMiddleware));
    
    var design = store.getState(); // before
    expect(design.design_parameters[0].name).toEqual("PRESSURE");
    expect(design.design_parameters[0].cmin).toEqual(0);
    expect(design.design_parameters[0].cmax).toEqual(1500);
    expect(design.design_parameters[0].smin).toEqual(0.06666666666666667);
    expect(design.design_parameters[0].smax).toEqual(1500);
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].cmin).toEqual(0);
    expect(design.design_parameters[1].cmax).toEqual(0.5);
    expect(design.design_parameters[1].smin).toEqual(0.4);
    expect(design.design_parameters[1].smax).toEqual(0.5);
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].cmin).toEqual(0.0);
    expect(design.design_parameters[2].cmax).toEqual(0.05);
    expect(design.design_parameters[2].smin).toEqual(0.04);
    expect(design.design_parameters[2].smax).toEqual(0.05);
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].cmin).toEqual(1000);
    expect(design.state_variables[0].cmax).toEqual(0);
    expect(design.state_variables[0].smin).toEqual(1000);
    expect(design.state_variables[0].smax).toEqual(0.06666666666666667);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].cmin).toEqual(0);
    expect(design.state_variables[1].cmax).toEqual(0);
    expect(design.state_variables[1].smin).toEqual(0.06666666666666667);
    expect(design.state_variables[1].smax).toEqual(0.06666666666666667);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].cmin).toEqual(0);
    expect(design.state_variables[2].cmax).toEqual(3000);
    expect(design.state_variables[2].smin).toEqual(0.06666666666666667);
    expect(design.state_variables[2].smax).toEqual(3000);
    
    store.dispatch(startup());
    
    
    var design = store.getState(); // after
//  value=500, level=1500, sdlimit=0, status=1, stemp=1500
    expect(design.design_parameters[0].name).toEqual("PRESSURE");
    expect(design.design_parameters[0].cmin).toEqual(0);
    expect(design.design_parameters[0].cmax).toEqual(1500);
    expect(design.design_parameters[0].smin).toEqual(500); // updated
    expect(design.design_parameters[0].smax).toEqual(1500);
//  value=0.4, level=0, sdlimit=0, status=1, stemp=0.4
//  value=0.4, level=0.5, sdlimit=0, status=1, stemp=0.5
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].cmin).toEqual(0);
    expect(design.design_parameters[1].cmax).toEqual(0.5);
    expect(design.design_parameters[1].smin).toEqual(0.4);
    expect(design.design_parameters[1].smax).toEqual(0.5);
//  value=0.04, level=0, sdlimit=0, status=1, stemp=0.04
//  value=0.04, level=0.05, sdlimit=0, status=1, stemp=0.05
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].cmin).toEqual(0.0);
    expect(design.design_parameters[2].cmax).toEqual(0.05);
    expect(design.design_parameters[2].smin).toEqual(0.04);
    expect(design.design_parameters[2].smax).toEqual(0.05);
//  value=251.32741228718348, level=1000, sdlimit=0, status=1, stemp=1000
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].cmin).toEqual(1000);
    expect(design.state_variables[0].cmax).toEqual(0);
    expect(design.state_variables[0].smin).toEqual(1000);
    expect(design.state_variables[0].smax).toEqual(251.32741228718348); // updated
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].cmin).toEqual(0);
    expect(design.state_variables[1].cmax).toEqual(0);
    expect(design.state_variables[1].smin).toEqual(0.5026548245743669); // updated
    expect(design.state_variables[1].smax).toEqual(0.5026548245743669); // updated
//  value=2500, level=3000, sdlimit=0, status=1, stemp=3000
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].cmin).toEqual(0);
    expect(design.state_variables[2].cmax).toEqual(3000);
    expect(design.state_variables[2].smin).toEqual(2500); // updated
    expect(design.state_variables[2].smax).toEqual(3000);
});

//=====================================================================
// DESIGN PARAMETERS
//=====================================================================

it('middleware change pressure design parameter value without startup', () => {
    const store = createStore(
        pcylWebApp,
        initialState,
        applyMiddleware(equationsMiddleware));
    
    var design = store.getState(); // before
    expect(design.design_parameters[0].name).toEqual("PRESSURE");
    expect(design.design_parameters[0].value).toEqual(500);
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].value).toEqual(251.32741228718348);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].value).toEqual(2500);

    store.dispatch(changeDesignParameterValue("PRESSURE", 5000));
    
    design = store.getState(); // after
    expect(design.design_parameters[0].name).toEqual("PRESSURE");
    expect(design.design_parameters[0].value).toEqual(5000);
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].value).toEqual(2513.2741228718348);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].value).toEqual(25000);
});

it('middleware change radius design parameter value without startup', () => {
    const store = createStore(
        pcylWebApp,
        initialState,
        applyMiddleware(equationsMiddleware));
    
    var design = store.getState(); // before
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4);
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].value).toEqual(251.32741228718348);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].value).toEqual(2500);

    store.dispatch(changeDesignParameterValue("RADIUS", 0.5));
    
    design = store.getState(); // after
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.5);
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].value).toEqual(392.6990816987241);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.7853981633974483);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].value).toEqual(3125);
});

it('middleware change thickness design parameter value without startup', () => {
    const store = createStore(
        pcylWebApp,
        initialState,
        applyMiddleware(equationsMiddleware));
    
    var design = store.getState(); // before
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].value).toEqual(0.04);
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].value).toEqual(251.32741228718348);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].value).toEqual(2500);

    store.dispatch(changeDesignParameterValue("THICKNESS", 0.05));
    
    design = store.getState(); // after
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].value).toEqual(0.05);
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].value).toEqual(251.32741228718348);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].value).toEqual(2000);
});
//=====================================================================
// CONSTRAINTS
//=====================================================================

it('middleware change constraints to force all violations', () => {
    const store = createStore(
        pcylWebApp,
        initialState,
        applyMiddleware(equationsMiddleware));
    
    var design = store.getState(); // before
    expect(design.design_parameters[0].name).toEqual("PRESSURE");
    expect(design.design_parameters[0].cmin).toEqual(0);
    expect(design.design_parameters[0].cmax).toEqual(1500);
    expect(design.design_parameters[0].smin).toEqual(0.06666666666666667);
    expect(design.design_parameters[0].smax).toEqual(1500);
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].cmin).toEqual(0);
    expect(design.design_parameters[1].cmax).toEqual(0.5);
    expect(design.design_parameters[1].smin).toEqual(0.4);
    expect(design.design_parameters[1].smax).toEqual(0.5);
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].cmin).toEqual(0.0);
    expect(design.design_parameters[2].cmax).toEqual(0.05);
    expect(design.design_parameters[2].smin).toEqual(0.04);
    expect(design.design_parameters[2].smax).toEqual(0.05);
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].cmin).toEqual(1000);
    expect(design.state_variables[0].cmax).toEqual(0);
    expect(design.state_variables[0].smin).toEqual(1000);
    expect(design.state_variables[0].smax).toEqual(0.06666666666666667);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].cmin).toEqual(0);
    expect(design.state_variables[1].cmax).toEqual(0);
    expect(design.state_variables[1].smin).toEqual(0.06666666666666667);
    expect(design.state_variables[1].smax).toEqual(0.06666666666666667);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].cmin).toEqual(0);
    expect(design.state_variables[2].cmax).toEqual(3000);
    expect(design.state_variables[2].smin).toEqual(0.06666666666666667);
    expect(design.state_variables[2].smax).toEqual(3000);
    
    // Set all constraints to cause violations
    store.dispatch(changeDesignParameterConstraint("PRESSURE", MIN,600));
    store.dispatch(changeDesignParameterConstraint("RADIUS", MIN, 0.5));
    store.dispatch(changeDesignParameterConstraint("THICKNESS", MIN, 0.05));
    store.dispatch(changeStateVariableConstraint("FORCE", MIN, 10000));
    store.dispatch(changeStateVariableConstraint("AREA", MIN, 0.5));
    store.dispatch(changeStateVariableConstraint("STRESS", MIN, 3000));

    store.dispatch(changeDesignParameterConstraint("PRESSURE", MAX, 400));
    store.dispatch(changeDesignParameterConstraint("RADIUS", MAX, 0.3));
    store.dispatch(changeDesignParameterConstraint("THICKNESS", MAX, 0.03));
    store.dispatch(changeStateVariableConstraint("FORCE", MAX, -10000));
    store.dispatch(changeStateVariableConstraint("AREA", MAX, 0.4));
    store.dispatch(changeStateVariableConstraint("STRESS", MAX, 2000));

    // Reset all flags
    store.dispatch(resetDesignParameterFlag("PRESSURE", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetDesignParameterFlag("RADIUS", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetDesignParameterFlag("THICKNESS", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetStateVariableFlag("FORCE", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetStateVariableFlag("AREA", MIN, FIXED|CONSTRAINED));
    store.dispatch(resetStateVariableFlag("STRESS", MIN, FIXED|CONSTRAINED));

    store.dispatch(resetDesignParameterFlag("PRESSURE", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetDesignParameterFlag("RADIUS", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetDesignParameterFlag("THICKNESS", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetStateVariableFlag("FORCE", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetStateVariableFlag("AREA", MAX, FIXED|CONSTRAINED));
    store.dispatch(resetStateVariableFlag("STRESS", MAX, FIXED|CONSTRAINED));

    // Set all flags
    store.dispatch(setDesignParameterFlag("PRESSURE", MIN, FIXED|CONSTRAINED));
    store.dispatch(setDesignParameterFlag("RADIUS", MIN, FIXED|CONSTRAINED));
    store.dispatch(setDesignParameterFlag("THICKNESS", MIN, FIXED|CONSTRAINED));
    store.dispatch(setStateVariableFlag("FORCE", MIN, FIXED|CONSTRAINED));
    store.dispatch(setStateVariableFlag("AREA", MIN, FIXED|CONSTRAINED));
    store.dispatch(setStateVariableFlag("STRESS", MIN, FIXED|CONSTRAINED));

    store.dispatch(setDesignParameterFlag("PRESSURE", MAX, FIXED|CONSTRAINED));
    store.dispatch(setDesignParameterFlag("RADIUS", MAX, FIXED|CONSTRAINED));
    store.dispatch(setDesignParameterFlag("THICKNESS", MAX, FIXED|CONSTRAINED));
    store.dispatch(setStateVariableFlag("FORCE", MAX, FIXED|CONSTRAINED));
    store.dispatch(setStateVariableFlag("AREA", MAX, FIXED|CONSTRAINED));
    store.dispatch(setStateVariableFlag("STRESS", MAX, FIXED|CONSTRAINED));
});