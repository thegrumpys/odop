import { TUTORIALS } from './execute/demo.js';
import interactiveTutorials from 'react-interactive-tutorials'

export function getExecuteNames() {
    var result = [
        'demo'
    ];
    console.log('In getExecuteNames result=',result);
    return result;
}

export function execute(execute_name) {
    console.log('In execute execute_name=',execute_name);
    var { execute } = require('../designtypes/execute/'+execute_name+'.json'); // Dynamically load execute file
    console.log('In execute execute=',execute);
}