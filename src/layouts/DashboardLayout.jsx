import React from 'react'
import { MdDashboard } from 'react-icons/md'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import defaultAvatar from '../assets/profile.png'
import { FaHome } from 'react-icons/fa'
import SidebarButton from '../components/SidebarButton'

const DashboardLayout = () => {
   const navigate = useNavigate();
   const { user } = useAuth();

   // SIDEBAR NAVLINKS:
   const navLinks = [
      {name:"Home", path: '/', icon: <FaHome />}
   ]

   return (
      <section className='flex w-screen min-h-screen'>
         {/* DASHBOARD: SIDEBAR */}
         <div className='min-w-[50px] max-w-[250px] sidebar h-screen overflow-auto hidden md:flex flex-col'>
            {/* SIDEBAR: header section */}
            <header className='border-b-2 border-gray-200'>
               <button onClick={() => navigate('/dashboard')} className='btn btn-ghost btn-block justify-start px-2 rounded-none hover:bg-transparent text-2xl font-bold'> <MdDashboard></MdDashboard> Dashboard</button>
            </header>

            {/* SIDEBAR: nav links section */}
            <ul className='pt-2 flex-1 overflow-auto'>
               {navLinks.map((link, index) => <SidebarButton key={index} icon={link.icon} name={link.name} path={link.path} />)}
            </ul>
            
            {/* SIDEBAR: footer section */}
            <footer className='p-3'>
               <div className=' flex gap-2 items-center'>
                  <img src={defaultAvatar} alt="Profile avatar" className='w-10 border border-primary p-[2px] aspect-square rounded-full' />
                  <div className='flex flex-col'>
                     <Link to='/dashboard/profile' className='hover:underline'>{user?.displayName} </Link>
                     <small>{user?.email}</small>
                  </div>
               </div>
            </footer>
         </div>

         {/* DASHBOARD: MAIN CONTENT */}
         <div className='flex-1 border border-red-500 overflow-auto'>
            Dashboard Content
            <Outlet></Outlet>
         </div>
      </section>
   )
}

export default DashboardLayout
