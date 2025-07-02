import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from '../axiosConfig';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
//  console.log('AuthProvider');
  const [authState, setAuthState] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.get('/me').then(res => {
      setAuthState(res.data.authState);
      setIsAuthenticated(res.data.isAuthenticated);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, isAuthenticated, setAuthState, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const auth = useContext(AuthContext);
//  console.log('useAuth','auth=',auth);
  return auth;
}