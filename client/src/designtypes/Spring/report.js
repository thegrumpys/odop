import React from 'react';
import * as o from './offsets';
import * as mo from './mat_ips_offsets';

export function getReportNames() {
    // Note: report names must match cases in switch statement below
    return [
      'Report 1 (mini)',
      'Report 2 (pre-set)',
      'Report 3 (maxi)'
    ];
}

export function report(report_name, prefs, p, x, labels) {
//    console.log('In report report_name=',report_name,' prefs=',prefs,' p=',p,' x=',x,' labels=',labels);
    
    var kc, ks, temp, s_f, len_lbl, 
    safe_load_u, wgt1000_u, cycle_life_u, 
    pcadmsg, errmsg, errmsg1, errmsg2, errmsg3,
    safe_travel,
    sq1, sq2,
    dhat, wire_len_a, wire_len_t, safe_load, def_max,
    pitch, hlx_ang,
    od_1, od_2, od_solid, id_1, id_2,
    wgt1000, fs_1,  //   kw2fs_1, kw2fs_2, kw2fs_s,   (unused)
    kw1, kw2, kw2str1, kw2str2, kw2strs;

    /*  Bring in material properties table  */
    var m_tab = require('./mat_ips.json');
    var et_tab = require('./c_endtypes.json');

    len_lbl = "Wire Length";
    
//    et=end_type_index;
//    if    et = 4 then pitch=(l_free-2.0*wire_dia)/coils_a;
//      else if et = 3 then pitch=(l_free-3.0*wire_dia)/coils_a;
//      else if et = 2 then pitch= l_free/coils_t;
//      else if et = 1 then pitch=(l_free-    wire_dia)/coils_a;
//      else if et = 5 then pitch=(l_free-1.5*wire_dia)/coils_a;
//      else if et = 6 then pitch=(l_free-2.0*wire_dia)/coils_a;
//      else pitch = zero;
    
    switch(x[o.End_Type].value) {
    case 4:
        pitch = (p[o.L_Free].value - 2.0 * p[o.Wire_Dia].value) / x[o.Coils_A].value;
        break;
    case 3:
        pitch = (p[o.L_Free].value - 3.0 * p[o.Wire_Dia].value) / x[o.Coils_A].value;
        break;
    case 2:
        pitch = p[o.L_Free].value / p[o.Coils_T].value;
        break;
    case 1:
        pitch = (p[o.L_Free].value -       p[o.Wire_Dia].value) / x[o.Coils_A].value;
        break;
    case 5:
        pitch = (p[o.L_Free].value - 1.5 * p[o.Wire_Dia].value) / x[o.Coils_A].value;
        len_lbl = "Bar cut len.";
        break;
    case 6:
        pitch = (p[o.L_Free].value - 2.0 * p[o.Wire_Dia].value) / x[o.Coils_A].value;
        break;
    default:
        pitch = 0.0;
    }     

    //    sq1=l_free;
    sq1 = p[o.L_Free].value;
//    sq2=coils_t*pi*mean_dia;
    sq2 = p[o.Coils_T].value * Math.PI * x[o.Mean_Dia].value;
//    wire_len_t=sqrt(sq1*sq1+sq2*sq2);
    wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2);
         /*
            calculate developed length of tapered ends based on
            2 ends * pi * wire diameter * 0.625
          */
//    if end_type_index = 5 then wire_len_t=wire_len_t-3.926*wire_dia;
    if (x[o.End_Type].value === 5 ) wire_len_t = wire_len_t - 3.926 * p[o.Wire_Dia].value;
                           /*  more accurate weight  */
//    wgt1000=1000.0*density*(pi*wire_dia*wire_dia/4.0)*wire_len_t;
    wgt1000 = 1000.0 * x[o.Density].value * (Math.PI * p[o.Wire_Dia].value * p[o.Wire_Dia].value / 4.0) * wire_len_t;
    wgt1000_u = x[o.Weight].units + "/1000"

    /* intermed. dia. calcs. assume no wire stretch   */
