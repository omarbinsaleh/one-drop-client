import React from 'react'

const SimpleSearchBox = ({handleSearch}) => {
   const handleChange = (e) => {
      handleSearch(e);
   }
   
  return (
   <div className="flex items-center gap-2 mb-6 bg-white dark:bg-gray-800 shadow-md p-3 rounded-lg w-full max-w-sm">
   <FaSearch className="text-gray-500 dark:text-gray-400" />
   <input
     type="text"
     placeholder="Search blogs..."
     className="w-full outline-none bg-transparent"
     onChange={handleChange}
   />
 </div> 
  )
}

export default SimpleSearchBox
