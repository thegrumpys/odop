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

// This is a mapping of the demo7 execute file to an equivalent test case file

it('demo7', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

    var design = store.getState().model; // before
    design = store.getState().model;
    expect(design.model.result.objective_value).toEqual(0.0);

    // Execute File: demo7
    // title: "Session Now In Progress"
    // No-op

    // title: "Page 02 of 11"
    store.dispatch(loadInitialState("Spring/Extension","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Extension Spring Demo"}]));

    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 03 of 11"
    // No-op

    // title: "Page 04 of 11"
    // No-op

    // title: "Page 05 of 11"
    store.dispatch(changeSymbolValue("Material_Type",2));
    store.dispatch(changeSymbolValue("End_Type",3));
    store.dispatch(setSymbolFlag("OD_Free",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("OD_Free",MAX,0.645));
    store.dispatch(fixSymbolValue("L_Free",5.125));
    store.dispatch(resetSymbolFlag("Force_1",MIN,FDCL));
    store.dispatch(setSymbolFlag("Force_1",MIN,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("Force_1",MIN,45));
    store.dispatch(setSymbolFlag("Force_1",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("Force_1",MAX,55));
    store.dispatch(fixSymbolValue("L_1",5.625));
    store.dispatch(setSymbolFlag("Force_2",MIN,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("Force_2",MIN,94.5));
    store.dispatch(setSymbolFlag("Force_2",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("Force_2",MAX,105));
    store.dispatch(fixSymbolValue("L_2",6.25));

    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(2.3801981,7);

    // title: "Page 06 of 11"
    store.dispatch(freeSymbolValue("End_Extension"));

    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(2.3801981,7);

    // title: "Page 07 of 11"
    store.dispatch(search());

    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000093,7);

    // title: "Page 08 of 11"
    store.dispatch(setSymbolFlag("End_Extension",MIN,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("End_Extension",MIN,0.64));

    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.8023736,7);

    // title: "Page 09 of 11"
    store.dispatch(fixSymbolValue("Wire_Dia",0.12));
    store.dispatch(search());

    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000173,7);

    // title: "Page 10 of 11"
    store.dispatch(changeSymbolValue("OD_Free",0.645));
    store.dispatch(changeSymbolValue("Coils_T",29));
    store.dispatch(changeSymbolValue("Initial_Tension",14.4));
    store.dispatch(changeSymbolValue("End_Extension",0.715));
    store.dispatch(changeSymbolValue("Force_1",50));
    store.dispatch(changeSymbolValue("Force_2",94.5));
    store.dispatch(changeSymbolValue("End_Type",6));
    store.dispatch(changeSymbolValue("Hook_Deflect_All",0));

    design = store.getState().model;
    expect(design.model.result.objective_value).toBeCloseTo(0.1269627,7);

    // title: "Page 11 of 11 (last page)"
    // No-op
});
