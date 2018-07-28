initialState = {
        "constants": [
            {
                "name": "PI",
                "value": 3.141592653589793,
                "units": "_"
            }
        ],
        "design_parameters": [
            {
                "name": "PRESSURE",
                "value": 500,
                "oldvalue": 500,
                "units": "LB/SQ-IN",
                "lmin": 0,
                "lmax": 1,
                "cmin": 0,
                "cmax": 1500,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 0.06666666666666667,
                "smax": 1500,
                "vmin": 0,
                "vmax": -0.6666666666666666
            },
            {
                "name": "RADIUS",
                "value": 0.4,
                "oldvalue": 0.4,
                "units": "INCH",
                "lmin": 1,
                "lmax": 1,
                "cmin": 0,
                "cmax": 0.5,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 0.4,
                "smax": 0.5,
                "vmin": -1,
                "vmax": -0.19999999999999996
            },
            {
                "name": "THICKNESS",
                "value": 0.04,
                "oldvalue": 0.04,
                "units": "INCH",
                "lmin": 1,
                "lmax": 1,
                "cmin": 0,
                "cmax": 0.05,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 0.04,
                "smax": 0.05,
                "vmin": -1,
                "vmax": -0.20000000000000004
            }
        ],
        "state_variables": [
            {
                "name": "FORCE",
                "value": 251.32741228718348,
                "oldvalue": 0,
                "units": "LBS.",
                "lmin": 1,
                "lmax": 0,
                "cmin": 1000,
                "cmax": 0,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 1000,
                "smax": 0.06666666666666667,
                "vmin": 0.7486725877128165,
                "vmax": 0
            },
            {
                "name": "AREA",
                "value": 0.5026548245743669,
                "oldvalue": 0,
                "units": "SQ.-IN.",
                "lmin": 0,
                "lmax": 0,
                "cmin": 0,
                "cmax": 0,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 0.06666666666666667,
                "smax": 0.06666666666666667,
                "vmin": 0,
                "vmax": 0
            },
            {
                "name": "STRESS",
                "value": 2500,
                "oldvalue": 0,
                "units": "PSI",
                "lmin": 0,
                "lmax": 1,
                "cmin": 0,
                "cmax": 3000,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 0.06666666666666667,
                "smax": 3000,
                "vmin": 0,
                "vmax": -0.16666666666666666
            }
        ],
        "labels": [
            {
                "name": "COMMENT",
                "value": "PCYL Default startup file ..."
            }
        ],
        "type": "Piston-Cylinder",
        "version": "1.2",
        "search_results": {
            "objective_value": 0.5605106435926049,
            "termination_condition": "None",
            "violated_constraint_count": 0
        }
    };

module.export = initialState;