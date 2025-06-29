import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import ConfirmPage from '../pages/ConfirmPage';
import HomePage from '../pages/HomePage';
import ProtectedPage from '../pages/ProtectedPage';
import AdminPage from '../pages/AdminPage';
import Nav from './Nav';
import RequireAuth from './RequireAuth';
import RequireAdmin from './RequireAdmin';

function App2() {
  const navigate = useNavigate();

//  useEffect(() => {
//    navigate('/');
//  }, []);

    return (
    <AuthProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/protected" element={
          <RequireAuth><ProtectedPage /></RequireAuth>
        } />
        <Route path="/admin" element={
          <RequireAdmin><AdminPage /></RequireAdmin>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App2;
