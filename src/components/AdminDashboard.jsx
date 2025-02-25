import React from 'react'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner';
import DashboardWelcome from '../components/DashboardWelcome';

const AdminDashboard = () => {
  const {user, loading} = useAuth();

  // CHANGE THE PAGE TITLE:
  document.title = "Dashboard | One Drop"
  
  // RENDER THE SPINNER WHILE THE DATA IS BING LOADED
  if (loading) {
    return <Spinner />
  }

  return (
    <div className=''>
      {/* welcome section */}
      <section>
        <DashboardWelcome user={user}></DashboardWelcome>
      </section>

      <section>
        
      </section>
    </div>
  )
}

export default AdminDashboard;
