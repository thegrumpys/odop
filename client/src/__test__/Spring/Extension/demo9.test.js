import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { loadInitialState,
         changeLabelsValue,
         changeSymbolValue,
         setSymbolFlag,
         resetSymbolFlag,
         changeSymbolConstraint,
         fixSymbolValue,
         freeSymbolValue,
         search,
         changeSystemControlsValue,
         seek } from '../../../store/actionCreators';
import { reducers } from '../../../store/reducers';
import { dispatcher } from '../../../store/middleware/dispatcher';
import { MIN, MAX, CONSTRAINED, FIXED, FDCL } from '../../../store/actionTypes';

// This is a mapping of the demo9 execute file to an equivalent test case file

it('demo9', () => {
    var startTime = Date.now();
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

    var design = store.getState(); // before
    design = store.getState();
    expect(design.model.result.objective_value).toEqual(0.0);

    // Execute File: demo9
    // title: "Session Now In Progress"
    // No-op

    // title: "Page 02 of 09"
    store.dispatch(loadInitialState("Spring/Extension","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Extension Spring Demo"}]));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 03 of 09"
    // No-op

    // title: "Page 04 of 09"

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 05 of 09"
    store.dispatch(changeSymbolValue("Material_Type",3));
    store.dispatch(changeSymbolValue("End_Type",4));
    store.dispatch(fixSymbolValue("OD_Free",0.5));
    store.dispatch(fixSymbolValue("L_Free",2.938));
    store.dispatch(fixSymbolValue("Force_2",15));
    store.dispatch(fixSymbolValue("L_2",4.688));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(6.6510114,7);

    // title: "Page 06 of 09"
    store.dispatch(changeSystemControlsValue({"maxit":1000,"objmin":0.000001,"delmin":0.00001,"tol":0.00001,"smallnum":1e-8}));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(6.6510114,7);

    // title: "Page 07 of 09"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 08 of 09"
    store.dispatch(fixSymbolValue("Wire_Dia",0.062));
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000004,7);

    // title: "Page 09 of 09 (last page)"
    store.dispatch(changeSymbolValue("Wire_Dia",0.0625));
    store.dispatch(changeSymbolValue("Coils_T",37.2));
    store.dispatch(fixSymbolValue("Initial_Tension",3));
    store.dispatch(changeSymbolValue("End_Type",6));
    store.dispatch(changeSymbolValue("Hook_Deflect_All",0));
    store.dispatch(changeSymbolValue("Prop_Calc_Method",2));
    store.dispatch(changeSymbolValue("Torsion_Modulus",11200000));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000520,7);

    var endTime = Date.now();
    var duration = endTime - startTime;
    console.log('Duration=',duration);
});