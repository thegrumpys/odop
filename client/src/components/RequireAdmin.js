import React from 'react';
import { useAuth } from './AuthProvider';

export default function RequireAdmin({ children }) {
  const { authState } = useAuth();
  return authState?.isAdmin ? children : null;
}
