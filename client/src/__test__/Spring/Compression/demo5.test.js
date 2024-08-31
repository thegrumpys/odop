import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { inject, enableDispatcher, loadInitialState,
         changeLabelsValue,
         changeSymbolValue,
         setSymbolFlag,
         changeSymbolConstraint,
         fixSymbolValue,
         search } from '../../../store/modelSlice';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
import store from "../../../store/store";

// This is a mapping of the demo5 execute file to an equivalent test case file

it('demo5', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState().modelSlice; // before
        design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toEqual(0.0);

    // title: "Session Now In Progress",
    // No-op

    // title: "Page 02 of 13"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Compression Spring demo5"}]));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

// title: "Page 03 of 13"
    // No-op

// title: "Page 04 of 13"
    // No-op

// title: "Page 05 of 13"
    store.dispatch(fixSymbolValue("OD_Free",1));
    store.dispatch(fixSymbolValue("L_Free",3.25));
    store.dispatch(fixSymbolValue("L_2",1.75));
    store.dispatch(fixSymbolValue("Force_1",0));
    store.dispatch(fixSymbolValue("Force_2",60));
    store.dispatch(setSymbolFlag("L_Solid",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("L_Solid",MAX,1.625));
    store.dispatch(changeSymbolValue("End_Type",4));
    store.dispatch(changeSymbolValue("Material_Type",3));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.2222831,7);

// title: "Page 06 of 13"
    // No-op

// title: "Page 07 of 13"
    store.dispatch(search());

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

// title: "Page 08 of 13"
    // No-op

// title: "Page 09 of 13"
    store.dispatch(fixSymbolValue("Wire_Dia",0.12));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0005281,7);

// title: "Page 10 of 13"
    store.dispatch(search());

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000008,7);

// title: "Page 11 of 13"
    store.dispatch(changeSymbolValue("Wire_Dia",0.1205));
    store.dispatch(changeSymbolValue("Coils_T",13));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0002520,7);

// title: "Page 12 of 13"
    // No-op

// title: "Page 13 of 13 (last page)"
    // No-op
});

