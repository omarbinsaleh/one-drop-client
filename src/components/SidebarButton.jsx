import React from 'react'
import { Link } from 'react-router-dom'

const SidebarButton = ({ name, path, icon }) => {
   return (
      <li>
         <Link to={path} className='btn btn-sm btn-block rounded-none justify-start'> {icon} {name} </Link>
      </li>
   )
}

export default SidebarButton
