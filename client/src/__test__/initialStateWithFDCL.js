import { CONSTRAINED } from '../store/actionTypes';
export const initialStateWithFDCL = {
    "symbol_table": [
        {
            "input": true,
            "name": "PRESSURE",
            "value": 500,
            "units": "LB/SQ-IN",
            "lmin": 0,
            "lmax": CONSTRAINED,
            "cmin": 0,
            "cmax": 1500,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Gas PRESSURE applied to piston AREA",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "RADIUS",
            "value": 0.4,
            "units": "INCH",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 0,
            "cmax": 0.5,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Piston dimension; creates AREA where PRESSURE is applied",
            "type": "equationset",
            "hidden": false,
            "cminchoices": ["THICKNESS"],
            "cmaxchoices": ["THICKNESS"]
        },
        {
            "input": true,
            "name": "THICKNESS",
            "value": 0.04,
            "units": "INCH",
            "lmin": CONSTRAINED,
            "lmax": CONSTRAINED,
            "cmin": 0,
            "cmax": 0.05,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Dimension of cylinder wall providing containment for PRESSURE",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "FORCE",
            "value": 0,
            "units": "LBS.",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 1000,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Push generated by PRESSURE acting on piston AREA",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "AREA",
            "value": 0,
            "units": "SQ.-IN.",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Effective amount of piston surface exposed to PRESSURE",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "STRESS",
            "value": 0,
            "units": "PSI",
            "lmin": 0,
            "lmax": CONSTRAINED,
            "cmin": 0,
            "cmax": 3000,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Force per unit area within cylinder wall; created by PRESSURE",
            "type": "equationset",
            "hidden": false
        }
    ],
    "labels": [
        {
            "name": "COMMENT",
            "value": "PCYL Default startup file ..."
        }
    ],
    "type": "Piston-Cylinder",
    "version": "4",
    "result": {
        "objective_value": 0,
        "termination_condition": "",
        "violated_constraint_count": 0
    },
    "jsontype": "ODOP",
    "units": "US"
};
