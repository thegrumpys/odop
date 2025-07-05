import React from 'react';
import { useAuth } from './AuthProvider';

export default function RequireAuth({ children }) {
  const { authState } = useAuth();
  return authState?.isAuthenticated ? children : null;
}
