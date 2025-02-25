import React, { useRef } from 'react'
import DonorInfo from './DonorInfo';
import useAuth from '../hooks/useAuth';

const MyTable = ({ tabelData, handleAction }) => {
   const {user} = useAuth();

   // HANDLE THE ONACTION CHANGE
   const handleActionChange = async (e, id, currentStatus) => {
      const { success } = await handleAction(e, id, currentStatus);
      if (success) {
         e.target.value = ''
      }
   }

   return (
      <div className="overflow-auto max-h-[750px]">
         <table className="table">
            {/* head */}
            <thead className='bg-secondary text-white sticky top-0'>
               <tr className=''>
                  <th></th>
                  <th>Recipient Name</th>
                  <th className='min-w-[260px]'>Recipient Location</th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th className='min-w-28'>Donor Info</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody className=''>
               {/* row 1 */}
               {tabelData.map((data, index) => <tr key={data._id}>
                  {/* serial number */}
                  <th>{index + 1}</th>

                  {/* recipient name */}
                  <td className='capitalize'> {data.recipientName} </td>

                  {/* recipient location */}
                  <td className='capitalize'>
                     <div>{data.hospitalName}</div>
                     <div>{data.district}, {data.upazila}</div>
                  </td>

                  {/* donation date */}
                  <td> {data.donationDate} </td>

                  {/* donation time */}
                  <td> {data.donationTime} </td>

                  {/* blood group needed */}
                  <td> {data.bloodGroup} </td>

                  {/* donation status */}
                  <td className='capitalize'> {data.status} </td>

                  {/* donor information */}
                  <td >
                     <DonorInfo donorInfo={data?.donorInfo} status={data?.status} />
                  </td>

                  {/* action */}
                  <td className='capitalize'>
                     <select onChange={(e) => handleActionChange(e, data._id, data.status)} defaultValue='' className='select select-sm rounded-sm dark:bg-gray-900'>
                        <option value="">Take Action</option>
                        <option value="edit">📝 Edit</option>
                        <option value="inprogress">⌛ Inprogress</option>
                        { data.status === 'inprogress' && <option value="done">✅ Done</option>}
                        {<option value="cancel">❌ Cancel</option>}
                        <option value="delete">🗑️ Delete</option>
                     </select>
                  </td>
               </tr>)}

            </tbody>
         </table>
      </div>
   )
}

export default MyTable
