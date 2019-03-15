import React from 'react';
import * as o from './symbol_table_offsets';
import * as mo from '../mat_ips_offsets';
//import { displayError } from '../../components/ErrorModal';

export function getReportNames() {
    // Note: report names must match cases in switch statement below
    return [
      '1 (mini)',
      '2 (pre-set)',
      '3 (maxi)'
    ];
}

export function report(report_name, prefs, st, labels) {
//    console.log('In report report_name=',report_name,' prefs=',prefs,' st=',st,' labels=',labels);
    
    var kc, ks, temp, s_f, len_lbl, 
    safe_load_u, wgt1000_u, cycle_life_u, 
    pcadmsg, errmsg, errmsg0, errmsg1, errmsg2, errmsg3, hits,
    safe_travel, tensileFixed0,
    sq1, sq2,
    dhat, wire_len_a, wire_len_t, safe_load, def_max,
    pitch, hlx_ang,
    od_1, od_2, od_solid, id_1, id_2,
    wgt1000, fs_1,  //   kw2fs_1, kw2fs_2, kw2fs_s,   (unused)
    kw1, kw2, kw2str1, kw2str2, kw2strs;
    var m_tab;

    /*  Bring in material properties table  */
    if (st[o.Material_File].value === "mat_SI.json") m_tab = require('../mat_SI.json');
        else m_tab = require('../mat_ips.json');
    var et_tab = require('./endtypes.json');

    hits = 0;
    errmsg = "";
    if (st[o.L_Free].value < st[o.L_Solid].value) {
        hits++;
        errmsg += ": " + st[o.L_Free].name + " < " + st[o.L_Solid].name;
    }
    if (st[o.L_2].value < st[o.L_Solid].value) {
        hits++;
        errmsg += ": " + st[o.L_2].name + " < " + st[o.L_Solid].name;
    }
    if (st[o.ID_Free].value < 0.0) {
        hits++;
        errmsg += ": " + st[o.ID_Free].name + " < zero";
    }
    if (st[o.Coils_A].value < 1.0) {
        hits++;
        errmsg += ": " + st[o.Coils_A].name + " < 1.0";
    }
    if (st[o.Wire_Dia].value < 0.5 * st[o.tbase010].value) {
        hits++;
        errmsg += ": " + st[o.Wire_Dia].name + " < reasonable";
    }
    if (st[o.Wire_Dia].value > 5.0 * st[o.tbase400].value) {
        hits++;
        errmsg += ": " + st[o.Wire_Dia].name + " > reasonable";
    }
    if (st[o.Tensile].value <= prefs[o.smallnum]) {
        hits++;
        errmsg += ": " + st[o.Tensile].name + " < reasonable";
    }
    if (hits) errmsg = "Warning" + errmsg;
    const startpntmsg = "YOU MAY WISH TO CHOOSE A MORE REASONABLE START POINT BEFORE CONTINUING WITH SEARCH, SEEK OR TRADE.";
    const NaNmsg = 'Any "NaN" values are "Not a Number".';
//    
//    if (hits && report_name === '1 (mini)') {
//        displayError(errmsg + ' ... ' + startpntmsg + " " + NaNmsg);
//    }
    
    len_lbl = "Wire Length";
    
    switch(st[o.End_Type].value) {
    case 4:        //  Closed & Ground
        pitch = (st[o.L_Free].value - 2.0 * st[o.Wire_Dia].value) / st[o.Coils_A].value;
        break;
    case 3:        //  Closed
        pitch = (st[o.L_Free].value - 3.0 * st[o.Wire_Dia].value) / st[o.Coils_A].value;
        break;
    case 2:        //  Open & Ground
        pitch = st[o.L_Free].value / st[o.Coils_T].value;
        break;
    case 1:        //  Open
        pitch = (st[o.L_Free].value -       st[o.Wire_Dia].value) / st[o.Coils_A].value;
        break;
    case 5:        //  Tapered Closed & Ground
        pitch = (st[o.L_Free].value - 1.5 * st[o.Wire_Dia].value) / st[o.Coils_A].value;
        len_lbl = "Bar cut len.";
        break;
    case 6:        //  Pig-tail
        pitch = (st[o.L_Free].value - 2.0 * st[o.Wire_Dia].value) / st[o.Coils_A].value;
        break;
    default:        //  User Specified
        pitch = 0.0;
    }     

    sq1 = st[o.L_Free].value;
    sq2 = st[o.Coils_T].value * Math.PI * st[o.Mean_Dia].value;
    wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2);
         /*
          *  calculate developed length of tapered ends based on
          *  2 ends * pi * wire diameter * 0.625
          */
    if (st[o.End_Type].value === 5 ) wire_len_t = wire_len_t - 3.926 * st[o.Wire_Dia].value;
                           /*  more accurate weight  */
    wgt1000 = 1000.0 * st[o.Density].value * (Math.PI * st[o.Wire_Dia].value * st[o.Wire_Dia].value / 4.0) * wire_len_t;
    wgt1000_u = "/1000"

    /* 
     * intermediate dia. calcs. assume no wire stretch
     * note that value of wire_len_a is actually square of active wire length
     */
    sq1 = st[o.L_Free].value;
    sq2 = st[o.Coils_A].value * Math.PI * st[o.Mean_Dia].value;
    wire_len_a = sq1 * sq1 + sq2 * sq2;
    
    dhat = def_dia(st[o.L_1].value);
    od_1 = dhat + st[o.Wire_Dia].value;
    id_1 = dhat - st[o.Wire_Dia].value;
    
    dhat = def_dia(st[o.L_2].value);
    od_2 = dhat + st[o.Wire_Dia].value;
    id_2 = dhat - st[o.Wire_Dia].value;
    
    dhat = def_dia(st[o.L_Solid].value)
    od_solid = dhat + st[o.Wire_Dia].value;

    function def_dia(def_len) {
               /*  calculates mean diameter of deflected spring.  */
        return(Math.sqrt(wire_len_a - def_len * def_len) / (st[o.Coils_A].value * Math.PI));
    }
    /*
     * Alternative deflected diameter calculation formula:
     * From: https://www.acxesspring.com/spring-diameter-change.html
     * From: http://springipedia.com/compression-general-design.asp 
     */

    tensileFixed0 = st[o.Tensile].value.toFixed(0);
     
    /* used to compute % tensile values */
