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

// This is a mapping of the demo1 execute file to an equivalent test case file

it('demo1', () => {
    var startTime = Date.now();
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState(); // before
    expect(design.model.result.objective_value).toEqual(0.0);


    // title: "Session Now In Progress"
    // No-op

    // title: "Page 02 of 11"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Compression Spring demo1"}]));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 03 of 11"
    // No-op

    // title: "Page 04 of 11"
    // No-op

    // title: "Page 05 of 11"
    store.dispatch(fixSymbolValue("OD_Free",0.925));
    store.dispatch(fixSymbolValue("L_Free",1.713));
    store.dispatch(fixSymbolValue("Force_2",50));
    store.dispatch(fixSymbolValue("L_2",1.278));
    store.dispatch(setSymbolFlag("L_Solid",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Solid",MAX,1.06));
    store.dispatch(changeSymbolValue("Material_Type",3));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(2.8141308,7);

    // title: "Page 06 of 11"
    store.dispatch(changeSymbolConstraint("FS_2",MAX,2));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(2.8141308,7);

    // title: "Page 07 of 11"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.00000224,7);

    // title: "Page 08 of 11"
    store.dispatch(fixSymbolValue("Wire_Dia",0.125));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.000965601,7);

    // title: "Page 09 of 11"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(1.3503636e-7,7);

    // title: "Page 10 of 11"
    // No-op

    // title: "Page 11 of 11 (last page)"
    store.dispatch(fixSymbolValue("Force_2",75.1));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.06614827,7);

    var endTime = Date.now();
    var duration = endTime - startTime;
    console.log('Duration=',duration);
});