import React from 'react'

const Title = ({title="Default Title", className='', underLined = true}) => {
   return (
      <div className='my-2 flex flex-col items-center gap-1'>
         <h1 className={`text-2xl sm:text-3xl font-bold text-center uppercase text-secondary dark:text-white ${className}`}>{title}</h1>
         {underLined && <div className="w-24 h-[4px] bg-secondary/80 dark:bg-white"></div>}
      </div>
   )
}

export default Title
