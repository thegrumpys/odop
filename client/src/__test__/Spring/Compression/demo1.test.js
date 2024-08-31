import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { inject, enableDispatcher, loadInitialState,
         changeLabelsValue,
         changeSymbolValue,
         setSymbolFlag,
         resetSymbolFlag,
         changeSymbolConstraint,
         fixSymbolValue,
         freeSymbolValue,
         search,
         changeSystemControlsValue,
         seek } from '../../../store/modelSlice';
import { MIN, MAX, CONSTRAINED, FIXED, FDCL } from '../../../store/actionTypes';
import store from "../../../store/store";

// This is a mapping of the demo1 execute file to an equivalent test case file

it('demo1', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState().modelSlice; // before
    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toEqual(0.0);

    // Execute File: demo1
    // title: "Session Now In Progress"
    // No-op

    // title: "Page 02 of 11"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Compression Spring demo1"}]));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 03 of 11"
    // No-op

    // title: "Page 04 of 11"
    // No-op

    // title: "Page 05 of 11"
    store.dispatch(fixSymbolValue("OD_Free",0.925));
    store.dispatch(fixSymbolValue("L_Free",1.713));
    store.dispatch(fixSymbolValue("Force_2",50));
    store.dispatch(fixSymbolValue("L_2",1.278));
    store.dispatch(setSymbolFlag("L_Solid",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Solid",MAX,1.06));
    store.dispatch(changeSymbolValue("Material_Type",3));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(2.7011747,7);

    // title: "Page 06 of 11"
    store.dispatch(changeSymbolConstraint("FS_2",MAX,2));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(2.7011747,7);

    // title: "Page 07 of 11"
    store.dispatch(search());

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000032,7);

    // title: "Page 08 of 11"
    store.dispatch(fixSymbolValue("Wire_Dia",0.125));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000408,7);

    // title: "Page 09 of 11"
    store.dispatch(search());

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000099,7);

    // title: "Page 10 of 11"
    // No-op

    // title: "Page 11 of 11 (last page)"
    store.dispatch(fixSymbolValue("Force_2",75.1));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0632930,7);
});
