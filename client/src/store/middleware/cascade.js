import { MIN, MAX, UNINITIALIZED } from '../actionTypes';
import { resetSymbolFlag } from '../actionCreators';

export function cascade(store, element, user_input) {
    console.log('<li>','Start cascade','store=',store,'element=',element,'user_input=',user_input,'</li><ul>');
    if (user_input || element.lmin & UNINITIALIZED) {
        var design = store.getState(); // Re-access store to get latest source values
//        console.log('In cascade design=',design);
        if (user_input) { // User Input
            console.log('In cascade USER INPUT','element.name=',element.name,'element=',element);
            element.refs.forEach((ref, ref_index) => {
                var ref_element = design.model.symbol_table[ref];
                if (ref_element.lmin & UNINITIALIZED) {
                    console.log('In cascade RESET UNINITIALIZED','element.name=',element.name,'user_input=',user_input,'ref=',ref,'ref_index=',ref_index,'ref_element.name=',ref_element.name);
                    store.dispatch(resetSymbolFlag(ref_element.name,MIN,UNINITIALIZED));
                    store.dispatch(resetSymbolFlag(ref_element.name,MAX,UNINITIALIZED));
                }
            });
            element.sets.forEach((set, set_index) => {
                var set_element = design.model.symbol_table[set];
                console.log('In cascade CASCADE','element.name=',element.name,'user_input=',user_input,'set=',set,'set_index=',set_index,'set_element.name=',set_element.name);
                cascade(store, set_element, false);
            });
        } else  { // Compute
//            console.log('In cascade COMPUTE','element.name=',element.name,'element=',element);
            var all_initialized = element.refs.reduce((accumulator, ref, ref_index) => {
                var ref_element = design.model.symbol_table[ref];
                var initialized = (ref_element.lmin & UNINITIALIZED) ? false : true;
                console.log('In cascade all_initialized','user_input=',user_input,'accumulator=',accumulator,'ref=',ref,'ref_index=',ref_index,'ref_element.name=',ref_element.name,'initialized=',initialized);
                return accumulator && initialized
            }, true);
            console.log('In cascade EXECUTE?','element.name=',element.name,'all_initialized=',all_initialized);
            if (all_initialized) { // Execute this equation
                store.dispatch(resetSymbolFlag(element.name,MIN,UNINITIALIZED));
                store.dispatch(resetSymbolFlag(element.name,MAX,UNINITIALIZED));
                element.sets.forEach((set, set_index) => {
                    var set_element = design.model.symbol_table[set];
                    console.log('In cascade CASCADE','element.name=',element.name,'user_input=',user_input,'set=',set,'set_index=',set_index,'set_element.name=',set_element.name);
                    cascade(store, set_element, false);
                });
            } else {
                console.log('In cascade SKIP EXECUTE - ALL PARMS NOT INITIALIZED','element.name=',element.name);
            }
        }
    } else {
        console.log('In cascade SKIP ELEMENT - ALREADY INITIALIZED','element.name=',element.name);
    }
    console.log('In cascade design=',design);
    console.log('</ul><li>','End cascade','</li>');
}