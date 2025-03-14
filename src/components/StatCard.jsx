import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const StatCard = ({ icon = 'icon', count = '10', title = 'Default title', growth = '1%', link = '' }) => {
   const navigate = useNavigate();

   const handleLinkClick = () => {
      if (!link) return

      return navigate(link);
   }

   return (
      <div
         className="flex flex-col gap-5 lg:flex-row items-center  justify-between p-6 bg-white shadow-md rounded-lg border border-gray-200"
      >
         <div>{icon}</div>
         <div className="text-right">
            <button
               onClick={handleLinkClick}
               className="text-gray-500 hover:underline"
            >
               {title}
            </button>
            <h3 className="text-3xl font-semibold">{count}</h3>
            <p className="text-sm ">Changed by
               <span className={`text-sm ${parseFloat(growth) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {parseFloat(growth) >= 0 ? ' ↑' : ' ↓'}   {growth}
               </span> this month
            </p>
         </div>
      </div>
   )
}

export default StatCard
