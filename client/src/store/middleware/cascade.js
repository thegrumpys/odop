import { UNINITIALIZED } from '../actionTypes';
import { changeSymbolValue } from '../actionCreators';

export function cascade(store, element, user_input) {
    console.log('<li>','Start cascade','store=',store,'element=',element,'user_input=',user_input,'</li><ul>');
    var design = store.getState(); // Re-access store to get latest source values
//    console.log('In cascade design=',design);
    element.eqns.forEach((entry) => {
        console.log('In cascade','element.name=',element.name,'entry=',entry);
        if (user_input && entry.eqn === null) {
            entry.sets.forEach((set) => {
//                console.log('In cascade','user_input=',user_input,'set=',set);
                var element2 = design.model.symbol_table[set];
                cascade(store, element2, false);
            })
        } else if (!user_input && entry.eqn !== null) {
            var all_initialized = entry.refs.reduce((accumulator, ref) => {
                var initialized = (design.model.symbol_table[ref].lmin & UNINITIALIZED) ? false : true;
//                console.log('In cascade','user_input=',user_input,'accumulator=',accumulator,'ref=',ref,'initialized=',initialized);
                return accumulator && initialized
            }, true);
            console.log('In cascade','all_initialized=',all_initialized);
            if (all_initialized) {
                var all_values = entry.refs.map((ref) => {
                    return design.model.symbol_table[ref].value;
                });
                console.log('In cascade','all_values=',all_values,'entry.eqn=',entry.eqn);
                var value = entry.eqn.apply(null,all_values);
                console.log('In cascade','value=',value);
                store.dispatch(changeSymbolValue(element.name,value));
            }
        }
    });
    console.log('</ul><li>','End cascade','</li>');
}