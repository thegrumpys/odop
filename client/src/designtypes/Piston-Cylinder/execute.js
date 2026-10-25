export function getExecuteNames(isAdmin = false) {
    var result = [];
    if (isAdmin) {
      result.push(
        'mkPCylStartups'         // Script to make multiple Startup entries from Load Initial State files
      );
    }
//    console.log('getExecuteNames result=',result);
    return result;
}

export function getDemoNames() {
    var result = [];
//    console.log('getDemoNames result=',result);
    return result;
}

export function getTutorialNames() {
    var result = [];
//    console.log('getTutorialNames result=',result);
    return result;
}
