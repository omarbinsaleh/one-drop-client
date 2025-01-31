import React from 'react'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner';
import DashboardWelcome from '../components/DashboardWelcome';
import Table from '../components/Table';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const DonorDashboard = () => {
  const {user, loading} = useAuth();

  // FETCH NECESSARY DATA
  const {isPending, data, error} = useQuery({
    queryKey: ['donation-request'],
    queryFn: async () => {
      const {data:donationRequests} = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests?email=${user?.email}`);
      const recentDonationRequests = donationRequests.length >= 3 ? donationRequests.slice(0, 3) : donationRequests;

      return {donationRequests, recentDonationRequests};
    }
  })

  // CHANGE THE PAGE TITLE:
  document.title = "Dashboard | One Drop"
  
  // RENDER THE SPINNER WHILE THE DATA IS BING LOADED
  if (isPending || loading) {
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
        <Table tabelData={data.recentDonationRequests}></Table>
      </section>
    </div>
  )
}

export default DonorDashboard;
