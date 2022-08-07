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

        switch(this.props.symbol_table[o.End_Type].value) {
        case 4:        //  Closed & Ground
            this.pitch = (this.props.symbol_table[o.L_Free].value - 2.0 * this.props.symbol_table[o.Wire_Dia].value) / this.props.symbol_table[o.Coils_A].value;
            break;
        case 3:        //  Closed
            this.pitch = (this.props.symbol_table[o.L_Free].value - 3.0 * this.props.symbol_table[o.Wire_Dia].value) / this.props.symbol_table[o.Coils_A].value;
            break;
        case 2:        //  Open & Ground
            this.pitch = this.props.symbol_table[o.L_Free].value / this.props.symbol_table[o.Coils_T].value;
            break;
        case 1:        //  Open
            this.pitch = (this.props.symbol_table[o.L_Free].value -       this.props.symbol_table[o.Wire_Dia].value) / this.props.symbol_table[o.Coils_A].value;
            break;
        case 5:        //  Tapered Closed & Ground
            this.pitch = (this.props.symbol_table[o.L_Free].value - 1.5 * this.props.symbol_table[o.Wire_Dia].value) / this.props.symbol_table[o.Coils_A].value;
            this.len_lbl = "Bar cut len.";
            break;
        case 6:        //  Pig-tail
            this.pitch = (this.props.symbol_table[o.L_Free].value - 2.0 * this.props.symbol_table[o.Wire_Dia].value) / this.props.symbol_table[o.Coils_A].value;
            break;
        default:        //  User Specified
            this.pitch = (this.props.symbol_table[o.L_Free].value - (this.props.symbol_table[o.Inactive_Coils].value + 1.0) * this.props.symbol_table[o.Wire_Dia].value) / this.props.symbol_table[o.Coils_A].value;
        }

        var sq1 = this.props.symbol_table[o.L_Free].value;
        var sq2 = this.props.symbol_table[o.Coils_T].value * Math.PI * this.props.symbol_table[o.Mean_Dia].value;
        this.wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2);
        if (this.props.symbol_table[o.End_Type].value === 5 )  /*  calculate developed length of tapered ends based on 2 ends * pi * wire diameter * 0.625 */
            this.wire_len_t = this.wire_len_t - 3.926 * this.props.symbol_table[o.Wire_Dia].value;

        this.wgt1000 = 1000.0 * this.props.symbol_table[o.Weight].value;

        /*
         * intermediate dia. calcs. assume no wire stretch
         * note that value of this.wire_len_a is actually square of active wire length
         */
        sq1 = this.props.symbol_table[o.L_Free].value;
        sq2 = this.props.symbol_table[o.Coils_A].value * Math.PI * this.props.symbol_table[o.Mean_Dia].value;
        this.wire_len_a = sq1 * sq1 + sq2 * sq2;

        this.dhat = this.def_dia(this.props.symbol_table[o.L_1].value);
        this.od_1 = this.dhat + this.props.symbol_table[o.Wire_Dia].value;
        this.id_1 = this.dhat - this.props.symbol_table[o.Wire_Dia].value;

        this.dhat = this.def_dia(this.props.symbol_table[o.L_2].value);
        this.od_2 = this.dhat + this.props.symbol_table[o.Wire_Dia].value;
        this.id_2 = this.dhat - this.props.symbol_table[o.Wire_Dia].value;

        this.dhat = this.def_dia(this.props.symbol_table[o.L_Solid].value)
        this.od_solid = this.dhat + this.props.symbol_table[o.Wire_Dia].value;

        /*
         * Alternative deflected diameter calculation formula:
         * From: https://www.acxesspring.com/spring-diameter-change.html
         * From: http://springipedia.com/compression-general-design.asp
         */

        this.dhat = this.props.symbol_table[o.Tensile].value / 100.0;
        var kc = (4.0 * this.props.symbol_table[o.Spring_Index].value - 1.0) / (4.0 * this.props.symbol_table[o.Spring_Index].value - 4.0);
        var ks = kc + 0.615 / this.props.symbol_table[o.Spring_Index].value;
        var s_f = ks * 8.0 * this.props.symbol_table[o.Mean_Dia].value / (Math.PI * this.props.symbol_table[o.Wire_Dia].value * this.props.symbol_table[o.Wire_Dia].value * this.props.symbol_table[o.Wire_Dia].value);

        this.kw1 = ks;
        this.kw2 = 1.0 + 0.5 / this.props.symbol_table[o.Spring_Index].value;
        var temp = this.kw2 * s_f / ks;
        this.kw2str1 = temp * this.props.symbol_table[o.Force_1].value;
        this.kw2str2 = temp * this.props.symbol_table[o.Force_2].value;
        this.kw2strs = temp * this.props.symbol_table[o.Force_Solid].value;

        if (this.props.symbol_table[o.Stress_1].value !== 0.0)
            this.fs_1 = Math.abs(this.props.symbol_table[o.Stress_Lim_Stat].value / this.props.symbol_table[o.Stress_1].value);
        else
            this.fs_1 = Number.POSITIVE_INFINITY;

        /*  unused
         *  temp = 0.7 * this.props.symbol_table[o.Tensile].value;  // allowable stress for preset
         *  if (this.kw2str1 !== 0.0) kw2fs_1 = Math.abs(temp / this.kw2str1);
         *  else kw2fs_1 = 0.0;
         *  if (this.kw2str2 !== 0.0) kw2fs_2 = temp / this.kw2str2;
         *  else this.kw2str2 = 0.0;
         *  if (this.kw2strs !== 0.0) kw2fs_s = temp / this.kw2strs;
         *  else kw2fs_s = 0.0;
         *  unused
         */

        this.safe_load = this.props.symbol_table[o.Stress_Lim_Stat].value / s_f;
        if (this.safe_load > this.props.symbol_table[o.Force_Solid].value)
            this.safe_load_u = "(Solid)";
        else
            this.safe_load_u = this.props.symbol_table[o.Force_2].units ;
        this.safe_load = Math.min(this.safe_load, this.props.symbol_table[o.Force_Solid].value);
        /*
         * Angle across coil cross section
         * this.hlx_ang=atan(0.5*this.pitch/mean_dia)*(180.0/pi);
         */
        if (this.pitch > 0.0)
            this.hlx_ang = Math.atan(this.pitch / (Math.PI * this.props.symbol_table[o.Mean_Dia].value)) * (180.0 / Math.PI);
        else
            this.hlx_ang = 0.0;

        this.cycle_life_u = this.props.symbol_table[o.Cycle_Life].units + " (est.)";

        this.pcadmsg = undefined;
        if (this.props.symbol_table[o.PC_Avail_Deflect].value > 80.0) {
            this.pcadmsg = "Coil to coil contact may cause inaccuracy in point 2.";
        }

        temp = this.props.symbol_table[o.Deflect_2].value / this.props.symbol_table[o.L_Free].value;
        sq1 = 1.4 * this.props.symbol_table[o.Slenderness].value - 4.0;
        this.errmsg1 = undefined;
        this.errmsg0 = undefined;
        if (sq1 > this.props.system_controls.smallnum) {
            /* structured to avoid div by 0 */
            if (temp > 0.76 / sq1) {
                this.errmsg1 = "Given a deflection ratio of " + temp.toFixed(3) +
                               "  and a Slenderness ratio of " + this.props.symbol_table[o.Slenderness].value.toFixed(1) + ", " +
                               "the spring will tend to buckle with fixed/free  ends.";
                sq1 = 2.0 * this.props.symbol_table[o.Slenderness].value - 8.0;
                if (sq1 <= 0.0 || temp < 1.6 / sq1)
                    this.errmsg0 = " not";
                else
                    this.errmsg0 = "";
                this.errmsg0 = "The spring will" + this.errmsg0 + " tend to buckle with fixed/fixed ends.";
            }
        }

        var def_max = this.props.symbol_table[o.L_Free].value - this.props.symbol_table[o.L_Solid].value;
        this.safe_travel = Math.min(this.safe_load / this.props.symbol_table[o.Rate].value, def_max);

//        console.log("this.props.symbol_table[o.Prop_Calc_Method].value = ", this.props.symbol_table[o.Prop_Calc_Method].value);
        if (this.props.symbol_table[o.Prop_Calc_Method].value === 1 && this.props.symbol_table[o.Material_Type].value !== 0){
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
        var DefSolid = (this.props.symbol_table[o.L_Free].value - this.props.symbol_table[o.L_Solid].value);
        this.energy_S = 0.5 * this.props.symbol_table[o.Rate].value * DefSolid * DefSolid;

        return null;
    }

    def_dia(def_len) {
        /*  calculates mean diameter of deflected spring.  */
//        console.log("In ReportBase.def_dia this=",this);
        return Math.sqrt(this.wire_len_a - def_len * def_len) / (this.props.symbol_table[o.Coils_A].value * Math.PI);
    }

}
