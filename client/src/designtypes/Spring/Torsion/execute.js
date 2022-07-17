import config from '../../../config';
export function getExecuteNames() {
    var result;
    if (config.node.env !== "production") {
      result = [
        'mkStartup',              // Script to make Startup file from Load Initial State
        'mkStartup_Metric',       // Script to make Startup Metric file from Load Initial State Metric
        'increasePrecision',             // Script to tweak Preference values for greater precision of search result
        'welcomeAdv',             // Script to guide novice users - Advanced view; spring type neutral
        'welcomeCalc'             // Script to guide novice users - Calculator view; spring type neutral
      ];
    } else {
      result = [
        'increasePrecision'
      ];
    }
//    console.log('In getExecuteNames result=',result);
    return result;
}

export function getDemoNames() {
    var result = [
        'demo14',
        'demo15'
    ];
//    console.log('In getDemoNames result=',result);
    return result;
}

export function getTutorialNames() {
    var result = [
        'tutorTour',
        'guidedDesign'
    ];
//    console.log('In getTutorialNames result=',result);
    return result;
}
