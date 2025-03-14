import React from 'react'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner';
import DashboardWelcome from '../components/DashboardWelcome';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';
import StatCard from './StatCard';
import { FaTint, FaUser } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: statistics, isPending, isError } = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const { data } = await axiosPublic('/admin/statistics');
      return data;
    }
  })

  // CHANGE THE PAGE TITLE:
  document.title = "Dashboard | One Drop"

  // RENDER THE SPINNER WHILE THE DATA IS BING LOADED
  if (loading || isPending) {
    return <Spinner />
  }

  console.log(statistics)

  return (
    <div className=''>
      {/* welcome section */}
      <section>
        <DashboardWelcome user={user}></DashboardWelcome>
      </section>

      <section className='my-10 p-5'>
        <h1 className='text-4xl font font-semibold'>Statistics Data</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5'>
          {/* total user  */}
          <StatCard
            icon={<FaUser className="text-blue-500 text-3xl" />}
            title='Total Users'
            count={statistics?.users?.count}
            growth={statistics?.users?.growth}
            link='/dashboard/all-users'
          />

          {/* total donation requests */}
          <StatCard
            icon={<FaTint className="text-green-500 text-3xl" />}
            title='Total Donation Requests'
            count={statistics?.bloodDonationRequests?.count}
            growth={statistics?.bloodDonationRequests?.growth} 
            link='/dashboard/all-donation-requests'
            />
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard;
