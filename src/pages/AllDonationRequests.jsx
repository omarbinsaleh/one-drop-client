import React, { useState } from 'react'
import Table from '../components/Table';
import NoData from '../components/NoData';
import axios from 'axios';
import Spinner from '../components/Spinner';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import SearchBox from '../components/SearchBox';
import { useLocation, useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import DataFethingMessage from '../components/DataFethingMessage';
import useDonationRequest from '../hooks/useDonationRequest';

const AllDonationRequests = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const { user, loading } = useAuth();
   const [filter, setFilter] = useState('');
   const [search, setSearch] = useState('');

   // FETCH NECESSARY DATA
   const { isPending, data, error, refetch, isFetching } = useDonationRequest({
      currentUserDonationRequests: false,
      recentDonationRequests: false,
      filter: filter,
      search: search,
      upazilas: false,
      districts: false
   });

   // CHANGE THE PAGE TITLE
   document.title = "All Donation Requests | One Drop";

   // HANDLE FILTER
   const handleFilter = (e) => {
      setFilter(e.target.value);
      console.log(filter);
   }

   // HANDLE SEARCH
   const handleSearch = (event) => {
      if (event.target.value === '') {
         setSearch(event.target.value);
      }
   }

   // HANDLE THE SEARCH BUTTON CLICK
   const handlSearchButtonClick = (inputValue) => {
      setSearch(inputValue);
   }

   // HANDLE THE ACTION BUTTON CLICK
   const handleAction = async (e, donationRequest) => {
      // identify the action triggered by using any of the action buttons in the Table
      const action = e.target.value;

      // donation request id
      const id = donationRequest._id;
      
      // current status of the donation request
      const currentStatus = donationRequest.status;

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

         // check if the user's blood matches with the reqested blood group
         if (user.blood !== donationRequest.bloodGroup) {
            toast.warn("Your blood group does not match with the needed blood group");
            return { success: true, modifiedCount: 0, message: "Your blood group does not match with the needed blood group!" };
         }

         const updatedDoc = {
            status: 'inprogress',
            donorInfo: {
               name: user.displayName,
               email: user.email,
               photoURL: user.photoURL,
               bloodGroup: user.blood,
               upazila: user.upazila,
               district: user.district
            }
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
            donorInfo: null
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
   if (loading) {
      return <Spinner />
   }

   return (
      <section className='pt-2 max-h-screen flex flex-col w-full '>
         <Title title='All Donation Requests' />

         <div className='flex items-center  sm:justify-end  gap-3 flex-wrap px-1 mt-10'>
            {/* search box to search donation request by recipient name */}
            <SearchBox onChange={handleSearch} onSearchButtonClick={handlSearchButtonClick} placeholder='Search by recipient name' />
            {/* filter based on the status */}
            <select onChange={handleFilter} value={filter} className='select select-md rounded-md border border-gray-300 dark:border-none bg-secondary text-white'>
               <option value="">Filter by Status</option>
               <option value="inprogress">Inprogress</option>
               <option value="pending">Pending</option>
               <option value="done">Done</option>
            </select>
         </div>
         <main className='border border-secondary/10  mt-3 min-h-80 flex-1 overflow-auto'>
            {isFetching
               ?
               // display a message while data refetching
               <DataFethingMessage />

               :
               // display data after successfull data fetching
               <>
                  {data?.allDonationRequests?.data?.length
                     // if there is any donation request
                     ? <Table tabelData={data?.allDonationRequests?.data} handleAction={handleAction}></Table>

                     // when there is no donation requests to display
                     : (
                        <NoData
                           title="There is not donation requests made yet"
                           actionText="Create a Request"
                           actionLink="/dashboard/create-donation-request"
                        />
                     )
                  }
               </>
            }
         </main>
      </section>
   )
}

export default AllDonationRequests
