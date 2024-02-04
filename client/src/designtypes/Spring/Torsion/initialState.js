import { CONSTRAINED, FIXED } from '../../../store/actionTypes';
export const initialState = {
    "symbol_table": [
        {
            "input": true,
            "name": "OD_Free",
            "value": 0.9265,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 10.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td><Table><tr><td>Outside diameter in free (no load) condition</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/Tor_OD_Free_160.png\"/></td></tr></Table></td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Wire_Dia",
            "value": 0.063,
            "units": "inch",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.008,
            "cmax": 1.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td><Table><tr><td>Wire diameter</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/Tor_Wire_Dia_160.png\"/></td></tr></Table></td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Coils_T",
            "value": 7.04,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1,
            "cmax": 100,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>Total number of coils</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "M_1",
            "value": 0.050,
            "units": "lb-in",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 100,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.001,
            "tooltip": "<Table><tr><td>Minimum operating load (Length L_1)</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "M_2",
            "value": 4.00,
            "units": "lb-in",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1,
            "cmax": 20000,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td>Maximum operating load</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Coil_Spacing",
            "value": 0.00,
            "units": "inches",
            "lmin": FIXED,
            "lmax": FIXED,
            "cmin": 0,
            "cmax": 1.0,
            "oldlmin": 0,
            "oldlmax": 0,
            "oldcmin": 0,
            "oldcmax": 1.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.001,
            "tooltip": "<Table><tr><td>Empty space between each turn (not the same as pitch)</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Mean_Dia",
            "value": 0.8635,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 10.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Average of coil inside and outside diameters</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "ID_Free",
            "value": 0.8005,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.01,
            "cmax": 10.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td>Inside diameter in free (no load) condition</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Coils_A",
            "value": 7.039999,
            "units": "coils",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 1.0,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>Number of Active coils</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Rate",
            "value": 0.019995,
            "units": "#in/deg",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.001,
            "cmax": 200.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.00001,
            "tooltip": "<Table><tr><td>Spring rate (spring constant); slope of force-deflection curve</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Deflect_1",
            "value": 2.500620 ,
            "units": "deg",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 200.0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Deflection from free to load point 1</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Deflect_2",
            "value": 200.049600,
            "units": "deg",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 360.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>Deflection from free to load point 2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_Body",
            "value": 0.506520,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Length of spring body in free condition</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_1",
            "value": 0.506958,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Spring length at load point 1</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "L_2",
            "value": 0.541529,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Spring length at load point 2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "End_Angle_Free",
            "value": 0.0,
            "units": "deg",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 300.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>Relative angle between arms in free condition</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stroke",
            "value": 197.5489,
            "units": "deg",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 360.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Angular displacement from point 1 to point 2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Weight",
            "value": 0.017836,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.00001,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.00001,
            "tooltip": "<Table><tr><td>Weight of one spring</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Spring_Index",
            "value": 13.70634,
            "units": "ratio",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 4.0,
            "cmax": 25.0,
            "validmin": 1.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1.0,
            "tooltip": "<Table><tr><td>Ratio of mean coil diameter (Mean_Dia) to wire diameter (Wire_Dia)</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "End_Deflect_All",
            "value": 0.0,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 10.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>End deflection allowance</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_1",
            "value": 2036.8,
            "units": "psi",
            "lmin": 0,
            "lmax": 0,
            "cmin": 100.0,
            "cmax": 100000.0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1000.0,
            "tooltip": "<Table><tr><td>Bending stress in body wire at load point 1</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_2",
            "value": 162944.0,
            "units": "psi",
            "lmin": 0,
            "lmax": 0,
            "cmin": 100.0,
            "cmax": 200000.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 10000.0,
            "tooltip": "<Table><tr><td>Bending stress in body wire at load point 2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Stress_End",
            "value": 1.0,
            "units": "psi",
            "lmin": 0,
            "lmax": 0,
            "cmin": 100.0,
            "cmax": 100000.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 10000.0,
            "tooltip": "<Table><tr><td>Placeholder for future calculation of bending stress in end arms</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": true
        },
        {
            "input": false,
            "name": "FS_2",
            "value": 1.312625,
            "units": "ratio",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 1.05,
            "cmax": 1.6,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Factor of safety at load point 2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
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
            "cmin": 1.0,
            "cmax": 1.5,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Factor of safety to achieve the target cycle life category. See on-line Help.</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
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
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 10000.0,
            "tooltip": "<Table><tr><td>Rough estimate of the average number of cycles to failure when cycling between point 1 and point 2. See on-line Help.</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "%_Safe_Deflect",
            "value": 76.18,
            "units": "%",
            "lmin": 0,
            "lmax": CONSTRAINED,
            "cmin": 1.0,
            "cmax": 95.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 10.0,
            "tooltip": "<Table><tr><td>Deflection of load point 2 as a percent of total safe deflection</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Force_Arm_2",
            "value": 1.0,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 1000.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td>Force produced at distance of Arm_2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Energy",
            "value": 1.0,
            "units": "in-lb",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.001,
            "cmax": 1000000,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td>Change in elastic potential energy between 1 and 2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Spring_Type",
            "value": "Torsion",
            "units": "",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Torsion spring design</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Prop_Calc_Method",
            "value": 1,
            "units": "",
            "format": "table",
            "table": "Spring/Torsion/prop_calc",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Property Calculation Method - Controls how material properties are determined and used.  1-Use values from material table  2-Specify Tensile, %_Ten_Bnd_Stat & %_Ten_Bnd_Endur  3-Specify allowable stresses: Stress_Lim_Bnd_Stat & Stress_Lim_Bnd_Endur</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
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
            "tooltip": "<Table><tr><td>Select wire material</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
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
            "tooltip": "<Table><tr><td>Wire specification</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
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
            "tooltip": "<Table><tr><td>Coil winding process temperature - Cold coiled vs. Hot wound</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Heat_Treat",
            "value": "1",
            "units": "",
            "format": "table",
            "table": "Spring/Torsion/heattreat",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Selects heat treatment process</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Catalog_Number",
            "value": "Defined in initialState ... -1?",
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
            "name": "Material_File",
            "value": "mat_us.json",
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
            "table": "Spring/Torsion/lifetarget",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Select cycle life target. Confirm that FS_CycleLife MIN constraint is enabled to utilize the selected %_Tensile_Endur for the material.</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Inactive_Coils",
            "value": 0.0,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Number of coils not contributing to deflection. Depends on End_Type.</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": true
        },
        {
            "input": true,
            "name": "Density",
            "value": 0.284,
            "units": "lb/cu-in",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Wire material density</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Elastic_Modulus",
            "value": 30000000.0,
            "units": "psi",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Wire elastic modulus (E)</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
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
            "tooltip": "<Table><tr><td>Reduction factor applied to modulus of hot-wound materials</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Tensile",
            "value": 285179.2,
            "units": "psi",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Wire tensile strength (computed as a function of wire diameter when Prop_Calc_Method=1; See on-line Help for details)</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "%_Ten_Bnd_Endur",
            "value": 50.0,
            "units": "%",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Allowable percent of tensile strength for selected life cycle category</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "%_Ten_Bnd_Stat",
            "value": 75.0,
            "units": "%",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Allowable percent of tensile strength for static applications</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Stress_Lim_Bnd_Endur",
            "value": 142589.6,
            "units": "psi",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Allowable stress for selected life cycle category</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Stress_Lim_Bnd_Stat",
            "value": 213884.4,
            "units": "psi",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Allowable stress for static applications</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "End_Type",
            "value": 1,
            "units": "",
            "format": "table",
            "table": "Spring/Torsion/endtypes",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Select end type</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Arm_1",
            "value": 0.0,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Moment arm at end 1</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Arm_2",
            "value": 0.0,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Moment arm at end 2</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Xlen_1",
            "value": 0.0,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Extra length at end 1 added to wire length calculation</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Xlen_2",
            "value": 0.0,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Extra length at end 2 added to wire length calculation</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "L_End_1",
            "value": 0.0,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Length at end 1 used to calculate end deflection allowance</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "L_End_2",
            "value": 0.0,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.0,
            "tooltip": "<Table><tr><td>Length at end 2 used to calculate end deflection allowance</td></tr><tr><td><Image fluid src=\"http://localhost:3000/designtypes/Spring/Torsion/FileName.png\"/></td></tr></Table>",
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
            "units": "psi",
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
            "value": "Torsion Spring default start point - US units ..."
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
            "name": "Relative end pos. & tol.",
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
    "type": "Spring/Torsion",
    "version": "8",
    "result": {
        "objective_value": 0,
        "termination_condition": ""
    },
    "jsontype": "ODOP",
    "units": "US"
};
