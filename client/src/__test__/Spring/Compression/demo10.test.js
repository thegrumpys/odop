import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { inject, enableDispatcher, loadInitialState,
         changeLabelsValue,
         changeSymbolValue,
         setSymbolFlag,
         resetSymbolFlag,
         changeSymbolConstraint,
         fixSymbolValue,
         changeSystemControlsValue,
         search } from '../../../store/modelActions';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
import store from "../../../store/store";

// This is a mapping of the demo10 execute file to an equivalent test case file
// RegEx: Find: ExecutePanel\.jsx:\d+\s Replace with: <nothing>
// RegEx: Find: ^.*\[Violation\].*\s$ Replace with: <nothing>

it('demo10', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState().modelSlice; // before
    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toEqual(0.0);

    // title: "Session Now In Progress",
    // No-op

    // title: "Page 02 of 15"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Compression Spring demo10"}]));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

    // title: "Page 03 of 15"
    // No-op

    // title: "Page 04 of 15"
    // No-op

    // title: "Page 05 of 15"
    store.dispatch(changeSymbolValue("Material_Type",7));
    store.dispatch(changeSymbolValue("OD_Free",1.142));
    store.dispatch(changeSymbolValue("Wire_Dia",0.142));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.2039332,7);

    // title: "Page 06 of 15"
    store.dispatch(changeSymbolValue("Prop_Calc_Method",3));
    store.dispatch(changeSymbolValue("OD_Free",1.1));
    store.dispatch(changeSymbolValue("Wire_Dia",0.1055));
    store.dispatch(changeSymbolValue("Stress_Lim_Stat",96880));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0102917,7);

    // title: "Page 07 of 15"
    store.dispatch(changeSymbolValue("End_Type",3));
    store.dispatch(fixSymbolValue("Force_1",0));
    store.dispatch(fixSymbolValue("Force_2",90));
    store.dispatch(fixSymbolValue("Force_Solid",90));
    store.dispatch(fixSymbolValue("L_Stroke",3));
    store.dispatch(fixSymbolValue("Mean_Dia",1));
    store.dispatch(fixSymbolValue("Stress_Solid",96880));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(9.8438559,7);

    // title: "Page 08 of 15"
    store.dispatch(resetSymbolFlag("FS_2",MIN,CONSTRAINED));
    store.dispatch(resetSymbolFlag("FS_2",MAX,CONSTRAINED));
    store.dispatch(resetSymbolFlag("FS_Solid",MIN,CONSTRAINED));
    store.dispatch(resetSymbolFlag("%_Avail_Deflect",MAX,CONSTRAINED));
    store.dispatch(changeSystemControlsValue({"maxit":1000,"objmin":0.000001,"delmin":0.00001,"tol":0.00001,"smallnum":1e-8}));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(7.4588629,7);

    // title: "Page 09 of 15"
    // No-op

    // title: "Page 10 of 15"
    store.dispatch(search());

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000007,7);

    // title: "Page 11 of 15"
    // No-op

    // title: "Page 12 of 15"
    store.dispatch(fixSymbolValue("Wire_Dia",0.142));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000545,7);

    // title: "Page 13 of 15"
    store.dispatch(search());

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000010,7);

    // title: "Page 14 of 15"
    // No-op

    // title: "Page 15 of 15 (last page)"
    // No-op});

});

