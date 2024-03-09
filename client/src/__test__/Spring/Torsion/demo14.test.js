import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../../../designtypes/Spring/Torsion/initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { loadInitialState,
         changeLabelsValue,
         changeSymbolValue,
         setSymbolFlag,
         changeSymbolConstraint,
         fixSymbolValue,
         search } from '../../../store/actionCreators';
import { reducers } from '../../../store/reducers';
import { dispatcher } from '../../../store/middleware/dispatcher';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';

// This is a mapping of the demo14 execute file to an equivalent test case file

it('demo14', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

    var design = store.getState().model; // before
    design = store.getState().model;
    expect(design.model.result.objective_value).toEqual(0.0);

    // title: "Session Now In Progress",
    // No-op

    // Page 02 of 08
    store.dispatch( loadInitialState("Spring/Torsion","US") );
    store.dispatch( changeLabelsValue([{"name":"COMMENT","value":"Torsion Spring Demo"}]) );
    design = store.getState().model;
    expect(design.model.result.objective_value).toEqual(0.0);

    // Page 03 of 08
    // No-op

    // Page 04 of 08
    store.dispatch( changeSymbolValue("Material_Type",3) );
    store.dispatch( fixSymbolValue("M_1",10) );
    store.dispatch( setSymbolFlag("ID_Free",MIN,CONSTRAINED) );
    store.dispatch( changeSymbolConstraint("ID_Free",MIN,1.2) );
    store.dispatch( setSymbolFlag("ID_Free",MAX,CONSTRAINED) );
    store.dispatch( changeSymbolConstraint("ID_Free",MAX,1.25) );
    store.dispatch( fixSymbolValue("Stroke",110) );
    store.dispatch( fixSymbolValue("Force_Arm_2",18) );
    store.dispatch( changeSymbolValue("Arm_2",9) );
    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(307.2401962,7);

    // Page 05 of 08
    // No-op

    // Page 06 of 08
    store.dispatch( search() );
    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000034,7);

    // Page 07 of 08
        // No-op

    // Page 08 of 08
    store.dispatch( fixSymbolValue("Wire_Dia",0.225) );
    store.dispatch( search() );
    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000077,7);

});

