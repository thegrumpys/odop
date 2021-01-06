import config from '../../../config';
export function getExecuteNames() {
    var result;
    if (config.node.env !== "production") {
      result = [
        'mkStartup',
        'mkStartup_Metric',
        'tweakPrefs',
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
        'demo6',
        'demo7',
        'demo8',
        'demo9'
    ];
//    console.log('In getDemoNames result=',result);
    return result;
}

export function getTutorialNames() {
    var result = [];
//    console.log('In getTutorialNames result=',result);
    return result;
}
