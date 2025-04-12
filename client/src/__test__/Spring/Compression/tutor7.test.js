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

// This is a mapping of the tutor7 execute file to an equivalent test case file

it('tutor7', () => {
    var startTime = Date.now();
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState(); // before
    expect(design.model.result.objective_value).toEqual(0.0);


    // title: "Session Now In Progress"
    // No-op

    // title: "Page 02 of 17"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Compression Spring Demo"}]));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 03 of 17"
    // No-op

    // title: "Page 04 of 17"
    store.dispatch(fixSymbolValue("Force_1",0));
    store.dispatch(fixSymbolValue("Force_2",20));
    store.dispatch(setSymbolFlag("OD_Free",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("OD_Free",MAX,1.5));
    store.dispatch(setSymbolFlag("L_Stroke",MIN,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Stroke",MIN,1));
    store.dispatch(setSymbolFlag("L_Solid",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Solid",MAX,1.5));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.5763972,7);

    // title: "Page 05 of 17"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 06 of 17"
    store.dispatch(seek("Weight",MIN));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000150,7);

    // title: "Page 07 of 17"
    store.dispatch(seek("Rate",MIN));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000941,7);

    // title: "Page 08 of 17"
    store.dispatch(seek("L_Solid",MIN));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0001140,7);

    // title: "Page 09 of 17"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Compression Spring Demo"}]));
    store.dispatch(fixSymbolValue("Force_1",0));
    store.dispatch(fixSymbolValue("Force_2",100));
    store.dispatch(setSymbolFlag("L_Stroke",MIN,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Stroke",MIN,2.5));
    store.dispatch(changeSymbolValue("Prop_Calc_Method",3));
    store.dispatch(changeSymbolValue("Stress_Lim_Stat",80000));
    store.dispatch(setSymbolFlag("FS_2",MIN,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("FS_2",MIN,1));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(7.0591362,7);

    // title: "Page 10 of 17"
    // No-op

    // title: "Page 11 of 17"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 12 of 17"
    // No-op

    // title: "Page 13 of 17"
    store.dispatch(seek("Weight",MIN));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0002004,7);

    // title: "Page 14 of 17"
    // No-op

    // title: "Page 15 of 17"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(setSymbolFlag("OD_Free",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("OD_Free",MAX,1.5));
    store.dispatch(setSymbolFlag("L_Solid",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Solid",MAX,1.5));
    store.dispatch(setSymbolFlag("L_Stroke",MIN,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Stroke",MIN,1));
    store.dispatch(fixSymbolValue("Force_1",0));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 16 of 17"
    store.dispatch(seek("Force_2",MAX));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0001687,7);

    // title: "Page 17 of 17 (last page)"
    // No-op

    var endTime = Date.now();
    var duration = endTime - startTime;
    console.log('Duration=',duration);
});