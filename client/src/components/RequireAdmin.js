import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

export default function RequireAdmin({ children }) {
  const { authState } = useContext(AuthContext);
  return authState?.isAdmin ? children : <Navigate to="/unauthorized" />;
}
