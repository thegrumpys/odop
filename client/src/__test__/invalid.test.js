import { createStore, applyMiddleware } from 'redux';
import { initialState as springCompressionInitialState} from '../designtypes/Spring/Compression/initialState';
import * as sto from '../designtypes/Spring/Compression/symbol_table_offsets';
import { initialSystemControls } from '../initialSystemControls';
import { MAX } from '../store/actionTypes';
import { changeSymbolValue, changeResultObjectiveValue, changeSymbolConstraint } from '../store/actionCreators';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';
import { invokeInit } from '../store/middleware/invokeInit';
import { invokeEquationSet } from '../store/middleware/invokeEquationSet';
import { setSclDen } from '../store/middleware/setSclDen';
import { updateObjectiveValue } from '../store/middleware/updateObjectiveValue';
import { search } from '../store/middleware/search';

//=====================================================================
// invalid tests
//=====================================================================

function testValidity(title, name, value) {
//    console.log('In invalid.test title=',title,'name=',name,'value=',value);
    it(name+' '+title, () => {

        // These next statements replace store.dispatch(startup());
        invokeInit(store);
        invokeEquationSet(store);
        setSclDen(store);
        updateObjectiveValue(store);

        store.dispatch(changeSymbolValue(name, value)); // = validmin

        var design = store.getState(); // after

        expect(design.name).toEqual("initialState");
        expect(design.model.type).toEqual("Spring/Compression");
        expect(design.model.version).toEqual("12");
        
        for (let i = 0; i < design.model.symbol_table.length; i++) {
            var element = design.model.symbol_table[i];
            if (element.type === "equationset") { // Independent and Dependent Variables
                if (element.format === undefined && typeof element.value === 'number') { // Only number, skip string and table
//                    console.log('In invalid.test element=',element);
                    if (element.name === name) {
                        expect(element.value).toEqual(value);
                    } else {
                        expect(Number.isFinite(element.value)).toBe(true);
                    }
                }
            }
        }
        expect(Number.isFinite(design.model.result.objective_value)).toBe(true);
    });
}

