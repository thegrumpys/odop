import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialSystemControls } from 'store/initialSystemControls';
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

// This is a mapping of the tutor3 execute file to an equivalent test case file

it('tutor3', () => {
    var startTime = Date.now();
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState(); // before
    expect(design.model.result.objective_value).toEqual(0.0);


    // title: "Session Now In Progress"
    // No-op

    // title: "Page 02 of 15"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Compression Spring Demo"}]));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 03 of 15"
    // No-op

    // title: "Page 04 of 15"
    store.dispatch(setSymbolFlag("OD_Free",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("OD_Free",MAX,0.9));
    store.dispatch(fixSymbolValue("Force_2",undefined));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0493827,7);

    // title: "Page 05 of 15"
    // No-op

    // title: "Page 06 of 15"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 07 of 15"
    // No-op

    // title: "Page 08 of 15"
    store.dispatch(fixSymbolValue("Force_2",280));
    store.dispatch(fixSymbolValue("Deflect_2",5.5));
    store.dispatch(setSymbolFlag("OD_Free",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("OD_Free",MAX,2));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(98.0740711,7);

    // title: "Page 09 of 15"
    // No-op

    // title: "Page 10 of 15"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000085,7);

    // title: "Page 11 of 15"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Compression Spring Demo"}]));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 12 of 15"
    store.dispatch(fixSymbolValue("Force_1",15));
    store.dispatch(fixSymbolValue("L_1",2));
    store.dispatch(fixSymbolValue("Force_2",65));
    store.dispatch(fixSymbolValue("L_2",1.25));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(2.1668503,7);

    // title: "Page 13 of 15"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000083,7);

    // title: "Page 14 of 15"
    // No-op

    // title: "Page 15 of 15 (last page)"
    // No-op

    var endTime = Date.now();
    var duration = endTime - startTime;
    console.log('Duration=',duration);
});