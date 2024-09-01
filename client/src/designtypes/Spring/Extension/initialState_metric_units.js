import { MIN, MAX, CONSTRAINED, FIXED, FDCL } from '../../../store/actionTypes';
export const initialState = {
    "symbol_table": [
        {
            "input": true,
            "name": "OD_Free",
            "value": 12.5,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.05,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>Outside diameter in free (no load) condition</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/OD_Free.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Wire_Dia",
            "value": 1.5,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.02,
            "cmax": 20,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td>Wire diameter</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/Wire_Dia.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Coils_T",
            "value": 10.0,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 100,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>Total number of coils</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/Coils_T.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Initial_Tension",
            "value": 13.0,
            "units": "newtons",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "Minimum force required to separate coils",
            "type": "equationset",
            "hidden": false,
            "propagate": [{ name: "Force_1", minmax: MIN }]
        },
        {
            "input": true,
            "name": "End_Extension",
            "value": 0.0,
            "units": "mm",
            "lmin": FIXED,
            "lmax": FIXED,
            "cmin": 0,
            "cmax": 100.0,
            "oldlmin": 0,
            "oldlmax": 0,
            "oldcmin": 0,
            "oldcmax": 100.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>End Extension</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/End_Extension.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Force_1",
            "value": 15.0,
            "units": "newtons",
            "lmin": CONSTRAINED|FDCL,
            "lmax": 0,
            "cmin": 3,
            "cmax": 200.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td>Minimum operating load (Length L_1) (FDCL)</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/Force_1.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false,
            "cminchoices": [ "Initial_Tension" ],
            "cminchoice": 0
        },
        {
            "input": true,
            "name": "Force_2",
            "value": 67.0,
            "units": "newtons",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1,
            "cmax": 500,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Maximum operating load (Length L_2)</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/Force_2.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Mean_Dia",
            "value": 11.0,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "Average of inside and outside coil diameters",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "ID_Free",
            "value": 9.5,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>Coil inside diameter in free (no load) condition</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/ID_Free.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Coils_A",
            "value": 29.9,
            "units": "coils",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 1.0,
            "cmax": 90.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "Number of Active coils; includes End_Deflect_Allow",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Rate",
            "value": 1.26,
            "units": "N/mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 200.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td>Spring rate (spring constant); slope of force-deflection curve</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/Rate.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Deflect_1",
            "value": 1.58,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 20.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Deflection from free to load point 1</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/Deflect_1.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Deflect_2",
            "value": 42.82,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 200.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>Deflection from free to load point 2</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/Deflect_2.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_Body",
            "value": 45.75,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 200.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>Length of body in free condition</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/L_Body.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_Free",
            "value": 64.75,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 400.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 2.0,
            "tooltip": "<Table><tr><td>Free length including ends</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/L_Free.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_1",
            "value": 66.33,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 500.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 2.0,
            "tooltip": "Spring length at load point 1",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_2",
            "value": 107.57,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 1000.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "Spring length at load point 2",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_Stroke",
            "value": 41.24,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 500.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Length of stroke from point 1 to point 2</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/L_Stroke.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Weight",
            "value": 15.11,
            "units": "grams",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.01,
            "cmax": 1000.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.001,
            "tooltip": "<Table><tr><td>Weight of one spring</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/Weight.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Spring_Index",
            "value": 7.33,
            "units": "ratio",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 4.0,
            "cmax": 25.0,
            "validmin": 1.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "Ratio of mean coil diameter (Mean_Dia) to wire diameter (Wire_Dia)",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_Initial",
            "value": 107.89,
            "units": "MPa",
            "lmin": CONSTRAINED|FDCL,
            "lmax": CONSTRAINED|FDCL,
            "cmin": 29,
            "cmax": 30,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 100.0,
            "tooltip": "Stress resulting from Initial_Tension (FDCL)",
            "type": "equationset",
            "hidden": false,
            "cminchoices": [ "Stress_Init_Lo" ],
            "cminchoice": 0,
            "cmaxchoices": [ "Stress_Init_Hi" ],
            "cmaxchoice": 0
        },
        {
            "input": false,
            "name": "Stress_1",
            "value": 149.67,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 10.0,
            "cmax": 200.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 100.0,
            "tooltip": "Torsion stress in wire at load point 1",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_2",
            "value": 668.56,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 100.0,
            "cmax": 1000.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1000.0,
            "tooltip": "Torsion stress in wire at load point 2",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_Hook",
            "value": 1275.8,
            "units": "MPa",
            "lmin": 0,
            "lmax": FDCL,
            "cmin": 100.0,
            "cmax": 52,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1000.0,
            "tooltip": "Bending stress in hooks",
            "type": "equationset",
            "hidden": false,
            "cmaxchoices": [ "Stress_Lim_Bend" ],
            "cmaxchoice": 0
        },
        {
            "input": false,
            "name": "FS_2",
            "value": 1.0,
            "units": "ratio",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 1.1,
            "cmax": 2.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Factor of safety at load point 2",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "FS_CycleLife",
            "value": 1.0,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.02,
            "cmax": 1.5,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Factor of safety to achieve the target cycle life category. See on-line Help.",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "FS_Hook",
            "value": 1.0,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 1.5,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Factor of safety in the hooks. See on-line Help.",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Cycle_Life",
            "value": 1.0,
            "units": "cycles",
            "lmin": 0,
            "lmax": 0,
            "cmin": 10000,
            "cmax": 10010000,
            "sdlim": 10000.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "tooltip": "Rough estimate of the average number of cycles to failure when cycling between point 1 and point 2. See on-line Help.",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "%_Safe_Deflect",
            "value": 80.0,
            "units": "%",
            "lmin": 0,
            "lmax": CONSTRAINED,
            "cmin": 1,
            "cmax": 90.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 10.0,
            "tooltip": "Deflection of load point 2 as a percent of total safe deflection",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_Init_Lo",
            "value": 87.4,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 10,
            "cmax": 200.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 100.0,
            "tooltip": "Stress Initial range low point - sets lower limit for Initial_Tension",
            "type": "equationset",
            "hidden": false,
            "propagate": [{ name: "Stress_Initial", minmax: MIN }]
        },
        {
            "input": false,
            "name": "Stress_Init_Hi",
            "value": 143.6,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 20,
            "cmax": 400.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 100.0,
            "tooltip": "Stress Initial range high point - sets upper limit for Initial_Tension",
            "type": "equationset",
            "hidden": false,
            "propagate": [{ name: "Stress_Initial", minmax: MAX }]
        },
        {
            "input": false,
            "name": "Energy",
            "value": 1,
            "units": "N-mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.001,
            "cmax": 1000000,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "Change in elastic potential energy between 1 and 2",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Spring_Type",
            "value": "Extension",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Extension spring design",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Prop_Calc_Method",
            "value": 1,
            "units": "",
            "format": "table",
            "table": "Spring/Extension/prop_calc",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Property Calculation Method - Controls how material properties are determined and used.  1-Use values from material table  2-Specify Tensile, %_Tensile_Stat & %_Tensile_Endur  3-Specify allowable stresses: Stress_Lim_Stat & Stress_Lim_Endur",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Material_Type",
            "value": 3,
            "units": "",
            "format": "table",
            "table": "Spring/mat_metric",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Select wire material",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "ASTM/Fed_Spec",
            "value": "Defined in initialState",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Wire specification",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Process",
            "value": "Cold_Coiled",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Coil winding process temperature - Cold coiled vs. Hot wound",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Material_File",
            "value": "mat_metric.json",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "Life_Category",
            "value": 1,
            "units": "",
            "format": "table",
            "table": "Spring/Extension/lifetarget",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Select cycle life target. Confirm that FS_CycleLife MIN constraint is enabled to utilize the selected %_Tensile_Endur for the material.",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Density",
            "value": 0.00786,
            "units": "g/mm**3",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Wire material density",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Torsion_Modulus",
            "value": 79293.0,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Wire torsion modulus (G)",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Hot_Factor_Kh",
            "value": 1.0,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Reduction factor applied to modulus of hot-wound materials",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Tensile",
            "value": 950.3566,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Wire tensile strength (computed as a function of wire diameter when Prop_Calc_Method=1; See on-line Help for details)",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "%_Tensile_Endur",
            "value": 50.0,
            "units": "%",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Allowable percent of tensile strength for selected life cycle category",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "%_Tensile_Stat",
            "value": 50.0,
            "units": "%",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Allowable percent of tensile strength for static applications",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "%_Tensile_Bend",
            "value": 75.0,
            "units": "%",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Allowable percent of tensile strength for bending",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Stress_Lim_Endur",
            "value": 475.17,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Allowable stress for selected life cycle category",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Stress_Lim_Stat",
            "value": 475.17,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Allowable stress for static applications",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Stress_Lim_Bend",
            "value": 712.76,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Allowable stress for bending",
            "type": "calcinput",
            "hidden": false,
            "propagate": [{ name: "Stress_Hook", minmax: MAX }]
        },
        {
            "input": true,
            "name": "SI_Range",
            "value": 1,
            "units": "",
            "format": "table",
            "table": "Spring/Extension/si_range",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Select desired range of stress created by Initial_Tension. See on-line Help for details.",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "SI_Lo_Factor",
            "value": 188.92,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Stress Initial Low Factor from material table - used with Spring_Index to determine Stress_Init_Lo",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "SI_Hi_Factor",
            "value": 310.28,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Stress Initial High Factor from material table - used with Spring_Index to determine Stress_Init_Hi",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "End_Type",
            "value": 3,
            "units": "",
            "format": "table",
            "table": "Spring/Extension/endtypes",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Select end type",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "End_ID",
            "value": 9.5,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>End Inside Diameter. Used in calculation of stress at end.</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/End_ID.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Extended_End_ID",
            "value": 9.5,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Extended End Inside Diameter. Used in calculation of stress at end.",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "L_End",
            "value": 9.5,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Length of End. Used in calculation of L_Free.</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/L_End.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "L_Extended_End",
            "value": 9.5,
            "units": "mm",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Length of Extended End. Used in calculation of L_Free.</td></tr><tr><td><Image fluid src=\"/designtypes/Spring/Extension/tooltips/L_Extended_End.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Hook_Deflect_All",
            "value": 0.40,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "Hook Deflection Allowance - adds to Coils_A",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": false,
            "name": "Catalog_Name",
            "value": "",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Name of the catalog from which the catalog entry was selected",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": false,
            "name": "Catalog_Number",
            "value": "",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "Catalog entry which was selected from the named catalog",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "tbase010",
            "value": 0.254,
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "tbase400",
            "value": 10.160,
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "const_term",
            "value": 1.0,
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "slope_term",
            "value": 1.0,
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "tensile_010",
            "value": 1000.0,
            "units": "MPa",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "type": "calcinput",
            "hidden": true
        }
    ],
    "labels": [
        {
            "name": "COMMENT",
            "value": "Extension Spring default start point - Metric units ..."
        },
        {
            "name": "Contact person",
            "value": ""
        },
        {
            "name": "Company name",
            "value": ""
        },
        {
            "name": "Street",
            "value": ""
        },
        {
            "name": "City, State & Zip",
            "value": ""
        },
        {
            "name": "Phone & email",
            "value": ""
        },
        {
            "name": "Date",
            "value": ""
        },
        {
            "name": "Part Number",
            "value": ""
        },
        {
            "name": "Data Source",
            "value": "print     sample      verbal"
        },
        {
            "name": "Mandril",
            "value": ""
        },
        {
            "name": "Wind",
            "value": "rh lh opt"
        },
        {
            "name": "Relative loop pos. & tol.",
            "value": ""
        },
        {
            "name": "Gaps",
            "value": ""
        },
        {
            "name": "Shot peen",
            "value": "yes no; details"
        },
        {
            "name": "Stress relieve/HT",
            "value": ""
        },
        {
            "name": "Finish",
            "value": ""
        },
        {
            "name": "End use",
            "value": ""
        },
        {
            "name": "Operating temp",
            "value": ""
        },
        {
            "name": "Special notes & tol",
            "value": ""
        },
        {
            "name": "Customer approval",
            "value": "__________________________ "
        },
        {
            "name": "Customer date",
            "value": " _______ "
        },
        {
            "name": "Vendor approval",
            "value": "__________________________ "
        },
            {
            "name": "Vendor date",
            "value": " _______ "
        }
    ],
    "type": "Spring/Extension",
    "version": "8",
    "result": {
        "objective_value": 0,
        "termination_condition": ""
    },
    "jsontype": "ODOP",
    "units": "Metric"
};
