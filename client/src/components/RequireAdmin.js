import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function RequireAdmin({ children }) {
  const { authState } = useAuth();
  return authState?.isAdmin ? children : null;
}
