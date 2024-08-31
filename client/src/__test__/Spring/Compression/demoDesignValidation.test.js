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

// This is a mapping of the demoDesignValidation execute file to an equivalent test case file

it('demoDesignValidation', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState().modelSlice; // before
    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toEqual(0.0);

    // title: "Session Now In Progress",
    // No-op

// title: "Page 02 of 10"
    store.dispatch(loadInitialState("Spring/Compression","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Compression Spring demoDesignValidation"}]));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

// title: "Page 03 of 10"
    // No-op

// title: "Page 04 of 10"
    // No-op

// title: "Page 05 of 10"
    // No-op

// title: "Page 06 of 10"
    store.dispatch(fixSymbolValue("Wire_Dia",0.0395));
    store.dispatch(fixSymbolValue("OD_Free",0.357));
    store.dispatch(fixSymbolValue("L_Free",0.807));
    store.dispatch(fixSymbolValue("Coils_T",8));
    store.dispatch(fixSymbolValue("L_1",0.689));
    store.dispatch(fixSymbolValue("L_2",0.394));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(24.4388745,7);

// title: "Page 07 of 10"
    // No-op

// title: "Page 08 of 10"
    store.dispatch(search());

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000033,7);

// title: "Page 09 of 10"
    // No-op

// title: "Page 10 of 10 (last page)"
    // No-op
});

