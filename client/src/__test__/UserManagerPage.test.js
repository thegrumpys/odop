import React from 'react';
import * as ReactDOMClient from "react-dom/client";
jest.mock('../axiosConfig', () => ({ get: jest.fn(), delete: jest.fn() }));
import AdminUserManagerPage from '../menus/Admin/AdminUserManagerPage';

it('renders AdminUserManagerPage without crashing', () => {
  const div = document.createElement('div');
  const root = ReactDOMClient.createRoot(div);
  root.render(<AdminUserManagerPage />);
  root.unmount(div);
});
