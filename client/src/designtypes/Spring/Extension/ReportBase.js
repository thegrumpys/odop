import { Component } from 'react';
import * as o from './symbol_table_offsets';
import * as mo from '../mat_ips_offsets';

export class ReportBase extends Component {

    constructor(props) {
        super(props);
//        console.log('In ReportBase.constructor this=',this,'props=',props);
        this.def_dia = this.def_dia.bind(this);
    }

    render() {
//        console.log('In ReportBase.render this=',this);
        const Close_Wound_Coil = 5;

        /*  Bring in material properties table  */
        if (this.props.symbol_table[o.Material_File].value === "mat_SI.json")
            this.m_tab = require('../mat_SI.json');
        else
            this.m_tab = require('../mat_ips.json');
        this.et_tab = require('./endtypes.json');

        this.hits = 0;
        this.errmsg = "";
        if (this.props.symbol_table[o.ID_Free].value < 0.0) {
            this.hits++;
            this.errmsg += ": " + this.props.symbol_table[o.ID_Free].name + " < zero";
        }
        if (this.props.symbol_table[o.Coils_A].value < 1.0) {
            this.hits++;
            this.errmsg += ": " + this.props.symbol_table[o.Coils_A].name + " < 1.0";
        }
        if (this.props.symbol_table[o.Wire_Dia].value < 0.5 * this.props.symbol_table[o.tbase010].value) {
            this.hits++;
            this.errmsg += ": " + this.props.symbol_table[o.Wire_Dia].name + " < reasonable";
        }
        if (this.props.symbol_table[o.Wire_Dia].value > 5.0 * this.props.symbol_table[o.tbase400].value) {
            this.hits++;
            this.errmsg += ": " + this.props.symbol_table[o.Wire_Dia].name + " > reasonable";
        }
        if (this.props.symbol_table[o.Tensile].value <= this.props.system_controls.smallnum) {
            this.hits++;
            this.errmsg += ": " + this.props.symbol_table[o.Tensile].name + " < reasonable";
        }
        if (this.hits)
            this.errmsg = "Warning" + this.errmsg;
        this.startpntmsg = "YOU MAY WISH TO CHOOSE A MORE REASONABLE START POINT BEFORE CONTINUING WITH SEARCH, SEEK OR TRADE.";
        this.NaNmsg = 'Any "NaN" values are "Not a Number".';
        
        this.len_lbl = "Wire Length";

        var sq1 = this.props.symbol_table[o.Wire_Dia].value * this.props.symbol_table[o.Coils_T].value;
        var sq2 = this.props.symbol_table[o.Coils_T].value * Math.PI * this.props.symbol_table[o.Mean_Dia].value;
        this.wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2)
            + Math.PI * (this.props.symbol_table[o.End_ID].value +  this.props.symbol_table[o.Wire_Dia].value
            + this.props.symbol_table[o.Extended_End_ID].value +  this.props.symbol_table[o.Wire_Dia].value)
            + this.props.symbol_table[o.End_Extension].value;

        this.wgt1000 = 1000.0 * this.props.symbol_table[o.Weight].value;
        this.wgt1000_u = "/1000"

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
        
        if (this.props.symbol_table[o.Stress_1] !== 0.0)
            this.fs_1 = Math.abs(this.props.symbol_table[o.Stress_Lim_Stat].value / this.props.symbol_table[o.Stress_1].value);
        else
            this.fs_1 = 0.0;

        this.safe_load = this.props.symbol_table[o.Stress_Lim_Stat].value / s_f;
        this.safe_load_u = this.props.symbol_table[o.Force_2].units;

        /*
         * pitch and helix angle are not used for extension spring
         * Angle across coil cross section
         * hlx_ang=atan(0.5*pitch/mean_dia)*(180.0/pi);
         */

        this.cycle_life_u = this.props.symbol_table[o.Cycle_Life].units + " (est)";

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
            this.warnmsg = "Fatigue failure at end is possible.";
        } else {
            this.warnmsg = "";
        }
        
//        console.log("this.props.symbol_table[o.Prop_Calc_Method].value = ", this.props.symbol_table[o.Prop_Calc_Method].value);
        if (this.props.symbol_table[o.Prop_Calc_Method].value === 1){
            this.matTypeValue = this.m_tab[this.props.symbol_table[o.Material_Type].value][mo.matnam];
            this.astmFedSpecValue = this.props.symbol_table[o.ASTM_Fed_Spec].value;
        } else {
            this.matTypeValue = "User_Specified";
            this.astmFedSpecValue = "N/A";
        }
//        console.log("this.matTypeValue, this.astmFedSpecValue = ", this.matTypeValue, this.astmFedSpecValue);
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
