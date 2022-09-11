import { checks as commonChecks } from '../../components/Alerts';

export function checks(store) {
//    console.log('<li>','@@@@@ Start Spring check store=',store,'</li><ul>');
    commonChecks(store); // Now run the generic checks after the more specific checks
//    console.log('</ul><li>','End check','</li>');
}