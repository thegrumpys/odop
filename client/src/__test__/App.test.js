import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { initialState } from '../initialState';
import App from '../components/App';
import { startup, changeDesignParameterValue } from '../store/actionCreators';
import { pcylWebApp } from '../store/reducers';

it('renders without crashing', () => {
    const store = createStore(
            pcylWebApp,
            initialState
            );
    store.dispatch(startup());
    const div = document.createElement('div');
    div.setAttribute("id", "root");
    ReactDOM.render(<Provider store={store}><App /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders with different design parameter and state variable constraint violations', () => {
    const store = createStore(
            pcylWebApp,
            initialState
            );
    store.dispatch(startup());
    const div = document.createElement('div');
    div.setAttribute("id", "root");
    ReactDOM.render(<Provider store={store}><App /></Provider>, div);
    store.dispatch(changeDesignParameterValue("PRESSURE", 5000));
    ReactDOM.render(<Provider store={store}><App /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
