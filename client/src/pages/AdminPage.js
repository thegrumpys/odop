import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

export default function AdminPage() {
  const { authState } = useContext(AuthContext);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome {authState?.first_name} {authState?.last_name}, <strong>{authState?.email}</strong>. You have administrative access.</p>

      <ul>
        <li>🔒 View all users (coming soon)</li>
        <li>📨 Manage system emails</li>
        <li>🛠 Feature toggles and system config</li>
      </ul>
    </div>
  );
}
