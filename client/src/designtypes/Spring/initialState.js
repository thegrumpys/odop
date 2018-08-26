import { CONSTRAINED } from '../../store/actionTypes';
export const initialState = {
    "constants": [
        {
            "name": "Spring_Type",
            "value": "Compression",
            "units": "",
            "tooltip": "Compression spring design"
        },
        {
            "name": "Material_Type",
            "value": 1,
            "units": "",
            "type": "table",
            "table": "mat_ips",
            "tooltip": "Select wire material"
        },
        {
            "name": "ASTM/Fed_Spec",
            "value": "A228/QQW-470",
            "units": "",
            "tooltip": "Wire specification"
        },
        {
            "name": "End_Type",
            "value": "Closed&Ground",
            "units": "",
            "tooltip": "Select end type"
        },
        {
            "name": "Catalog_Number",
            "value": "undefined",
            "units": ""
        },
        {
            "name": "Process",
            "value": "Cold_Coiled",
            "units": "",
            "tooltip": "Spring winding process temperature"
        },
        {
            "name": "Material_File",
            "value": "pass in mat_ips.json?",
            "units": ""
        },
        {
            "name": "Dialog_Switch",
            "value": 0,
            "units": "switch"
        },
        {
            "name": "Prop_Calc_Method",
            "value": 1,
            "units": "switch"
        },
        {
            "name": "End_Calc_Method",
            "value": 1,
            "units": "switch"
        },
        {
            "name": "Life_Category",
            "value": 1,
            "units": "index",
            "tooltip": "Select cycle life target. Controls allowable stresses"
        },
        {
            "name": "Material_Index",
            "value": 2,
            "units": "index"
        },
        {
            "name": "End_Type_Index",
            "value": 1,
            "units": "index"
        },
        {
            "name": "Inactive_Coils",
            "value": 2.0,
            "units": "coils",
            "tooltip": "Number of coils not contributing to deflection based on end type"
        },
        {
            "name": "Add_Coils@Solid",
            "value": 0.0,
            "units": "coils",
            "tooltip": "Additional coils not contributing to deflection"
        },
        {
            "name": "Density",
            "value": 0.036,
            "units": "lb/cu-in",
            "tooltip": "Wire material density"
        },
        {
            "name": "Torsion_Modulus",
            "value": 11500000.0,
            "units": "PSI",
            "tooltip": "Wire torsion modulus (G)"
        },
        {
            "name": "Hot_Factor_Kh",
            "value": 1.0,
            "units": "ratio",
            "tooltip": "Reduction factor applied to modulus of hot-wound materials"
        },
        {
            "name": "Tensile",
            "value": 261000.0,
            "units": "PSI",
            "tooltip": "Wire tensile strength (computed as a function of wire diameter)"
        },
        {
            "name": "%_Tensile_Endur",
            "value": 50.0,
            "units": "%",
            "tooltip": "Allowable percent of tensile strength for selected life cycle category"
        },
        {
            "name": "%_Tensile_Stat",
            "value": 50.0,
            "units": "%",
            "tooltip": "Allowable percent of tensile strength for static applications"
        },
        {
            "name": "unused",
            "value": 75.0,
            "units": ""
        },
        {
            "name": "Stress_Lim_Endur",
            "value": 130709.6,
            "units": "PSI",
            "tooltip": "Allowable stress for selected life cycle category"
        },
        {
            "name": "Stress_Lim_Stat",
            "value": 130709.6,
            "units": "PSI",
            "tooltip": "Allowable stress for static applications"
        },
        {
            "name": "tbase010",
            "value": 0.010,
            "units": ""
        },
        {
            "name": "tbase400",
            "value": 0.400,
            "units": ""
        },
        {
            "name": "const_term",
            "value": 1.0,
            "units": ""
        },
        {
            "name": "slope_term",
            "value": 1.0,
            "units": ""
        },
        {
            "name": "tensile_010",
            "value": 100000.0,
            "units": "PSI"
        }
    ],
    "design_parameters": [
        {
            "name": "OD_Free",
            "value": 1.1,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 2.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Outside diameter in free (no load) condition"
        },
        {
            "name": "Wire_Dia",
            "value": 0.1055,
            "units": "inch",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0.5,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Wire diameter"
        },
        {
            "name": "L_Free",
            "value": 3.25,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 5.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Length in free (no load) condition"
        },
        {
            "name": "Coils_T",
            "value": 10.0,
            "units": "coils",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 20,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Total number of coils"
        },
        {
            "name": "Force_1",
            "value": 1.0,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 50,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Working load at point 1 (Length L_1)"
        },
        {
            "name": "Force_2",
            "value": 40.0,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 50,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Working load at point 2 (Length L_2)"
        }
    ],
    "state_variables": [
        {
            "name": "Mean_Dia",
            "value": 0.9945,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Average of inside and outside diameters"
        },
        {
            "name": "Coils_A",
            "value": 8.0,
            "units": "coils",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 1.0,
            "cmax": 40.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Number of Active coils"
        },
        {
            "name": "Rate",
            "value": 22.6315,
            "units": "Lb/In",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 200.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Spring rate (spring constant); slope of force-deflection curve"
        },
        {
            "name": "Deflect_1",
            "value": 0.04,
            "units": "inches",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 20.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Deflection from free to load point 1"
        },
        {
            "name": "Deflect_2",
            "value": 1.7674,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 20.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Deflection from free to load point 2"
        },
        {
            "name": "L_1",
            "value": 3.2058,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 200.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Spring length at load point 1"
        },
        {
            "name": "L_2",
            "value": 1.4826,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 100.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Spring length at load point 2"
        },
        {
            "name": "L_Stroke",
            "value": 1.7233,
            "units": "inches",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.050,
            "cmax": 100.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Length of stroke from point 1 to point 2"
        },
        {
            "name": "L_Solid",
            "value": 1.0550,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Spring length when fully compressed"
        },
        {
            "name": "Slenderness",
            "value": 3.2680,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Ratio of free length (L_Free) to mean diameter (Mean_Dia)"
        },
        {
            "name": "ID_Free",
            "value": 0.8890,
            "units": "inches",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.1,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Inside diameter in free (no load) condition"
        },
        {
            "name": "Weight",
            "value": 0.0776,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0.01,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Weight of one spring"
        },
        {
            "name": "Spring_Index",
            "value": 9.426,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 4.0,
            "cmax": 10.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Ratio of mean coil diameter (Mean_Dia) to wire diameter (Wire_Dia)"
        },
        {
            "name": "Force_Solid",
            "value": 49.67,
            "units": "pounds",
            "lmin": 0,
            "lmax": 0,
            "cmin": 4.0,
            "cmax": 100.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Load required to fully compress the spring"
        },
        {
            "name": "Stress_1",
            "value": 2489.3,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 100.0,
            "cmax": 10000.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Torsion stress in wire at load point 1"
        },
        {
            "name": "Stress_2",
            "value": 99573.98,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 100.0,
            "cmax": 10000.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Torsion stress in wire at load point 2"
        },
        {
            "name": "Stress_Solid",
            "value": 123661.2,
            "units": "PSI",
            "lmin": 0,
            "lmax": 0,
            "cmin": 100.0,
            "cmax": 10000.0,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Torsion stress in wire when spring is fully compressed"
        },
        {
            "name": "FS_2",
            "value": 1.3127,
            "units": "ratio",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 1.02,
            "cmax": 1.5,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Factor of safety at load point 2"
        },
        {
            "name": "FS_Solid",
            "value": 1.057,
            "units": "ratio",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 1.5,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Factor of safety when the spring is fully compressed"
        },
        {
            "name": "FS_CycleLife",
            "value": 1.2581,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.02,
            "cmax": 1.5,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Factor of safety to achieve the target cycle life category"
        },
        {
            "name": "Cycle_Life",
            "value": 33266.8,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.02,
            "cmax": 1.5,
            "ioclass": 0,
            "sdlim": 1.0,
            "tooltip": "Rough estimate of the average number of cycles to failure"
        },
        {
            "name": "%_Avail_Deflect",
            "value": 80.52,
            "units": "%",
            "lmin": 0,
            "lmax": CONSTRAINED,
            "cmin": 0,
            "cmax": 90.0,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Deflection of load point 2 as a percent of total available deflection"
        }
    ],
    "labels": [
        {
            "name": "COMMENT",
            "value": "Compression Spring default startup file ..."
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
            "name": "City",
            "value": ""
        },
        {
            "name": "State & Zip",
            "value": ""
        },
        {
            "name": "Phone",
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
            "name": "Finish",
            "value": ""
        }
    ],
    "name": "initialState",
    "type": "Spring",
    "version": "1",
    "result": {
        "objective_value": 0,
        "termination_condition": "",
        "violated_constraint_count": 0
    }
};
