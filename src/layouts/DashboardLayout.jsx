import React, { useState } from 'react'
import { MdDashboard } from 'react-icons/md'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import defaultAvatar from '../assets/profile.png'
import { FaBlog, FaHome, FaListAlt, FaUsers } from 'react-icons/fa'
import SidebarButton from '../components/SidebarButton'
import { BsDatabaseFillAdd } from 'react-icons/bs'
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go'
import { AiFillMedicineBox } from 'react-icons/ai'
import Spinner from '../components/Spinner'

const DashboardLayout = () => {
   const navigate = useNavigate();
   const { user, loading } = useAuth();
   const [hideSidebar, setHideSidebar] = useState(false);
   const {darkMood} = useAuth();

   // SHARED NAVLINK:
   const sharedLinks = [
      { name: "Home", path: '/', icon: <FaHome className='text-[20px]' /> },
   ];

   // DONOR NAVLINK:
   const donorLinks = [
      { name: "My Requests", path: '/dashboard/my-donation-requests', icon: <FaListAlt className='text-[20px]' /> },
      { name: "Create New Request", path: '/dashboard/create-donation-request', icon: <BsDatabaseFillAdd /> },
   ];

   // ADMIN NAVLINKS
   const adminLinks = [
      { name: "Create New Request", path: '/dashboard/create-donation-request', icon: <BsDatabaseFillAdd /> },
      { name: "My Requests", path: '/dashboard/my-donation-requests', icon: <FaListAlt className='text-[20px]' /> },
      {name: 'All Requests', path: '/dashboard/all-donation-requests', icon: <AiFillMedicineBox /> },
      {name: 'All Users', path: '/dashboard/all-users', icon: <FaUsers className='text-[20px]' />},
      { name: 'Content Management', path: '/dashboard/content-management', icon: <FaBlog /> }
   ];

   // VOLUNTEER NAVLINKS
   const volunteerLink = [
      {name: 'All Requests', path: '/dashboard/all-donation-requests', icon: <AiFillMedicineBox /> },
      { name: 'Content Management', path: '/dashboard/content-management', icon: <FaBlog /> }
   ];

   // CLICK EVENT HANDLER ON THE MAIN CONTENT
   const handleMainContentClick = (e) => {
      if (window.innerWidth <= 450) {
         setHideSidebar(true);
      };
   };

   // HELPER FUNCTION: TO DISPLAY AND HIDE THE SIDEBAR LINKS
   const hideSidebarLinks = () => {
      setHideSidebar(true);
   };

   // HANDLE CLICK EVENT ON DASHBOARD HOME BUTTON ON THE TOP OF THE SIDEBAR
   const handleDashboardHomeButtonClick = () => {
      navigate('/dashboard');
   };

   if (loading) {
      return <Spinner></Spinner>
   };
   
   return (
      <section className={`flex w-screen min-h-screen dark:bg-gray-800 dark:text-white ${darkMood ? 'dark' : ''}`}>
         {/* DASHBOARD: SIDEBAR */}
         <div
            id='sidebar'
            className={` ${hideSidebar ? 'w-[2px]' : 'min-w-[30px]'}  max-w-[250px] sidebar h-screen max-h-screen flex flex-col fixed sm:relative z-50 bg-white/60 backdrop-blur-2xl border-r-2 border-gray-200 dark:border-gray-500 dark:bg-inherit`}>
            <button
               onClick={() => setHideSidebar(!hideSidebar)}
               className='w-8 h-8 text-xl flex items-center justify-center border-2 border-gray-200 rounded-sm absolute -right-[30px] bg-white font-bold top-[9px]  z-50 sm:hidden text-secondary'>
               {hideSidebar ? <GoSidebarCollapse /> : <GoSidebarExpand /> }
            </button>

            {/* SIDEBAR: header section */}
            <header className='border-b-2 border-gray-200 dark:border-gray-500'>
               {hideSidebar || <button onClick={handleDashboardHomeButtonClick} className='btn btn-ghost btn-block justify-start px-2 text-secondary rounded-none hover:bg-transparent text-2xl font-bold dark:text-white' title='Dashboard Home'> <MdDashboard className='md:text-[30px]'></MdDashboard> <span className=''>Dashboard</span> </button>}
            </header>

            {/* SIDEBAR: nav links section */}
            <ul className='pt-2 flex-1 overflow-auto'>
               {/* shared nav links */}
               {sharedLinks.map((link, index) => <SidebarButton key={index} icon={link.icon} name={link.name} path={link.path} />)}

               {/* admin's nav links */}
               {user?.isAdmin && adminLinks.map((link, index) => <SidebarButton key={index} icon={link.icon} name={link.name} path={link.path} />)}

               {/* donor's nav links */}
               {user?.isDonor && donorLinks.map((link, index) => <SidebarButton key={index} icon={link.icon} name={link.name} path={link.path} />)}
               
               {/* volunteer's nav links */}
               {user?.isVolunteer && volunteerLink.map((link, index) => <SidebarButton key={index} icon={link.icon} name={link.name} path={link.path} />)}
            </ul>

            {/* SIDEBAR: footer section */}
            <footer className=' border-t-2 border-gray-200 dark:border-gray-500'>
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
         <div onClick={handleMainContentClick} className='flex-1 max-h-screen overflow-auto p-4'>
            <Outlet></Outlet>
         </div>
      </section>
   )
};

export default DashboardLayout;
