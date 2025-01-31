import React, { useRef } from 'react'
import { FaEdit } from 'react-icons/fa'

const Table = ({ tabelData, handleAction }) => {
   const actionRef = useRef();

   const handleActionChange = (e, id) => {
      handleAction(e, id);
      actionRef.current.value = ''
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

                  {/* action */}
                  <td className='capitalize'>
                     <select ref={actionRef} onChange={(e) => handleActionChange(e, data._id)} defaultValue='' className='select select-sm rounded-sm'>
                        <option value="">Take Action</option>
                        <option value="edit">📝 Edit</option>
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