//    sq1=l_free;
    sq1 = p[o.L_Free].value;
//    sq2=coils_a*pi*mean_dia;
    sq2 = x[o.Coils_A].value * Math.PI * x[o.Mean_Dia].value;
//    wire_len_a=sq1*sq1+sq2*sq2;
    wire_len_a = sq1 * sq1 + sq2 * sq2;
//
//    dhat=def_dia(l_1);
    dhat = def_dia(x[o.L_1].value);
//    OD_1=DHAT+WIRE_DIA;
    od_1 = dhat + p[o.Wire_Dia].value;
//    ID_1=DHAT-WIRE_DIA;
    id_1 = dhat - p[o.Wire_Dia].value;
//
//    dhat=def_dia(l_2);
    dhat = def_dia(x[o.L_2].value);
//    OD_2=DHAT+WIRE_DIA;
    od_2 = dhat + p[o.Wire_Dia].value;
//    ID_2=DHAT-WIRE_DIA;
    id_2 = dhat - p[o.Wire_Dia].value;
//
//    dhat=def_dia(l_solid);
    dhat = def_dia(x[o.L_Solid].value)
//    OD_solid=DHAT+WIRE_DIA;
    od_solid = dhat + p[o.Wire_Dia].value;

//    DEF_DIA: procedure(def_len) returns(float);
    function def_dia(def_len) {
               /*  calculates mean diameter of deflected spring.  */
//      declare def_len float;
//      return(sqrt(wire_len_a-def_len*def_len)/(coils_a*pi));
        return(Math.sqrt(wire_len_a - def_len * def_len) / (x[o.Coils_A].value * Math.PI));
//    end def_dia;
    }
    /*
     * Alternative deflected diameter calculation formula:
     * From: https://www.acxesspring.com/spring-diameter-change.html
     * From: http://springipedia.com/compression-general-design.asp 
     */
    
    /* converts to % tensile value */
//    if tensile <= 0.0 then
    if (x[o.Tensile].value <= 0.0) {
//    do;
//        put file(targfile) skip(2) edit
//        (
//            'YOU MUST SUPPLY TENSILE STRENGTH VALUES TO COMPLETE ',
//            'THESE CALCULATIONS.'
//        )
//        (a);
        console.log("YOU MUST SUPPLY TENSILE STRENGTH VALUES TO COMPLETE THESE CALCULATIONS.");
//        return;
        return;
//    end;
    }
//    dhat=tensile/100.0;
    dhat = x[o.Tensile].value / 100.0;
//
    kc = (4.0 * x[o.Spring_Index].value - 1.0) / (4.0 * x[o.Spring_Index].value - 4.0);
    ks = kc + 0.615 / x[o.Spring_Index].value;
    s_f = ks * 8.0 * x[o.Mean_Dia].value / (Math.PI * p[o.Wire_Dia].value * p[o.Wire_Dia].value * p[o.Wire_Dia].value);

    //    kw1=ks;
    kw1 = ks;
//    kw2=1.0 + 0.5/spring_index;
    kw2 = 1.0 + 0.5 / x[o.Spring_Index].value;
//
//    temp=kw2*s_f/ks;
    temp = kw2 * s_f / ks;
//    kw2str1=temp*force_1;
    kw2str1 = temp * p[o.Force_1].value;
//    kw2str2=temp*force_2;
    kw2str2 = temp * p[o.Force_2].value;
//    kw2strs=temp*force_solid;
    kw2strs = temp * x[o.Force_Solid].value;
//
//    temp=0.7*tensile;              /* allowable stress for preset */
    temp = 0.7 * x[o.Tensile].value;  // allowable stress for preset
//    if stress_1 ^= zero then fs_1=abs(stress_lim_stat/stress_1);
    if (x[o.Stress_1] !== 0.0) fs_1 = Math.abs(x[o.Stress_Lim_Stat].value / x[o.Stress_1].value);
