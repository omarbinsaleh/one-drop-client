import React from 'react'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner';
import AdminDashboard from '../components/AdminDashboard';
import DonorDashboard from '../components/DonorDashboard';

const DashboardHome = () => {
  const {user, loading} = useAuth();

  // CHANGE THE PAGE TITLE:
  document.title = "Dashboard | One Drop"
  
  // RENDER THE SPINNER WHILE THE DATA IS BING LOADED
  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      {user?.role === 'admin' && <AdminDashboard />}

      {user?.role === 'donor' && <DonorDashboard />}
    </div>
  )
}

export default DashboardHome
