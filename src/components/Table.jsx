import React from 'react'

const Table = ({ tabelData }) => {
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
               </tr>
            </thead>
            <tbody>
               {/* row 1 */}
               {tabelData.map((data, index) => <tr key={data._id}>
                  {/* serial number */}
                  <th>{index + 1}</th>

                  {/* recipient name */}
                  <td> {data.recipientName} </td>

                  {/* recipient location */}
                  <td> 
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
                  <td> {data.status} </td>
               </tr>)}

            </tbody>
         </table>
      </div>
   )
}

export default Table
