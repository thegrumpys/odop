import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../../../designtypes/Spring/Compression/initialState';
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

// This is a mapping of the demo2 execute file to an equivalent test case file

it('demo2', () => {
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

// title: "Page 02 of 07"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Compression Spring demo2"}]));

design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

// title: "Page 03 of 07"
    // No-op

// title: "Page 04 of 07"
    // No-op

// title: "Page 05 of 07"
    store.dispatch(changeSymbolValue("Material_Type",7));
    store.dispatch(changeSymbolValue("End_Type",3));
    store.dispatch(fixSymbolValue("OD_Free",0.188));
    store.dispatch(setSymbolFlag("L_Solid",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Solid",MAX,0.34));
    store.dispatch(fixSymbolValue("L_2",0.385));
    store.dispatch(fixSymbolValue("Force_2",7.2));
    store.dispatch(fixSymbolValue("L_Free",0.475));
    store.dispatch(changeSymbolValue("Wire_Dia",0.035));

design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.1569232,7);

// title: "Page 06 of 07"
    store.dispatch(changeSymbolConstraint("FS_Solid",MIN,0.7));

design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.1569232,7);

// title: "Page 07 of 07 (last page)"
    store.dispatch(search());

design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000062,7);

});

