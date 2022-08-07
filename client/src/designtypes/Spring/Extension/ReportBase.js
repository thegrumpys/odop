import { Component } from 'react';
import * as o from './symbol_table_offsets';
import * as mo from '../mat_offsets';
import { getAlertsBySeverity } from '../../../components/Alerts';

export class ReportBase extends Component {

    constructor(props) {
//        console.log('In ReportBase.constructor this=',this,'props=',props);
        super(props);
        this.def_dia = this.def_dia.bind(this);
    }

    render() {
//        console.log('In ReportBase.render this=',this);
        const Close_Wound_Coil = 5;
        /*  Bring in material properties table  */
        if (this.props.symbol_table[o.Material_File].value === "mat_metric.json")
            this.m_tab = require('../mat_metric.json');
        else
            this.m_tab = require('../mat_us.json');
        this.et_tab = require('./endtypes.json');

        /*  Bring in life target table  */
            this.lifetarg = require('./lifetarget.json');

        this.hits = getAlertsBySeverity().length;
        this.errmsg = "";
        this.startpntmsg = "Alert details are available via the Alert button on the main page of Advanced and Calculator Views.";
        
        this.len_lbl = "Wire Length";

        var sq1 = this.props.symbol_table[o.Wire_Dia].value * this.props.symbol_table[o.Coils_T].value;
        var sq2 = this.props.symbol_table[o.Coils_T].value * Math.PI * this.props.symbol_table[o.Mean_Dia].value;
        this.wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2)
            + Math.PI * (this.props.symbol_table[o.End_ID].value + this.props.symbol_table[o.Wire_Dia].value
            + this.props.symbol_table[o.Extended_End_ID].value + this.props.symbol_table[o.Wire_Dia].value)
            + this.props.symbol_table[o.End_Extension].value;

        this.wgt1000 = 1000.0 * this.props.symbol_table[o.Weight].value;

//        note that value of this.wire_len_a is actually square of body wire length
        this.wire_len_a = sq1 * sq1 + sq2 * sq2;
        
        this.dhat = this.def_dia(sq1 + this.props.symbol_table[o.Deflect_1].value);
        this.od_1 = this.dhat + this.props.symbol_table[o.Wire_Dia].value;
        this.id_1 = this.dhat - this.props.symbol_table[o.Wire_Dia].value;
        
        this.dhat = this.def_dia(sq1 + this.props.symbol_table[o.Deflect_2].value);
        this.od_2 = this.dhat + this.props.symbol_table[o.Wire_Dia].value;
        this.id_2 = this.dhat - this.props.symbol_table[o.Wire_Dia].value;

        var kc = (4.0 * this.props.symbol_table[o.Spring_Index].value - 1.0) / (4.0 * this.props.symbol_table[o.Spring_Index].value - 4.0);
        var ks = kc + 0.615 / this.props.symbol_table[o.Spring_Index].value;
        var wd3 = this.props.symbol_table[o.Wire_Dia].value * this.props.symbol_table[o.Wire_Dia].value * this.props.symbol_table[o.Wire_Dia].value;
        var s_f = ks * 8.0 * this.props.symbol_table[o.Mean_Dia].value / (Math.PI * wd3);

        this.kw1 = ks;
        
        if (this.props.symbol_table[o.Stress_1].value !== 0.0)
            this.fs_1 = Math.abs(this.props.symbol_table[o.Stress_Lim_Stat].value / this.props.symbol_table[o.Stress_1].value);
        else
            this.fs_1 = Number.POSITIVE_INFINITY;

        this.safe_load = this.props.symbol_table[o.Stress_Lim_Stat].value / s_f;
        this.safe_load_u = this.props.symbol_table[o.Force_2].units;

        /*
         * pitch and helix angle are not used for extension spring
         * Angle across coil cross section
         * hlx_ang=atan(0.5*pitch/mean_dia)*(180.0/pi);
         */

        this.cycle_life_u = this.props.symbol_table[o.Cycle_Life].units + " (est.)";

        /*  ref. pg 51 Associated Spring Design Handbook  */
        /*  assume C2=4; i.e. R2=twice wire dia       */
        this.sb = 1.25 * (8.0 * this.props.symbol_table[o.Mean_Dia].value * this.props.symbol_table[o.Force_2].value) / (Math.PI * wd3);

        this.safe_travel = (this.safe_load - this.props.symbol_table[o.Initial_Tension].value) / this.props.symbol_table[o.Rate].value;
        this.pc_avail_deflect = 100.0 * this.props.symbol_table[o.Deflect_2].value / this.safe_travel;
        
        this.dhat = this.def_dia(sq1 + this.safe_travel);
        this.od_maxsafe = this.dhat + this.props.symbol_table[o.Wire_Dia].value;
        this.id_maxsafe = this.dhat - this.props.symbol_table[o.Wire_Dia].value;
        this.dhat = this.props.symbol_table[o.Tensile].value / 100.0;

        if (this.props.symbol_table[o.End_Type].value !== Close_Wound_Coil && (this.sb > this.props.symbol_table[o.Stress_Lim_Endur].value || this.props.symbol_table[o.Stress_Hook].value > this.props.symbol_table[o.Stress_Lim_Bend].value)) {
            this.warnmsg = "Fatigue failure at end is possible. See the Hook Stress topic in on-line Help for the Extension Spring design type.";
        } else {
            this.warnmsg = "";
        }
        
//        console.log("this.props.symbol_table[o.Prop_Calc_Method].value = ", this.props.symbol_table[o.Prop_Calc_Method].value);
        if (this.props.symbol_table[o.Prop_Calc_Method].value === 1){
            this.matTypeValue = this.m_tab[this.props.symbol_table[o.Material_Type].value][mo.matnam];
            this.astmFedSpecValue = this.props.symbol_table[o.ASTM_Fed_Spec].value;
            this.clWarnString = "";
        } else {
            this.matTypeValue = "User_Specified";
            this.astmFedSpecValue = "N/A";
            this.clWarnString = "Cycle_Life is not computed for User_Specified materials.";
        }
//        console.log("this.matTypeValue, this.astmFedSpecValue = ", this.matTypeValue, this.astmFedSpecValue);

        this.lifeTargValue = this.lifetarg[this.props.symbol_table[o.Life_Category].value];
        if (this.props.symbol_table[o.Life_Category].value <= 4){
            this.peenValue = "Not peened";
        } else {
            this.peenValue = "Shot peened";
        }

        this.energy_1 = 0.5 * this.props.symbol_table[o.Rate].value * this.props.symbol_table[o.Deflect_1].value * this.props.symbol_table[o.Deflect_1].value;
        this.energy_2 = 0.5 * this.props.symbol_table[o.Rate].value * this.props.symbol_table[o.Deflect_2].value * this.props.symbol_table[o.Deflect_2].value;
        this.energy_MS = 0.5 * this.props.symbol_table[o.Rate].value * this.safe_travel * this.safe_travel;

        return null;
    }

    def_dia(def_len) {
        /* 
         * Calculates mean diameter of deflected spring. 
         * intermediate dia. calcs. assume no wire stretch
         * note that value of this.wire_len_a is actually square of active wire length
         */
        return Math.sqrt(this.wire_len_a - def_len * def_len) / (this.props.symbol_table[o.Coils_T].value * Math.PI);
    }

}
