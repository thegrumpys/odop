import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
jest.mock('../axiosConfig', () => ({ post: jest.fn() }));
import ResendConfirmationPage from '../components/ResendConfirmationPage';

test('renders ResendConfirmationPage without crashing', () => {
  const div = document.createElement('div');
  const root = ReactDOMClient.createRoot(div);
  root.render(<ResendConfirmationPage />);
  root.unmount(div);
});
