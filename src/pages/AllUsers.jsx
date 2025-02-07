import React, { useState } from 'react'
import Title from '../components/Title'
import useAllUsers from '../hooks/useAllUsers';

const AllUsers = () => {
   const [filter, setFilter] = useState('');

   const {isPending, data, error, isFetching, refetch} = useAllUsers({userStatus: filter})
   
   const handleFilter = (e) => {
      setFilter(e.target.value)
   };

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



      </section>
   )
}

export default AllUsers
