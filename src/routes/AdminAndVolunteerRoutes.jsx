import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';

const AdminAndVolunteerRoutes = ({children}) => {
  const {user, loading} = useAuth();
  const location = useLocation();

  if (loading) {
   return <Spinner />
  }

  if (user.isAdmin || user.isVolunteer) {
   return children;
  };

  return <Navigate to={'/auth/sign-in'} state={location.pathname}/>
}

export default AdminAndVolunteerRoutes
