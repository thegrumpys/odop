export function getExecuteNames(isAdmin = false) {
    var result;
    if (isAdmin) {
      result = [
          'mkSolidStartups',
      ];
    } else {
      result = [];
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
    var result = [
        'tutor'
    ];
//    console.log('getTutorialNames result=',result);
    return result;
}
