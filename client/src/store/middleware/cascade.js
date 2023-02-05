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
                console.log('In cascade CALL CASCADE','element.name=',element.name,'user_input=',user_input,'set=',set,'set_index=',set_index,'set_element.name=',set_element.name);
                cascade(store, set_element, false);
            });
        } else { // Compute
            console.log('In cascade COMPUTE','element.name=',element.name,'element=',element);
            var total_count = 1;
            var uninitialized_element = element;
            var initialized_count = element.refs.reduce((accumulator, ref, ref_index) => {
                total_count++;
                var ref_element = design.model.symbol_table[ref];
                var increment;
                if (ref_element.lmin & UNINITIALIZED) {
                    increment = 0;
                    uninitialized_element = element;
                } else {
                    increment = 1;
                }
//                console.log('In cascade initialized_count','user_input=',user_input,'accumulator=',accumulator,'ref=',ref,'ref_index=',ref_index,'ref_element.name=',ref_element.name,'increment=',increment);
                return accumulator + increment;
            }, element.lmin & UNINITIALIZED ? 0 : 1);
            console.log('In cascade EXECUTE?','element.name=',element.name,'total_count=',total_count,'initialized_count=',initialized_count);
            if (total_count-initialized_count < 1) { // Overspecified
                console.error('In cascade SKIP EXECUTE - OVERSPECIFIED','element.name=',element.name);
            } else if (total_count-initialized_count === 1) { // Execute this equation
                store.dispatch(resetSymbolFlag(uninitialized_element.name,MIN,UNINITIALIZED));
                store.dispatch(resetSymbolFlag(uninitialized_element.name,MAX,UNINITIALIZED));
                element.sets.forEach((set, set_index) => {
                    var set_element = design.model.symbol_table[set];
                    console.log('In cascade CALL CASCADE','element.name=',element.name,'user_input=',user_input,'set=',set,'set_index=',set_index,'set_element.name=',set_element.name);
                    cascade(store, set_element, false);
                });
            } else { // total_count-initialized_count > 1
                console.log('In cascade SKIP EXECUTE - ALL PARMS NOT INITIALIZED','element.name=',element.name);
            }
        }
//        console.log('In cascade design=',design);
    } else {
        console.log('In cascade SKIP ELEMENT - ALREADY INITIALIZED','element.name=',element.name);
    }
    console.log('</ul><li>','End cascade','</li>');
}