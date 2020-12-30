export function getExecuteNames() {
    var result;
    if (process.env.NODE_ENV !== "production") {
      result = [
        'mkHotWndStartup',        // Script to make Hot Wound Startup file from Load Initial State
        'mkHotWndStartup_Metric', // Script to make Hot Wound Startup Metric file from Load Initial State Metric
        'tweakPrefs',             // Script to tweak Preference values for greater precision of search result
        'welcome0',               // Script to guide novice users - Advanced view; spring type neutral
        'welcome1'                // Script to guide novice users - Calculator view; spring type neutral
      ];
    } else {
      result = [
        'tweakPrefs'
      ];
    }
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
        'demo5',
        'demo10'
    ];
//    console.log('In getDemoNames result=',result);
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
//    console.log('In getTutorialNames result=',result);
    return result;
}
