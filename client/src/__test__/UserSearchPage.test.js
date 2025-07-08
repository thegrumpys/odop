import React from 'react';
import ReactDOM from 'react-dom';
jest.mock('../axiosConfig', () => ({ get: jest.fn(), delete: jest.fn() }));
import AdminUserManagerPage from '../components/AdminUserManagerPage';

it('renders AdminUserManagerPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminUserManagerPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
