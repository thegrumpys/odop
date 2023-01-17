import { CONSTRAINED, UNINITIALIZED } from '../../store/actionTypes';
import * as o from './symbol_table_offsets';
import * as e from './eqns';
export const initialState = {
    "symbol_table": [
        {
            "input": true,
            "name": "L_Free",
            "value": 3.25,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.1,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Length in free (no load) condition",
            "type": "equationset",
            "hidden": false,
            "eqns": [
                {
                    "eqn": null, // User input
                    "sets": [o.L_1, o.Deflect_1, o.L_2, o.Deflect_2]
                },
                {
                    "refs": [o.L_1, o.Deflect_1],
                    "eqn": e.eqn_L_Free_L_1_Deflect_1,
                    "sets": [o.Rate]
                },
                {
                    "refs": [o.L_2, o.Deflect_2],
                    "eqn": e.eqn_L_Free_L_2_Deflect_2,
                    "sets": [o.Rate]
                }
            ]
        },
        {
            "input": true,
            "name": "Force_1",
            "value": 10.0,
            "units": "pounds",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0,
            "cmax": 50,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "Minimum operating load (Length L_1)",
            "type": "equationset",
            "hidden": false,
            "eqns": [
                {
                    "eqn": null, // User input
                    "sets": [o.Rate, o.Deflect_1]
                },
                {
                    "refs": [o.Rate, o.Deflect_1],
                    "eqn": e.eqn_Force_1_Rate_Deflect_1,
                    "sets": [o.L_1]
                }
            ]
        },
        {
            "input": true,
            "name": "Force_2",
            "value": 39.0,
            "units": "pounds",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.01,
            "cmax": 1000,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Maximum operating load (Length L_2)",
            "type": "equationset",
            "hidden": false,
            "eqns": [
                {
                    "eqn": null, // User input
                    "sets": [o.Rate, o.Deflect_2]
                },
                {
                    "refs": [o.Rate, o.Deflect_2],
                    "eqn": e.eqn_Force_2_Rate_Deflect_2,
                    "sets": [o.L_2]
                }
            ]
        },
        {
            "input": true,
            "name": "Rate",
            "value": 22.6315,
            "units": "Lb/In",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 200.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Spring rate (spring constant); slope of force-deflection curve",
            "type": "equationset",
            "hidden": false,
            "eqns": [
                {
                    "eqn": null, // User input
                    "sets": [o.Force_1, o.Deflect_1, o.Force_2, o.Deflect_2]
                },
                {
                    "refs": [o.Force_1, o.Deflect_1],
                    "eqn": e.eqn_Rate_Force_1_Deflect_1,
                    "sets": [o.L_1]
                },
                {
                    "refs": [o.Force_2, o.Deflect_2],
                    "eqn": e.eqn_Rate_Force_2_Deflect_2,
                    "sets": [o.L_2]
                }
            ]
        },
        {
            "input": false,
            "name": "Deflect_1",
            "value": 0.04,
            "units": "inches",
            "lmin": CONSTRAINED|UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.0,
            "cmax": 20.0,
            "validmin": -Number.MAX_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.001,
            "tooltip": "Deflection from free to load point 1",
            "type": "equationset",
            "hidden": false,
            "eqns": [
                {
                    "eqn": null, // User input
                    "sets": [o.Force_1, o.Rate, o.L_Free, o.L_1]
                },
                {
                    "refs": [o.Force_1, o.Rate],
                    "eqn": e.eqn_Deflect_1_Force_1_Rate,
                    "sets": [o.L_1]
                },
                {
                    "refs": [o.L_Free, o.L_1],
                    "eqn": e.eqn_Deflect_1_L_Free_L_1,
                    "sets": [o.Rate]
                }
            ]
        },
        {
            "input": false,
            "name": "Deflect_2",
            "value": 1.7674,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 20.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "Deflection from free to load point 2",
            "type": "equationset",
            "hidden": false,
            "eqns": [
                {
                    "eqn": null, // User input
                    "sets": [o.Force_2, o.Rate, o.L_Free, o.L_2]
                },
                {
                    "refs": [o.Force_2, o.Rate],
                    "eqn": e.eqn_Deflect_2_Force_2_Rate,
                    "sets": [o.L_2]
                },
                {
                    "refs": [o.L_Free, o.L_2],
                    "eqn": e.eqn_Deflect_2_L_Free_L_2,
                    "sets": [o.Rate]
                }
            ]
        },
        {
            "input": false,
            "name": "L_1",
            "value": 3.2058,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Spring length at load point 1",
            "type": "equationset",
            "hidden": false,
            "eqns": [
                {
                    "eqn": null, // User input
                    "sets": [o.L_Free, o.Deflect_1]
                },
                {
                    "refs": [o.L_Free, o.Deflect_1],
                    "eqn": e.eqn_L_1_L_Free_Deflect_1,
                    "sets": [o.Rate]
                }
            ]
        },
        {
            "input": false,
            "name": "L_2",
            "value": 1.4826,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 1.0,
            "cmax": 50.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "Spring length at load point 2",
            "type": "equationset",
            "hidden": false,
            "eqns": [
                {
                    "eqn": null, // User input
                    "sets": [o.L_Free, o.Deflect_2]
                },
                {
                    "refs": [o.L_Free, o.Deflect_2],
                    "eqn": e.eqn_L_2_L_Free_Deflect_2,
                    "sets": [o.Rate]
                }
            ]
        },
        {
            "input": false,
            "name": "L_Stroke",
            "value": 1.7233,
            "units": "inches",
            "lmin": UNINITIALIZED,
            "lmax": UNINITIALIZED,
            "cmin": 0.010,
            "cmax": 100.0,
            "validmin": -Number.MIN_VALUE,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "Length of stroke from point 1 to point 2",
            "type": "equationset",
            "hidden": false,
            "eqns": [
                {
                    "eqn": null, // User input
                    "sets": [o.L_1, o.L_2]
                },
                {
                    "refs": [o.L_1, o.L_2],
                    "eqn": e.eqn_L_Stroke_L_1_L_2,
                    "sets": []
                }
            ]
        }
    ],
    "labels": [
        {
            "name": "COMMENT",
            "value": "Hooke's Law default start point - US units ..."
        }
    ],
    "type": "Hookes-Law",
    "version": "1",
    "result": {
        "objective_value": 0,
        "termination_condition": "Use the File : Open menu item to select a different design type or units (US, metric)."
    },
    "jsontype": "ODOP",
    "units": "US"
};
