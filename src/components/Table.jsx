import React, { useRef } from 'react'
import DonorInfo from './DonorInfo';
import useAuth from '../hooks/useAuth';

const Table = ({ tabelData, handleAction }) => {
   const {user} = useAuth();

   // HANDLE THE ONACTION CHANGE
   const handleActionChange = async (e, donationRequest) => {
      const { success } = await handleAction(e, donationRequest);
      if (success) {
         e.target.value = ''
      }
   }

   return (
      <div className="overflow-auto max-h-[750px]">
         <table className="table">
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
               {/* DATA ROW */}
               {tabelData.map((data, index) => <tr key={data._id}>
                  {/* SERIAL NUMBER */}
                  <th>{index + 1}</th>

                  {/* RECIPIENT NAME */}
                  <td className='capitalize'> {data.recipientName} </td>

                  {/* RECIPIENT LOCATION */}
                  <td className='capitalize'>
                     <div>{data.hospitalName}</div>
                     <div>{data.district}, {data.upazila}</div>
                  </td>

                  {/* DONATION DATE */}
                  <td> {data.donationDate} </td>

                  {/* DONATION TIME */}
                  <td> {data.donationTime} </td>

                  {/* BLOOD GROUP NEEDED */}
                  <td> {data.bloodGroup} </td>

                  {/* DONATION STATUS */}
                  <td className='capitalize'> {data.status} </td>

                  {/* DONOR INFORMATION */}
                  <td >
                     <DonorInfo donorInfo={data?.donorInfo} status={data?.status} />
                  </td>

                  {/* ACTION TO TAKE */}
                  <td className='capitalize '>
                     <select onChange={(e) => handleActionChange(e, data)} defaultValue='' className='select select-sm rounded-sm dark:bg-gray-900'>
                        <option value="">Take Action</option>
                        {/* ***only admin can edit*** */}
                        {user?.isAdmin && <option value="edit">📝 Edit</option>}
                        <option value="inprogress">⌛ Inprogress</option>
                        { data.status === 'inprogress' && <option value="done">✅ Done</option>}
                        {<option value="cancel">❌ Cancel</option>}
                        {/* ***only admin can delete*** */}
                        {user.isAdmin && <option value="delete">🗑️ Delete</option>}
                     </select>
                  </td>
               </tr>)}

            </tbody>
         </table>
      </div>
   )
}

export default Table
