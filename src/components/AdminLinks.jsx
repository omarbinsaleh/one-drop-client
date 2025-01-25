import React from 'react'
import SidebarButton from './SidebarButton'
import { BiSolidDonateBlood } from 'react-icons/bi'
import { FaListAlt } from 'react-icons/fa'

const AdminLinks = () => {

   // ADMIN NAVLINKS
   const adminLinks = [
      { name: "New Donation Request", path: '/dashboard/create-donation-request', icon: <BiSolidDonateBlood /> },
      { name: "My Requests", path: '/dashboard/my-donation-requests', icon: <FaListAlt className='text-[20px]' /> }
   ]

  return (
   <div className=''>
   <ul
      className='p-1'
   >
      {adminLinks.map((link, index) => <SidebarButton key={index} icon={link.icon} name={link.name} path={link.path} />)}
   </ul>
</div>
  )
}

export default AdminLinks
