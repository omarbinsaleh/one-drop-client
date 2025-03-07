import React from 'react'

const StatCard = ({ icon = 'icon', count = '10', title = 'Default title', growth = '1%' }) => {
   return (
      <div
         className="flex flex-col gap-5 lg:flex-row items-center  justify-between p-6 bg-white shadow-md rounded-lg border border-gray-200"
      >
         <div>{icon}</div>
         <div className="text-right">
            <p className="text-gray-500">{title}</p>
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