//    if (st[o.Tensile].value <= prefs[o.smallnum]) {
//        return (
//                <React.Fragment>
//                YOU MUST SUPPLY A VALUE FOR TENSILE STRENGTH IN ORDER TO COMPLETE THESE CALCULATIONS.
//                </React.Fragment>
//    );
//    }

    dhat = st[o.Tensile].value / 100.0;
    kc = (4.0 * st[o.Spring_Index].value - 1.0) / (4.0 * st[o.Spring_Index].value - 4.0);
    ks = kc + 0.615 / st[o.Spring_Index].value;
    s_f = ks * 8.0 * st[o.Mean_Dia].value / (Math.PI * st[o.Wire_Dia].value * st[o.Wire_Dia].value * st[o.Wire_Dia].value);

    kw1 = ks;
    kw2 = 1.0 + 0.5 / st[o.Spring_Index].value;
    temp = kw2 * s_f / ks;
    kw2str1 = temp * st[o.Force_1].value;
    kw2str2 = temp * st[o.Force_2].value;
    kw2strs = temp * st[o.Force_Solid].value;

    temp = 0.7 * st[o.Tensile].value;  // allowable stress for preset
    if (st[o.Stress_1] !== 0.0) fs_1 = Math.abs(st[o.Stress_Lim_Stat].value / st[o.Stress_1].value);
    else fs_1 = 0.0;

    /*  unused
     *  if (kw2str1 !== 0.0) kw2fs_1 = Math.abs(temp / kw2str1);
     *  else kw2fs_1 = 0.0;
     *  if (kw2str2 !== 0.0) kw2fs_2 = temp / kw2str2;
     *  else kw2str2 = 0.0;
     *  if (kw2strs !== 0.0) kw2fs_s = temp / kw2strs;
     *  else kw2fs_s = 0.0;
     *  unused
     */

    safe_load = st[o.Stress_Lim_Stat].value / s_f;
    if (safe_load > st[o.Force_Solid].value) safe_load_u = "(Solid)";
    else safe_load_u = st[o.Force_2].units ;
    safe_load = Math.min(safe_load, st[o.Force_Solid].value);
    /*
     * Angle across coil cross section
     * hlx_ang=atan(0.5*pitch/mean_dia)*(180.0/pi);
     */
    if (pitch > 0.0) hlx_ang = Math.atan(pitch / (Math.PI * st[o.Mean_Dia].value)) * (180.0 / Math.PI);
    else hlx_ang = 0.0;

    cycle_life_u = st[o.Cycle_Life].units + " (est)";
    
    if (st[o.PC_Avail_Deflect].value > 80.0) pcadmsg = "Coil to coil contact may cause inaccuracy in point 2.";
    
    temp = st[o.Deflect_2].value / st[o.L_Free].value;
    sq1 = 1.4 * st[o.Slenderness].value - 4.0;
    if (sq1 > prefs[o.smallnum]) {  
       /* structured to avoid div by 0 */
            if (temp > 0.76 / sq1) {
                errmsg1 = "Given a deflection ratio of " + temp.toFixed(3) + 
                "  and a Slenderness ratio of " + st[o.Slenderness].value.toFixed(1) + ",";
                 errmsg2 = "the spring will tend to buckle with fixed/free  ends.";
                 sq1 = 2.0 * st[o.Slenderness].value - 8.0;
                 if (sq1 <= 0.0 || temp < 1.6 / sq1) errmsg0 = " not";
                 else errmsg0 = "";
                 errmsg0 = "The spring will" + errmsg0 + " tend to buckle with fixed/fixed ends.";
            }
    }

    def_max = st[o.L_Free].value - st[o.L_Solid].value;
    safe_travel = Math.min(safe_load / st[o.Rate].value, def_max);

    switch(report_name) {
    case "1 (mini)":
    default:

    return (
        <React.Fragment>
            <h4>ODOP:Spring &nbsp; Compression Spring Report</h4><br />
            <b>
            {hits > 0 && errmsg}{hits > 0 && <br />}
            {hits > 0 && startpntmsg}{hits > 0 && <br />}
            </b>
            {hits > 0 && NaNmsg}{hits > 0 && <br />}
            {hits > 0 && <br />}
            <table>
                <tbody>
                    <tr>
                        <td>{st[o.Spring_Type].name}</td>
                        <td>=</td>
                        <td className="" colSpan="2">{st[o.Spring_Type].value}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.Material_Type].name}</td>
                        <td>=</td>
                        <td className="text-left" colSpan="2">{m_tab[st[o.Material_Type].value][mo.matnam]}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{st[o.Wire_Dia].name}</td>
                        <td>=</td>
                        <td>{st[o.Wire_Dia].value.toFixed(4)}</td>
                        <td>{st[o.Wire_Dia].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.End_Type].name}</td>
                        <td>=</td>
                        <td className="text-left" colSpan="2">{et_tab[st[o.End_Type].value][0]}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{st[o.Spring_Index].name}</td>
                        <td>=</td>
                        <td>{st[o.Spring_Index].value.toFixed(3)}</td>
                        <td>{st[o.Spring_Index].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.Coils_T].name}</td>
                        <td>=</td>
                        <td>{st[o.Coils_T].value.toFixed(3)}</td>
                        <td>{"total " + st[o.Coils_T].units}</td>
                    </tr>
                    <tr>
                        <td>{st[o.Rate].name}</td>
                        <td>=</td>
                        <td>{st[o.Rate].value.toFixed(3)}</td>
                        <td>{st[o.Rate].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.Coils_A].name}</td>
                        <td>=</td>
                        <td>{st[o.Coils_A].value.toFixed(3)}</td>
                        <td>{"active " + st[o.Coils_A].units}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <td> &nbsp; &nbsp; </td>
                        <th>Length</th>
                        <td> &nbsp; &nbsp; </td>
                        <th>Deflect</th>
                        <td> &nbsp; &nbsp; </td>
                        <th>Force</th>
                        <td> &nbsp; &nbsp; </td>
                        <th>&nbsp; OD &nbsp;</th>
                        <td> &nbsp; &nbsp; </td>
                        <th>&nbsp; ID &nbsp; </th>
                        <td> &nbsp; &nbsp; </td>
                        <th>&nbsp;Stress</th>
                        <td> &nbsp; &nbsp; </td>
                        <th>Static FS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>Free</b></td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.L_Free].value.toFixed(3)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{(0.0).toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{(0.0).toFixed(2)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.OD_Free].value.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.ID_Free].value.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{(0.0).toFixed(0)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>infinite</td>
                    </tr>
                    <tr>
                        <td><b>1</b></td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.L_1].value.toFixed(3)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.Deflect_1].value.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.Force_1].value.toFixed(2)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{od_1.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{id_1.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.Stress_1].value.toFixed(0)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{fs_1.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <td><b>2</b></td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.L_2].value.toFixed(3)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.Deflect_2].value.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.Force_2].value.toFixed(2)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{od_2.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{id_2.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.Stress_2].value.toFixed(0)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.FS_2].value.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <td><b>Solid</b></td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.L_Solid].value.toFixed(3)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{(st[o.L_Free].value - st[o.L_Solid].value).toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.Force_Solid].value.toFixed(2)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{od_solid.toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{(od_solid - 2.0 * st[o.Wire_Dia].value).toFixed(4)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.Stress_Solid].value.toFixed(0)}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.FS_Solid].value.toFixed(3)}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <td>Safe Load</td>
                        <td>=</td>
                        <td>{safe_load.toFixed(3)}</td>
                        <td>{safe_load_u}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{len_lbl}</td>
                        <td>=</td>
                        <td>{wire_len_t.toFixed(3)}</td>
                        <td>{st[o.L_Free].units}</td>
                    </tr>
                    <tr>
                        <td>{st[o.L_Stroke].name}</td>
                        <td>=</td>
                        <td>{st[o.L_Stroke].value.toFixed(3)}</td>
                        <td>{st[o.L_Stroke].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.Weight].name}</td>
                        <td>=</td>
                        <td>{wgt1000.toFixed(3)}</td>
                        <td>{st[o.Weight].units}</td>
                        <td>{wgt1000_u}</td>
                    </tr>
                    <tr>
                        <td>Pitch</td>
                        <td>=</td>
                        <td>{pitch.toFixed(3)}</td>
                        <td>{st[o.L_Free].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{st[o.Cycle_Life].name}</td>
                        <td>=</td>
                        <td>{st[o.Cycle_Life].value.toFixed(0)}</td>
                        <td>{cycle_life_u}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            Deflection at load point 2 is {st[o.PC_Avail_Deflect].value.toFixed(0)}% of total available deflection.<br />
            {pcadmsg}{pcadmsg !== undefined && <br />}
            {errmsg1}{errmsg1 !== undefined && <br />}
            {errmsg2}{errmsg2 !== undefined && <br />}
            {errmsg3}{errmsg0}
        </React.Fragment>
    );
    case "2 (pre-set)":
        return (
                <React.Fragment>
                <h4>ODOP:Spring &nbsp; Compression Spring Report</h4>
                    <br />
                    <table>
                        <tbody>
                            <tr>
                                <td>{st[o.Spring_Type].name}</td>
                                <td>=</td>
                                <td className="" colSpan="2">{st[o.Spring_Type].value}</td>
                                <td/>
                                <td> &nbsp; &nbsp; </td>
                                <td>{st[o.Material_Type].name}</td>
                                <td>=</td>
                                <td className="text-left" colSpan="2">{m_tab[st[o.Material_Type].value][mo.matnam]}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>{st[o.Wire_Dia].name}</td>
                                <td>=</td>
                                <td>{st[o.Wire_Dia].value.toFixed(4)}</td>
                                <td>{st[o.Wire_Dia].units}</td>
                                <td/>
                                <td> &nbsp; &nbsp; </td>
                                <td>{st[o.Tensile].name}</td>
                                <td>=</td>
                                <td>{tensileFixed0}</td>
                                <td>{st[o.Tensile].units}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>{st[o.Spring_Index].name}</td>
                                <td>=</td>
                                <td>{st[o.Spring_Index].value.toFixed(3)}</td>
                                <td>{st[o.Spring_Index].units}</td>
                                <td/>
                                <td> &nbsp; &nbsp; </td>
                                <td>Stress Ratio</td>
                                <td>=</td>
                                <td>{(st[o.Stress_1].value / st[o.Stress_2].value).toFixed(3)}</td>
                                <td>{st[o.Spring_Index].units}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr/>
                    kw1 = {kw1.toFixed(3)} &nbsp; &nbsp; (Applies before set removal)
                    <br/>
                    kw2 = {kw2.toFixed(3)} &nbsp; &nbsp; (Applies &nbsp;after &nbsp; set removal)
                    <br/>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    ---- kw2 ----- &nbsp; &nbsp; ---- kw1 -----
                    <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Length &nbsp; </th>
                            <th>Deflect</th>
                            <th>Force</th>
                            <td> &nbsp; &nbsp; </td>
                            <th>Stress</th>
                            <th>%TS &nbsp;</th>
                            <td> &nbsp; &nbsp; </td>
                            <th>Stress</th>
                            <th>%TS &nbsp;</th>
                            <td> &nbsp; &nbsp; </td>
                            <th>Static FS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Free</b></td>
                            <td>{st[o.L_Free].value.toFixed(3)}</td>
                            <td>{(0.0).toFixed(4)}</td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(0.0).toFixed(0)}</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(0.0).toFixed(0)}</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>infinite</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td>{st[o.L_1].value.toFixed(3)}</td>
                            <td>{st[o.Deflect_1].value.toFixed(4)}</td>
                            <td>{st[o.Force_1].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{kw2str1.toFixed(0)}</td>
                            <td>{(kw2str1 / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Stress_1].value.toFixed(0)}</td>
                            <td>{(st[o.Stress_1].value / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{fs_1.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td>{st[o.L_2].value.toFixed(3)}</td>
                            <td>{st[o.Deflect_2].value.toFixed(4)}</td>
                            <td>{st[o.Force_2].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{kw2str2.toFixed(0)}</td>
                            <td>{(kw2str2 / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Stress_2].value.toFixed(0)}</td>
                            <td>{(st[o.Stress_2].value / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.FS_2].value.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>Solid</b></td>
                            <td>{st[o.L_Solid].value.toFixed(3)}</td>
                            <td>{(st[o.L_Free].value - st[o.L_Solid].value).toFixed(4)}</td>
                            <td>{st[o.Force_Solid].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{kw2strs.toFixed(0)}</td>
                            <td>{(kw2strs / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Stress_Solid].value.toFixed(0)}</td>
                            <td>{(st[o.Stress_Solid].value / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.FS_Solid].value.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table>
                    <tbody>
                        <tr>
                            <td>{st[o.FS_CycleLife].name}</td>
                            <td>=</td>
                            <td>{st[o.FS_CycleLife].value.toFixed(3)}</td>
                            <td>{st[o.FS_CycleLife].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{st[o.Cycle_Life].value.toFixed(0)}</td>
                            <td>{cycle_life_u}</td>
                        </tr>
                        <tr>
                            <td>Helix Angle</td>
                            <td>=</td>
                            <td>{hlx_ang.toFixed(2)}</td>
                            <td>degrees</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                </tbody>
            </table>
        </React.Fragment>
    );
    case "3 (maxi)":
    return (
        <React.Fragment>
            <h4>ODOP:Spring &nbsp; Compression Spring Report</h4>
            <br />
            <table>
                <tbody>
                    <tr>
                        <td>{labels[o.Contact_person].name}:</td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Contact_person].value}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{labels[o.Phone].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Phone].value}</td>
                    </tr>
                    <tr>
                        <td>{labels[o.Company_name].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Company_name].value}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{labels[o.Date].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Date].value}</td>
                    </tr>
                    <tr>
                        <td>{labels[o.Street].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Street].value}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{labels[o.Part_Number].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Part_Number].value}</td>
                    </tr>
                    <tr>
                        <td>{labels[o.City].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.City].value}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>{labels[o.Finish].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.Finish].value}</td>
                    </tr>
                    <tr>
                        <td>{labels[o.State___Zip].name}: </td>
                        <td> &nbsp; </td>
                        <td>{labels[o.State___Zip].value}</td>
                    </tr>
                </tbody>
            </table>
            <b>Comment: &nbsp; </b> {labels[o.COMMENT].value} <br/>
            <br/>
            <table>
                <tbody>
                    <tr>
                    <td>{st[o.Spring_Type].name}</td>
                    <td>=</td>
                    <td className="" colSpan="2">{st[o.Spring_Type].value}</td>
                    <td/>
                    <td> &nbsp; &nbsp; </td>
                    <td>{st[o.Material_Type].name}</td>
                    <td>=</td>
                    <td className="text-left" colSpan="2">{m_tab[st[o.Material_Type].value][mo.matnam]}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>{st[o.Wire_Dia].name}</td>
                    <td>=</td>
                    <td>{st[o.Wire_Dia].value.toFixed(4)}</td>
                    <td>{st[o.Wire_Dia].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{st[o.ASTM_Fed_Spec].name}</td>
                    <td>=</td>
                    <td className="text-left" colSpan="2">{st[o.ASTM_Fed_Spec].value}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>{st[o.Mean_Dia].name}</td>
                    <td>=</td>
                    <td>{st[o.Mean_Dia].value.toFixed(3)}</td>
                    <td>{st[o.Mean_Dia].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{st[o.Tensile].name}</td>
                    <td>=</td>
                    <td>{tensileFixed0}</td>
                    <td>{st[o.Tensile].units}</td>
                </tr>
                <tr>
                    <td>{st[o.Spring_Index].name}</td>
                    <td>=</td>
                    <td>{st[o.Spring_Index].value.toFixed(3)}</td>
                    <td>{st[o.Spring_Index].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{st[o.End_Type].name}</td>
                    <td>=</td>
                    <td className="text-left" colSpan="2">{et_tab[st[o.End_Type].value][0]}</td>
                </tr>
                <tr>
                    <td>{st[o.Coils_T].name}</td>
                    <td>=</td>
                    <td>{st[o.Coils_T].value.toFixed(3)}</td>
                    <td>{"total " + st[o.Coils_T].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>Pitch</td>
                    <td>=</td>
                    <td>{pitch.toFixed(3)}</td>
                    <td>{st[o.L_Free].units}</td>
                </tr>
                <tr>
                    <td>{st[o.Coils_A].name}</td>
                    <td>=</td>
                    <td>{st[o.Coils_A].value.toFixed(3)}</td>
                    <td>{"active " + st[o.Coils_A].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>Helix Angle</td>
                    <td>=</td>
                    <td>{hlx_ang.toFixed(2)}</td>
                    <td>degrees</td>
                </tr>
                <tr>
                    <td>{len_lbl}</td>
                    <td>=</td>
                    <td>{wire_len_t.toFixed(3)}</td>
                    <td>{st[o.L_Free].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{st[o.Weight].name}</td>
                    <td>=</td>
                    <td>{wgt1000.toFixed(3)}</td>
                    <td>{st[o.Weight].units}</td>
                    <td>{wgt1000_u}</td>
                </tr>
                <tr>
                    <td>Safe Load</td>
                    <td>=</td>
                    <td>{safe_load.toFixed(3)}</td>
                    <td>{safe_load_u}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{st[o.Rate].name}</td>
                    <td>=</td>
                    <td>{st[o.Rate].value.toFixed(3)}</td>
                    <td>{st[o.Rate].units}</td>
                </tr>
                <tr>
                    <td>Safe Travel</td>
                    <td>=</td>
                    <td>{safe_travel.toFixed(3)}</td>
                    <td>{st[o.L_Free].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{st[o.Cycle_Life].name}</td>
                    <td>=</td>
                    <td>{st[o.Cycle_Life].value.toFixed(0)}</td>
                    <td className="text-left" colSpan="2">{cycle_life_u}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <br/>
        <table>
            <thead>
                <tr>
                    <th/>
                    <th/>
                    <th>Free </th>
                    <th>1st Load</th>
                    <th>&nbsp; 2nd Load</th>
                    <td></td>
                    <th> &nbsp; &nbsp; Solid</th>
                    <th></th>
                    <th> &nbsp; &nbsp; </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>Force</b></td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{(0.0).toFixed(2)}</td>
                    <td>{st[o.Force_1].value.toFixed(2)}</td>
                    <td>{st[o.Force_2].value.toFixed(2)}</td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{st[o.Force_Solid].value.toFixed(2)}</td>
                    <td className="text-left" colSpan="2">{st[o.Force_1].units}</td>
                    <td/>
                </tr>
                <tr>
                    <td><b>Length</b></td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{st[o.L_Free].value.toFixed(3)}</td>
                    <td>{st[o.L_1].value.toFixed(3)}</td>
                    <td>{st[o.L_2].value.toFixed(3)}</td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{st[o.L_Solid].value.toFixed(3)}</td>
                    <td>{st[o.L_1].units}</td>
                </tr>
                <tr>
                    <td><b>Deflection</b></td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{(0.0).toFixed(3)}</td>
                    <td>{st[o.Deflect_1].value.toFixed(3)}</td>
                    <td>{st[o.Deflect_2].value.toFixed(3)}</td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{(st[o.L_Free].value - st[o.L_Solid].value).toFixed(3)}</td>
                    <td>{st[o.Deflect_2].units}</td>
                </tr>
                <tr>
                    <td><b>Outside Dia.</b></td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{st[o.OD_Free].value.toFixed(3)}</td>
                    <td>{od_1.toFixed(3)}</td>
                    <td>{od_2.toFixed(3)}</td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{od_solid.toFixed(3)}</td>
                    <td>{st[o.OD_Free].units}</td>
                </tr>
                <tr>
                    <td><b>Inside Dia.</b></td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{st[o.ID_Free].value.toFixed(3)}</td>
                    <td>{id_1.toFixed(3)}</td>
                    <td>{id_2.toFixed(3)}</td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{(od_solid - 2.0 * st[o.Wire_Dia].value).toFixed(3)}</td>
                    <td>{st[o.ID_Free].units}</td>
                </tr>
                <tr>
                    <td>w/o set &nbsp; kw = </td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{kw1.toFixed(3)}</td>
                    <td></td>
                    <td></td>
                    <td> &nbsp; &nbsp; </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td> ... <b>Stress</b></td>
                    <td></td>
                    <td></td>
                    <td>{st[o.Stress_1].value.toFixed(0)}</td>
                    <td>{st[o.Stress_2].value.toFixed(0)}</td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{st[o.Stress_Solid].value.toFixed(0)}</td>
                    <td>{st[o.Stress_1].units}</td>
                </tr>
                <tr>
                    <td> ... <b>% Tensile</b></td>
                    <td></td>
                    <td></td>
                    <td>{(st[o.Stress_1].value / dhat).toFixed(1)}</td>
                    <td>{(st[o.Stress_2].value / dhat).toFixed(1)}</td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{(st[o.Stress_Solid].value / dhat).toFixed(1)}</td>
                    <td>% &nbsp; &nbsp; </td>
                </tr>
                <tr>
                    <td> ... <b>Static F.S.</b></td>
                    <td></td>
                    <td></td>
                    <td>{fs_1.toFixed(2)}</td>
                    <td>{st[o.FS_2].value.toFixed(2)}</td>
                    <td> &nbsp; &nbsp; </td>
                    <td>{st[o.FS_Solid].value.toFixed(2)}</td>
                    <td>{st[o.FS_Solid].units}</td>
                </tr>
            </tbody>
        </table>
        <hr/>
        <table>
            <tbody>
                <tr>
                    <td>Wind: </td>
                    <td> &nbsp; </td>
                    <td>rh</td>
                    <td> &nbsp; &nbsp; </td>
                    <td>lh</td>
                    <td> &nbsp; </td>
                    <td>opt</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Data source: </td>
                    <td> &nbsp; </td>
                    <td>print </td>
                    <td> &nbsp; &nbsp; </td>
                    <td>sample </td>
                    <td> &nbsp; </td>
                    <td>verbal</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Mandrel: </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; &nbsp; </td>
                    <td>Fits in: </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td>Works over:</td>
                </tr>
                <tr>
                    <td>Stress relieve</td>
                    <td>/ HT: </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td>Squareness</td>
                    <td className="text-left">(deg): </td>
                </tr>
                <tr>
                    <td>Shot peen: </td>
                    <td> &nbsp; </td>
                    <td> yes </td>
                    <td> &nbsp; </td>
                    <td> no </td>
                    <td> &nbsp; &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> Operating temp: </td>
                </tr>
                <tr>
                    <td>Special notes</td>
                    <td className="text-left" colSpan="2">& tolerances: </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; &nbsp; </td>
                    <td> End use: </td>
                    <td> &nbsp; </td>
                </tr>
            </tbody>
        </table>
        <hr/>
        Deflection at load point 2 is {st[o.PC_Avail_Deflect].value.toFixed(0)}% of total available deflection.<br />
        {pcadmsg}{pcadmsg !== undefined && <br />}
        {errmsg1}{errmsg1 !== undefined && <br />}
        {errmsg2}{errmsg2 !== undefined && <br />}
        {errmsg3}{errmsg0}
        <hr/>
        <table>
            <tbody>
                <tr>
                <td> &nbsp; approved for mfg.&nbsp; </td>
                <td> &nbsp; </td>
                <td> &nbsp; </td>
                <td> &nbsp; approved for mfg.&nbsp; </td>
                </tr>
                <tr>
                <td> &nbsp; </td>
                </tr>
                <tr>
                <td> by _______________________ &nbsp; </td>
                <td> &nbsp; date _______ &nbsp; </td>
                <td> &nbsp; </td>
                <td> by _______________________ &nbsp; </td>
                <td> &nbsp; date _______ &nbsp; </td>
                </tr>
            </tbody>
        </table>
        </React.Fragment>
    );
    }
}
