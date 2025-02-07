import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({ onChange, onSearchButtonClick, search, placeholder = 'Search' }) => {
   const [inputValue, setInputValue] = useState('');

   const handleClick = (e) => {
      onSearchButtonClick(inputValue)
   }
   // HANDLE ON CHANGE EVENT
   const handleChage = (e) => {
      if (onChange) {
         onChange(e);
      }
      setInputValue(e.target.value);
   };

   return (
      <label className="input input-bordered input-md rounded-none flex items-center gap-2 flex-1 max-w-sm  pr-[1px]">
         <input onChange={handleChage} type="text" className="grow" placeholder={placeholder} />
         {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
               fillRule="evenodd"
               d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
               clipRule="evenodd" />
         </svg> */}

         <button onClick={handleClick} className='btn min-h-[45px] h-[45px]   bg-secondary hover:bg-secondary/80 text-white my-2 rounded-none'> <FaSearch /> Search </button>
      </label>
   )
}

export default SearchBox
