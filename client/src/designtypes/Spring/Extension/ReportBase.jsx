import { useSelector } from "react-redux";
import * as o from './symbol_table_offsets';
import * as mo from '../mat_offsets';
import { getAlertsBySeverity } from '../../../components/Alerts';
import ReportBaseContext from './ReportBaseContext';

export default function ReportBase(props) {
//  console.log('ReportBase - Mounting...');
  const model_symbol_table = useSelector((state) => state.model.symbol_table);

  const def_dia = (def_len) => {
    /*
     * Calculates mean diameter of deflected spring.
     * intermediate dia. calcs. assume no wire stretch
     * note that value of base.wire_len_a is actually square of active wire length
     */
    return Math.sqrt(base.wire_len_a - def_len * def_len) / (model_symbol_table[o.Coils_T].value * Math.PI);
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

  var sq1 = model_symbol_table[o.Wire_Dia].value * model_symbol_table[o.Coils_T].value;
  var sq2 = model_symbol_table[o.Coils_T].value * Math.PI * model_symbol_table[o.Mean_Dia].value;
  base.wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2)
    + Math.PI * (model_symbol_table[o.End_ID].value + model_symbol_table[o.Wire_Dia].value
      + model_symbol_table[o.Extended_End_ID].value + model_symbol_table[o.Wire_Dia].value)
    + model_symbol_table[o.End_Extension].value;

  base.wgt1000 = 1000.0 * model_symbol_table[o.Weight].value;

  //        note that value of base.wire_len_a is actually square of body wire length
  base.wire_len_a = sq1 * sq1 + sq2 * sq2;

  base.dhat = def_dia(sq1 + model_symbol_table[o.Deflect_1].value);
  base.od_1 = base.dhat + model_symbol_table[o.Wire_Dia].value;
  base.id_1 = base.dhat - model_symbol_table[o.Wire_Dia].value;

  base.dhat = def_dia(sq1 + model_symbol_table[o.Deflect_2].value);
  base.od_2 = base.dhat + model_symbol_table[o.Wire_Dia].value;
  base.id_2 = base.dhat - model_symbol_table[o.Wire_Dia].value;

  var kc = (4.0 * model_symbol_table[o.Spring_Index].value - 1.0) / (4.0 * model_symbol_table[o.Spring_Index].value - 4.0);
  var ks = kc + 0.615 / model_symbol_table[o.Spring_Index].value;
  var wd3 = model_symbol_table[o.Wire_Dia].value * model_symbol_table[o.Wire_Dia].value * model_symbol_table[o.Wire_Dia].value;
  var s_f = ks * 8.0 * model_symbol_table[o.Mean_Dia].value / (Math.PI * wd3);

  base.kw1 = ks;

  if (model_symbol_table[o.Stress_1].value !== 0.0)
    base.fs_1 = Math.abs(model_symbol_table[o.Stress_Lim_Stat].value / model_symbol_table[o.Stress_1].value);
  else
    base.fs_1 = Number.POSITIVE_INFINITY;

  base.safe_load = model_symbol_table[o.Stress_Lim_Stat].value / s_f;
  base.safe_load_u = model_symbol_table[o.Force_2].units;

  /*
   * pitch and helix angle are not used for extension spring
   * Angle across coil cross section
   * hlx_ang=atan(0.5*pitch/mean_dia)*(180.0/pi);
   */

  base.cycle_life_u = model_symbol_table[o.Cycle_Life].units + " (est.)";

  /*  ref. pg 51 Associated Spring Design Handbook  */
  /*  assume C2=4; i.e. R2=twice wire dia       */
  base.sb = 1.25 * (8.0 * model_symbol_table[o.Mean_Dia].value * model_symbol_table[o.Force_2].value) / (Math.PI * wd3);

  base.safe_travel = (base.safe_load - model_symbol_table[o.Initial_Tension].value) / model_symbol_table[o.Rate].value;
  base.pc_avail_deflect = 100.0 * model_symbol_table[o.Deflect_2].value / base.safe_travel;

  base.dhat = def_dia(sq1 + base.safe_travel);
  base.od_maxsafe = base.dhat + model_symbol_table[o.Wire_Dia].value;
  base.id_maxsafe = base.dhat - model_symbol_table[o.Wire_Dia].value;
  base.dhat = model_symbol_table[o.Tensile].value / 100.0;

  if (model_symbol_table[o.End_Type].value !== "Close_Wound_Coil" && (base.sb > model_symbol_table[o.Stress_Lim_Endur].value || model_symbol_table[o.Stress_Hook].value > model_symbol_table[o.Stress_Lim_Bend].value)) {
    base.warnmsg = "Fatigue failure at end is possible. See the Hook Stress topic in on-line Help for the Extension Spring design type.";
  } else {
    base.warnmsg = "";
  }
//        console.log('model_symbol_table[o.Prop_Calc_Method].value = ', model_symbol_table[o.Prop_Calc_Method].value);
  if (model_symbol_table[o.Prop_Calc_Method].value === 1) {
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
  base.energy_MS = 0.5 * model_symbol_table[o.Rate].value * base.safe_travel * base.safe_travel;
//  console.log('ReportBase','base=',base);

  return <ReportBaseContext.Provider value={base}>
    {props.children}
  </ReportBaseContext.Provider>;
}
