// Invoke Check
export function invokeCheck(store) {
//    console.log('Start invokeCheck');

    var design = store.getState();
//    console.log('invokeCheck design=',design);

    // Check relationships among symbol tasble variables and create alerts
    var { checks } = require('../../designtypes/'+design.model.type+'/checks.js'); // Dynamically load checks
//    console.log('invokeCheck','checks=',checks);
    checks(store);
//    console.log('</ul><li>','End invokeCheck','</li>');
}
