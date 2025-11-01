import { useSelector } from "react-redux";
import * as o from './symbol_table_offsets';
import * as mo from '../mat_offsets';
import { getAlertsBySeverity } from '../../../components/Alerts';
import ReportBaseContext from './ReportBaseContext';

export default function ReportBase(props) {
//  console.log('ReportBase - Mounting...');
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_smallnum = useSelector((state) => state.model.system_controls.smallnum.value);

  const def_dia = (def_len) => {
    /*  calculates mean diameter of deflected spring.  */
//    console.log('Reportdef_dia this=',this);
    return Math.sqrt(base.wire_len_a - def_len * def_len) / (model_symbol_table[o.Coils_A].value * Math.PI);
  }

  var base = {}; // empty object
  
  /*  Bring in material properties table  */
  if (model_symbol_table[o.Material_File].value === "mat_metric.json")
    base.m_tab = require('../mat_metric.json');
  else
    base.m_tab = require('../mat_us.json');
  base.et_tab = require('./endtypes.json');

  /*  Bring in life target table  */
  base.lifetarg = require('./lifetarget.json');

  base.hits = getAlertsBySeverity().length;
  base.errmsg = "";
  base.startpntmsg = "Alert details are available via the Alert button on the main page of Advanced and Calculator Views.";

  base.len_lbl = "Wire Length";

  switch (model_symbol_table[o.End_Type].value) {
    case 4:        //  Closed & Ground
      base.pitch = (model_symbol_table[o.L_Free].value - 2.0 * model_symbol_table[o.Wire_Dia].value) / model_symbol_table[o.Coils_A].value;
      break;
    case 3:        //  Closed
      base.pitch = (model_symbol_table[o.L_Free].value - 3.0 * model_symbol_table[o.Wire_Dia].value) / model_symbol_table[o.Coils_A].value;
      break;
    case 2:        //  Open & Ground
      base.pitch = model_symbol_table[o.L_Free].value / model_symbol_table[o.Coils_T].value;
      break;
    case 1:        //  Open
      base.pitch = (model_symbol_table[o.L_Free].value - model_symbol_table[o.Wire_Dia].value) / model_symbol_table[o.Coils_A].value;
      break;
    case 5:        //  Tapered Closed & Ground
      base.pitch = (model_symbol_table[o.L_Free].value - 1.5 * model_symbol_table[o.Wire_Dia].value) / model_symbol_table[o.Coils_A].value;
      base.len_lbl = "Bar cut len.";
      break;
    case 6:        //  Pig-tail
      base.pitch = (model_symbol_table[o.L_Free].value - 2.0 * model_symbol_table[o.Wire_Dia].value) / model_symbol_table[o.Coils_A].value;
      break;
    default:        //  User Specified
      base.pitch = (model_symbol_table[o.L_Free].value - (model_symbol_table[o.Inactive_Coils].value + 1.0) * model_symbol_table[o.Wire_Dia].value) / model_symbol_table[o.Coils_A].value;
  }

  var sq1 = model_symbol_table[o.L_Free].value;
  var sq2 = model_symbol_table[o.Coils_T].value * Math.PI * model_symbol_table[o.Mean_Dia].value;
  base.wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2);
  if (model_symbol_table[o.End_Type].value === 5)  /*  calculate developed length of tapered ends based on 2 ends * pi * wire diameter * 0.625 */
    base.wire_len_t = base.wire_len_t - 3.926 * model_symbol_table[o.Wire_Dia].value;

  base.wgt1000 = 1000.0 * model_symbol_table[o.Weight].value;

  /*
   * intermediate dia. calcs. assume no wire stretch
   * note that value of base.wire_len_a is actually square of active wire length
   */
  sq1 = model_symbol_table[o.L_Free].value;
  sq2 = model_symbol_table[o.Coils_A].value * Math.PI * model_symbol_table[o.Mean_Dia].value;
  base.wire_len_a = sq1 * sq1 + sq2 * sq2;

  base.dhat = def_dia(model_symbol_table[o.L_1].value);
  base.od_1 = base.dhat + model_symbol_table[o.Wire_Dia].value;
  base.id_1 = base.dhat - model_symbol_table[o.Wire_Dia].value;

  base.dhat = def_dia(model_symbol_table[o.L_2].value);
  base.od_2 = base.dhat + model_symbol_table[o.Wire_Dia].value;
  base.id_2 = base.dhat - model_symbol_table[o.Wire_Dia].value;

  base.dhat = def_dia(model_symbol_table[o.L_Solid].value)
  base.od_solid = base.dhat + model_symbol_table[o.Wire_Dia].value;

  /*
   * Alternative deflected diameter calculation formula:
   * From: https://www.acxesspring.com/spring-diameter-change.html
   * From: http://springipedia.com/compression-general-design.asp
   */

  base.dhat = model_symbol_table[o.Tensile].value / 100.0;
  var kc = (4.0 * model_symbol_table[o.Spring_Index].value - 1.0) / (4.0 * model_symbol_table[o.Spring_Index].value - 4.0);
  var ks = kc + 0.615 / model_symbol_table[o.Spring_Index].value;
  var s_f = ks * 8.0 * model_symbol_table[o.Mean_Dia].value / (Math.PI * model_symbol_table[o.Wire_Dia].value * model_symbol_table[o.Wire_Dia].value * model_symbol_table[o.Wire_Dia].value);

  base.kw1 = ks;
  base.kw2 = 1.0 + 0.5 / model_symbol_table[o.Spring_Index].value;
  var temp = base.kw2 * s_f / ks;
  base.kw2str1 = temp * model_symbol_table[o.Force_1].value;
  base.kw2str2 = temp * model_symbol_table[o.Force_2].value;
  base.kw2strs = temp * model_symbol_table[o.Force_Solid].value;

  if (model_symbol_table[o.Stress_1].value !== 0.0)
    base.fs_1 = Math.abs(model_symbol_table[o.Stress_Lim_Stat].value / model_symbol_table[o.Stress_1].value);
  else
    base.fs_1 = Number.POSITIVE_INFINITY;

  /*  unused
   *  temp = 0.7 * model_symbol_table[o.Tensile].value;  // allowable stress for preset
   *  if (base.kw2str1 !== 0.0) kw2fs_1 = Math.abs(temp / base.kw2str1);
   *  else kw2fs_1 = 0.0;
   *  if (base.kw2str2 !== 0.0) kw2fs_2 = temp / base.kw2str2;
   *  else base.kw2str2 = 0.0;
   *  if (base.kw2strs !== 0.0) kw2fs_s = temp / base.kw2strs;
   *  else kw2fs_s = 0.0;
   *  unused
   */

  base.safe_load = model_symbol_table[o.Stress_Lim_Stat].value / s_f;
  if (base.safe_load > model_symbol_table[o.Force_Solid].value)
    base.safe_load_u = "(Solid)";
  else
    base.safe_load_u = model_symbol_table[o.Force_2].units;
  base.safe_load = Math.min(base.safe_load, model_symbol_table[o.Force_Solid].value);
  /*
   * Angle across coil cross section
   * base.hlx_ang=atan(0.5*base.pitch/mean_dia)*(180.0/pi);
   */
  if (base.pitch > 0.0)
    base.hlx_ang = Math.atan(base.pitch / (Math.PI * model_symbol_table[o.Mean_Dia].value)) * (180.0 / Math.PI);
  else
    base.hlx_ang = 0.0;

  base.cycle_life_u = model_symbol_table[o.Cycle_Life].units + " (est.)";

  base.pcadmsg = undefined;
  if (model_symbol_table[o.PC_Avail_Deflect].value > 80.0) {
    base.pcadmsg = "Coil to coil contact may cause inaccuracy in point 2.";
  }

  temp = model_symbol_table[o.Deflect_2].value / model_symbol_table[o.L_Free].value;
  sq1 = 1.4 * model_symbol_table[o.Slenderness].value - 4.0;
  base.errmsg1 = undefined;
  base.errmsg0 = undefined;
  if (sq1 > model_smallnum) {
    /* structured to avoid div by 0 */
    if (temp > 0.76 / sq1) {
      base.errmsg1 = "Given a deflection ratio of " + temp.toFixed(3) +
        "  and a Slenderness ratio of " + model_symbol_table[o.Slenderness].value.toFixed(1) + ", " +
        "the spring will tend to buckle with fixed/free  ends.";
      sq1 = 2.0 * model_symbol_table[o.Slenderness].value - 8.0;
      if (sq1 <= 0.0 || temp < 1.6 / sq1)
        base.errmsg0 = " not";
      else
        base.errmsg0 = "";
      base.errmsg0 = "The spring will" + base.errmsg0 + " tend to buckle with fixed/fixed ends.";
    }
  }

  var def_max = model_symbol_table[o.L_Free].value - model_symbol_table[o.L_Solid].value;
  base.safe_travel = Math.min(base.safe_load / model_symbol_table[o.Rate].value, def_max);
