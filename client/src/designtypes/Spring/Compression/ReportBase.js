import React, { Component } from 'react';
import * as o from './symbol_table_offsets';
import * as mo from '../mat_ips_offsets';
import { connect } from 'react-redux';

export class ReportBase extends Component {

    constructor(props) {
        super(props);
//        console.log('In ReportBase.constructor this=',this,'props=',props);
        this.def_dia = this.def_dia.bind(this);

        // Loop to create prefs from system_controls
        this.prefs = [];
        for(var key in this.props.system_controls) {
            this.prefs.push(this.props.system_controls[key]);
        }
    
        // Loop to create symbol_table
        this.st = [];
        this.props.symbol_table.forEach((element) => {
            this.st.push(Object.assign({},element));
        });
    
        // Loop to create labels
        this.labels = [];
        this.props.labels.forEach((element) => {
            this.labels.push(Object.assign({},element));
        });

//        var this.kc, this.ks, this.temp, this.s_f, this.len_lbl, 
//        this.safe_load_u, this.wgt1000_u, this.cycle_life_u, 
//        this.pcadmsg, this.errmsg, this.errmsg0, this.errmsg1, this.errmsg2, this.errmsg3, this.hits,
//        this.safe_travel, this.tensileFixed0,
//        this.sq1, this.sq2,
//        this.dhat, this.wire_len_a, this.wire_len_t, this.safe_load, this.def_max,
//        this.pitch, this.hlx_ang,
//        this.od_1, this.od_2, this.od_solid, this.id_1, this.id_2,
//        this.wgt1000, this.fs_1,  //   kw2fs_1, kw2fs_2, kw2fs_s,   (unused)
//        this.kw1, this.kw2, this.kw2str1, this.kw2str2, this.kw2strs;
//        var this.matTypeValue, this.astmFedSpecValue;
//        var this.m_tab;

        /*  Bring in material properties table  */
        if (this.st[o.Material_File].value === "mat_SI.json") this.m_tab = require('../mat_SI.json');
            else this.m_tab = require('../mat_ips.json');
        this.et_tab = require('./endtypes.json');

        this.hits = 0;
        this.errmsg = "";
        if (this.st[o.L_Free].value < this.st[o.L_Solid].value) {
            this.hits++;
            this.errmsg += ": " + this.st[o.L_Free].name + " < " + this.st[o.L_Solid].name;
        }
        if (this.st[o.L_2].value < this.st[o.L_Solid].value) {
            this.hits++;
            this.errmsg += ": " + this.st[o.L_2].name + " < " + this.st[o.L_Solid].name;
        }
        if (this.st[o.ID_Free].value < 0.0) {
            this.hits++;
            this.errmsg += ": " + this.st[o.ID_Free].name + " < zero";
        }
        if (this.st[o.Coils_A].value < 1.0) {
            this.hits++;
            this.errmsg += ": " + this.st[o.Coils_A].name + " < 1.0";
        }
        if (this.st[o.Wire_Dia].value < 0.5 * this.st[o.tbase010].value) {
            this.hits++;
            this.errmsg += ": " + this.st[o.Wire_Dia].name + " < reasonable";
        }
        if (this.st[o.Wire_Dia].value > 5.0 * this.st[o.tbase400].value) {
            this.hits++;
            this.errmsg += ": " + this.st[o.Wire_Dia].name + " > reasonable";
        }
        if (this.st[o.Tensile].value <= this.prefs[o.smallnum]) {
            this.hits++;
            this.errmsg += ": " + this.st[o.Tensile].name + " < reasonable";
        }
        if (this.hits) this.errmsg = "Warning" + this.errmsg;
        const startpntmsg = "YOU MAY WISH TO CHOOSE A MORE REASONABLE START POINT BEFORE CONTINUING WITH SEARCH, SEEK OR TRADE.";
        const NaNmsg = 'Any "NaN" values are "Not a Number".';
        
        this.len_lbl = "Wire Length";
        
        switch(this.st[o.End_Type].value) {
        case 4:        //  Closed & Ground
            this.pitch = (this.st[o.L_Free].value - 2.0 * this.st[o.Wire_Dia].value) / this.st[o.Coils_A].value;
            break;
        case 3:        //  Closed
            this.pitch = (this.st[o.L_Free].value - 3.0 * this.st[o.Wire_Dia].value) / this.st[o.Coils_A].value;
            break;
        case 2:        //  Open & Ground
            this.pitch = this.st[o.L_Free].value / this.st[o.Coils_T].value;
            break;
        case 1:        //  Open
            this.pitch = (this.st[o.L_Free].value -       this.st[o.Wire_Dia].value) / this.st[o.Coils_A].value;
            break;
        case 5:        //  Tapered Closed & Ground
            this.pitch = (this.st[o.L_Free].value - 1.5 * this.st[o.Wire_Dia].value) / this.st[o.Coils_A].value;
            this.len_lbl = "Bar cut len.";
            break;
        case 6:        //  Pig-tail
            this.pitch = (this.st[o.L_Free].value - 2.0 * this.st[o.Wire_Dia].value) / this.st[o.Coils_A].value;
            break;
        default:        //  User Specified
            this.pitch = 0.0;
        }     

        this.sq1 = this.st[o.L_Free].value;
        this.sq2 = this.st[o.Coils_T].value * Math.PI * this.st[o.Mean_Dia].value;
        this.wire_len_t = Math.sqrt(this.sq1 * this.sq1 + this.sq2 * this.sq2);
             /*
              *  calculate developed length of tapered ends based on
              *  2 ends * pi * wire diameter * 0.625
              */
        if (this.st[o.End_Type].value === 5 ) this.wire_len_t = this.wire_len_t - 3.926 * this.st[o.Wire_Dia].value;
                               /*  more accurate weight  */
        this.wgt1000 = 1000.0 * this.st[o.Density].value * (Math.PI * this.st[o.Wire_Dia].value * this.st[o.Wire_Dia].value / 4.0) * this.wire_len_t;
        this.wgt1000_u = "/1000"

        /* 
         * intermediate dia. calcs. assume no wire stretch
         * note that value of this.wire_len_a is actually square of active wire length
         */
        this.sq1 = this.st[o.L_Free].value;
        this.sq2 = this.st[o.Coils_A].value * Math.PI * this.st[o.Mean_Dia].value;
        this.wire_len_a = this.sq1 * this.sq1 + this.sq2 * this.sq2;
        
        this.dhat = this.def_dia(this.st[o.L_1].value);
        this.od_1 = this.dhat + this.st[o.Wire_Dia].value;
        this.id_1 = this.dhat - this.st[o.Wire_Dia].value;
        
        this.dhat = this.def_dia(this.st[o.L_2].value);
        this.od_2 = this.dhat + this.st[o.Wire_Dia].value;
        this.id_2 = this.dhat - this.st[o.Wire_Dia].value;
        
        this.dhat = this.def_dia(this.st[o.L_Solid].value)
        this.od_solid = this.dhat + this.st[o.Wire_Dia].value;

        /*
         * Alternative deflected diameter calculation formula:
         * From: https://www.acxesspring.com/spring-diameter-change.html
         * From: http://springipedia.com/compression-general-design.asp 
         */

        this.tensileFixed0 = this.st[o.Tensile].value.toFixed(0);
         
        /* used to compute % tensile values */
//        if (this.st[o.Tensile].value <= this.prefs[o.smallnum]) {
//            return (
//                    <React.Fragment>
//                    YOU MUST SUPPLY A VALUE FOR TENSILE STRENGTH IN ORDER TO COMPLETE THESE CALCULATIONS.
//                    </React.Fragment>
//        );
//        }

        this.dhat = this.st[o.Tensile].value / 100.0;
        this.kc = (4.0 * this.st[o.Spring_Index].value - 1.0) / (4.0 * this.st[o.Spring_Index].value - 4.0);
        this.ks = this.kc + 0.615 / this.st[o.Spring_Index].value;
        this.s_f = this.ks * 8.0 * this.st[o.Mean_Dia].value / (Math.PI * this.st[o.Wire_Dia].value * this.st[o.Wire_Dia].value * this.st[o.Wire_Dia].value);

        this.kw1 = this.ks;
        this.kw2 = 1.0 + 0.5 / this.st[o.Spring_Index].value;
        this.temp = this.kw2 * this.s_f / this.ks;
        this.kw2str1 = this.temp * this.st[o.Force_1].value;
        this.kw2str2 = this.temp * this.st[o.Force_2].value;
        this.kw2strs = this.temp * this.st[o.Force_Solid].value;

        this.temp = 0.7 * this.st[o.Tensile].value;  // allowable stress for preset
        if (this.st[o.Stress_1] !== 0.0) this.fs_1 = Math.abs(this.st[o.Stress_Lim_Stat].value / this.st[o.Stress_1].value);
        else this.fs_1 = 0.0;

        /*  unused
         *  if (this.kw2str1 !== 0.0) kw2fs_1 = Math.abs(this.temp / this.kw2str1);
         *  else kw2fs_1 = 0.0;
         *  if (this.kw2str2 !== 0.0) kw2fs_2 = this.temp / this.kw2str2;
         *  else this.kw2str2 = 0.0;
         *  if (this.kw2strs !== 0.0) kw2fs_s = this.temp / this.kw2strs;
         *  else kw2fs_s = 0.0;
         *  unused
         */

        this.safe_load = this.st[o.Stress_Lim_Stat].value / this.s_f;
        if (this.safe_load > this.st[o.Force_Solid].value) this.safe_load_u = "(Solid)";
        else this.safe_load_u = this.st[o.Force_2].units ;
        this.safe_load = Math.min(this.safe_load, this.st[o.Force_Solid].value);
        /*
         * Angle across coil cross section
         * this.hlx_ang=atan(0.5*this.pitch/mean_dia)*(180.0/pi);
         */
        if (this.pitch > 0.0) this.hlx_ang = Math.atan(this.pitch / (Math.PI * this.st[o.Mean_Dia].value)) * (180.0 / Math.PI);
        else this.hlx_ang = 0.0;

        this.cycle_life_u = this.st[o.Cycle_Life].units + " (est)";
        
        if (this.st[o.PC_Avail_Deflect].value > 80.0) this.pcadmsg = "Coil to coil contact may cause inaccuracy in point 2.";
        
        this.temp = this.st[o.Deflect_2].value / this.st[o.L_Free].value;
        this.sq1 = 1.4 * this.st[o.Slenderness].value - 4.0;
        if (this.sq1 > this.prefs[o.smallnum]) {  
           /* structured to avoid div by 0 */
                if (this.temp > 0.76 / this.sq1) {
                    this.errmsg1 = "Given a deflection ratio of " + this.temp.toFixed(3) + 
                    "  and a Slenderness ratio of " + this.st[o.Slenderness].value.toFixed(1) + ",";
                     this.errmsg2 = "the spring will tend to buckle with fixed/free  ends.";
                     this.sq1 = 2.0 * this.st[o.Slenderness].value - 8.0;
                     if (this.sq1 <= 0.0 || this.temp < 1.6 / this.sq1) this.errmsg0 = " not";
                     else this.errmsg0 = "";
                     this.errmsg0 = "The spring will" + this.errmsg0 + " tend to buckle with fixed/fixed ends.";
                }
        }

        this.def_max = this.st[o.L_Free].value - this.st[o.L_Solid].value;
        this.safe_travel = Math.min(this.safe_load / this.st[o.Rate].value, this.def_max);
        
//        console.log("this.st[o.Prop_Calc_Method].value = ", this.st[o.Prop_Calc_Method].value);
        if (this.st[o.Prop_Calc_Method].value === 1){
            this.matTypeValue = this.m_tab[this.st[o.Material_Type].value][mo.matnam];
            this.astmFedSpecValue = this.st[o.ASTM_Fed_Spec].value;
        } else {
            this.matTypeValue = "User_Specified";
            this.astmFedSpecValue = "N/A";
        }
//        console.log("this.matTypeValue, this.astmFedSpecValue = ", this.matTypeValue, this.astmFedSpecValue);
    }

    def_dia(def_len) {
        /*  calculates mean diameter of deflected spring.  */
//        console.log("In ReportBase.def_dia this=",this);
        return(Math.sqrt(this.wire_len_a - def_len * def_len) / (this.st[o.Coils_A].value * Math.PI));
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    labels: state.model.labels,
});

export default connect(mapStateToProps)(ReportBase);