//        else fs_1=zero;
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
//
//    safe_load=stress_lim_stat/s_f;
    safe_load = x[o.Stress_Lim_Stat].value / s_f;
    if (safe_load > x[o.Force_Solid].value) safe_load_u = "(Solid)";
    else safe_load_u = p[o.Force_2].units ;
    safe_load = Math.min(safe_load, x[o.Force_Solid].value);
//
//    /*
//      Angle across coil cross section
//      hlx_ang=atan(0.5*pitch/mean_dia)*(180.0/pi);
//     */
//    if pitch > zero then hlx_ang=atan(pitch/(pi*mean_dia))*(180.0/pi);
    if (pitch > 0.0) hlx_ang = Math.atan(pitch / (Math.PI * x[o.Mean_Dia].value)) * (180.0 / Math.PI);
//        else hlx_ang=zero;
    else hlx_ang = 0.0;

    cycle_life_u = x[o.Cycle_Life].units + " (est)";
    
    if (x[o.PC_Avail_Deflect].value > 80.0) pcadmsg = "Coil to coil contact may cause inaccuracy in point 2.";
    
//    temp=deflect_2/l_free;
    temp = x[o.Deflect_2].value / p[o.L_Free].value;
//    sq1=1.4*slenderness-4.0;
    sq1 = 1.4 * x[o.Slenderness].value - 4.0;
//    if sq1 > smallnum then
    if (sq1 > prefs[o.smallnum]) {  
//      do;                 /* structured to avoid div by 0 */
//      if temp > 0.76/sq1 then
            if (temp > 0.76 / sq1) {
//     do;
//     errmsg = '';
//     put file(targfile) skip(2) edit
//          ('GIVEN A DEFLECTION RATIO OF', temp,
                errmsg1 = "Given a deflection ratio of " + temp.toFixed(3) + 
//              '  AND A SLENDERNESS RATIO OF', slenderness,
                "  and a Slenderness ratio of " + x[o.Slenderness].value.toFixed(1) + ",";
//              'THE SPRING WILL', errmsg,
//              ' TEND TO BUCKLE WITH FIXED/FREE  ENDS.')
                 errmsg2 = "the spring will tend to buckle with fixed/free  ends.";
//          (a, f(8,3), a, f(7,1), skip, a, a, a);
//     sq1=2.0*slenderness-8.0;
                 sq1 = 2.0 * x[o.Slenderness].value - 8.0;
//     if sq1 <= zero | temp < 1.6/sq1 then errmsg = ' NOT';
                 if (sq1 <= 0.0 || temp < 1.6 / sq1) errmsg = " not";
//                     else errmsg = '';
                 else errmsg = "";
//     put file(targfile) skip edit
//          ('THE SPRING WILL', errmsg,
//           ' TEND TO BUCKLE WITH FIXED/FIXED ENDS.')
//          (a);
                 errmsg = "The spring will" + errmsg + " tend to buckle with fixed/fixed ends.";
//     end;
            }
    }

//    def_max=l_free-l_solid;
    def_max = p[o.L_Free].value - x[o.L_Solid].value;
