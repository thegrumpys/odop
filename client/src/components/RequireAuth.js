import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function RequireAuth({ children }) {
  const { authState } = useAuth();
  return authState?.isAuthenticated ? children : <Navigate to="/login" />;
}
