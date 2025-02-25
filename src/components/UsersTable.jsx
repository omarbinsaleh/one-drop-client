import React from 'react'
import UserRow from './UserRow';

const UsersTable = ({ tabelData, handleAction }) => {
   return (
      <div className="overflow-auto max-h-[350px]">
         <table className="table ">
            {/* user table header */}
            <thead className='bg-secondary text-white sticky top-0 '>
               <tr className=''>
                  <th>Avatar</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className='text-end'>Action</th>
               </tr>
            </thead>
            <tbody className=''>
               {/* user row */}
               {tabelData.map((data, index) => <UserRow key={data?._id} user={data} handleAction={handleAction} />)}

            </tbody>
         </table>
      </div>
   );
};

export default UsersTable;