//    temp=min(safe_load/rate,def_max);
    safe_travel = Math.min(safe_load / x[o.Rate].value, def_max);

    switch(report_name) {
    case "Report 1 (mini)":
    default:

    return (
        <React.Fragment>
            <table>
                <tbody>
                    <tr>
                        <td>{x[o.Spring_Type].name}</td>
                        <td>=</td>
                        <td>{x[o.Spring_Type].value}</td>
                        <td>{x[o.Spring_Type].units}</td>
                        <td/>
                        <td> &nbsp; </td>
                        <td>{x[o.Material_Type].name}</td>
                        <td>=</td>
                        <td>{m_tab[x[o.Material_Type].value][mo.matnam]}</td>
                        <td>{x[o.Material_Type].units}</td>
                    </tr>
                    <tr>
                        <td>{p[o.Wire_Dia].name}</td>
                        <td>=</td>
                        <td>{p[o.Wire_Dia].value.toFixed(4)}</td>
                        <td>{p[o.Wire_Dia].units}</td>
                        <td/>
                        <td> &nbsp; </td>
                        <td>{x[o.End_Type].name}</td>
                        <td>=</td>
                        <td>{et_tab[x[o.End_Type].value][0]}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{x[o.Spring_Index].name}</td>
                        <td>=</td>
                        <td>{x[o.Spring_Index].value.toFixed(3)}</td>
                        <td>{x[o.Spring_Index].units}</td>
                        <td/>
                        <td> &nbsp; </td>
                        <td>{p[o.Coils_T].name}</td>
                        <td>=</td>
                        <td>{p[o.Coils_T].value.toFixed(3)}</td>
                        <td>{"Total " + p[o.Coils_T].units}</td>
                    </tr>
                    <tr>
                        <td>{x[o.Rate].name}</td>
                        <td>=</td>
                        <td>{x[o.Rate].value.toFixed(3)}</td>
                        <td>{x[o.Rate].units}</td>
                        <td/>
                        <td> &nbsp; </td>
                        <td>{x[o.Coils_A].name}</td>
                        <td>=</td>
                        <td>{x[o.Coils_A].value.toFixed(3)}</td>
                        <td>{"Active " + x[o.Coils_A].units}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Length &nbsp; </th>
                        <th>Deflect &nbsp;</th>
                        <th>Force &nbsp; &nbsp;</th>
                        <th>&nbsp; OD &nbsp; &nbsp; &nbsp;</th>
                        <th>&nbsp; ID &nbsp; &nbsp; &nbsp; &nbsp;</th>
                        <th>Stress &nbsp; &nbsp;</th>
                        <th>Static FS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>Free</b></td>
                        <td>{p[o.L_Free].value.toFixed(3)}</td>
                        <td>{(0.0).toFixed(4)}</td>
                        <td>{(0.0).toFixed(2)}</td>
                        <td>{p[o.OD_Free].value.toFixed(4)}</td>
                        <td>{x[o.ID_Free].value.toFixed(4)}</td>
                        <td>{(0.0).toFixed(0)}</td>
                        <td>infinite</td>
                    </tr>
                    <tr>
                        <td><b>1</b></td>
                        <td>{x[o.L_1].value.toFixed(3)}</td>
                        <td>{x[o.Deflect_1].value.toFixed(4)}</td>
                        <td>{p[o.Force_1].value.toFixed(2)}</td>
                        <td>{od_1.toFixed(4)}</td>
                        <td>{id_1.toFixed(4)}</td>
                        <td>{x[o.Stress_1].value.toFixed(0)}</td>
                        <td>{fs_1.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <td><b>2</b></td>
                        <td>{x[o.L_2].value.toFixed(3)}</td>
                        <td>{x[o.Deflect_2].value.toFixed(4)}</td>
                        <td>{p[o.Force_2].value.toFixed(2)}</td>
                        <td>{od_2.toFixed(4)}</td>
                        <td>{id_2.toFixed(4)}</td>
                        <td>{x[o.Stress_2].value.toFixed(0)}</td>
                        <td>{x[o.FS_2].value.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <td><b>Solid</b></td>
                        <td>{x[o.L_Solid].value.toFixed(3)}</td>
                        <td>{(p[o.L_Free].value - x[o.L_Solid].value).toFixed(4)}</td>
                        <td>{x[o.Force_Solid].value.toFixed(2)}</td>
                        <td>{od_solid.toFixed(4)}</td>
                        <td>{(od_solid - 2.0 * p[o.Wire_Dia].value).toFixed(4)}</td>
                        <td>{x[o.Stress_Solid].value.toFixed(0)}</td>
                        <td>{x[o.FS_Solid].value.toFixed(3)}</td>
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
                        <td>{p[o.L_Free].units}</td>
                    </tr>
                    <tr>
                        <td>{x[o.L_Stroke].name}</td>
                        <td>=</td>
                        <td>{x[o.L_Stroke].value.toFixed(3)}</td>
                        <td>{x[o.L_Stroke].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.Weight].name}</td>
                        <td>=</td>
                        <td>{wgt1000.toFixed(3)}</td>
                        <td>{wgt1000_u}</td>
                    </tr>
                    <tr>
                        <td>Pitch</td>
                        <td>=</td>
                        <td>{pitch.toFixed(3)}</td>
                        <td>{p[o.L_Free].units}</td>
                        <td/>
                        <td> &nbsp; &nbsp; </td>
                        <td>{x[o.Cycle_Life].name}</td>
                        <td>=</td>
                        <td>{x[o.Cycle_Life].value.toFixed(0)}</td>
                        <td>{cycle_life_u}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            Deflection at load point 2 is {x[o.PC_Avail_Deflect].value.toFixed(0)}% of total available deflection.<br />
            {pcadmsg}{pcadmsg !== undefined && <br />}
            {errmsg1}{errmsg1 !== undefined && <br />}
            {errmsg2}{errmsg2 !== undefined && <br />}
            {errmsg3}{errmsg}
        </React.Fragment>
    );
    case "Report 2 (pre-set)":
        return (
                <React.Fragment>
                    <table>
                        <tbody>
                            <tr>
                                <td>{x[o.Spring_Type].name}</td>
                                <td>=</td>
                                <td>{x[o.Spring_Type].value}</td>
                                <td>{x[o.Spring_Type].units}</td>
                                <td/>
                                <td> &nbsp; </td>
                                <td>{x[o.Material_Type].name}</td>
                                <td>=</td>
                                <td>{m_tab[x[o.Material_Type].value][mo.matnam]}</td>
                                <td>{x[o.Material_Type].units}</td>
                            </tr>
                            <tr>
                                <td>{p[o.Wire_Dia].name}</td>
                                <td>=</td>
                                <td>{p[o.Wire_Dia].value.toFixed(4)}</td>
                                <td>{p[o.Wire_Dia].units}</td>
                                <td/>
                                <td> &nbsp; </td>
                                <td>{x[o.Tensile].name}</td>
                                <td>=</td>
                                <td>{x[o.Tensile].value.toFixed(0)}</td>
                                <td>{x[o.Tensile].units}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>{x[o.Spring_Index].name}</td>
                                <td>=</td>
                                <td>{x[o.Spring_Index].value.toFixed(3)}</td>
                                <td>{x[o.Spring_Index].units}</td>
                                <td/>
                                <td> &nbsp; </td>
                                <td>Stress Ratio</td>
                                <td>=</td>
                                <td>{(x[o.Stress_1].value / x[o.Stress_2].value).toFixed(3)}</td>
                                <td>{x[o.Stress_1].units}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    kw1 = {kw1.toFixed(3)} &nbsp; &nbsp; (Applies before set removal)
                    <br/>
                    kw2 = {kw2.toFixed(3)} &nbsp; &nbsp; (Applies &nbsp;after &nbsp; set removal)
                    <br/><br/>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    ---- kw2 ----- &nbsp; &nbsp; ---- kw1 ----
                    <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Length &nbsp; </th>
                            <th>Deflect &nbsp;</th>
                            <th>Force &nbsp; &nbsp;</th>
                            <th>Stress &nbsp; &nbsp; </th>
                            <th>%TS &nbsp;</th>
                            <th>Stress &nbsp; &nbsp; </th>
                            <th>%TS &nbsp;</th>
                            <th>Static FS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Free</b></td>
                            <td>{p[o.L_Free].value.toFixed(3)}</td>
                            <td>{(0.0).toFixed(4)}</td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td>{(0.0).toFixed(0)}</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td>{(0.0).toFixed(0)}</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td>infinite</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td>{x[o.L_1].value.toFixed(3)}</td>
                            <td>{x[o.Deflect_1].value.toFixed(4)}</td>
                            <td>{p[o.Force_1].value.toFixed(2)}</td>
                            <td>{kw2str1.toFixed(0)}</td>
                            <td>{(kw2str1 / dhat).toFixed(1)}</td>
                            <td>{x[o.Stress_1].value.toFixed(0)}</td>
                            <td>{(x[o.Stress_1].value / dhat).toFixed(1)}</td>
                            <td>{fs_1.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td>{x[o.L_2].value.toFixed(3)}</td>
                            <td>{x[o.Deflect_2].value.toFixed(4)}</td>
                            <td>{p[o.Force_2].value.toFixed(2)}</td>
                            <td>{kw2str2.toFixed(0)}</td>
                            <td>{(kw2str2 / dhat).toFixed(1)}</td>
                            <td>{x[o.Stress_2].value.toFixed(0)}</td>
                            <td>{(x[o.Stress_2].value / dhat).toFixed(1)}</td>
                            <td>{x[o.FS_2].value.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td><b>Solid</b></td>
                            <td>{x[o.L_Solid].value.toFixed(3)}</td>
                            <td>{(p[o.L_Free].value - x[o.L_Solid].value).toFixed(4)}</td>
                            <td>{x[o.Force_Solid].value.toFixed(2)}</td>
                            <td>{kw2strs.toFixed(0)}</td>
                            <td>{(kw2strs / dhat).toFixed(1)}</td>
                            <td>{x[o.Stress_Solid].value.toFixed(0)}</td>
                            <td>{(x[o.Stress_Solid].value / dhat).toFixed(1)}</td>
                            <td>{x[o.FS_Solid].value.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table>
                    <tbody>
                        <tr>
                            <td>{x[o.FS_CycleLife].name}</td>
                            <td>=</td>
                            <td>{x[o.FS_CycleLife].value.toFixed(3)}</td>
                            <td>{x[o.FS_CycleLife].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{x[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{x[o.Cycle_Life].value.toFixed(0)}</td>
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
    case "Report 3 (maxi)":
    return (
        <React.Fragment>
            <table>
                <tbody>
                    <tr>
                        <td>Contact Person:</td>
                        <td> &nbsp; </td>
                        <td>{labels[1]}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>Phone: </td>
                        <td> &nbsp; </td>
                        <td>{labels[6]}</td>
                    </tr>
                    <tr>
                        <td>Company Name: </td>
                        <td> &nbsp; </td>
                        <td>{labels[2]}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>Date: </td>
                        <td> &nbsp; </td>
                        <td>{labels[7]}</td>
                    </tr>
                    <tr>
                        <td>Street: </td>
                        <td> &nbsp; </td>
                        <td>{labels[3]}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>Part Number: </td>
                        <td> &nbsp; </td>
                        <td>{labels[8]}</td>
                    </tr>
                    <tr>
                        <td>City: </td>
                        <td> &nbsp; </td>
                        <td>{labels[4]}</td>
                        <td> &nbsp; &nbsp; </td>
                        <td>Finish: </td>
                        <td> &nbsp; </td>
                        <td>{labels[9]}</td>
                    </tr>
                    <tr>
                        <td>State & Zip: </td>
                        <td> &nbsp; </td>
                        <td>{labels[5]}</td>
                    </tr>
                </tbody>
            </table>
            <b>Comment: &nbsp; </b> {labels[0]} <br/>
            <br/>
            <table>
                <tbody>
                    <tr>
                    <td>{x[o.Spring_Type].name}</td>
                    <td>=</td>
                    <td>{x[o.Spring_Type].value}</td>
                    <td>{x[o.Spring_Type].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{x[o.Material_Type].name}</td>
                    <td>=</td>
                    <td>{m_tab[x[o.Material_Type].value][mo.matnam]}</td>
                    <td>{x[o.Material_Type].units}</td>
                </tr>
                <tr>
                    <td>{p[o.Wire_Dia].name}</td>
                    <td>=</td>
                    <td>{p[o.Wire_Dia].value.toFixed(4)}</td>
                    <td>{p[o.Wire_Dia].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{x[o.ASTM_Fed_Spec].name}</td>
                    <td>=</td>
                    <td>{x[o.ASTM_Fed_Spec].value}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>{x[o.Mean_Dia].name}</td>
                    <td>=</td>
                    <td>{x[o.Mean_Dia].value.toFixed(3)}</td>
                    <td>{x[o.Mean_Dia].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{x[o.Tensile].name}</td>
                    <td>=</td>
                    <td>{x[o.Tensile].value.toFixed(0)}</td>
                    <td>{x[o.Tensile].units}</td>
                </tr>
                <tr>
                    <td>{x[o.Spring_Index].name}</td>
                    <td>=</td>
                    <td>{x[o.Spring_Index].value.toFixed(3)}</td>
                    <td>{x[o.Spring_Index].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{x[o.End_Type].name}</td>
                    <td>=</td>
                    <td>{et_tab[x[o.End_Type].value][0]}</td>
                </tr>
                <tr>
                    <td>{p[o.Coils_T].name}</td>
                    <td>=</td>
                    <td>{p[o.Coils_T].value.toFixed(3)}</td>
                    <td>{"Total " + p[o.Coils_T].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>Pitch</td>
                    <td>=</td>
                    <td>{pitch.toFixed(3)}</td>
                    <td>{p[o.L_Free].units}</td>
                </tr>
                <tr>
                    <td>{x[o.Coils_A].name}</td>
                    <td>=</td>
                    <td>{x[o.Coils_A].value.toFixed(3)}</td>
                    <td>{"Active " + x[o.Coils_A].units}</td>
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
                    <td>{p[o.L_Free].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{x[o.Weight].name}</td>
                    <td>=</td>
                    <td>{wgt1000.toFixed(3)}</td>
                    <td>{wgt1000_u}</td>
                </tr>
                <tr>
                    <td>Safe Load</td>
                    <td>=</td>
                    <td>{safe_load.toFixed(3)}</td>
                    <td>{safe_load_u}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{x[o.Rate].name}</td>
                    <td>=</td>
                    <td>{x[o.Rate].value.toFixed(3)}</td>
                    <td>{x[o.Rate].units}</td>
                </tr>
                <tr>
                    <td>Safe Travel</td>
                    <td>=</td>
                    <td>{safe_travel.toFixed(3)}</td>
                    <td>{p[o.L_Free].units}</td>
                    <td/>
                    <td> &nbsp; </td>
                    <td>{x[o.Cycle_Life].name}</td>
                    <td>=</td>
                    <td>{x[o.Cycle_Life].value.toFixed(0)}</td>
                    <td>{cycle_life_u}</td>
                </tr>
            </tbody>
        </table>
        <br/>
        <table>
            <thead>
                <tr>
                    <th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </th>
                    <th>Free &nbsp; &nbsp; &nbsp; </th>
                    <th>1st Load &nbsp;</th>
                    <th>2nd Load &nbsp; &nbsp;</th>
                    <th>Solid &nbsp;</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>Force</b></td>
                    <td>{(0.0).toFixed(2)}</td>
                    <td>{p[o.Force_1].value.toFixed(2)}</td>
                    <td>{p[o.Force_2].value.toFixed(2)}</td>
                    <td>{x[o.Force_Solid].value.toFixed(2)}</td>
                    <td>{p[o.Force_1].units}</td>
                </tr>
                <tr>
                    <td><b>Length</b></td>
                    <td>{p[o.L_Free].value.toFixed(3)}</td>
                    <td>{x[o.L_1].value.toFixed(3)}</td>
                    <td>{x[o.L_2].value.toFixed(3)}</td>
                    <td>{x[o.L_Solid].value.toFixed(3)}</td>
                    <td>{x[o.L_1].units}</td>
                </tr>
                <tr>
                    <td><b>Deflection</b></td>
                    <td>{(0.0).toFixed(3)}</td>
                    <td>{x[o.Deflect_1].value.toFixed(3)}</td>
                    <td>{x[o.Deflect_2].value.toFixed(3)}</td>
                    <td>{(p[o.L_Free].value - x[o.L_Solid].value).toFixed(3)}</td>
                    <td>{x[o.Deflect_2].units}</td>
                </tr>
                <tr>
                    <td><b>Outside Dia.</b></td>
                    <td>{p[o.OD_Free].value.toFixed(3)}</td>
                    <td>{od_1.toFixed(3)}</td>
                    <td>{od_2.toFixed(3)}</td>
                    <td>{od_solid.toFixed(3)}</td>
                    <td>{p[o.OD_Free].units}</td>
                </tr>
                <tr>
                    <td><b>Inside Dia.</b></td>
                    <td>{x[o.ID_Free].value.toFixed(3)}</td>
                    <td>{id_1.toFixed(3)}</td>
                    <td>{id_2.toFixed(3)}</td>
                    <td>{(od_solid - 2.0 * p[o.Wire_Dia].value).toFixed(3)}</td>
                    <td>{x[o.ID_Free].units}</td>
                </tr>
                <tr>
                    <td>w/o set &nbsp; kw = </td>
                    <td>{kw1.toFixed(3)}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td> ... <b>Stress</b></td>
                    <td></td>
                    <td>{x[o.Stress_1].value.toFixed(0)}</td>
                    <td>{x[o.Stress_2].value.toFixed(0)}</td>
                    <td>{x[o.Stress_Solid].value.toFixed(0)}</td>
                    <td>{x[o.Stress_1].units}</td>
                </tr>
                <tr>
                    <td> ... <b>% Tensile</b></td>
                    <td></td>
                    <td>{(x[o.Stress_1].value / dhat).toFixed(1)}</td>
                    <td>{(x[o.Stress_2].value / dhat).toFixed(1)}</td>
                    <td>{(x[o.Stress_Solid].value / dhat).toFixed(1)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <td> ... <b>Static F.S.</b></td>
                    <td></td>
                    <td>{fs_1.toFixed(2)}</td>
                    <td>{x[o.FS_2].value.toFixed(2)}</td>
                    <td>{x[o.FS_Solid].value.toFixed(2)}</td>
                    <td>{x[o.FS_Solid].units}</td>
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
                    <td>opt</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Data source: </td>
                    <td> &nbsp; </td>
                    <td>print </td>
                    <td> &nbsp; &nbsp; </td>
                    <td>sample </td>
                    <td>verbal &nbsp; &nbsp; </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Mandrel: </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; &nbsp; </td>
                    <td>Fits in: </td>
                    <td> &nbsp; </td>
                    <td>Works over:</td>
                </tr>
                <tr>
                    <td>Stress relieve</td>
                    <td>/HT: </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; &nbsp; </td>
                    <td>Squareness </td>
                    <td> (deg): </td>
                    <td> &nbsp; </td>
                </tr>
                <tr>
                    <td>Shot peen: </td>
                    <td> &nbsp; </td>
                    <td> yes </td>
                    <td> &nbsp; </td>
                    <td> no </td>
                    <td> &nbsp; &nbsp; </td>
                    <td> Operating temp: </td>
                </tr>
                <tr>
                    <td>Special notes</td>
                    <td>& tolerances: </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; &nbsp; </td>
                    <td> End use: </td>
                </tr>
            </tbody>
        </table>
        <hr/>
        Deflection at load point 2 is {x[o.PC_Avail_Deflect].value.toFixed(0)}% of total available deflection.<br />
        {pcadmsg}{pcadmsg !== undefined && <br />}
        {errmsg1}{errmsg1 !== undefined && <br />}
        {errmsg2}{errmsg2 !== undefined && <br />}
        {errmsg3}{errmsg}
        <hr/>
        &nbsp; &nbsp; &nbsp; approved for mfg.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
        approved for mfg.<br/>
        by _____________________ &nbsp; date _____ &nbsp; by ________________________ &nbsp; date _____
        <br/>
        </React.Fragment>
    );
    }
}
