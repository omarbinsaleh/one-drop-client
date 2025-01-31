import React from 'react'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner';
import DashboardWelcome from '../components/DashboardWelcome';
import Table from '../components/Table';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NoData from './NoData';
import { toast } from 'react-toastify';

const DonorDashboard = () => {
   const { user, loading } = useAuth();

   // FETCH NECESSARY DATA
   const { isPending, data, error, refetch } = useQuery({
      queryKey: ['donation-request'],
      queryFn: async () => {
         const { data: donationRequests } = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests?email=${user?.email}`);
         const recentDonationRequests = donationRequests.length >= 3 ? donationRequests.slice(0, 3) : donationRequests;

         return { donationRequests, recentDonationRequests };
      }
   })

   // CHANGE THE PAGE TITLE:
   document.title = "Dashboard | One Drop"

   const handleAction = async (e, id) => {
      const action = e.target.value;
      console.log(action);
      console.log(id);

      // when the Done button is clicked on
      if (action === 'done') {
         const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, {status: 'done'});
         console.log(data);
         if (data.modifiedCount) {
            refetch();
            toast.success("Status is updated successfully");
            return;
         }
      }

      // when the Done button is clicked on
      if (action === 'cancel') {
         const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, {status: 'pending'});
         console.log(data);
         if (data.modifiedCount) {
            refetch();
            toast.success("Status is updated successfully");
            return;
         }
      }

      // when the delete button is clicked on
      if (action === 'delete') {
         const isConfirm = confirm("Are you sure to delete theis request?\nThis action can not be undo.");
         if (!isConfirm) return;
         
         const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`);
         console.log(data);
         if (data.deletedCount) {
            refetch();
            toast.success("Deleted Successfully");
            return;
         };
      }

   }

   // RENDER THE SPINNER WHILE THE DATA IS BING LOADED
   if (isPending || loading) {
      return <Spinner />
   }

   return (
      <div>
         {/* Welcome Section */}
         <section>
            <DashboardWelcome user={user}></DashboardWelcome>
         </section>

         {/* Display Donation Request Made by the Current User */}
         <section className='py-8 my-12 max-h-screen flex flex-col w-full'>
            <h1 className='text-2xl font-bold text-center uppercase text-secondary'>Recent Donation Requests</h1>
            <div className="w-24 h-[2px] my-1 mx-auto bg-secondary/80"></div>

            <main className='border border-secondary/10 my-10 min-h-80 flex-1'>
               {data?.recentDonationRequests.length
                  // if there is any donation request
                  ? <Table tabelData={data.recentDonationRequests} handleAction={handleAction}></Table>

                  // when there is no donation requests to display
                  : (
                     <NoData
                        message="You haven't made any donation requests yet."
                        actionText="Create a Request"
                        actionLink="/dashboard/create-donation-request"
                     />
                  )}
            </main>
         </section>
      </div>
   )
}

export default DonorDashboard;
