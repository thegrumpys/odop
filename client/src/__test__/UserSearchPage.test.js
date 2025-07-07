import React from 'react';
import ReactDOM from 'react-dom';
jest.mock('../axiosConfig', () => ({ get: jest.fn(), delete: jest.fn() }));
import AdminUserSearchPage from '../components/AdminUserSearchPage';

it('renders AdminUserSearchPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminUserSearchPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
