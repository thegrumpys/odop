import React from 'react';
import * as o from './symbol_table_offsets';
import * as mo from '../mat_ips_offsets';

export function getReportNames() {
    // Note: report names must match cases in switch statement below
//    console.log('In Extension getReportNames');
    return [
      '1 (mini)',
      '2 (other)',
      '3 (maxi)'
    ];
}

export function report(report_name, prefs, st, labels) {
//    console.log('In Extension report report_name=',report_name,' prefs=',prefs,' st=',st,' labels=',labels);
    
    var kc, ks, s_f, len_lbl, 
    safe_load_u, wgt1000_u, cycle_life_u, 
    errmsg, hits, warnmsg,
    safe_travel, pc_avail_deflect,
    sq1, sq2, sb, wd3,
    dhat, wire_len_a, wire_len_t, safe_load,
    od_1, od_2, id_1, id_2, od_maxsafe, id_maxsafe,
    wgt1000, fs_1,  
    kw1;
    var matTypeValue, astmFedSpecValue;
    var m_tab;
    
    const Close_Wound_Coil = 5;

    /*  Bring in material properties table  */
    if (st[o.Material_File].value === "mat_SI.json") m_tab = require('../mat_SI.json');
        else m_tab = require('../mat_ips.json');
    var et_tab = require('./endtypes.json');

    hits = 0;
    errmsg = "";
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
    
    len_lbl = "Wire Length";

    sq1 = st[o.Wire_Dia].value * st[o.Coils_T].value;
    sq2 = st[o.Coils_T].value * Math.PI * st[o.Mean_Dia].value;
    wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2)
        + Math.PI * (st[o.End_ID].value +  st[o.Wire_Dia].value
        + st[o.Extended_End_ID].value +  st[o.Wire_Dia].value)
        + st[o.End_Extension].value;

    wgt1000 = 1000.0 * st[o.Weight].value;
    wgt1000_u = "/1000"

//    note that value of wire_len_a is actually square of body wire length
    wire_len_a = sq1 * sq1 + sq2 * sq2;
    
    dhat = def_dia(sq1 + st[o.Deflect_1].value);
    od_1 = dhat + st[o.Wire_Dia].value;
    id_1 = dhat - st[o.Wire_Dia].value;
    
    dhat = def_dia(sq1 + st[o.Deflect_2].value);
    od_2 = dhat + st[o.Wire_Dia].value;
    id_2 = dhat - st[o.Wire_Dia].value;

    function def_dia(def_len) {
        /* 
         * Calculates mean diameter of deflected spring. 
         * intermediate dia. calcs. assume no wire stretch
         * note that value of wire_len_a is actually square of active wire length
         */
        return(Math.sqrt(wire_len_a - def_len * def_len) / (st[o.Coils_T].value * Math.PI));
    }

    kc = (4.0 * st[o.Spring_Index].value - 1.0) / (4.0 * st[o.Spring_Index].value - 4.0);
    ks = kc + 0.615 / st[o.Spring_Index].value;
    wd3 = st[o.Wire_Dia].value * st[o.Wire_Dia].value * st[o.Wire_Dia].value;
    s_f = ks * 8.0 * st[o.Mean_Dia].value / (Math.PI * wd3);

    kw1 = ks;
    
    if (st[o.Stress_1] !== 0.0) fs_1 = Math.abs(st[o.Stress_Lim_Stat].value / st[o.Stress_1].value);
    else fs_1 = 0.0;

    safe_load = st[o.Stress_Lim_Stat].value / s_f;
    safe_load_u = st[o.Force_2].units;

    /*
     * pitch and helix angle are not used for extension spring
     * Angle across coil cross section
     * hlx_ang=atan(0.5*pitch/mean_dia)*(180.0/pi);
     */

    cycle_life_u = st[o.Cycle_Life].units + " (est)";

    /*  ref. pg 51 Associated Spring Design Handbook  */
    /*  assume C2=4; i.e. R2=twice wire dia       */
    sb = 1.25 * (8.0 * st[o.Mean_Dia].value * st[o.Force_2].value) / (Math.PI * wd3);

    safe_travel = (safe_load - st[o.Initial_Tension].value) / st[o.Rate].value;
    pc_avail_deflect = 100.0 * st[o.Deflect_2].value / safe_travel;
    
    dhat = def_dia(sq1 + safe_travel);
    od_maxsafe = dhat + st[o.Wire_Dia].value;
    id_maxsafe = dhat - st[o.Wire_Dia].value;

    dhat = st[o.Tensile].value / 100.0;

    if (st[o.End_Type].value !== Close_Wound_Coil && (sb > st[o.Stress_Lim_Endur].value || st[o.Stress_Hook].value > st[o.Stress_Lim_Bend].value)) {
        warnmsg = "Fatigue failure at end is possible.";
    }
    else warnmsg = "";
    
