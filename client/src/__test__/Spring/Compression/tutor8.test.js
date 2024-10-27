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

// This is a mapping of the tutor8 execute file to an equivalent test case file

it('tutor8', () => {
    var startTime = Date.now();
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

    var design = store.getState(); // before
    design = store.getState();
    expect(design.model.result.objective_value).toEqual(0.0);

    // Execute File: tutor8
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