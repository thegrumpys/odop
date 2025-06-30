export function getExecuteNames(isAdmin = false) {
    var result;
    if (isAdmin) {
      result = [
        'mkPCylStartups'         // Script to make multiple Startup entries from Load Initial State files
      ];
    } else {
      result = [];
    }
//    console.log('In getExecuteNames result=',result);
    return result;
}

export function getDemoNames() {
    var result = [];
//    console.log('In getDemoNames result=',result);
    return result;
}

export function getTutorialNames() {
    var result = [];
//    console.log('In getTutorialNames result=',result);
    return result;
}
