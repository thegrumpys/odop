export const initialState = {
        "constants": [
            {
                "name": "Density",
                "value": 0.036,
                "units": "lb/cu-in"
            }
        ],
        "design_parameters": [
            {
                "name": "Length",
                "value": 12.0,
                "oldvalue": 1.0,
                "units": "inches",
                "lmin": 1,
                "lmax": 0,
                "cmin": 0,
                "cmax": 100.00,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 1.0,
                "smax": 1.0,
                "vmin": -1.0,
                "vmax": -1.0
            },
            {
                "name": "Width",
                "value": 10.0,
                "oldvalue": 1.0,
                "units": "inches",
                "lmin": 1,
                "lmax": 0,
                "cmin": 0.0,
                "cmax": 80.0,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 1.0,
                "smax": 1.0,
                "vmin": -1.0,
                "vmax": -1.0
            },
            {
                "name": "Height",
                "value": 8.0,
                "oldvalue": 1.0,
                "units": "inches",
                "lmin": 1,
                "lmax": 0,
                "cmin": 0.0,
                "cmax": 60.0,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 1.0,
                "smax": 1.0,
                "vmin": -1.0,
                "vmax": -1.0
            }
        ],
        "state_variables": [
            {
                "name": "Volume",
                "value": 10.0,
                "oldvalue": 1.0,
                "units": "cu-in",
                "lmin": 0,
                "lmax": 0,
                "cmin": 1.0,
                "cmax": 1200.0,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 1.0,
                "smax": 1.0,
                "vmin": -1.0,
                "vmax": -1.0
            },
            {
                "name": "Surface Area",
                "value": 10.0,
                "oldvalue": 1.0,
                "units": "sq-in",
                "lmin": 0,
                "lmax": 0,
                "cmin": 0,
                "cmax": 900,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 1.0,
                "smax": 1.0,
                "vmin": -1.0,
                "vmax": -1.0
            },
            {
                "name": "VolToSurfArea",
                "value": 10.0,
                "oldvalue": 1.0,
                "units": "ratio",
                "lmin": 0,
                "lmax": 0,
                "cmin": 0,
                "cmax": 10,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 1.0,
                "smax": 1.0,
                "vmin": -1.0,
                "vmax": -1.0
            },
            {
                "name": "Girth",
                "value": 10.0,
                "oldvalue": 1.0,
                "units": "inches",
                "lmin": 0,
                "lmax": 0,
                "cmin": 0,
                "cmax": 100.0,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 1.0,
                "smax": 1.0,
                "vmin": -1.0,
                "vmax": -1.0 
            },
            {
                "name": "Length+Girth",
                "value": 10.0,
                "oldvalue": 1.0,
                "units": "inches",
                "lmin": 0,
                "lmax": 1,
                "cmin": 0,
                "cmax": 108.0,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 1.0,
                "smax": 108.0,
                "vmin": -1.0,
                "vmax": -1.0
            },
            {
                "name": "Diagonal",
                "value": 10.0,
                "oldvalue": 1.0,
                "units": "inches",
                "lmin": 0,
                "lmax": 0,
                "cmin": 0,
                "cmax": 100.,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 1.0,
                "smax": 1.0,
                "vmin": -1.0,
                "vmax": -1.0
            },
            {
                "name": "Weight",
                "value": 10.0,
                "oldvalue": 1.0,
                "units": "lb",
                "lmin": 0,
                "lmax": 1,
                "cmin": 0,
                "cmax": 70.0,
                "ioclass": 0,
                "sdlim": 0,
                "smin": 1.0,
                "smax": 1.0,
                "vmin": -1.0,
                "vmax": -1.0
            }
        ],
        "labels": [
            {
                "name": "COMMENT",
                "value": "Rectangular Solid default startup file ..."
            }
        ],
        "name": "initialState",
        "type": "Solid",
        "version": "1",
        "result": {
            "objective_value": 0.0,
            "termination_condition": "None",
            "violated_constraint_count": 0
        }
    };
