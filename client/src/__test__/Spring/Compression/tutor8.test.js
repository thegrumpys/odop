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

// This is a mapping of the tutor8 execute file to an equivalent test case file

it('tutor8', () => {
    var startTime = Date.now();
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState(); // before
    expect(design.model.result.objective_value).toEqual(0.0);


    // title: "Session Now In Progress"
    // No-op

    // title: "Page 02 of 08"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Compression Spring Demo"}]));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 03 of 08"
    store.dispatch(setSymbolFlag("Cycle_Life",MIN,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("Cycle_Life",MIN,50000));
    store.dispatch(setSymbolFlag("OD_Free",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("OD_Free",MAX,2));
    store.dispatch(setSymbolFlag("L_Solid",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Solid",MAX,1.2));
    store.dispatch(setSymbolFlag("L_Stroke",MIN,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Stroke",MIN,1));
    store.dispatch(fixSymbolValue("Force_1",0));
    store.dispatch(fixSymbolValue("Force_2",250));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(101.0649057,7);

    // title: "Page 04 of 08"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0209010,7);

    // title: "Page 05 of 08"

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0209010,7);

    // title: "Page 06 of 08"
    // No-op

    // title: "Page 07 of 08"

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0209010,7);

    // title: "Page 08 of 08 (last page)"
    // No-op

    var endTime = Date.now();
    var duration = endTime - startTime;
    console.log('Duration=',duration);
});