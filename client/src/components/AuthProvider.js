import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from '../axiosConfig';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(null);
//  console.log('AuthProvider','authState=',authState);

  useEffect(() => {
    axios.get('/api/v1/me').then(res => {
//      console.log('res.data.authState=',res.data.authState);
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
  const auth = useContext(AuthContext);
//  console.log('useAuth','auth',auth);
  return auth;
}