import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from '../axiosConfig';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
//  console.log('AuthProvider');
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    axios.get('/api/v1/me').then(res => {
//      console.log('res=',res);
      setAuthState(res.data.authState);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authState = useContext(AuthContext);
//  console.log('useAuth','authState=',authState);
  return authState;
}