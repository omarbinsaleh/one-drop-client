import React from 'react'
import defaultAvatar from '../assets/profile.png';
import useAuth from '../hooks/useAuth';


const UserRow = ({ user, handleAction }) => {
   const { user: currentUser } = useAuth();

   // handle the different kind of action performed on each individual user by the admin
   const handleActionChange = async (e, userId, userStatus, userRole) => {
      const { success } = await handleAction(e, userId, userStatus, userRole);

      if (success) {
         e.target.value = '';
      }
   };

   return (
      <tr className={`${user?.email === currentUser?.email ? 'hidden' : ''}`}>
         {/* user avatar */}
         <th>
            <img className='avatar w-12 h-12 rounded-md' src={user.photoURL || defaultAvatar} alt="" />
         </th>

         {/* user's info */}
         <td className=''>
            <h3>{user?.name}</h3>
            <h4>{user?.email}</h4>
         </td>

         {/* user role */}
         <td className='capitalize'>
            {user?.role}
         </td>

         {/* user status */}
         <td> {user?.status} </td>

         {/* action */}
         <td className='capitalize text-end'>
            <select onChange={(e) => handleActionChange(e, user?._id, user?.status, user?.role)} defaultValue='' className='select select-sm rounded-sm'>
               <option value="">Take Action</option>
               {user?.status === 'active' || <option value="active">🔄 Unblock</option>}
               {user?.status === 'blocked' || <option value="block">🚫 Block</option>}
               <option value="make-donor">👨‍⚖️ Make Donor</option>
               <option value="make-admin">🌐 Make Admin</option>
               <option value="make-volunteer">💼 Make Volunteer</option>
            </select>
         </td>
      </tr>
   )
}

export default UserRow
