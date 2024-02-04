import { CONSTRAINED, VALID_MIN } from '../../../store/actionTypes';
export const initialState = {
    "symbol_table": [
        {
            "input": true,
            "name": "OD_Free",
            "value": 1.1,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.01,
            "cmax": 10.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Outside diameter in free (no load) condition</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/Tooltip_C_OD_Arrows64.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Wire_Dia",
            "value": 0.1055,
            "units": "inch",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.005,
            "cmax": 2.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td>Wire diameter</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "L_Free",
            "value": 3.25,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Length in free (no load) condition</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
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
            "cmax": 40,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>Total number of coils</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Force_1",
            "value": 10.0,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 50,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td><Table><tr><td>Minimum operating load (Length L_1)</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/Tooltip_C_Force_1_160.png\"/></td></tr></Table></td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Force_2",
            "value": 39.0,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.01,
            "cmax": 1000,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Maximum operating load (Length L_2)</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Mean_Dia",
            "value": 0.9945,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 10.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Average of inside and outside diameters</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Coils_A",
            "value": 8.0,
            "units": "coils",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 1.0,
            "cmax": 50.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>Number of Active coils</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Rate",
            "value": 22.6315,
            "units": "Lb/In",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 200.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Spring rate (spring constant); slope of force-deflection curve</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Deflect_1",
            "value": 0.04,
            "units": "inches",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 20.0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.001,
            "tooltip": "<Table><tr><td>Deflection from free to load point 1</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Deflect_2",
            "value": 1.7674,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 20.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td>Deflection from free to load point 2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_1",
            "value": 3.2058,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Spring length at load point 1</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_2",
            "value": 1.4826,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 50.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Spring length at load point 2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false,
            "validminchoices": [ "L_Solid" ],
            "validminchoice": 0
        },
        {
            "input": false,
            "name": "L_Stroke",
            "value": 1.7233,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.010,
            "cmax": 100.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td>Length of stroke from point 1 to point 2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_Solid",
            "value": 1.0550,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 10.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Spring length when fully compressed</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false,
            "propagate": [{ name: "L_2", minmax: VALID_MIN }]
        },
        {
            "input": false,
            "name": "Slenderness",
            "value": 3.2680,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 4.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Ratio of free length (L_Free) to mean diameter (Mean_Dia)</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "ID_Free",
            "value": 0.8890,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.01,
            "cmax": 10.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td>Inside diameter in free (no load) condition</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Weight",
            "value": 0.0776,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.01,
            "cmax": 10.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.001,
            "tooltip": "<Table><tr><td>Weight of one spring</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Spring_Index",
            "value": 9.426,
            "units": "ratio",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 4.0,
            "cmax": 25.0,
            "validmin": 1.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>Ratio of mean coil diameter (Mean_Dia) to wire diameter (Wire_Dia)</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Force_Solid",
            "value": 49.67,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 1000.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Load required to fully compress the spring</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_1",
            "value": 2489.3,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 100000.0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1000.0,
            "tooltip": "<Table><tr><td>Torsion stress in wire at load point 1</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_2",
            "value": 99573.98,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 100.0,
            "cmax": 200000.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 10000.0,
            "tooltip": "<Table><tr><td>Torsion stress in wire at load point 2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_Solid",
            "value": 123661.2,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 100.0,
            "cmax": 200000.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1000.0,
            "tooltip": "<Table><tr><td>Torsion stress in wire when spring is fully compressed</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "FS_2",
            "value": 1.3127,
            "units": "ratio",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 1.02,
            "cmax": 1.5,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Factor of safety at load point 2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "FS_Solid",
            "value": 1.057,
            "units": "ratio",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 1.5,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Factor of safety when the spring is fully compressed</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "FS_CycleLife",
            "value": 1.2581,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.02,
            "cmax": 1.5,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Factor of safety to achieve the target cycle life category. See on-line Help.</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Cycle_Life",
            "value": 33266.8,
            "units": "cycles",
            "lmin": 0,
            "lmax": 0,
            "cmin": 10000,
            "cmax": 10010000,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 10000.0,
            "tooltip": "<Table><tr><td>Rough estimate of the average number of cycles to failure when cycling between point 1 and point 2. See on-line Help.</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "%_Avail_Deflect",
            "value": 80.52,
            "units": "%",
            "lmin": 0,
            "lmax": CONSTRAINED,
            "cmin": 1.0,
            "cmax": 90.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 10.0,
            "tooltip": "<Table><tr><td>Deflection of load point 2 as a percent of total available deflection</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Energy",
            "value": 35.3268,
            "units": "in-lb",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.001,
            "cmax": 1000000,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Change in elastic potential energy between 1 and 2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Spring_Type",
            "value": "Compression",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Compression spring design</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Prop_Calc_Method",
            "value": 1,
            "units": "",
            "format": "table",
            "table": "Spring/Compression/prop_calc",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Property Calculation Method - Controls how material properties are determined and used.  1-Use values from material table  2-Specify Tensile, %_Tensile_Stat & %_Tensile_Endur  3-Specify allowable stresses: Stress_Lim_Stat & Stress_Lim_Endur</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Material_Type",
            "value": 2,
            "units": "",
            "format": "table",
            "table": "Spring/mat_us",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Select wire material</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
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
            "tooltip": "<Table><tr><td>Wire specification</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
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
            "tooltip": "<Table><tr><td>Coil winding process temperature - Cold coiled vs. Hot wound</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Material_File",
            "value": "mat_us.json",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>mat_metric.json for metric units. Anything else for US IPS units</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "Life_Category",
            "value": 1,
            "units": "",
            "format": "table",
            "table": "Spring/Compression/lifetarget",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Select cycle life target. Confirm that FS_CycleLife MIN constraint is enabled to utilize the selected %_Tensile_Endur for the material.</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Density",
            "value": 0.036,
            "units": "lb/cu-in",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Wire material density</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Torsion_Modulus",
            "value": 11500000.0,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Wire torsion modulus (G)</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
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
            "tooltip": "<Table><tr><td>Reduction factor applied to modulus of hot-wound materials</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Tensile",
            "value": 261000.0,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Wire tensile strength (computed as a function of wire diameter when Prop_Calc_Method=1; See on-line Help for details)</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
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
            "tooltip": "<Table><tr><td>Allowable percent of tensile strength for selected life cycle category</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
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
            "tooltip": "<Table><tr><td>Allowable percent of tensile strength for static applications</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Stress_Lim_Endur",
            "value": 130709.6,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Allowable stress for selected life cycle category</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Stress_Lim_Stat",
            "value": 130709.6,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Allowable stress for static applications</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "End_Type",
            "value": 4,
            "units": "",
            "format": "table",
            "table": "Spring/Compression/endtypes",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Select end type</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Inactive_Coils",
            "value": 2.0,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Number of coils not contributing to deflection. Depends on End_Type.</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Add_Coils@Solid",
            "value": 0.0,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Adjusts calculation of L_Solid. Depends on End_Type. See on-line Help for details.</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
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
            "tooltip": "<Table><tr><td>Name of the catalog from which the catalog entry was selected</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
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
            "tooltip": "<Table><tr><td>Catalog entry which was selected from the named catalog</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Compression/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "tbase010",
            "value": 0.010,
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
            "value": 0.400,
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
            "value": 100000.0,
            "units": "PSI",
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
            "value": "Compression Spring default start point - US units ..."
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
            "name": "Shot peen",
            "value": "yes no; details"
        },
        {
            "name": "Stress relieve/HT",
            "value": ""
        },
        {
            "name": "Pre-set",
            "value": "no"
        },
        {
            "name": "Finish",
            "value": ""
        },
        {
            "name": "Squareness",
            "value": ""
        },
        {
            "name": "End use",
            "value": ""
        },
        {
            "name": "Fits in / Works over",
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
    "type": "Spring/Compression",
    "version": "12",
    "result": {
        "objective_value": 0,
        "termination_condition": "Use the File : Open menu item to select a different design type (Compression, Extension, Torsion) or units (US, metric)."
    },
    "jsontype": "ODOP",
    "units": "US"
};
