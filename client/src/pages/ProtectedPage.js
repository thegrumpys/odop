import React from 'react';
import { useAuth } from '../components/AuthProvider';

export default function ProtectedPage() {
  const { authState } = useAuth();

  return (
    <div>
      <h2>Protected Page</h2>
      <p>This content is only visible to logged-in users.</p>
      <p>Welcome {authState?.first_name} {authState?.last_name}, <strong>{authState?.email}</strong>!</p>
    </div>
  );
}
