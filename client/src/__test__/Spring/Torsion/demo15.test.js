import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../../../designtypes/Spring/Torsion/initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { loadInitialState,
         changeLabelsValue,
         changeSymbolValue,
         setSymbolFlag,
         changeSymbolConstraint,
         fixSymbolValue,
         search } from '../../../store/modelSlice';
import { reducers } from '../../../store/reducers';
import { dispatcher } from '../../../store/middleware/dispatcher';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';

// This is a mapping of the demo15 execute file to an equivalent test case file

it('demo15', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

    var design = store.getState().modelSlice; // before
    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toEqual(0.0);

    // title: "Session Now In Progress",
    // No-op

// title: "Page 02 of 09"
    store.dispatch(loadInitialState("Spring/Torsion","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Torsion Spring Demo"}]));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

// title: "Page 03 of 09"
    // No-op

// title: "Page 04 of 09"
    store.dispatch(changeSymbolValue("Prop_Calc_Method",3));
    store.dispatch(changeSymbolValue("Elastic_Modulus",28700000));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

// title: "Page 05 of 09"
    store.dispatch(fixSymbolValue("M_1",0));
    store.dispatch(fixSymbolValue("M_2",4));
    store.dispatch(fixSymbolValue("ID_Free",0.75));
    store.dispatch(fixSymbolValue("Deflect_2",200));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0148705,7);

// title: "Page 06 of 09"
    store.dispatch(search());

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000083,7);

// title: "Page 07 of 09"
    // No-op

// title: "Page 08 of 09"
    store.dispatch(fixSymbolValue("Wire_Dia",0.063));
    store.dispatch(changeSymbolValue("Coil_Spacing",0.015));
    store.dispatch(changeSymbolValue("Heat_Treat",2));
    store.dispatch(search());

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000083,7);

// title: "Page 09 of 09 (last page)"
    store.dispatch(changeSymbolValue("OD_Free",0.876));
    store.dispatch(changeSymbolValue("Coils_T",7));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0010098,7);
});

