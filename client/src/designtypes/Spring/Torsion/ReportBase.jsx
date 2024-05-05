import { useState, useEffect, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as o from './symbol_table_offsets';
import * as mo from '../mat_offsets';
import { getAlertsBySeverity } from '../../../components/Alerts';
import ReportBaseContext from './ReportBaseContext';

export default function ReportBase(props) {
//  console.log("ReportBase - Mounting...");
  const symbol_table = useSelector((state) => state.modelSlice.model.symbol_table);

  const def_dia_t = (def) => {
    //      return((mean_dia*coils_a)/(coils_a+def/deg_per_turn));
    return (symbol_table[o.Mean_Dia].value * symbol_table[o.Coils_A].value) / (symbol_table[o.Coils_A].value + def / 360.0);
  }

  var base = {}; // empty object

  /*  Bring in material properties table  */
  if (symbol_table[o.Material_File].value === "mat_metric.json")
    base.m_tab = require('../mat_metric.json');
  else
    base.m_tab = require('../mat_us.json');
  base.et_tab = require('./endtypes.json');

  /*  Bring in life target table  */
  base.lifetarg = require('./lifetarget.json');

  /*  Bring in heat treat table  */
  base.heattreatment = require('./heattreat.json');

  base.hits = getAlertsBySeverity().length;
  base.errmsg = "";
  base.startpntmsg = "Alert details are available via the Alert button on the main page of Advanced and Calculator Views.";

  base.len_lbl = "Wire Length";

  switch (symbol_table[o.End_Type].value) {
    case 1:        //  Tangent   base.pitch=(l_body-wire_dia)/coils_t
      base.pitch = (symbol_table[o.L_Body].value - symbol_table[o.Wire_Dia].value) / symbol_table[o.Coils_T].value;
      break;
    case 3:        //  Future hot wound end type ?
      base.pitch = 0.0;
      base.len_lbl = "Bar cut len.";
      break;
    default:        //  User Specified
      base.pitch = 0.0;
  }

  var sq1 = symbol_table[o.L_Body].value;
  var sq2 = symbol_table[o.Coils_T].value * Math.PI * symbol_table[o.Mean_Dia].value;
  base.wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2) + symbol_table[o.Xlen_1].value + symbol_table[o.Xlen_2].value;

  base.wgt1000 = 1000.0 * symbol_table[o.Weight].value;

  /*
   *  calculates mean diameter of deflected torsion spring.
   *  intermediate dia. calcs. assume no wire stretch
   */

  base.dhat = def_dia_t(symbol_table[o.Deflect_1].value);
  base.od_1 = base.dhat + symbol_table[o.Wire_Dia].value;
  base.id_1 = base.dhat - symbol_table[o.Wire_Dia].value;

  base.dhat = def_dia_t(symbol_table[o.Deflect_2].value);
  base.od_2 = base.dhat + symbol_table[o.Wire_Dia].value;
  base.id_2 = base.dhat - symbol_table[o.Wire_Dia].value;

  base.dhat = symbol_table[o.Tensile].value / 100.0;

  if (symbol_table[o.Heat_Treat].value === 2) {     //  Stress Relieve
    base.kb = (4.0 * symbol_table[o.Spring_Index].value - 1.0) / (4.0 * symbol_table[o.Spring_Index].value - 4.0);
  }
  else {                          //  No Stress Relieve
    base.kb = 1.0;
  }
//  console.log("symbol_table[o.Heat_Treat].value =", symbol_table[o.Heat_Treat].value);
//  console.log("base.kb = ", base.kb);

  var s_f = 32.0 * base.kb / (Math.PI * symbol_table[o.Wire_Dia].value * symbol_table[o.Wire_Dia].value * symbol_table[o.Wire_Dia].value);

  //        if stress_1 ^= 0.0 then base.fs_1=abs(str_lim_bnd_stat/stress_1);
  //        else base.fs_1=0.0;
  //        base.safe_load=str_lim_bnd_stat/s_f;

  if (symbol_table[o.Stress_1].value !== 0.0) {
    base.fs_1 = Math.abs(symbol_table[o.Stress_Lim_Bnd_Stat].value / symbol_table[o.Stress_1].value);
  }
  else {
    base.fs_1 = Number.POSITIVE_INFINITY;
  }
  base.safe_load = symbol_table[o.Stress_Lim_Bnd_Stat].value / s_f;
  base.safe_load_u = symbol_table[o.M_2].units;


  //        base.def_max=base.safe_load/rate;
  //           ctp1=coils_t+1.0;
  //        base.l_max = max(l_body, wire_dia*(ctp1+base.def_max/deg_per_turn) );
  //           temp=def_dia_t(base.def_max);
  //        base.od_max=temp+wire_dia;
  //        id_max=temp-wire_dia;

  base.cycle_life_u = symbol_table[o.Cycle_Life].units + " (est.)";

  base.def_max = base.safe_load / symbol_table[o.Rate].value;
  var ctp1 = symbol_table[o.Coils_T].value + 1.0;
  base.l_max = Math.max(symbol_table[o.L_Body].value, symbol_table[o.Wire_Dia].value * (ctp1 + base.def_max / 360.0));
  var temp = def_dia_t(base.def_max);
  base.od_max = temp + symbol_table[o.Wire_Dia].value;

  /*
   * Angle across coil cross section
   * base.hlx_ang=atan(0.5*base.pitch/mean_dia)*(180.0/pi);
   */
  if (base.pitch > 0.0)
    base.hlx_ang = Math.atan(base.pitch / (Math.PI * symbol_table[o.Mean_Dia].value)) * (180.0 / Math.PI);
  else
    base.hlx_ang = 0.0;

  base.safe_travel = base.def_max;
//        console.log("symbol_table[o.Prop_Calc_Method].value = ", symbol_table[o.Prop_Calc_Method].value);
  if (symbol_table[o.Prop_Calc_Method].value === 1) {
    base.matTypeValue = base.m_tab[symbol_table[o.Material_Type].value][mo.matnam];
    base.astmFedSpecValue = symbol_table[o.ASTM_Fed_Spec].value;
    base.clWarnString = "";
  } else {
    base.matTypeValue = "User_Specified";
    base.astmFedSpecValue = "N/A";
    base.clWarnString = "Cycle_Life is not computed for User_Specified materials.";
  }
//        console.log("base.matTypeValue, base.astmFedSpecValue = ", base.matTypeValue, base.astmFedSpecValue);

  base.lifeTargValue = base.lifetarg[symbol_table[o.Life_Category].value];
  if (symbol_table[o.Life_Category].value <= 4) {
    base.peenValue = "Not peened";
  } else {
    base.peenValue = "Shot peened";
  }

  base.heattreatValue = base.heattreatment[symbol_table[o.Heat_Treat].value];

  const Deg2Rad = 2.0 * Math.PI / 360.0;
  base.RateInRad = symbol_table[o.Rate].value / Deg2Rad;
  base.Def1InRad = symbol_table[o.Deflect_1].value * Deg2Rad;
  base.Def2InRad = symbol_table[o.Deflect_2].value * Deg2Rad;
  base.DefMSInRad = base.def_max * Deg2Rad;
  base.energy_1 = 0.5 * base.RateInRad * base.Def1InRad * base.Def1InRad;
  base.energy_2 = 0.5 * base.RateInRad * base.Def2InRad * base.Def2InRad;
  base.energy_MS = 0.5 * base.RateInRad * base.DefMSInRad * base.DefMSInRad;
//  console.log('ReportBase','base=',base);

  return <ReportBaseContext.Provider value={base}>
    {props.children}
  </ReportBaseContext.Provider>;
}
