import React from 'react'

const DonorInfo = ({ donorInfo, status }) => {
   return (
      <div className='capitalize'>
         <h3>Name: {status === 'done' ? <span>{donorInfo.name || 'N/A'}</span> : <span className='uppercase text-slate-500'>N/A</span>}</h3>
         <h3>Email: {status === 'done' ? <span className='lowercase text-slate-500'>{donorInfo.email || 'N/A'}</span> : <span className='uppercase text-slate-500'>N/A</span>}</h3>
      </div>
   );
};

export default DonorInfo;
