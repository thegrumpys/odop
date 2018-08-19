export const initialState = {
    "constants": [
    ],
    "design_parameters": [
        {
            "name": "PRESSURE",
            "value": 500,
            "units": "LB/SQ-IN",
            "lmin": 0,
            "lmax": 1,
            "cmin": 0,
            "cmax": 1500,
            "ioclass": 0,
            "sdlim": 0
        },
        {
            "name": "RADIUS",
            "value": 0.4,
            "units": "INCH",
            "lmin": 1,
            "lmax": 1,
            "cmin": 0,
            "cmax": 0.5,
            "ioclass": 0,
            "sdlim": 0
        },
        {
            "name": "THICKNESS",
            "value": 0.04,
            "units": "INCH",
            "lmin": 1,
            "lmax": 1,
            "cmin": 0,
            "cmax": 0.05,
            "ioclass": 0,
            "sdlim": 0
        }
    ],
    "state_variables": [
        {
            "name": "FORCE",
            "value": 0,
            "units": "LBS.",
            "lmin": 1,
            "lmax": 0,
            "cmin": 1000,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0
        },
        {
            "name": "AREA",
            "value": 0,
            "units": "SQ.-IN.",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "ioclass": 0,
            "sdlim": 0
        },
        {
            "name": "STRESS",
            "value": 0,
            "units": "PSI",
            "lmin": 0,
            "lmax": 1,
            "cmin": 0,
            "cmax": 3000,
            "ioclass": 0,
            "sdlim": 0
        }
    ],
    "labels": [
        {
            "name": "COMMENT",
            "value": "PCYL Default startup file ..."
        }
    ],
    "name": "initialState",
    "type": "Piston-Cylinder",
    "version": "1",
    "result": {
        "objective_value": 0,
        "termination_condition": "",
        "violated_constraint_count": 0
    }
};
