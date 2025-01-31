import React from 'react'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner';
import DashboardWelcome from '../components/DashboardWelcome';

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
        <DashboardWelcome user={user}></DashboardWelcome>
      </section>

      <section>
        <h1 className='text-2xl font-semibold text-center my-8 uppercase'> ----&gt; Recent Donation Requests &lt;--- </h1>
      </section>
    </div>
  )
}

export default DashboardHome
