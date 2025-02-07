import React from 'react'
import defaultAvatar from '../assets/profile.png';

const UsersTable = ({ tabelData, handleAction }) => {

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
               {tabelData.map((data, index) => <tr key={data._id}>
                  {/* user avatar */}
                  <th>
                     <img className='avatar w-12 h-12 rounded-md' src={data.photoURL || defaultAvatar} alt="" />
                  </th>

                  {/* user's info */}
                  <td className=''> 
                     <h3>{data?.name}</h3>
                     <h4>{data?.email}</h4>
                  </td>

                  {/* user role */}
                  <td className='capitalize'>
                     {data?.role}
                  </td>

                  {/* user status */}
                  <td> {data?.status} </td>

                  {/* action */}
                  <td className='capitalize text-end'>
                     <select onChange={(e) => handleActionChange(e, data?._id, data?.status, data?.role)} defaultValue='' className='select select-sm rounded-sm'>
                        <option value="">Take Action</option>
                        {data?.status === 'active' || <option value="active">🔄 Unblock</option>}
                        {data?.status === 'blocked' || <option value="block">🚫 Block</option>}
                        <option value="make-donor">👨‍⚖️ Make Donor</option>
                        <option value="make-admin">🌐 Make Admin</option>
                        <option value="make-volunteer">💼 Make Volunteer</option>
                     </select>
                  </td>
               </tr>)}

            </tbody>
         </table>
      </div>
   )
}

export default UsersTable