var state = Object.assign({}, springCompressionInitialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
const store = createStore(reducers, {"user": "USERID0123456789", name: "initialState", model: state}, applyMiddleware(dispatcher));
var design = store.getState(); // before

for (let i = 0; i < design.model.symbol_table.length; i++) {
    var element = design.model.symbol_table[i];
//    console.log('In invalid.test element=',element);
    if (element.type === "equationset" && element.input) { // Independent Variable
        testValidity('=validmin', element.name, element.validmin);
        testValidity('=validmin+smallnum', element.name, element.validmin+initialSystemControls.smallnum);
        testValidity('=validmax-smallnum', element.name, element.validmax-initialSystemControls.smallnum);
        testValidity('=validmax', element.name, element.validmax);
    }
}

//it('OD_Free =validmin ', () => {
//    var state = Object.assign({}, springCompressionInitialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
//    const store = createStore(reducers, {"user": "USERID0123456789", name: "initialState", model: state}, applyMiddleware(dispatcher));
//
//    // These next statements replace store.dispatch(startup());
//    invokeInit(store);
//    invokeEquationSet(store);
//    setSclDen(store);
//    updateObjectiveValue(store);
//
//    var design = store.getState(); // before
//
//    store.dispatch(changeSymbolValue("OD_Free", design.model.symbol_table[sto.OD_Free].validmin)); // = validmin
//
//    var design = store.getState(); // after
//
//    expect(design.name).toEqual("initialState");
//    expect(design.model.type).toEqual("Spring/Compression");
//    expect(design.model.version).toEqual("12");
//
//    expect(design.model.symbol_table[sto.OD_Free].name).toEqual("OD_Free"); // Independent
//    expect(design.model.symbol_table[sto.OD_Free].value).toEqual(design.model.symbol_table[sto.OD_Free].validmin);
//    expect(design.model.symbol_table[sto.Wire_Dia].name).toEqual("Wire_Dia");
//    expect(Number.isFinite(design.model.symbol_table[sto.Wire_Dia].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_Free].name).toEqual("L_Free");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_Free].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Coils_T].name).toEqual("Coils_T");
//    expect(Number.isFinite(design.model.symbol_table[sto.Coils_T].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Force_1].name).toEqual("Force_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.Force_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Force_2].name).toEqual("Force_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.Force_2].value)).toBe(true);
//
//    expect(design.model.symbol_table[sto.Mean_Dia].name).toEqual("Mean_Dia");
//    expect(Number.isFinite(design.model.symbol_table[sto.Mean_Dia].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Coils_A].name).toEqual("Coils_A");
//    expect(Number.isFinite(design.model.symbol_table[sto.Coils_A].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Rate].name).toEqual("Rate");
//    expect(Number.isFinite(design.model.symbol_table[sto.Rate].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Deflect_1].name).toEqual("Deflect_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.Deflect_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Deflect_2].name).toEqual("Deflect_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.Deflect_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_1].name).toEqual("L_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_2].name).toEqual("L_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_Stroke].name).toEqual("L_Stroke");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_Stroke].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_Solid].name).toEqual("L_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Slenderness].name).toEqual("Slenderness");
//    expect(Number.isFinite(design.model.symbol_table[sto.Slenderness].value)).toBe(true);
//    expect(design.model.symbol_table[sto.ID_Free].name).toEqual("ID_Free");
//    expect(Number.isFinite(design.model.symbol_table[sto.ID_Free].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Weight].name).toEqual("Weight");
//    expect(Number.isFinite(design.model.symbol_table[sto.Weight].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Spring_Index].name).toEqual("Spring_Index");
//    expect(Number.isFinite(design.model.symbol_table[sto.Spring_Index].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Force_Solid].name).toEqual("Force_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.Force_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Stress_1].name).toEqual("Stress_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.Stress_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Stress_2].name).toEqual("Stress_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.Stress_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Stress_Solid].name).toEqual("Stress_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.Stress_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.FS_2].name).toEqual("FS_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.FS_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.FS_Solid].name).toEqual("FS_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.FS_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.FS_CycleLife].name).toEqual("FS_CycleLife");
//    expect(Number.isFinite(design.model.symbol_table[sto.FS_CycleLife].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Cycle_Life].name).toEqual("Cycle_Life");
//    expect(Number.isFinite(design.model.symbol_table[sto.Cycle_Life].value)).toBe(true);
//    expect(design.model.symbol_table[sto.PC_Avail_Deflect].name).toEqual("%_Avail_Deflect");
//    expect(Number.isFinite(design.model.symbol_table[sto.PC_Avail_Deflect].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Energy].name).toEqual("Energy");
//    expect(Number.isFinite(design.model.symbol_table[sto.Energy].value)).toBe(true);
//
//    expect(Number.isFinite(design.model.result.objective_value)).toBe(true);
//});
//
//it('OD_Free =validmin+smallnum ', () => {
//    var state = Object.assign({}, springCompressionInitialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
//    const store = createStore(reducers, {"user": "USERID0123456789", name: "initialState", model: state}, applyMiddleware(dispatcher));
//
//    // These next statements replace store.dispatch(startup());
//    invokeInit(store);
//    invokeEquationSet(store);
//    setSclDen(store);
//    updateObjectiveValue(store);
//
//    var design = store.getState(); // before
//
//    store.dispatch(changeSymbolValue("OD_Free", design.model.symbol_table[sto.OD_Free].validmin+initialSystemControls.smallnum)); // = validmin
//
//    var design = store.getState(); // after
//
//    expect(design.name).toEqual("initialState");
//    expect(design.model.type).toEqual("Spring/Compression");
//    expect(design.model.version).toEqual("12");
//
//    expect(design.model.symbol_table[sto.OD_Free].name).toEqual("OD_Free"); // Independent
//    expect(design.model.symbol_table[sto.OD_Free].value).toEqual(design.model.symbol_table[sto.OD_Free].validmin+initialSystemControls.smallnum);
//    expect(design.model.symbol_table[sto.Wire_Dia].name).toEqual("Wire_Dia");
//    expect(Number.isFinite(design.model.symbol_table[sto.Wire_Dia].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_Free].name).toEqual("L_Free");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_Free].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Coils_T].name).toEqual("Coils_T");
//    expect(Number.isFinite(design.model.symbol_table[sto.Coils_T].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Force_1].name).toEqual("Force_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.Force_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Force_2].name).toEqual("Force_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.Force_2].value)).toBe(true);
//
//    expect(design.model.symbol_table[sto.Mean_Dia].name).toEqual("Mean_Dia");
//    expect(Number.isFinite(design.model.symbol_table[sto.Mean_Dia].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Coils_A].name).toEqual("Coils_A");
//    expect(Number.isFinite(design.model.symbol_table[sto.Coils_A].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Rate].name).toEqual("Rate");
//    expect(Number.isFinite(design.model.symbol_table[sto.Rate].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Deflect_1].name).toEqual("Deflect_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.Deflect_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Deflect_2].name).toEqual("Deflect_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.Deflect_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_1].name).toEqual("L_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_2].name).toEqual("L_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_Stroke].name).toEqual("L_Stroke");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_Stroke].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_Solid].name).toEqual("L_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Slenderness].name).toEqual("Slenderness");
//    expect(Number.isFinite(design.model.symbol_table[sto.Slenderness].value)).toBe(true);
//    expect(design.model.symbol_table[sto.ID_Free].name).toEqual("ID_Free");
//    expect(Number.isFinite(design.model.symbol_table[sto.ID_Free].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Weight].name).toEqual("Weight");
//    expect(Number.isFinite(design.model.symbol_table[sto.Weight].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Spring_Index].name).toEqual("Spring_Index");
//    expect(Number.isFinite(design.model.symbol_table[sto.Spring_Index].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Force_Solid].name).toEqual("Force_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.Force_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Stress_1].name).toEqual("Stress_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.Stress_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Stress_2].name).toEqual("Stress_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.Stress_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Stress_Solid].name).toEqual("Stress_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.Stress_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.FS_2].name).toEqual("FS_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.FS_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.FS_Solid].name).toEqual("FS_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.FS_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.FS_CycleLife].name).toEqual("FS_CycleLife");
//    expect(Number.isFinite(design.model.symbol_table[sto.FS_CycleLife].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Cycle_Life].name).toEqual("Cycle_Life");
//    expect(Number.isFinite(design.model.symbol_table[sto.Cycle_Life].value)).toBe(true);
//    expect(design.model.symbol_table[sto.PC_Avail_Deflect].name).toEqual("%_Avail_Deflect");
//    expect(Number.isFinite(design.model.symbol_table[sto.PC_Avail_Deflect].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Energy].name).toEqual("Energy");
//    expect(Number.isFinite(design.model.symbol_table[sto.Energy].value)).toBe(true);
//
//    expect(Number.isFinite(design.model.result.objective_value)).toBe(true);
//});
//
//it('OD_Free =validmax-smallnum ', () => {
//    var state = Object.assign({}, springCompressionInitialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
//    const store = createStore(reducers, {"user": "USERID0123456789", name: "initialState", model: state}, applyMiddleware(dispatcher));
//
//    // These next statements replace store.dispatch(startup());
//    invokeInit(store);
//    invokeEquationSet(store);
//    setSclDen(store);
//    updateObjectiveValue(store);
//
//    var design = store.getState(); // before
//
//    store.dispatch(changeSymbolValue("OD_Free", design.model.symbol_table[sto.OD_Free].validmax-initialSystemControls.smallnum)); // = validmin
//
//    var design = store.getState(); // after
//
//    expect(design.name).toEqual("initialState");
//    expect(design.model.type).toEqual("Spring/Compression");
//    expect(design.model.version).toEqual("12");
//
//    expect(design.model.symbol_table[sto.OD_Free].name).toEqual("OD_Free"); // Independent
//    expect(design.model.symbol_table[sto.OD_Free].value).toEqual(design.model.symbol_table[sto.OD_Free].validmax-initialSystemControls.smallnum);
//    expect(design.model.symbol_table[sto.Wire_Dia].name).toEqual("Wire_Dia");
//    expect(Number.isFinite(design.model.symbol_table[sto.Wire_Dia].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_Free].name).toEqual("L_Free");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_Free].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Coils_T].name).toEqual("Coils_T");
//    expect(Number.isFinite(design.model.symbol_table[sto.Coils_T].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Force_1].name).toEqual("Force_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.Force_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Force_2].name).toEqual("Force_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.Force_2].value)).toBe(true);
//
//    expect(design.model.symbol_table[sto.Mean_Dia].name).toEqual("Mean_Dia");
//    expect(Number.isFinite(design.model.symbol_table[sto.Mean_Dia].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Coils_A].name).toEqual("Coils_A");
//    expect(Number.isFinite(design.model.symbol_table[sto.Coils_A].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Rate].name).toEqual("Rate");
//    expect(Number.isFinite(design.model.symbol_table[sto.Rate].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Deflect_1].name).toEqual("Deflect_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.Deflect_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Deflect_2].name).toEqual("Deflect_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.Deflect_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_1].name).toEqual("L_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_2].name).toEqual("L_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_Stroke].name).toEqual("L_Stroke");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_Stroke].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_Solid].name).toEqual("L_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Slenderness].name).toEqual("Slenderness");
//    expect(Number.isFinite(design.model.symbol_table[sto.Slenderness].value)).toBe(true);
//    expect(design.model.symbol_table[sto.ID_Free].name).toEqual("ID_Free");
//    expect(Number.isFinite(design.model.symbol_table[sto.ID_Free].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Weight].name).toEqual("Weight");
//    expect(Number.isFinite(design.model.symbol_table[sto.Weight].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Spring_Index].name).toEqual("Spring_Index");
//    expect(Number.isFinite(design.model.symbol_table[sto.Spring_Index].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Force_Solid].name).toEqual("Force_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.Force_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Stress_1].name).toEqual("Stress_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.Stress_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Stress_2].name).toEqual("Stress_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.Stress_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Stress_Solid].name).toEqual("Stress_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.Stress_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.FS_2].name).toEqual("FS_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.FS_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.FS_Solid].name).toEqual("FS_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.FS_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.FS_CycleLife].name).toEqual("FS_CycleLife");
//    expect(Number.isFinite(design.model.symbol_table[sto.FS_CycleLife].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Cycle_Life].name).toEqual("Cycle_Life");
//    expect(Number.isFinite(design.model.symbol_table[sto.Cycle_Life].value)).toBe(true);
//    expect(design.model.symbol_table[sto.PC_Avail_Deflect].name).toEqual("%_Avail_Deflect");
//    expect(Number.isFinite(design.model.symbol_table[sto.PC_Avail_Deflect].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Energy].name).toEqual("Energy");
//    expect(Number.isFinite(design.model.symbol_table[sto.Energy].value)).toBe(true);
//
//    expect(Number.isFinite(design.model.result.objective_value)).toBe(true);
//});
//
//it('OD_Free =validmax ', () => {
//    var state = Object.assign({}, springCompressionInitialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
//    const store = createStore(reducers, {"user": "USERID0123456789", name: "initialState", model: state}, applyMiddleware(dispatcher));
//
//    // These next statements replace store.dispatch(startup());
//    invokeInit(store);
//    invokeEquationSet(store);
//    setSclDen(store);
//    updateObjectiveValue(store);
//
//    var design = store.getState(); // before
//
//    store.dispatch(changeSymbolValue("OD_Free", design.model.symbol_table[sto.OD_Free].validmax)); // = validmin
//
//    var design = store.getState(); // after
//
//    expect(design.name).toEqual("initialState");
//    expect(design.model.type).toEqual("Spring/Compression");
//    expect(design.model.version).toEqual("12");
//
//    expect(design.model.symbol_table[sto.OD_Free].name).toEqual("OD_Free"); // Independent
//    expect(design.model.symbol_table[sto.OD_Free].value).toEqual(design.model.symbol_table[sto.OD_Free].validmax);
//    expect(design.model.symbol_table[sto.Wire_Dia].name).toEqual("Wire_Dia");
//    expect(Number.isFinite(design.model.symbol_table[sto.Wire_Dia].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_Free].name).toEqual("L_Free");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_Free].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Coils_T].name).toEqual("Coils_T");
//    expect(Number.isFinite(design.model.symbol_table[sto.Coils_T].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Force_1].name).toEqual("Force_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.Force_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Force_2].name).toEqual("Force_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.Force_2].value)).toBe(true);
//
//    expect(design.model.symbol_table[sto.Mean_Dia].name).toEqual("Mean_Dia");
//    expect(Number.isFinite(design.model.symbol_table[sto.Mean_Dia].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Coils_A].name).toEqual("Coils_A");
//    expect(Number.isFinite(design.model.symbol_table[sto.Coils_A].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Rate].name).toEqual("Rate");
//    expect(Number.isFinite(design.model.symbol_table[sto.Rate].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Deflect_1].name).toEqual("Deflect_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.Deflect_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Deflect_2].name).toEqual("Deflect_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.Deflect_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_1].name).toEqual("L_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_2].name).toEqual("L_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_Stroke].name).toEqual("L_Stroke");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_Stroke].value)).toBe(true);
//    expect(design.model.symbol_table[sto.L_Solid].name).toEqual("L_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.L_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Slenderness].name).toEqual("Slenderness");
//    expect(Number.isFinite(design.model.symbol_table[sto.Slenderness].value)).toBe(true);
//    expect(design.model.symbol_table[sto.ID_Free].name).toEqual("ID_Free");
//    expect(Number.isFinite(design.model.symbol_table[sto.ID_Free].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Weight].name).toEqual("Weight");
//    expect(Number.isFinite(design.model.symbol_table[sto.Weight].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Spring_Index].name).toEqual("Spring_Index");
//    expect(Number.isFinite(design.model.symbol_table[sto.Spring_Index].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Force_Solid].name).toEqual("Force_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.Force_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Stress_1].name).toEqual("Stress_1");
//    expect(Number.isFinite(design.model.symbol_table[sto.Stress_1].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Stress_2].name).toEqual("Stress_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.Stress_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Stress_Solid].name).toEqual("Stress_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.Stress_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.FS_2].name).toEqual("FS_2");
//    expect(Number.isFinite(design.model.symbol_table[sto.FS_2].value)).toBe(true);
//    expect(design.model.symbol_table[sto.FS_Solid].name).toEqual("FS_Solid");
//    expect(Number.isFinite(design.model.symbol_table[sto.FS_Solid].value)).toBe(true);
//    expect(design.model.symbol_table[sto.FS_CycleLife].name).toEqual("FS_CycleLife");
//    expect(Number.isFinite(design.model.symbol_table[sto.FS_CycleLife].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Cycle_Life].name).toEqual("Cycle_Life");
//    expect(Number.isFinite(design.model.symbol_table[sto.Cycle_Life].value)).toBe(true);
//    expect(design.model.symbol_table[sto.PC_Avail_Deflect].name).toEqual("%_Avail_Deflect");
//    expect(Number.isFinite(design.model.symbol_table[sto.PC_Avail_Deflect].value)).toBe(true);
//    expect(design.model.symbol_table[sto.Energy].name).toEqual("Energy");
//    expect(Number.isFinite(design.model.symbol_table[sto.Energy].value)).toBe(true);
//
//    expect(Number.isFinite(design.model.result.objective_value)).toBe(true);
//});

