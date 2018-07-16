import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { pcylWebApp } from '../reducers';
import { startup } from '../actionCreators';
import { initialState } from '../initialState';

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
