export const initialState = {
    "constants": [
        {
            "name": "Density",
            "value": [
                { "name": "Hydrogen", "value": 1.0/(1728.0*192.0), "selected": false },
                { "name": "Helium", "value": 0.0103/1728.0, "selected": false },
                { "name": "Air", "value": 0.074887/1728.0, "selected": false },
                { "name": "Gasoline", "value": 0.026, "selected": false },
                { "name": "Water", "value": 0.036, "selected": true },
                { "name": "Aluminium", "value": 0.098, "selected": false },
                { "name": "Iron", "value": 0.284, "selected": false },
                { "name": "Copper", "value": 0.324, "selected": false },
                { "name": "Silver", "value": 0.379, "selected": false },
                { "name": "Lead", "value": 0.410, "selected": false },
                { "name": "Gold", "value": 0.698, "selected": false },
                { "name": "UnObtainium", "value": 1.0, "selected": false },
                { "name": "Kryptonite", "value": 0.003425*0.036127292, "selected": false }
            ],
            "units": "lb/cu-in",
            "type": "table"
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
