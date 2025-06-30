import React from 'react';
import { useAuth } from '../components/AuthProvider';

export default function HomePage() {
  const { authState } = useAuth();

  return (
    <div>
      <h1>Welcome to the App</h1>

      {authState.isAuthenticated ? (
        <div>
          <p>{authState?.first_name} {authState?.last_name} is logged in as <strong>{authState.email}</strong> with token <strong>{authState.token}</strong>.</p>
          {authState.isAdmin && <p>You have <strong>admin privileges</strong>.</p>}
        </div>
      ) : (
        <p>Please log in or register to access more features.</p>
      )}
    </div>
  );
}
