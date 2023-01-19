import { UNINITIALIZED } from '../actionTypes';
import { changeSymbolValue } from '../actionCreators';

export function cascade(store, element, user_input) {
    console.log('<li>','Start cascade','store=',store,'element=',element,'user_input=',user_input,'</li><ul>');
    if (user_input || element.lmin & UNINITIALIZED) {
        var design = store.getState(); // Re-access store to get latest source values
        console.log('In cascade design=',design);
        element.eqns.forEach((entry, index) => {
            if (user_input && entry.eqn === null) { // User Input
                console.log('In cascade USER INPUT','element.name=',element.name,'index=',index,'entry=',entry);
                entry.sets.forEach((set, set_index) => {
                    var set_element = design.model.symbol_table[set];
                    console.log('In cascade CASCADE','element.name=',element.name,'index=',index,'user_input=',user_input,'set=',set,'set_index=',set_index,'set_element.name=',set_element.name);
                    cascade(store, set_element, false);
                })
            } else if (!user_input && entry.eqn !== null) { // Compute
//                console.log('In cascade COMPUTE','element.name=',element.name,'index=',index,'entry=',entry);
                var all_initialized = entry.refs.reduce((accumulator, ref, ref_index) => {
                    var initialized = (design.model.symbol_table[ref].lmin & UNINITIALIZED) ? false : true;
//                    console.log('In cascade','user_input=',user_input,'accumulator=',accumulator,'ref=',ref,'ref_index=',ref_index,'initialized=',initialized);
                    return accumulator && initialized
                }, true);
                console.log('In cascade EXECUTE?','element.name=',element.name,'index=',index,'all_initialized=',all_initialized);
                if (all_initialized) { // Execute this equation
                    var all_values = entry.refs.map((ref, ref_index) => {
                        var ref_element = design.model.symbol_table[ref];
                        var value = ref_element.value;
                        console.log('In cascade','user_input=',user_input,'ref=',ref,'ref_index=',ref_index,'ref_element.name=',ref_element.name,'value=',value);
                        return value;
                    });
                    var { eqns } = require('../../designtypes/'+design.model.type+'/eqns.js'); // Dynamically load eqnset
                    console.log('In cascade INVOKE EQN','element.name=',element.name,'index=',index,'all_values=',all_values,'entry.eqn=',entry.eqn);
                    var value = eqns[entry.eqn].apply(null,all_values);
                    console.log('In cascade CHANGE VALUE','element.name=',element.name,'value=',value);
                    store.dispatch(changeSymbolValue(element.name,value));
                } else {
                    console.log('In cascade SKIP EXECUTE - ALL PARMS NOT INIRIALIZED','element.name=',element.name,'index=',index);
                }
            } else {
                if (user_input) {
                    console.log('In cascade SKIP ENTRY - COMPUTE EQN','element.name=',element.name,'index=',index);
                } else {
                    console.log('In cascade SKIP ENTRY - USER INPUT EQN','element.name=',element.name,'index=',index);
                }
            }
        });
    } else {
        console.log('In cascade SKIP ELEMENT - ALREADY INITIALIZED','element.name=',element.name);
    }
    console.log('In cascade design=',design);
    console.log('</ul><li>','End cascade','</li>');
}