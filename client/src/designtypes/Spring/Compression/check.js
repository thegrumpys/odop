import * as o from './offsets';
import * as mo from '../mat_offsets';
import { clearAlerts, addAlert } from '../../../components/Alerts';


export function check(store) {        /*    Compression  Spring  */
    console.log('<li>','@@@@@ Start check store=',store,'</li><ul>');
    clearAlerts();
    addAlert({name: 'L_2', message:'L_2 < L_Solid'});
    addAlert({name: 'L_Solid', message:'L_Solid >= L_2'});
    console.log('</ul><li>','End check','</li>');

}