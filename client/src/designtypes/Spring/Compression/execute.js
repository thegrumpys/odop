export function getExecuteNames(isAdmin = false) {
    var result = [
      'increasePrecision',      // Script to tweak Preference values for greater precision of search result
      'welcomeAdv',             // Script to guide novice users - Advanced view; spring type neutral
      'welcomeCalc'             // Script to guide novice users - Calculator view; spring type neutral
    ];
    if (isAdmin) {
      result.push(
        'Br590TestScript',        // Script providing test cases for Issue / Branch 590 (Model validity determination & response)
        'mkCompressionStartups',  // Script to make multiple Startup entries from Load Initial State
        'tutor8p3_TestCase'       // Script preserving the version of tutor8p3 showing failure in v4.3rc2
      );
    }
//    console.log('getExecuteNames result=',result);
    return result;
}

export function getDemoNames() {
    var result = [
        'demoDesignValidation',
        'demoNewDesign',
        'demo1',
        'demo2',
        'demo3',
        'demo5',
        'demo10'
    ];
//    console.log('getDemoNames result=',result);
    return result;
}

export function getTutorialNames() {
    var result = [
        'tutorTour',
        'guidedDesign',
        'tutor',
        'tutor3',
        'tutor4',
        'tutor5',
        'tutor6',
        'tutor7',
        'tutor8',
        'tutor9'
    ];
//    console.log('getTutorialNames result=',result);
    return result;
}
