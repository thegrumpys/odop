import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from '../axiosConfig';
import config from '../config';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(null);
//  console.log('AuthProvider','authState=',authState);

  useEffect(() => {
    if (!config.features.enableDB) {
      setAuthState({ isAuthenticated: false, isAdmin: false });
      return;
    }

    let isMounted = true;
    axios.get('/api/v1/me')
      .then(res => {
//        console.log('res.data.authState=',res.data.authState);
        if (isMounted) {
          setAuthState(res.data.authState);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAuthState({ isAuthenticated: false, isAdmin: false });
        }
      });

    return () => {
      isMounted = false;
    };
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