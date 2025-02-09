import React from 'react'
import defaultAvatar from '../assets/profile.png';
import useAuth from '../hooks/useAuth';
import UserRow from './UserRow';

const UsersTable = ({ tabelData, handleAction }) => {
   const {user} = useAuth();

   const handleActionChange = async (e, userId, userStatus, userRole) => {
      const { success } = await handleAction(e, userId, userStatus, userRole);

      if (success) {
         e.target.value = '';
      }
   }

   return (
      <div className="overflow-auto max-h-[350px]">
         <table className="table ">
            {/* head */}
            <thead className='bg-secondary text-white sticky top-0'>
               <tr className=''>
                  <th>Avatar</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className='text-end'>Action</th>
               </tr>
            </thead>
            <tbody className=''>
               {/* row 1 */}
               {tabelData.map((data, index) => <UserRow key={data?._id} user={data} currentUser={user} />)}

            </tbody>
         </table>
      </div>
   )
}

export default UsersTable
