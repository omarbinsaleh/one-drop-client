import React from 'react'
import {  NavLink } from 'react-router-dom'

const SidebarButton = ({ name, path, icon, onClick:handleClick }) => {
   return (
      <li>
         <NavLink onClick={handleClick} to={path} className='btn btn-sm btn-block btn-ghost hover:bg-secondary/10 rounded-none justify-start' title={name}> {icon} <span className='hidden md:inline'>{name}</span> </NavLink>
      </li>
   )
}

export default SidebarButton
