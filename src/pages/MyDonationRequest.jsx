import React from 'react'
import Table from '../components/Table';
import NoData from '../components/NoData';
import axios from 'axios';
import Spinner from '../components/Spinner';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const MyDonationRequest = () => {
  const {user, loading} = useAuth();

  // FETCH NECESSARY DATA
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ['donation-request'],
    queryFn: async () => {
      const { data: donationRequests } = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests?email=${user?.email}`);

      return { donationRequests };
    }
  })

  // CHANGE THE PAGE TITLE
  document.title = "My Donation Requests | One Drop";

  // HANDLE THE ACTION BUTTON CLICK
  const handleAction = async (e, id, currentStatus) => {
    // identify the action triggered by using any of the action buttons in the Table
    const action = e.target.value;

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
    <section className='py-8 my-12 max-h-screen flex flex-col w-full'>
      <h1 className='text-2xl font-bold text-center uppercase text-secondary'>Recent Donation Requests</h1>
      <div className="w-24 h-[2px] my-1 mx-auto bg-secondary/80"></div>

      <main className='border border-secondary/10 my-10 min-h-80 flex-1'>
        {data?.donationRequests.length
          // if there is any donation request
          ? <Table tabelData={data.donationRequests} handleAction={handleAction}></Table>

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
  )
}

export default MyDonationRequest
