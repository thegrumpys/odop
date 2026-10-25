export function getExecuteNames(isAdmin = false) {
    var result = [
      'increasePrecision',      // Script to tweak Preference values for greater precision of search result
      'welcomeAdv',             // Script to guide novice users - Advanced view; spring type neutral
      'welcomeCalc'             // Script to guide novice users - Calculator view; spring type neutral
    ];
    if (isAdmin) {
      result.push('mkTorsionStartups'); // Script to make multiple Startup entries from Load Initial State
    }
//    console.log('getExecuteNames result=',result);
    return result;
}

export function getDemoNames() {
    var result = [
        'demo14',
        'demo15'
    ];
//    console.log('getDemoNames result=',result);
    return result;
}

export function getTutorialNames() {
    var result = [
        'tutorTour',
        'guidedDesign'
    ];
//    console.log('getTutorialNames result=',result);
    return result;
}
