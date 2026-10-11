import React, { act } from 'react';
import * as ReactDOMClient from "react-dom/client";
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';
jest.mock('../axiosConfig', () => ({ get: jest.fn(), delete: jest.fn() }));
import AdminUserManagerPage from '../menus/Admin/AdminUserManagerPage';

global.IS_REACT_ACT_ENVIRONMENT = true;

it('renders AdminUserManagerPage without crashing', () => {
  const div = document.createElement('div');
  const root = ReactDOMClient.createRoot(div);
  try {
    act(() => {
      root.render(
        <MemoryRouter>
          <AuthContext.Provider value={{ authState: { isAdmin: true, token: 'TEST' }, setAuthState: jest.fn() }}>
            <AdminUserManagerPage />
          </AuthContext.Provider>
        </MemoryRouter>
      );
    });
    expect(div.querySelector('h1').textContent).toBe('User Manager');
  } finally {
    act(() => root.unmount());
  }
});
