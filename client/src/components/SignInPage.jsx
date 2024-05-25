import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { redirect } from 'react-router-dom';
import SignInPageWidget from './SignInPageWidget';
import { useOktaAuth } from '@okta/okta-react';

export default function SignInPage() {
  console.log("SignInPage - Mounting...");
  const { oktaAuth, authState } = useOktaAuth();
  console.log('SignInPage','oktaAuth=',oktaAuth,'authState=',authState);
  if (authState && authState.isAuthenticated) redirect('/');
  return authState ? (authState.isAuthenticated ? <>@@@</> : <SignInPageWidget />) : null;
}
