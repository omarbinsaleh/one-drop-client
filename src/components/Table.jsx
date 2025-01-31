import React, { useRef } from 'react'

const Table = ({ tabelData, handleAction }) => {

   // HANDLE THE ONACTION CHANGE
   const handleActionChange = async (e, id, currentStatus) => {
      const { success } = await handleAction(e, id, currentStatus);
      if (success) {
         e.target.value = ''
      }
   }

   return (
      <div className="overflow-x-auto p-1">
         <table className="table">
            {/* head */}
            <thead className='bg-secondary text-white'>
               <tr className=''>
                  <th></th>
                  <th>Recipient Name</th>
                  <th>Recipient Location</th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
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
                  <td className='capitalize'>
                     <div>
                        <h3>Name: <span className='text-slate-600'>{data.status === 'done' ? data?.donorInfo?.name : 'N/A'}</span></h3>
                        <h3>Email: <span className='text-slate-600 lowercase'>{data.status === 'done' ? data?.donorInfo?.email : 'N/A'}</span></h3>
                     </div>
                  </td>

                  {/* action */}
                  <td className='capitalize'>
                     <select onChange={(e) => handleActionChange(e, data._id, data.status)} defaultValue='' className='select select-sm rounded-sm'>
                        <option value="">Take Action</option>
                        <option value="edit">📝 Edit</option>
                        <option value="inprogress">⌛ Inprogress</option>
                        <option value="done">✅ Done</option>
                        <option value="cancel">❌ Cancel</option>
                        <option value="delete">🗑️ Delete</option>
                     </select>
                  </td>
               </tr>)}

            </tbody>
         </table>
      </div>
   )
}

export default Table
