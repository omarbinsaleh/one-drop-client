import React, { useState } from 'react'
import { MdDashboard } from 'react-icons/md'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import defaultAvatar from '../assets/profile.png'
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp, FaArrowRight, FaDonate, FaHome, FaListAlt } from 'react-icons/fa'
import SidebarButton from '../components/SidebarButton'
import { BiSolidDonateBlood } from 'react-icons/bi'
import AdminLinks from '../components/AdminLinks'

const DashboardLayout = () => {
   const navigate = useNavigate();
   const { user } = useAuth();
   const [hideSidebar, setHideSidebar] = useState(false);
   const isAdmin = user?.role === 'admin';
   const isDonor = user?.role === 'donor';

   // SHARED NAVLINK:
   const sharedLinks = [
      { name: "Home", path: '/', icon: <FaHome className='text-[20px]' /> },
   ]

   // DONOR NAVLINK:
   const donorLinks = [
      { name: "My Requests", path: '/dashboard/my-donation-requests', icon: <FaListAlt className='text-[20px]' /> }
   ]

   // ADMIN NAVLINKS
      const adminLinks = [
         { name: "New Donation Request", path: '/dashboard/create-donation-request', icon: <BiSolidDonateBlood /> },
         { name: "My Requests", path: '/dashboard/my-donation-requests', icon: <FaListAlt className='text-[20px]' /> }
      ]

   // HELPER FUNCTION: TO DISPLAY AND HIDE THE SIDEBAR LINKS
   const hideSidebarLinks = () => {
      setHideSidebar(true);
   }

   // HANDLE CLICK EVENT ON DASHBOARD HOME BUTTON ON THE TOP OF THE SIDEBAR
   const handleDashboardHomeButtonClick = () => {
      navigate('/dashboard');
   }

   return (
      <section className='flex w-screen min-h-screen'>
         {/* DASHBOARD: SIDEBAR */}
         <div
            id='sidebar'
            className={` ${hideSidebar ? 'w-[10px]' : 'min-w-[30px]'}  max-w-[250px] sidebar h-screen max-h-screen flex flex-col fixed sm:relative z-50 bg-white/60 backdrop-blur-2xl border-r-2 border-gray-200`}>
            <button
               onClick={() => setHideSidebar(!hideSidebar)}
               className='w-6 h-6 flex items-center justify-center border-2 border-gray-200 rounded-sm absolute -right-[15px] bg-white top-9  z-50 sm:hidden text-secondary'>
               {hideSidebar ? <FaAngleRight /> : <FaAngleLeft />}
            </button>

            {/* SIDEBAR: header section */}
            <header className='border-b-2 border-gray-200'>
               {hideSidebar || <button onClick={handleDashboardHomeButtonClick} className='btn btn-ghost btn-block justify-start px-2 rounded-none hover:bg-transparent text-2xl font-bold' title='Dashboard Home'> <MdDashboard className='md:text-[30px]'></MdDashboard> <span className=''>Dashboard</span> </button>}
            </header>

            {/* SIDEBAR: nav links section */}
            <ul className='pt-2 flex-1 overflow-auto'>
               {/* shared links */}
               {sharedLinks.map((link, index) => <SidebarButton key={index} icon={link.icon} name={link.name} path={link.path} />)}

               {/* admin links */}
               {isAdmin && adminLinks.map((link, index) => <SidebarButton key={index} icon={link.icon} name={link.name} path={link.path} />)}

               {/* common sidebar links */}
               {isDonor && donorLinks.map((link, index) => <SidebarButton key={index} icon={link.icon} name={link.name} path={link.path} />)}
            </ul>

            {/* SIDEBAR: footer section */}
            <footer className=' border-t-2 border-gray-200'>
               {hideSidebar || <Link to='/dashboard/profile' className=' flex gap-2 items-center w-full p-3'>
                  <img src={user?.photoURL || defaultAvatar} alt="Profile avatar" className=' w-[30px] md:w-10 border border-primary p-[2px] aspect-square rounded-full' />
                  <div className='flex flex-col'>
                     <p className='hover:underline'>{user?.displayName} </p>
                     <small>{user?.email}</small>
                  </div>
               </Link>}
            </footer>
         </div>

         {/* DASHBOARD: MAIN CONTENT */}
         <div className='flex-1 max-h-screen overflow-auto p-4'>
            <Outlet></Outlet>
         </div>
      </section>
   )
}

export default DashboardLayout
