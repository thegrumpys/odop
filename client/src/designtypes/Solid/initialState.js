import { CONSTRAINED } from '../../store/actionTypes';
export const initialState = {
    "constants": [
        {
            "name": "Material",
            "value": 6,
            "units": "",
            "type": "table",
            "table": "materials",
            "tooltip": "Select from list"
        },
        {
            "name": "Density",
            "value": 0.036,
            "units": "lb/cu-in",
            "tooltip": "Weight per unit volume of the selected material"
        }
    ],
    "design_parameters": [
        {
            "name": "Length",
            "value": 12.0,
            "units": "inches",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0,
            "cmax": 100.00,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Longest dimension"
        },
        {
            "name": "Width",
            "value": 10.0,
            "units": "inches",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 80.0,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Width dimension"
        },
        {
            "name": "Height",
            "value": 8.0,
            "units": "inches",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.0,
            "cmax": 60.0,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Shortest dimension"
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
            "sdlim": 0,
            "tooltip": "Three-dimensional space enclosed"
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
            "sdlim": 0,
            "tooltip": "Sum of the area of the surfaces"
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
            "sdlim": 0,
            "tooltip": "Computed ratio of volume to surface area"
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
            "sdlim": 0,
            "tooltip": "Perimeter around width and height dimensions"
        },
        {
            "name": "Length+Girth",
            "value": 0,
            "units": "inches",
            "lmin": 0,
            "lmax": CONSTRAINED,
            "cmin": 0,
            "cmax": 108.0,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Sum of length and girth dimensions"
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
            "sdlim": 0,
            "tooltip": "3D distance from corner to furthest corner"
        },
        {
            "name": "Weight",
            "value": 0,
            "units": "lb",
            "lmin": 0,
            "lmax": CONSTRAINED,
            "cmin": 0,
            "cmax": 70.0,
            "ioclass": 0,
            "sdlim": 0,
            "tooltip": "Volume times Density of the selected material"
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
    "version": "2",
    "result": {
        "objective_value": 0,
        "termination_condition": "",
        "violated_constraint_count": 0
    }
};
