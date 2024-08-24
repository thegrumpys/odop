import { CONSTRAINED } from '../../store/actionTypes';
export const initialState = {
    "symbol_table": [
        {
            "input": true,
            "name": "Length",
            "value": 12.0,
            "units": "inches",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.01,
            "cmax": 100.00,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1,
            "tooltip": "<Table><tr><td>Longest dimension</td></tr><tr><td><Image fluid src=\"/designtypes/Solid/tooltips/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Width",
            "value": 10.0,
            "units": "inches",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.01,
            "cmax": 80.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1,
            "tooltip": "<Table><tr><td>Width dimension</td></tr><tr><td><Image fluid src=\"/designtypes/Solid/tooltips/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Height",
            "value": 8.0,
            "units": "inches",
            "lmin": CONSTRAINED,
            "lmax": 0,
            "cmin": 0.01,
            "cmax": 60.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1,
            "tooltip": "<Table><tr><td>Shortest dimension</td></tr><tr><td><Image fluid src=\"/designtypes/Solid/tooltips/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": true,
            "name": "Material",
            "value": 7,
            "units": "",
            "format": "table",
            "table": "Solid/mat_us",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "sdlim": 0,
            "tooltip": "<Table><tr><td>Select from list</td></tr><tr><td><Image fluid src=\"/designtypes/Solid/tooltips/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": true,
            "name": "Density",
            "value": 0.036,
            "units": "lb/cu-in",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0,
            "tooltip": "<Table><tr><td>Weight per unit volume of the selected material</td></tr><tr><td><Image fluid src=\"/designtypes/Solid/tooltips/FileName.png\"/></td></tr></Table>",
            "type": "calcinput",
            "hidden": false
        },
        {
            "input": false,
            "name": "Volume",
            "value": 0,
            "units": "cu-in",
            "lmin": 0,
            "lmax": 0,
            "cmin": 1.0,
            "cmax": 1200.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1,
            "tooltip": "<Table><tr><td>Three-dimensional space enclosed</td></tr><tr><td><Image fluid src=\"/designtypes/Solid/tooltips/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Surface Area",
            "value": 0,
            "units": "sq-in",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 900,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1,
            "tooltip": "<Table><tr><td>Sum of the area of the surfaces</td></tr><tr><td><Image fluid src=\"/designtypes/Solid/tooltips/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "VolToSurfArea",
            "value": 0,
            "units": "ratio",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 10,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.01,
            "tooltip": "<Table><tr><td>Computed ratio of volume to surface area</td></tr><tr><td><Image fluid src=\"/designtypes/Solid/tooltips/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Girth",
            "value": 0,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 100.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1,
            "tooltip": "<Table><tr><td>Perimeter around width and height dimensions</td></tr><tr><td><Image fluid src=\"/designtypes/Solid/tooltips/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Length+Girth",
            "value": 0,
            "units": "inches",
            "lmin": 0,
            "lmax": CONSTRAINED,
            "cmin": 0,
            "cmax": 108.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1,
            "tooltip": "<Table><tr><td>Sum of length and girth dimensions. Shippers limit to 108 in.</td></tr><tr><td><Image fluid src=\"/designtypes/Solid/tooltips/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Diagonal",
            "value": 0,
            "units": "inches",
            "lmin": 0,
            "lmax": 0,
            "cmin": 0,
            "cmax": 100.,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 1,
            "tooltip": "<Table><tr><td>3D distance from corner to furthest corner</td></tr><tr><td><Image fluid src=\"/designtypes/Solid/tooltips/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        },
        {
            "input": false,
            "name": "Weight",
            "value": 0,
            "units": "lb",
            "lmin": 0,
            "lmax": CONSTRAINED,
            "cmin": 0,
            "cmax": 70.0,
            "validmin": 0.0,
            "validmax": Number.MAX_VALUE,
            "sdlim": 0.1,
            "tooltip": "<Table><tr><td>Volume times Density of the selected material. Shippers limit to 70 Lb.</td></tr><tr><td><Image fluid src=\"/designtypes/Solid/tooltips/FileName.png\"/></td></tr></Table>",
            "type": "equationset",
            "hidden": false
        }
    ],
    "labels": [
        {
            "name": "COMMENT",
            "value": "Rectangular Solid default start point - US units ..."
        }
    ],
    "type": "Solid",
    "version": "9",
    "result": {
        "objective_value": 0,
        "termination_condition": ""
    },
    "jsontype": "ODOP",
    "units": "US"
};
