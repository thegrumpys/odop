import { initialState } from '../../../designtypes/Spring/Extension/initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { inject, enableDispatcher, loadInitialState,
         changeLabelsValue,
         changeSymbolValue,
         freeSymbolValue,
         setSymbolFlag,
         resetSymbolFlag,
         changeSymbolConstraint,
         fixSymbolValue,
         search } from '../../../store/actions';
import { MIN, MAX, CONSTRAINED, FDCL } from '../../../store/actionTypes';
import store from "../../../store/store";

// This is a mapping of the demo8 execute file to an equivalent test case file

it('demo8', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    store.dispatch(inject({"user": "USERID0123456789", name: "initialState", model: state}));
    store.dispatch(enableDispatcher(true));

    var design = store.getState().modelSlice; // before
    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toEqual(0.0);

// title: "Session Now In Progress",
    // No-op

// title: "Page 02 of 09"
    store.dispatch(loadInitialState("Spring/Extension","US"));
    store.dispatch(changeLabelsValue([{"name":"COMMENT","value":"Extension Spring Demo"}]));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000000,7);

// title: "Page 03 of 09"
    store.dispatch(changeSymbolValue("Material_Type",1));
    store.dispatch(changeSymbolValue("End_Type",1));
    store.dispatch(setSymbolFlag("OD_Free",MAX,CONSTRAINED));
    store.dispatch(changeSymbolConstraint("OD_Free",MAX,0.261));
    store.dispatch(changeSymbolConstraint("Force_1",MIN,3.929));
    store.dispatch(resetSymbolFlag("Force_1",MIN,CONSTRAINED));
    store.dispatch(fixSymbolValue("Force_1",3.93));
    store.dispatch(fixSymbolValue("L_1",0.984));
    store.dispatch(fixSymbolValue("Force_2",6.74));
    store.dispatch(fixSymbolValue("L_2",1.142));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(20.7419964,7);

// title: "Page 04 of 09"
    store.dispatch(freeSymbolValue("End_Extension"));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(20.7419964,7);

// title: "Page 05 of 09"
    store.dispatch(search());

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000086,7);

// title: "Page 06 of 09"
    store.dispatch(fixSymbolValue("Wire_Dia",0.035));
    store.dispatch(search());

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000069,7);

// title: "Page 07 of 09"

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000069,7);

// title: "Page 08 of 09"
    store.dispatch(changeSymbolValue("OD_Free",0.248));
    store.dispatch(changeSymbolValue("Wire_Dia",0.035433));
    store.dispatch(changeSymbolValue("Coils_T",13.2));
    store.dispatch(changeSymbolValue("Initial_Tension",1.68));
    store.dispatch(changeSymbolValue("End_Extension",0));
    store.dispatch(changeSymbolValue("End_Type",6));
    store.dispatch(changeSymbolValue("Hook_Deflect_All",0));

    design = store.getState().modelSlice;
    expect(design.model.result.objective_value).toBeCloseTo(0.0000048,7);

// title: "Page 09 of 09 (last page)"
    // No-op
});