//        console.log('model_symbol_table[o.Prop_Calc_Method].value = ', model_symbol_table[o.Prop_Calc_Method].value);
  if (model_symbol_table[o.Prop_Calc_Method].value === 1 && model_symbol_table[o.Material_Type].value !== 0) {
    base.matTypeValue = base.m_tab[model_symbol_table[o.Material_Type].value][mo.matnam];
    base.astmFedSpecValue = model_symbol_table[o.ASTM_Fed_Spec].value;
    base.clWarnString = "";
  } else {
    base.matTypeValue = "User_Specified";
    base.astmFedSpecValue = "N/A";
    base.clWarnString = "Cycle_Life is not computed for User_Specified materials.";
  }
//        console.log('base.matTypeValue, base.astmFedSpecValue = ', base.matTypeValue, base.astmFedSpecValue);

  base.lifeTargValue = base.lifetarg[model_symbol_table[o.Life_Category].value];
  if (model_symbol_table[o.Life_Category].value <= 4) {
    base.peenValue = "Not peened";
  } else {
    base.peenValue = "Shot peened";
  }

  base.energy_1 = 0.5 * model_symbol_table[o.Rate].value * model_symbol_table[o.Deflect_1].value * model_symbol_table[o.Deflect_1].value;
  base.energy_2 = 0.5 * model_symbol_table[o.Rate].value * model_symbol_table[o.Deflect_2].value * model_symbol_table[o.Deflect_2].value;
  var DefSolid = (model_symbol_table[o.L_Free].value - model_symbol_table[o.L_Solid].value);
  base.energy_S = 0.5 * model_symbol_table[o.Rate].value * DefSolid * DefSolid;
//  console.log('ReportBase','base=',base);

  return <ReportBaseContext.Provider value={base}>
    { props.children }
  </ReportBaseContext.Provider>;
}
