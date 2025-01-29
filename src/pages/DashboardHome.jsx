import React from 'react'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner';
import DashboardWelcome from '../components/DashboardWelcom';

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
      {/* welcome section */}
      <section>
        {/* <h1 className="text-2xl font-bold text-secondary mb-6 dark:text-white" >Welcome {user?.displayName} 👋</h1> */}
        <DashboardWelcome user={user}></DashboardWelcome>
      </section>
    </div>
  )
}

export default DashboardHome
