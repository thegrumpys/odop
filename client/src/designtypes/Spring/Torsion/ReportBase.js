import React, { Component } from 'react';
import * as o from './symbol_table_offsets';
import * as mo from '../mat_ips_offsets';
import { connect } from 'react-redux';

export class ReportBase extends Component {

    constructor(props) {
        super(props);
//        console.log('In ReportBase.constructor this=',this,'props=',props);
        this.def_dia_t = this.def_dia_t.bind(this);
    }

    render() {
//        console.log('In ReportBase.render this=',this);
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
            this.errmsg += ": " + this.props.symbol_table[o.ID_Free].name + " < 0.0";
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
        if (this.hits) this.errmsg = "Warning" + this.errmsg;
        this.startpntmsg = "YOU MAY WISH TO CHOOSE A MORE REASONABLE START POINT BEFORE CONTINUING WITH SEARCH, SEEK OR TRADE.";
        this.NaNmsg = 'Any "NaN" values are "Not a Number".';
        
        this.len_lbl = "Wire Length";
        
        switch(this.props.symbol_table[o.End_Type].value) {
        case 1:        //  Tangent   this.pitch=(l_body-wire_dia)/coils_t
            this.pitch = (this.props.symbol_table[o.L_Body].value - this.props.symbol_table[o.Wire_Dia].value) / this.props.symbol_table[o.Coils_T].value;
            break;
        case 3:        //  Future hot wound end type ?
            this.pitch = 0.0;
            this.len_lbl = "Bar cut len.";
            break;
        default:        //  User Specified
            this.pitch = 0.0;
        }     

        var sq1 = this.props.symbol_table[o.L_Body].value;
        var sq2 = this.props.symbol_table[o.Coils_T].value * Math.PI * this.props.symbol_table[o.Mean_Dia].value;
        this.wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2) + this.props.symbol_table[o.Xlen_1].value + this.props.symbol_table[o.Xlen_2].value;
                               /*  more accurate weight  */
        this.wgt1000 = 1000.0 * this.props.symbol_table[o.Density].value * (Math.PI * this.props.symbol_table[o.Wire_Dia].value * this.props.symbol_table[o.Wire_Dia].value / 4.0) * this.wire_len_t;
        this.wgt1000_u = "/1000"

        /* 
         *  calculates mean diameter of deflected torsion spring. 
         *  intermediate dia. calcs. assume no wire stretch
         */
        
        this.dhat = this.def_dia_t(this.props.symbol_table[o.Deflect_1].value);
        this.od_1 = this.dhat + this.props.symbol_table[o.Wire_Dia].value;
        this.id_1 = this.dhat - this.props.symbol_table[o.Wire_Dia].value;
        
        this.dhat = this.def_dia_t(this.props.symbol_table[o.Deflect_2].value);
        this.od_2 = this.dhat + this.props.symbol_table[o.Wire_Dia].value;
        this.id_2 = this.dhat - this.props.symbol_table[o.Wire_Dia].value;

        this.tensileFixed0 = this.props.symbol_table[o.Tensile].value.toFixed(0);

        this.dhat = this.props.symbol_table[o.Tensile].value / 100.0;

        if (this.props.symbol_table[o.Heat_Treat].value === 2){     //  Stress Relieve
            this.kb = (4.0 * this.props.symbol_table[o.Spring_Index].value - 1.0) / (4.0 * this.props.symbol_table[o.Spring_Index].value - 4.0);
        }
        else {                          //  No Stress Relieve
            this.kb = 1.0;
        }
    //  console.log("this.props.symbol_table[o.Heat_Treat].value =", this.props.symbol_table[o.Heat_Treat].value);
    //  console.log("this.kb = ", this.kb);

        var s_f = 32.0 * this.kb / (Math.PI * this.props.symbol_table[o.Wire_Dia].value * this.props.symbol_table[o.Wire_Dia].value * this.props.symbol_table[o.Wire_Dia].value);

//        if stress_1 ^= 0.0 then this.fs_1=abs(str_lim_bnd_stat/stress_1);
//        else this.fs_1=0.0;
//        this.safe_load=str_lim_bnd_stat/s_f;

        if (this.props.symbol_table[o.Stress_1].value !== 0.0) {
            this.fs_1 = Math.abs(this.props.symbol_table[o.Stress_Lim_Bnd_Stat].value / this.props.symbol_table[o.Stress_1].value);
        }
        else {
            this.fs_1 = 0.0;
        }
        this.safe_load = this.props.symbol_table[o.Stress_Lim_Bnd_Stat].value / s_f;
        this.safe_load_u = this.props.symbol_table[o.M_2].units ;
        

//        this.def_max=this.safe_load/rate;
//           ctp1=coils_t+1.0;
//        this.l_max = max(l_body, wire_dia*(ctp1+this.def_max/deg_per_turn) );
//           temp=def_dia_t(this.def_max);
//        this.od_max=temp+wire_dia;
//        id_max=temp-wire_dia;
        
        this.def_max = this.safe_load / this.props.symbol_table[o.Rate].value;
        var ctp1 = this.props.symbol_table[o.Coils_T].value + 1.0;
        this.l_max = Math.max(this.props.symbol_table[o.L_Body].value, this.props.symbol_table[o.Wire_Dia].value * (ctp1 + this.def_max / 360.0));
        var temp = this.def_dia_t(this.def_max);
        this.od_max = temp + this.props.symbol_table[o.Wire_Dia].value;
        
        /*
         * Angle across coil cross section
         * this.hlx_ang=atan(0.5*this.pitch/mean_dia)*(180.0/pi);
         */
        if (this.pitch > 0.0)
            this.hlx_ang = Math.atan(this.pitch / (Math.PI * this.props.symbol_table[o.Mean_Dia].value)) * (180.0 / Math.PI);
        else
            this.hlx_ang = 0.0;

        this.cycle_life_u = this.props.symbol_table[o.Cycle_Life].units + " (est)";

        this.safe_travel = this.def_max;
        
//        console.log("this.props.symbol_table[o.Prop_Calc_Method].value = ", this.props.symbol_table[o.Prop_Calc_Method].value);
        if (this.props.symbol_table[o.Prop_Calc_Method].value === 1){
            this.matTypeValue = this.m_tab[this.props.symbol_table[o.Material_Type].value][mo.matnam];
            this.astmFedSpecValue = this.props.symbol_table[o.ASTM_Fed_Spec].value;
        } else {
            this.matTypeValue = "User_Specified";
            this.astmFedSpecValue = "N/A";
        }
//        console.log("this.matTypeValue, this.astmFedSpecValue = ", this.matTypeValue, this.astmFedSpecValue);
    }

    def_dia_t(def) {
//      return((mean_dia*coils_a)/(coils_a+def/deg_per_turn));
      return (this.props.symbol_table[o.Mean_Dia].value * this.props.symbol_table[o.Coils_A].value) / (this.props.symbol_table[o.Coils_A].value + def / 360.0);
  }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
});

export default connect(mapStateToProps)(ReportBase);
