export const initialState = {
    "constants": [
        {
            "name": "Density",
            "value": 0.036,
            "units": "lb/cu-in",
            "table": [
                { "name": "Hydrogen", "value": 0.000003014 },
                { "name": "Helium", "value": 0.000005961 },
                { "name": "Air", "value": 0.00004334 },
                { "name": "Kryptonite", "value": 0.0001237 },
                { "name": "Gasoline", "value": 0.026 },
                { "name": "Water", "value": 0.036 },
                { "name": "Aluminium", "value": 0.098 },
                { "name": "Iron", "value": 0.284 },
                { "name": "Steel", "value": 0.290 },
                { "name": "Copper", "value": 0.324 },
                { "name": "Silver", "value": 0.379 },
                { "name": "Lead", "value": 0.410 },
                { "name": "Gold", "value": 0.698 },
                { "name": "UnObtainium", "value": 1.0 }
            ]
        }
    ],
    "design_parameters": [
        {
            "name": "Length",
            "value": 12.0,
            "units": "inches",
            "lmin": 1,
            "lmax": 0,
            "cmin": 0,
            "cmax": 100.00,
            "ioclass": 0,
            "sdlim": 0
        },
        {
            "name": "Width",
            "value": 10.0,
            "units": "inches",
            "lmin": 1,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 80.0,
            "ioclass": 0,
            "sdlim": 0
        },
        {
            "name": "Height",
            "value": 8.0,
            "units": "inches",
            "lmin": 1,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 60.0,
            "ioclass": 0,
            "sdlim": 0
        }
    ],
    "state_variables": [
        {
            "name": "Volume",
            "value": 0,
            "units": "cu-in",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 1200.0,
            "ioclass": 0,
            "sdlim": 0
        },
        {
            "name": "Surface Area",
            "value": 0,
            "units": "sq-in",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 900,
            "ioclass": 0,
            "sdlim": 0
        },
        {
            "name": "VolToSurfArea",
            "value": 0,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 10,
            "ioclass": 0,
            "sdlim": 0
        },
        {
            "name": "Girth",
            "value": 0,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 100.0,
            "ioclass": 0,
            "sdlim": 0
        },
        {
            "name": "Length+Girth",
            "value": 0,
            "units": "inches",
            "lmin": 0,
            "lmax": 1,
            "cmin": 0,
            "cmax": 108.0,
            "ioclass": 0,
            "sdlim": 0
        },
        {
            "name": "Diagonal",
            "value": 0,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 100.,
            "ioclass": 0,
            "sdlim": 0
        },
        {
            "name": "Weight",
            "value": 0,
            "units": "lb",
            "lmin": 0,
            "lmax": 1,
            "cmin": 0,
            "cmax": 70.0,
            "ioclass": 0,
            "sdlim": 0
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
        "objective_value": 0,
        "termination_condition": "",
        "violated_constraint_count": 0
    }
};
