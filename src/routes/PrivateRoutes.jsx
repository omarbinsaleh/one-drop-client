import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../firebase/firebase.config';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';

const PrivateRoutes = ({ children }) => {
   const location = useLocation();
   const { user, setUser, loading, setLoading } = useAuth();

   if (loading) {
      return <Spinner></Spinner>
   };

   if (!user) {
      return <Navigate to={'/auth/sign-in'} state={location.pathname}></Navigate>
   };

   return children;
}

export default PrivateRoutes;
