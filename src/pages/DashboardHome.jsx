import React from 'react'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner';
import AdminDashboard from '../components/AdminDashboard';
import DonorDashboard from '../components/DonorDashboard';
import VolunteerDashboard from '../components/VolunteerDashboard';

const DashboardHome = () => {
  const { user, loading } = useAuth();

  // CHANGE THE PAGE TITLE:
  document.title = "Dashboard | One Drop"

  // RENDER THE SPINNER WHILE THE DATA IS BING LOADED
  if (loading) {
    return <Spinner />
  }

  return (
    <div>
      {/* display the admin dashboard when user is an admin */}
      {user?.isAdmin && <AdminDashboard />}

      {/* display the donor's dashboard when the user is a donor */}
      {user?.isDonor && <DonorDashboard />}

      {/* display the volunteer dashboard when the user is a volunteer */}
      {user?.isVolunteer && <VolunteerDashboard />}
    </div>
  )
}

export default DashboardHome
