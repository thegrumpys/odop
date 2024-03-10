import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { loadInitialState,
         changeLabelsValue,
         changeSymbolValue,
         setSymbolFlag,
         changeSymbolConstraint,
         fixSymbolValue,
         search,
         changeSystemControlsValue,
         seek } from '../../../store/modelSlice';
import { reducers } from '../../../store/reducers';
import { dispatcher } from '../../../store/middleware/dispatcher';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';

// This is a mapping of the tutor6 execute file to an equivalent test case file

it('tutor6', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

    var design = store.getState().model; // before
    design = store.getState().model;
    expect(design.model.result.objective_value).toEqual(0.0);

    // Execute File: tutor6
    // title: "Session Now In Progress"
    // No-op

    // title: "Page 02 of 07"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Compression Spring Demo"}]));

    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 03 of 07"
    store.dispatch(changeSymbolValue("Material_Type",1));
    store.dispatch(setSymbolFlag("OD_Free",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("OD_Free",MAX,0.92));
    store.dispatch(setSymbolFlag("L_Solid",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Solid",MAX,1.06));
    store.dispatch(fixSymbolValue("L_Free",1.713));
    store.dispatch(fixSymbolValue("Force_1",0));
    store.dispatch(fixSymbolValue("Force_2",50));
    store.dispatch(fixSymbolValue("L_2",1.278));

    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(11.1494326,7);

    // title: "Page 04 of 07"
    store.dispatch(search());

    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000096,7);

    // title: "Page 05 of 07"
    store.dispatch(fixSymbolValue("Wire_Dia",0.12));
    store.dispatch(changeSymbolConstraint("FS_2",MAX,1.6));
    store.dispatch(search());

    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000031,7);

    // title: "Page 06 of 07"
    // No-op

    // title: "Page 07 of 07 (last page)"
    // No-op
});
