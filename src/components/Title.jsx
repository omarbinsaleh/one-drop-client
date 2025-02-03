import React from 'react'

const Title = ({title="Default Title"}) => {
   return (
      <div className='my-10 flex flex-col items-center gap-1'>
         <h1 className='text-2xl sm:text-3xl font-bold text-center uppercase text-secondary'>{title}</h1>
         <div className="w-24 h-[4px] bg-secondary/80"></div>
      </div>
   )
}

export default Title
