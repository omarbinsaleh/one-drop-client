import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner';
import DashboardWelcome from '../components/DashboardWelcome';
import Table from '../components/Table';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NoData from './NoData';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DataFethingMessage from './DataFethingMessage';
import { FaArrowAltCircleDown, FaArrowAltCircleRight } from 'react-icons/fa';
import Title from './Title';

const DonorDashboard = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const { user, loading } = useAuth();

   // FETCH NECESSARY DATA
   const { isPending, data, error, refetch, isFetching } = useQuery({
      queryKey: ['donation-request'],
      queryFn: async () => {
         // const { data: donationRequests } = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests?email=${user?.email}`);
         // const recentDonationRequests = donationRequests.length >= 3 ? donationRequests.slice(0, 3) : donationRequests;
         const {data:recentDonationRequests} = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests?email=${user?.email}&count=3`);

         return { recentDonationRequests };
      }
   })

   // FORCE REFETCHING DATA ON COMPONENT MOUNT
   useEffect(() => {
      refetch()
   }, [])

   // CHANGE THE PAGE TITLE:
   document.title = "Dashboard | One Drop"

   // HANDLE THE ACTION BUTTON CLICK
   const handleAction = async (e, id, currentStatus) => {
      // identify the action triggered by using any of the action buttons in the Table
      const action = e.target.value;

      // when the edit button is clicked on
      if (action === 'edit') {
         // check for current status and
         // do not proceed any further if the current status is 'eidt' already
         if (currentStatus === 'edit') {
            toast.warn('Action not allowed');
            return { success: true, message: 'Navigation to Update Donation Request page was successfull' }
         }

         navigate(`/dashboard/update-donation-request/${id}`, { state: location.pathname });
         return { success: true, message: 'Navigation to Update Donation Request page was successfull' }
      }

      // when the Inprogress button is clicked on
      if (action === 'inprogress') {
         // check for current status and 
         // do not proceed any further if the current status is 'done' already
         if (currentStatus === 'inprogress') {
            toast.warn('Action not allowed');
            return { success: true, modifiedCount: 0, message: `Action not allowed` }
         }

         const updatedDoc = {
            status: 'inprogress',
            donorInfo: { name: '', email: '' }
         };
         const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, { donationRequest: updatedDoc });
         console.log(data);
         if (data.modifiedCount) {
            refetch();
            toast.success("Status is updated successfully");
            return { success: true, modifiedCount: data.modifiedCount, donationStatus: 'done', message: 'donation status has been changed to Inprogress' };
         }
      }

      // when the Done button is clicked on
      if (action === 'done') {
         // check for current status and 
         // do not proceed any further if the current status is 'done' already
         if (currentStatus === 'done') {
            toast.warn('Action not allowed');
            return { success: true, modifiedCount: 0, message: `Action not allowed` }
         }

         const updatedDoc = {
            status: 'done',
            donorInfo: { name: user.displayName, email: user.email }
         };
         const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, { donationRequest: updatedDoc });
         console.log(data);
         if (data.modifiedCount) {
            refetch();
            toast.success("Status is updated successfully");
            return { success: true, modifiedCount: data.modifiedCount, donationStatus: 'done', message: 'donation status has been changed to Done' };
         }
      }

      // when the Cancel button is clicked on
      if (action === 'cancel') {
         // check for current status and 
         // do not proceed any furthere if the status is in 'pending' mood already
         if (currentStatus === 'pending') {
            toast.warn('Action not allowed');
            return { success: true, modifiedCount: 0, message: 'Action not allowed' };
         }

         const updatedDoc = {
            status: 'pending',
            donorInfo: { name: '', email: '' }
         }
         const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, { donationRequest: updatedDoc });
         console.log(data);
         if (data.modifiedCount) {
            refetch();
            toast.success("Status is updated successfully");
            return { success: true, modifiedCount: data.modifiedCount, donationStatus: 'pending', message: 'donation request has been set to pending state' };
         }
      }

      // when the Delete button is clicked on
      if (action === 'delete') {
         const isConfirm = confirm("Are you sure to delete theis request?\nThis action can not be undo.");
         if (!isConfirm) return { success: true, deletedCount: 0, message: 'delete request canceled' };

         const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`);
         console.log(data);
         if (data.deletedCount) {
            refetch();
            toast.success("Deleted Successfully");
            return { success: true, deletedCount: data.deletedCount, message: 'donation request has been deleted successfully' };
         };
      }

      return { success: false, message: 'something went wrong' }

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
            <Title title='Recent Donation Requests' />

            <main className='border border-secondary/10 min-h-96 flex-1'>
               {isFetching ? <DataFethingMessage /> : <>
                  {data?.recentDonationRequests?.length
                     // if there is any donation request
                     ? <>
                        <Table tabelData={data.recentDonationRequests} handleAction={handleAction}></Table>
                        <div className='text-center my-4'>
                           <Link
                              to='/dashboard/my-donation-requests'
                              className='btn bg-white btn-md capitalize btn-outline rounded-md border-secondary px-9 text-secondary hover:bg-secondary hover:text-white focus:ring-2 ring-secondary ring-offset-2'>
                              View all requests <FaArrowAltCircleRight  />
                           </Link>
                        </div>
                     </>

                     // when there is no donation requests to display
                     : (
                        <NoData
                           message="You haven't made any donation requests yet."
                           actionText="Create a Request"
                           actionLink="/dashboard/create-donation-request"
                        />
                     )}
               </>}

            </main>
         </section>
      </div>
   )
}

export default DonorDashboard;
