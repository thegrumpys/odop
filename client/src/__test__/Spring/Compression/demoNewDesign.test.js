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

// This is a mapping of the demoNewDesign execute file to an equivalent test case file

it('demoNewDesign', () => {
    var startTime = Date.now();
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

    var design = store.getState(); // before
    design = store.getState();
    expect(design.model.result.objective_value).toEqual(0.0);

    // Execute File: demoNewDesign
    // title: "Session Now In Progress"
    // No-op

    // title: "Page 02 of 14"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Compression Spring demoNewDesign"}]));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 03 of 14"
    // No-op

    // title: "Page 04 of 14"
    // No-op

    // title: "Page 05 of 14"
    // No-op

    // title: "Page 06 of 14"
    // No-op

    // title: "Page 07 of 14"
    store.dispatch(changeSymbolValue("Material_Type",3));
    store.dispatch(changeSymbolValue("Life_Category",3));
    store.dispatch(changeSymbolValue("End_Type",4));
    store.dispatch(setSymbolFlag("FS_CycleLife",MIN,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("FS_CycleLife",MIN,1));
    store.dispatch(setSymbolFlag("Cycle_Life",MIN,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("Cycle_Life",MIN,1000000));
    store.dispatch(setSymbolFlag("OD_Free",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("OD_Free",MAX,1.25));
    store.dispatch(setSymbolFlag("L_Solid",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Solid",MAX,1.3));
    store.dispatch(setSymbolFlag("L_Stroke",MIN,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Stroke",MIN,0.65));
    store.dispatch(fixSymbolValue("Force_1",30));
    store.dispatch(fixSymbolValue("Force_2",60));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(1.5384420,7);

    // title: "Page 08 of 14"
    // No-op

    // title: "Page 09 of 14"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 10 of 14"
    store.dispatch(fixSymbolValue("Wire_Dia",0.135));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0148411,7);

    // title: "Page 11 of 14"
    // No-op

    // title: "Page 12 of 14"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000018,7);

    // title: "Page 13 of 14"
    // No-op

    // title: "Page 14 of 14 (last page)"
    // No-op

    var endTime = Date.now();
    var duration = endTime - startTime;
    console.log('Duration=',duration);
});