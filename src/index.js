import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import { pcylWebApp } from './reducers.js';
import { CHANGE_DESIGN_PARAMETER } from './actionTypes.js';
import { changeStateVariable } from './actionCreators';

global.FREESTAT = 0; // free             status in lmin & lmax
global.SETSTAT = 1; // constrained      status in lmin & lmax
global.FIXEDSTAT = 2; // fixed            status in lmin & lmax

export const initialState = {
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
                "name": "CONTACT_PERSON",
                "value": ""
            },
            {
                "name": "COMPANY_NAME",
                "value": ""
            },
            {
                "name": "STREET",
                "value": ""
            },
            {
                "name": "CITY",
                "value": ""
            },
            {
                "name": "STATE_&_ZIP",
                "value": ""
            },
            {
                "name": "PHONE",
                "value": ""
            },
            {
                "name": "DATE",
                "value": ""
            },
            {
                "name": "PART_NUMBER",
                "value": ""
            },
            {
                "name": "FINISH",
                "value": ""
            },
            {
                "name": "COMMENT",
                "value": ""
            }
        ],
        "name": "Piston-Cylinder",
        "version": "1.2"
    };

//function loggerMiddleware({ getState }) {
//    return next => action => {
//      console.log('will dispatch', action)
//      
//      // Call the next dispatch method in the middleware chain.
//      const returnValue = next(action)
//      
//      console.log('state after dispatch', getState())
//      
//      // This will likely be the action itself, unless
//      // a middleware further in chain changed it.
//      return returnValue
//    }
//  }

const equationsMiddleware = store => next => action => {
    const returnValue = next(action);
    var design;
    var pi = 0;
    var pressure = 0;
    var radius = 1;
    var thickness = 2;
    var force = 0;
    var area = 1;
    var stress = 2;
    if (action.type === CHANGE_DESIGN_PARAMETER) {
        // Compute and dispatch state variable changes
        /* eslint-disable no-fallthrough */
        switch (action.payload.name) {
        case "RADIUS":
            design = store.getState();
            var a = design.constants[pi].value * design.design_parameters[radius].value * design.design_parameters[radius].value;
//            console.log("a="+a);
            store.dispatch(changeStateVariable("AREA", a));
        case "PRESSURE":
            design = store.getState();
            var f = design.design_parameters[pressure].value * design.state_variables[area].value;
//            console.log("f="+f);
            store.dispatch(changeStateVariable("FORCE", f));
        case "THICKNESS":
            design = store.getState();
            var t = (design.design_parameters[pressure].value * design.design_parameters[radius].value) / (2.0 * design.design_parameters[thickness].value);
//            console.log("t="+t);
            store.dispatch(changeStateVariable("STRESS", t));
        default:
        }
        /* eslint-enable */
    }
    return returnValue;
}

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const middleware = composeEnhancers(applyMiddleware(/*loggerMiddleware,*/equationsMiddleware));

const store = createStore(
        pcylWebApp,
        initialState,
        middleware
        );

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));