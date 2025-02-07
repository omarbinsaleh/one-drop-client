import React, { useState } from 'react'
import Title from '../components/Title'
import useAllUsers from '../hooks/useAllUsers';
import DataFethingMessage from '../components/DataFethingMessage';
import NoData from '../components/NoData';
import UsersTable from '../components/UsersTable';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const AllUsers = () => {
   const { user } = useAuth();
   const [filter, setFilter] = useState('');


   const { isPending, data, error, isFetching, refetch } = useAllUsers({ userStatus: filter })

   // HANDLE FILTER
   const handleFilter = (e) => {
      setFilter(e.target.value)
   };

   // HANDLE ACTIONS
   const handleAction = async (e, userId, userStatus, userRole) => {
      const action = e.target.value;

      // when the unblock button is clicked on
      if (action === 'active') {
         if (userStatus === 'active') {
            toast.warn("Action not allowed")
            return { success: true, modifiedCount: 0, message: 'Action not allowed' }
         }

         try {
            const userEmail = user?.email;
            const updatedInfo = { status: 'active' }
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/users/update/${userId}`, { userEmail, updatedInfo });

            // check for any server side error
            if (data.statusCode === 403 || data.statusCode === 401) {
               toast.error(data.message);
               return { success: false, modifiedCount: 0, message: data.message };
            }

            // check for data update
            if (data.modifiedCount) {
               refetch();
               toast.success("User has been unblocked successfully!!");
               return { success: true, modifiedCount: data.modifiedCount, message: "User's status has been switched to active mood" };
            }
         } catch (error) {
            toast.error("Something went wrong")
            return { success: false, modifiedCount: 0, message: "Something went wrong!!", error }
         };
      }

      // when the block button is clicked on
      if (action === 'block') {
         if (userStatus === 'blocked') {
            toast.warn("Action not allowed");
            return { success: true, modifiedCount: 0, message: 'Action is not allowed' };
         }

         try {
            const userEmail = user?.email;
            const updatedInfo = { status: 'blocked' };
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/users/update/${userId}`, { userEmail, updatedInfo });

            // check for any server side error
            if (data.statusCode === 403 || data.statusCode === 401) {
               toast.error(data.message);
               return { success: false, modifiedCount: 0, message: data.message };
            }

            // check for data update
            if (data.modifiedCount) {
               refetch();
               toast.success('User has been blocked!!');
               return { success: true, modifiedCount: data.modifiedCount, message: 'User has been blocked now' };
            }
         } catch (error) {
            toast.error("Something went wrong!!");
            console.log(error);
            return { success: false, modifiedCount: 0, message: "Something went wrong!!", error }
         }
      }

      // when the make-donor button is clicked on
      if (action === 'make-donor') {
         if (userRole === 'donor') {
            toast.warn("Action not allowed");
            return {success: true, modifiedCount: 0, message: 'Action is not allowed'};
         }

         try {
            const userEmail = user?.email;
            const updatedInfo = {role: 'donor'};
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/users/update/${userId}`, {userEmail, updatedInfo});
            
            // check for any server side error
            if (data.statusCode === 403 || data.statusCode === 401) {
               toast.error(data.message);
               return { success: false, modifiedCount: 0, message: data.message };
            }

            // check for data update
            if (data.modifiedCount) {
               refetch();
               toast.success("User role changed successfully!!");
               return {success: true, modifiedCount: data.modifiedCount, message: "User role has been changed to donor successfully"};
            }
         } catch (error) {
            toast.error("Something went wrong!!");
            return { success: false, modifiedCount: 0, message: "Something went wrong!!", error};
         }
      }

      // when the make admin button is clicked on
      if (action === 'make-admin') {
         if (userRole === 'admin') {
            toast.wart("Action not allowed");
            return { success: true, modifiedCount: 0, message: "Action is not allowed"};
         }

         try {
            const userEmail = user?.email;
            const updatedInfo = {role: 'admin'};
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/users/update/${userId}`, {userEmail, updatedInfo});

            // check for any server side error
            if (data.statusCode === 403 || data.statusCode === 401) {
               toast.error(data.message);
               return { success: false, modifiedCount: 0, message: data.message };
            }

            // check for data update
            if (data.modifiedCount) {
               refetch();
               toast.success("User role changed successfully");
               return { success: true, modifiedCount: data.modifiedCount, message: "User role has been changed to Admin successfully!!" }
            }
         } catch (error) {
            toast.error("Something went wrong!!");
            return {success: false, modifiedCount: 0, message: "Something went wrong!!"};
         }
      }

      



      // return { success: true }
   }

   return (
      <section className='py-8 pt-2 max-h-screen flex flex-col w-full'>
         <Title title='All Users'></Title>

         <div className='flex items-center  sm:justify-end  gap-3 flex-wrap px-1'>
            <select onChange={handleFilter} value={filter} className='select select-md rounded-none border border-gray-300 bg-secondary text-white'>
               <option value="">Filter by Status</option>
               <option value="active">Active</option>
               <option value="blocked">Blocked</option>
            </select>
         </div>

         <main className='border border-secondary/10 my-10 mt-3 min-h-80 flex-1 overflow-auto'>
            {isFetching
               ?
               // display a message while data refetching
               <DataFethingMessage />

               :
               // display data after successfull data fetching
               <>
                  {data?.users?.data?.length
                     // if there is any donation request
                     ? <UsersTable tabelData={data?.users?.data} handleAction={handleAction}></UsersTable>

                     // when there is no donation requests to display
                     : (
                        <NoData
                           message="Ther is no registered users!!."
                           actionText="Create new user"
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

export default AllUsers
