// Invoke Check
export function invokeCheck(store) {
    
    console.log('<li>','Start invokeCheck','</li><ul>');

    var design = store.getState();
//    console.log('In invokeCheck design=',design);
    
    // Check relationships among sysmbol tasble variables and create alerts
    var { check } = require('../../designtypes/'+design.model.type+'/check.js'); // Dynamically load eqnset
    check(store);

    console.log('</ul><li>','End invokeCheck','</li>');
}
