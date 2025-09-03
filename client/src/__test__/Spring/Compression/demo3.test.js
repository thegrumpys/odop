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

// This is a mapping of the demo3 execute file to an equivalent test case file

it('demo3', () => {
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

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 03 of 11"
    // No-op

    // title: "Page 04 of 11"
    store.dispatch(changeSymbolValue("Material_Type",3));
    store.dispatch(changeSymbolValue("End_Type",4));
    store.dispatch(setSymbolFlag("OD_Free",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("OD_Free",MAX,1.56));
    store.dispatch(fixSymbolValue("Force_1",61.8));
    store.dispatch(fixSymbolValue("L_1",2.362));
    store.dispatch(fixSymbolValue("Force_2",112));
    store.dispatch(fixSymbolValue("L_2",1.969));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(9.691965889,7);

    // title: "Page 05 of 11"
    // No-op

    // title: "Page 06 of 11"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.00000864,7);

    // title: "Page 07 of 11"
    // No-op

    // title: "Page 08 of 11"
    store.dispatch(changeSymbolValue("Wire_Dia",0.189));
    store.dispatch(changeSymbolValue("OD_Free",1.5));
    store.dispatch(changeSymbolValue("L_Free",2.843));
    store.dispatch(changeSymbolValue("Coils_T",8.4));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0027744,7);

    // title: "Page 09 of 11"
    // No-op

    // title: "Page 10 of 11"
    // No-op

    // title: "Page 11 of 11 (last page)"
    // No-op

    var endTime = Date.now();
    var duration = endTime - startTime;
    console.log('Duration=',duration);
});