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

// This is a mapping of the demo14 execute file to an equivalent test case file

it('demo14', () => {
    var startTime = Date.now();
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState(); // before
    expect(design.model.result.objective_value).toEqual(0.0);


    // title: "Session Now In Progress"
    // No-op

    // title: "Page 02 of 08"
    store.dispatch(loadInitialState("Spring/Torsion","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Torsion Spring Demo"}]));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 03 of 08"
    // No-op

    // title: "Page 04 of 08"
    store.dispatch(changeSymbolValue("Material_Type",3));
    store.dispatch(fixSymbolValue("M_1",10));
    store.dispatch(setSymbolFlag("ID_Free",MIN,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("ID_Free",MIN,1.2));
    store.dispatch(setSymbolFlag("ID_Free",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("ID_Free",MAX,1.25));
    store.dispatch(fixSymbolValue("Stroke",110));
    store.dispatch(fixSymbolValue("Force_Arm_2",18));
    store.dispatch(changeSymbolValue("Arm_2",9));

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(307.2401962,7);

    // title: "Page 05 of 08"

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(307.2401962,7);

    // title: "Page 06 of 08"
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000034,7);

    // title: "Page 07 of 08"
    // No-op

    // title: "Page 08 of 08 (last page)"
    store.dispatch(fixSymbolValue("Wire_Dia",0.225));
    store.dispatch(search());

    design = store.getState();
    expect(design.model.result.objective_value).toBeCloseTo(0.0000077,7);

    var endTime = Date.now();
    var duration = endTime - startTime;
    console.log('Duration=',duration);
});