export function getExecuteNames(isAdmin = false) {
    var result = [
      'increasePrecision',      // Script to tweak Preference values for greater precision of search result
      'welcomeAdv',             // Script to guide novice users - Advanced view; spring type neutral
      'welcomeCalc'             // Script to guide novice users - Calculator view; spring type neutral
    ];
    if (isAdmin) {
      result.push('mkExtensionStartups'); // Script to make multiple Startup entries from Load Initial State
    }
//    console.log('getExecuteNames result=',result);
    return result;
}

export function getDemoNames() {
    var result = [
        'demo6',
        'demo7',
        'demo8',
        'demo9'
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
