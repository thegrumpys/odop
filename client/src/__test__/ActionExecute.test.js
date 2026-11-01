import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import ActionExecute from '../menus/Action/ActionExecute';
import { AuthContext } from '../components/AuthProvider';
import * as scripts from '../designtypes/Spring/Compression/execute';

global.IS_REACT_ACT_ENVIRONMENT = true;

test('refreshes scripts on opening and admin changes, without refreshing while closed', () => {
  const getNames = jest.spyOn(scripts, 'getExecuteNames');
  const store = createStore((state = { model: { type: 'Spring/Compression' } }) => state);
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const render = (authState) => act(() => root.render(
    <Provider store={store}>
      <AuthContext.Provider value={{ authState }}><ActionExecute /></AuthContext.Provider>
    </Provider>
  ));
  const options = () => Array.from(document.querySelectorAll('.modal option')).map((option) => option.value);
  const close = () => act(() => Array.from(document.querySelectorAll('.modal button')).find((button) => button.textContent === 'Cancel').click());
  try {
    render(null);
    expect(getNames).not.toHaveBeenCalled();
    act(() => container.querySelector('.dropdown-item').click());
    expect(options()).not.toContain('mkCompressionStartups');
    close();
    getNames.mockClear();

    render({ isAdmin: true });
    expect(getNames).not.toHaveBeenCalled();
    act(() => container.querySelector('.dropdown-item').click());
    expect(getNames).toHaveBeenCalledWith(true);
    expect(options()).toContain('mkCompressionStartups');

    render({ isAdmin: false });
    expect(options()).not.toContain('mkCompressionStartups');
    expect(document.querySelector('.modal').textContent).not.toContain('Execute All');
    close();
    getNames.mockClear();
    act(() => container.querySelector('.dropdown-item').click());
    expect(getNames).toHaveBeenCalledTimes(1);
    expect(getNames).toHaveBeenCalledWith(false);
  } finally {
    act(() => root.unmount());
    container.remove();
    jest.restoreAllMocks();
  }
});