//    console.log("st[o.Prop_Calc_Method].value = ", st[o.Prop_Calc_Method].value);
    if (st[o.Prop_Calc_Method].value === 1){
        matTypeValue = m_tab[st[o.Material_Type].value][mo.matnam];
        astmFedSpecValue = st[o.ASTM_Fed_Spec].value;
    } else {
        matTypeValue = "User_Specified";
        astmFedSpecValue = "N/A";
    }
//    console.log("matTypeValue, astmFedSpecValue = ", matTypeValue, astmFedSpecValue);
    
    switch(report_name) {
    case "1 (mini)":
    default:
//        console.log("In Extension report 1 (mini)");
        return (
            <React.Fragment>
                <h4>ODOP:Spring &nbsp; Extension Spring Report</h4><br />
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
                            <td className="text-left" colSpan="2">{matTypeValue}</td>
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
                            <td><b>Initial</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.L_Free].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(0.0).toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Initial_Tension].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.OD_Free].value.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.ID_Free].value.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Stress_Initial].value.toFixed(0)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(st[o.Stress_Lim_Stat].value / st[o.Stress_Initial].value).toFixed(2)}</td>
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
                            <td>{fs_1.toFixed(2)}</td>
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
                            <td>{st[o.FS_2].value.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>MaxSafe</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(st[o.L_Free].value + safe_travel).toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{safe_travel.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{safe_load.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{od_maxsafe.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{id_maxsafe.toFixed(4)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Stress_Lim_Stat].value.toFixed(0)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(1.0).toFixed(2)}</td>
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
                            <td>{st[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{st[o.Cycle_Life].value.toFixed(0)}</td>
                            <td>{cycle_life_u}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>({st[o.Cycle_Life].name}</td>
                            <td>&nbsp;</td>
                            <td className="text-left" colSpan="3">applies to body coils only.)</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                Deflection at load point 2 is {pc_avail_deflect.toFixed(0)}% of total safe deflection.<br />
                <br />
                |&lt;------------------------------- {st[o.L_Free].name} (w/ends) = {st[o.L_Free].value.toFixed(3)} -------------------------------&gt;|<br />
                |&lt;--- {st[o.L_End].name} ---&gt;|&lt;--- {st[o.L_Body].name} ---&gt;|&lt;--- {st[o.End_Extension].name} ---&gt;|&lt;--- {st[o.L_Extended_End].name} ---&gt;|<br />
                &nbsp; &nbsp; &nbsp; &nbsp; {st[o.L_End].value.toFixed(3)} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                &nbsp; &nbsp; &nbsp; {st[o.L_Body].value.toFixed(3)} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {st[o.End_Extension].value.toFixed(3)} &nbsp; &nbsp; &nbsp; &nbsp; 
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {st[o.L_Extended_End].value.toFixed(3)} 
                <br /> &nbsp;
            </React.Fragment>
        );
    case "2 (other)":
//        console.log("In Extension report 2 (other)");
        return (
            <React.Fragment>
                <h4>ODOP:Spring &nbsp; Extension Spring Report</h4>
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
                                <td className="text-left" colSpan="2">{matTypeValue}</td>
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
                                <td>{st[o.Tensile].value.toFixed(0)}</td>
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
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -- kw1 = {kw1.toFixed(3)} --
                    <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>&nbsp; Length </th>
                            <th>&nbsp;Deflect</th>
                            <th>&nbsp;Force</th>
                            <td> &nbsp; &nbsp; </td>
                            <th> &nbsp; </th>
                            <th> &nbsp; </th>
                            <td> &nbsp; &nbsp; </td>
                            <th>&nbsp;Stress</th>
                            <th>&nbsp; %TS </th>
                            <td> &nbsp; &nbsp; </td>
                            <th>Static FS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Initial</b></td>
                            <td>{st[o.L_Free].value.toFixed(3)}</td>
                            <td>{(0.0).toFixed(4)}</td>
                            <td>{st[o.Initial_Tension].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Stress_Initial].value.toFixed(0)}</td>
                            <td>{(st[o.Stress_Initial].value / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(st[o.Stress_Lim_Stat].value / st[o.Stress_Initial].value).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>1</b></td>
                            <td>{st[o.L_1].value.toFixed(3)}</td>
                            <td>{st[o.Deflect_1].value.toFixed(4)}</td>
                            <td>{st[o.Force_1].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Stress_1].value.toFixed(0)}</td>
                            <td>{(st[o.Stress_1].value / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{fs_1.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>2</b></td>
                            <td>{st[o.L_2].value.toFixed(3)}</td>
                            <td>{st[o.Deflect_2].value.toFixed(4)}</td>
                            <td>{st[o.Force_2].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Stress_2].value.toFixed(0)}</td>
                            <td>{(st[o.Stress_2].value / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.FS_2].value.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><b>MaxSafe</b></td>
                            <td>{(st[o.L_Free].value + safe_travel).toFixed(3)}</td>
                            <td>{safe_travel.toFixed(4)}</td>
                            <td>{safe_load.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Stress_Lim_Stat].value.toFixed(0)}</td>
                            <td>{(st[o.Stress_Lim_Stat].value / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(1.0).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.FS_CycleLife].name}</td>
                            <td>=</td>
                            <td>{st[o.FS_CycleLife].value.toFixed(3)}</td>
                            <td className="text-left">&nbsp;{st[o.FS_CycleLife].units}</td>
                        </tr>
                        <tr>
                            <td>{st[o.Stress_Init_Lo].name}</td>
                            <td>=</td>
                            <td>{st[o.Stress_Init_Lo].value.toFixed(0)}</td>
                            <td>{st[o.Stress_Init_Lo].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{st[o.Cycle_Life].value.toFixed(0)}</td>
                            <td className="text-left">&nbsp;{cycle_life_u}</td>
                        </tr>
                        <tr>
                            <td>{st[o.Stress_Init_Hi].name}</td>
                            <td>=</td>
                            <td>{st[o.Stress_Init_Hi].value.toFixed(0)}</td>
                            <td>{st[o.Stress_Init_Hi].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>({st[o.Cycle_Life].name}</td>
                            <td className="text-left" colSpan="3">&nbsp; applies to body coils only.)</td>
                        </tr>
                        <tr>
                            <td> &nbsp; </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Stress_Lim_Stat].name}</td>
                            <td>=</td>
                            <td>{st[o.Stress_Lim_Stat].value.toFixed(0)}</td>
                            <td className="text-left">&nbsp;{st[o.Stress_Lim_Stat].units}</td>
                        </tr>
                        <tr>
                            <td>{st[o.Stress_Lim_Bend].name}</td>
                            <td>=</td>
                            <td>{st[o.Stress_Lim_Bend].value.toFixed(0)}</td>
                            <td className="text-left">&nbsp;{st[o.Stress_Lim_Bend].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Stress_Lim_Endur].name}</td>
                            <td>=</td>
                            <td>{st[o.Stress_Lim_Endur].value.toFixed(0)}</td>
                            <td className="text-left">&nbsp;{st[o.Stress_Lim_Endur].units}</td>
                        </tr>
                        <tr>
                            <td>Bending Str @End (Sa)</td>
                            <td>=</td>
                            <td>{st[o.Stress_Hook].value.toFixed(0)}</td>
                            <td className="text-left">&nbsp;{st[o.Stress_Hook].units}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>Torsion Str @End (Sb)</td>
                            <td>=</td>
                            <td>{sb.toFixed(0)}</td>
                            <td className="text-left">&nbsp;{st[o.Stress_Hook].units}</td>
                        </tr>
                    </tbody>
                </table>
                (Torsion value assumes a vertical bend radius (R2) equal twice wire diameter.)<br />
                {warnmsg}
                <br /> &nbsp;
            </React.Fragment>
        );
    case "3 (maxi)":
//        console.log("In Extension report 3 (maxi)");
        return (
            <React.Fragment>
                <h4>ODOP:Spring &nbsp; Extension Spring Report</h4>
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
                            <td className="text-left" colSpan="2">{st[o.Spring_Type].value}</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Material_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{matTypeValue}</td>
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
                            <td className="text-left" colSpan="2">{astmFedSpecValue}</td>
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
                            <td>{st[o.Tensile].value.toFixed(0)}</td>
                            <td className="text-left">{st[o.Tensile].units}</td>
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
                            <td>{st[o.End_Extension].name}</td>
                            <td>=</td>
                            <td>{st[o.End_Extension].value.toFixed(3)}</td>
                            <td className="text-left">{st[o.End_Extension].units}</td>
                        </tr>
                        <tr>
                            <td>{st[o.Coils_A].name}</td>
                            <td>=</td>
                            <td>{st[o.Coils_A].value.toFixed(3)}</td>
                            <td>{"active " + st[o.Coils_A].units}</td>
                            <td/>
                            <td> &nbsp; </td>
                            <td>{st[o.Rate].name}</td>
                            <td>=</td>
                            <td>{st[o.Rate].value.toFixed(3)}</td>
                            <td className="text-left">{st[o.Rate].units}</td>
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
                            <td className="text-left">{st[o.Weight].units}{wgt1000_u}</td>
                        </tr>
                        <tr>
                            <td>Safe Load</td>
                            <td>=</td>
                            <td>{safe_load.toFixed(3)}</td>
                            <td>{safe_load_u}</td>
                            <td/>
                            <td> &nbsp; </td>
                            <td>{st[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{st[o.Cycle_Life].value.toFixed(0)}</td>
                            <td className="text-left" colSpan="4">{cycle_life_u}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Safe Travel</td>
                            <td>=</td>
                            <td>{safe_travel.toFixed(3)}</td>
                            <td>{st[o.L_Free].units}</td>
                            <td/>
                            <td> &nbsp; </td>
                            <td>({st[o.Cycle_Life].name}</td>
                            <td className="text-left" colSpan="3">&nbsp; applies to body coils only.)</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th/>
                            <th/>
                            <th>Initial</th>
                            <th>&nbsp; 1st Load</th>
                            <th>&nbsp; 2nd Load</th>
                            <td></td>
                            <th>&nbsp;MaxSafe</th>
                            <th></th>
                            <th> &nbsp; &nbsp; </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Force</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Initial_Tension].value.toFixed(2)}</td>
                            <td>{st[o.Force_1].value.toFixed(2)}</td>
                            <td>{st[o.Force_2].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{safe_load.toFixed(2)}</td>
                            <td className="text-left" colSpan="2">&nbsp;{st[o.Force_1].units}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td><b>Length</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.L_Free].value.toFixed(3)}</td>
                            <td>{st[o.L_1].value.toFixed(3)}</td>
                            <td>{st[o.L_2].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(st[o.L_Free].value + safe_travel).toFixed(3)}</td>
                            <td>&nbsp;{st[o.L_Free].units}</td>
                        </tr>
                        <tr>
                            <td><b>Deflection</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(0.0).toFixed(3)}</td>
                            <td>{st[o.Deflect_1].value.toFixed(3)}</td>
                            <td>{st[o.Deflect_2].value.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{safe_travel.toFixed(3)}</td>
                            <td>&nbsp;{st[o.Deflect_2].units}</td>
                        </tr>
                        <tr>
                            <td><b>Outside Dia.</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.OD_Free].value.toFixed(3)}</td>
                            <td>{od_1.toFixed(3)}</td>
                            <td>{od_2.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{od_maxsafe.toFixed(3)}</td>
                            <td>&nbsp;{st[o.OD_Free].units}</td>
                        </tr>
                        <tr>
                            <td><b>Inside Dia.</b></td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.ID_Free].value.toFixed(3)}</td>
                            <td>{id_1.toFixed(3)}</td>
                            <td>{id_2.toFixed(3)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{id_maxsafe.toFixed(3)}</td>
                            <td>&nbsp;{st[o.ID_Free].units}</td>
                        </tr>
                        <tr>
                            <td>kw = </td>
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
                            <td>{st[o.Stress_Initial].value.toFixed(0)}</td>
                            <td>{st[o.Stress_1].value.toFixed(0)}</td>
                            <td>{st[o.Stress_2].value.toFixed(0)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{st[o.Stress_Lim_Stat].value.toFixed(0)}</td>
                            <td>{st[o.Stress_1].units}</td>
                        </tr>
                        <tr>
                            <td> ... <b>% Tensile</b></td>
                            <td></td>
                            <td>{(100.0 * st[o.Stress_Initial].value / st[o.Tensile].value).toFixed(1)}</td>
                            <td>{(st[o.Stress_1].value / dhat).toFixed(1)}</td>
                            <td>{(st[o.Stress_2].value / dhat).toFixed(1)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(st[o.Stress_Lim_Stat].value / dhat).toFixed(1)}</td>
                            <td>% &nbsp; &nbsp; </td>
                        </tr>
                        <tr>
                            <td> ... <b>Static F.S.</b></td>
                            <td></td>
                            <td>{(st[o.Stress_Lim_Stat].value / st[o.Stress_Initial].value).toFixed(2)}</td>
                            <td>{fs_1.toFixed(2)}</td>
                            <td>{st[o.FS_2].value.toFixed(2)}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td>{(1.0).toFixed(2)}</td>
                            <td>{st[o.FS_2].units}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                Deflection at load point 2 is {pc_avail_deflect.toFixed(0)}% of total safe deflection.<br />
                {warnmsg}{warnmsg !== "" && <br />}
                <br />
                |&lt;------------------------------- {st[o.L_Free].name} (w/ends) = {st[o.L_Free].value.toFixed(3)} -------------------------------&gt;|<br />
                |&lt;--- {st[o.L_End].name} ---&gt;|&lt;--- {st[o.L_Body].name} ---&gt;|&lt;--- {st[o.End_Extension].name} ---&gt;|&lt;--- {st[o.L_Extended_End].name} ---&gt;|<br />
                &nbsp; &nbsp; &nbsp; &nbsp; {st[o.L_End].value.toFixed(3)} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                &nbsp; &nbsp; &nbsp; {st[o.L_Body].value.toFixed(3)} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {st[o.End_Extension].value.toFixed(3)} &nbsp; &nbsp; &nbsp; &nbsp; 
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {st[o.L_Extended_End].value.toFixed(3)} 
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
                            <td className="text-left">/ HT: </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> &nbsp; </td>
                            <td></td>
                            <td className="text-left"></td>
                        </tr>
                        <tr>
                            <td>Relative loop </td>
                            <td className="text-left">&nbsp;position: </td>
                            <td></td>
                            <td> &nbsp; </td>
                            <td></td>
                            <td> &nbsp; &nbsp; </td>
                            <td> &nbsp; </td>
                            <td> Gaps: </td>
                        </tr>
                        <tr>
                            <td>Relative loop </td>
                            <td>&nbsp;tolerance: </td>
                            <td></td>
                            <td> &nbsp; </td>
                            <td></td>
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
                        <tr>
                            <td> &nbsp; </td>
                        </tr>
                    </tbody>
                </table>
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
                        <td> &nbsp; &nbsp; </td>
                        <td> by _______________________ &nbsp; </td>
                        <td> &nbsp; date _______ &nbsp; </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
