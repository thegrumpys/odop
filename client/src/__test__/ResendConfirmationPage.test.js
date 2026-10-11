import React, { act } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
jest.mock('../axiosConfig', () => ({ post: jest.fn() }));
import ResendConfirmationPage from '../components/ResendConfirmationPage';

global.IS_REACT_ACT_ENVIRONMENT = true;

test('renders ResendConfirmationPage and navigates to sign in', () => {
  const div = document.createElement('div');
  const root = ReactDOMClient.createRoot(div);
  try {
    act(() => {
      root.render(
        <MemoryRouter initialEntries={['/resend']}>
          <Routes>
            <Route path="/resend" element={<ResendConfirmationPage />} />
            <Route path="/login" element={<h3>Sign in page</h3>} />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(div.querySelector('h3').textContent).toBe('Resend Confirmation');
    act(() => {
      div.querySelector('a[href="/login"]').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(div.querySelector('h3').textContent).toBe('Sign in page');
  } finally {
    act(() => root.unmount());
  }
});
