import React from 'react'
import {  NavLink } from 'react-router-dom'

const SidebarButton = ({ name, path, icon }) => {
   return (
      <li>
         <NavLink to={path} className='btn btn-sm btn-block btn-ghost hover:bg-secondary/10 rounded-none justify-start no-animation bg-transparent' title={name}> {icon} <span className=''>{name}</span> </NavLink>
      </li>
   )
}

export default SidebarButton
