import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { inject,
         enableDispatcher,
         loadInitialState,
         changeLabelsValue,
         changeSymbolValue,
         setSymbolFlag,
         resetSymbolFlag,
         changeSymbolConstraint,
         fixSymbolValue,
         freeSymbolValue,
         search,
         changeSystemControlsValue,
         seek } from '../../../store/actions';
import { MIN, MAX, CONSTRAINED, FIXED, FDCL } from '../../../store/actionTypes';
import store from "../../../store/store";

// This is a mapping of the demo15 execute file to an equivalent test case file

it('demo15', () => {
    var startTime = Date.now();
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState(); // before
    expect(design.model.result.objective_value).toEqual(0.0);


    // title: "Session Now In Progress"
    // No-op

    // title: "Page 02 of 09"
    store.dispatch(loadInitialState("Spring/Torsion","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Torsion Spring Demo"}]));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 03 of 09"
    // No-op

    // title: "Page 04 of 09"
    store.dispatch(changeSymbolValue("Prop_Calc_Method",3));
    store.dispatch(changeSymbolValue("Elastic_Modulus",28700000));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 05 of 09"
    store.dispatch(fixSymbolValue("M_1",0));
    store.dispatch(fixSymbolValue("M_2",4));
    store.dispatch(fixSymbolValue("ID_Free",0.75));
    store.dispatch(fixSymbolValue("Deflect_2",200));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0148705,7);

    // title: "Page 06 of 09"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000083,7);

    // title: "Page 07 of 09"
    // No-op

    // title: "Page 08 of 09"
    store.dispatch(fixSymbolValue("Wire_Dia",0.063));
    store.dispatch(changeSymbolValue("Coil_Spacing",0.015));
    store.dispatch(changeSymbolValue("Heat_Treat",2));
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000083,7);

    // title: "Page 09 of 09 (last page)"
    store.dispatch(changeSymbolValue("OD_Free",0.876));
    store.dispatch(changeSymbolValue("Coils_T",7));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0010098,7);

    var endTime = Date.now();
    var duration = endTime - startTime;
    console.log('Duration=',duration);
});