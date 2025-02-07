import React from 'react'

const DonorInfo = ({ donorInfo, status }) => {
   return (
      <div className='capitalize'>
         <h3>Name: {status === 'done' ? <span>{donorInfo.name}</span> : <span className='uppercase text-slate-500'>N/A</span>}</h3>
         <h3>Email: {status === 'done' ? <span className='lowercase text-slate-500'>{donorInfo.email}</span> : <span className='uppercase text-slate-500'>N/A</span>}</h3>
      </div>
   )
}

export default DonorInfo
