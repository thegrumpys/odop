import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from './components/Spinner';
import { ErrorModal } from './components/ErrorModal';
import FEApp from './components/FEApp';

//function loggerMiddleware({ getState }) {
//    return next => action => {
//      console.log('will dispatch', action);
//      
//      // Call the next dispatch method in the middleware chain.
//      const returnValue = next(action)
//      
//      console.log('state after dispatch', getState());
//      
//      // This will likely be the action itself, unless
//      // a middleware further in chain changed it.
//      return returnValue
//    }
//  }

console.log('CLIENT: PUBLIC_URL =', process.env.PUBLIC_URL, 'NODE_ENV =', process.env.NODE_ENV, 'starting on port =', process.env.PORT, 'node version =', process.version);
ReactDOM.render(<div id="root2"><Spinner /><ErrorModal /><FEApp /></div>, document.getElementById('root'));
