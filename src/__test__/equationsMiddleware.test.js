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
// DESIGN PARAMETERS
//=====================================================================

it('change pressure design parameter value', () => {
    const store = createStore(
        pcylWebApp,
        initialState,
        applyMiddleware(equationsMiddleware));
    
    var design = store.getState();
    expect(design.design_parameters[0].name).toEqual("PRESSURE");
    expect(design.design_parameters[0].value).toEqual(500); // before
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].value).toEqual(251.32741228718348);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].value).toEqual(2500);

    store.dispatch(changeDesignParameterValue("PRESSURE", 5000));
    
    design = store.getState();
    expect(design.design_parameters[0].name).toEqual("PRESSURE");
    expect(design.design_parameters[0].value).toEqual(5000); // after
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].value).toEqual(2513.2741228718348);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].value).toEqual(25000);
});

it('change radius design parameter value', () => {
    const store = createStore(
        pcylWebApp,
        initialState,
        applyMiddleware(equationsMiddleware));
    
    var design = store.getState();
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.4); // before
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].value).toEqual(251.32741228718348);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].value).toEqual(2500);

    store.dispatch(changeDesignParameterValue("RADIUS", 0.5));
    
    design = store.getState();
    expect(design.design_parameters[1].name).toEqual("RADIUS");
    expect(design.design_parameters[1].value).toEqual(0.5); // after
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].value).toEqual(251.32741228718348);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.7853981633974483);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].value).toEqual(3125);
});

it('change thickness design parameter value', () => {
    const store = createStore(
        pcylWebApp,
        initialState,
        applyMiddleware(equationsMiddleware));
    
    var design = store.getState();
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].value).toEqual(0.04); // before
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].value).toEqual(251.32741228718348);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].value).toEqual(2500);

    store.dispatch(changeDesignParameterValue("THICKNESS", 0.05));
    
    design = store.getState();
    expect(design.design_parameters[2].name).toEqual("THICKNESS");
    expect(design.design_parameters[2].value).toEqual(0.05); // after
    expect(design.state_variables[0].name).toEqual("FORCE");
    expect(design.state_variables[0].value).toEqual(251.32741228718348);
    expect(design.state_variables[1].name).toEqual("AREA");
    expect(design.state_variables[1].value).toEqual(0.5026548245743669);
    expect(design.state_variables[2].name).toEqual("STRESS");
    expect(design.state_variables[2].value).toEqual(2000);
});
