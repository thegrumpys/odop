import { startExecute } from "../../components/ExecutePanel";
export function getExecuteNames() {
    var result = [];
//    console.log('In getExecuteNames result=',result);
    return result;
}

export function execute(execute_name) {
//  console.log('In execute execute_name=',execute_name);
    var { execute } = require('./'+execute_name+'.js'); // Dynamically load execute
    startExecute(execute.steps);
}