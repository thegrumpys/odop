import { startExecute } from "../../components/ExecutePanel";
export function getExecuteNames() {
    var result = [
        'tweakPrefs'
    ];
//    console.log('In getExecuteNames result=',result);
    return result;
}

export function getDemoNames() {
    var result = [
        'demo',
        'longdemo',
        'demo1',
        'demo2',
        'demo3',
        'demo5'
    ];
//    console.log('In getDemoNames result=',result);
    return result;
}

export function getTutorialNames() {
    var result = [
        'tutor',
        'tutor3',
        'tutor4',
        'tutor5',
        'tutor7'
    ];
//    console.log('In getTutorialNames result=',result);
    return result;
}

export function execute(execute_menu, execute_name) {
//  console.log('In execute execute_name=',execute_name);
    var { execute } = require('./'+execute_name+'.js'); // Dynamically load execute
    startExecute(execute_menu + ' : ' + execute_name, execute.steps);
}