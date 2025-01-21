import { useContext, useState } from 'react'
import { HiMiniBars3 } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx';
import { FaBlog, FaBriefcaseMedical, FaHome, } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import newLogo from '../assets/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { VscSignIn, VscSignOut } from 'react-icons/vsc';
import profileImg from '../assets/profile.png';
import { AuthContext } from '../providers/AuthProvider';
import { Tooltip } from 'react-tooltip';
import ThemeToggle from './ThemeToggle';
import { toast } from 'react-toastify';

const Navbar = () => {
   const navigate = useNavigate();
   const { darkMood, setDarkMood } = useContext(AuthContext);

   const { user, logOut } = useContext(AuthContext);
   const [showLink, setShowLink] = useState(false);
   const [showMenu, setShowMenu] = useState(false);
   const [showProfileSubMenu, setShowProfileSubMenu] = useState(false);


   function handleBarClick() {
      setShowLink(!showLink);
   }

   function hideLink() {
      setShowLink(false);
      setShowProfileSubMenu(false);
   }

   function handleLogout() {
      // logout the user:
      // logOut();
      setShowLink(false)
      setShowProfileSubMenu(false);
      logOut()

      navigate('/')
      toast.success('User has logged out')
   }

   return (
      <nav id='navbar' className='bg-white/60 dark:bg-slate-800/60 shadow-md text-black p-3 py-2 sticky top-0 left-0 backdrop-blur-xl'>
         <div className='flex items-center justify-between h-[80px '>
            {/* nav start */}
            <div className='flex items-center gap-2'>
               <Link to='/' className='w-[60px] h-[55px] border border-red- btn btn-ghost p-0 py-0 hover:bg-transparent active:bg-transparent focus:bg-transparent'><img className='w-full h-full mix-blend-multiply dark:mix-blend-normal' src={newLogo} alt="" /></Link>
            </div>

            {/* nav center | links */}
            <div className='hidden md:block'>
               <ul className='flex items-center gap-7 justify-center dark:text-white'>
                  <li><NavLink to='/' onClick={hideLink} className='' > Home</NavLink></li>
                  {/* <li><NavLink to='/about' onClick={hideLink} >About</NavLink></li> */}
                  <li><NavLink to='/donation-requests' onClick={hideLink} > Donation Requests</NavLink></li>
                  <li><NavLink to='/blogs' onClick={hideLink} >Blogs</NavLink></li>
               </ul>
            </div>

            {/* nav end | will be visible only on mobile sreen */}
            <div className='space-x-2 md:hidden'>
               <ThemeToggle></ThemeToggle>
               <button onClick={handleBarClick} className='btn md:hidden bg-transparent  text-2xl px-3 font-extrabold dark:text-white'>{showLink ? <RxCross2 /> : <HiMiniBars3 />}</button>
            </div>

            {user
               ?
               // display this section after user has loged in successfylly
               <div className='hidden md:flex items-center gap-2'>
                  <div>
                     <ThemeToggle></ThemeToggle>
                  </div>
                  <div className=''>
                     <button onClick={() => setShowProfileSubMenu(!showProfileSubMenu)} role="button" className="btn btn-ghost btn-circle avatar relative">
                        <img className='w-12 p-1 rounded-full border aspect-square user-profile' referrerPolicy='no-referrer' src={user?.photoURL ? user.photoURL : profileImg} alt="" />

                        {/* profile sub menu close button */}
                        <div
                           style={{ display: showProfileSubMenu ? 'block' : 'none' }}
                           className='p-1 flex items-center justify-center rounded-full absolute top-0 left-0 w-full h-full  text-xl z-10 text-white bg-gray-700/80 border border-green-500'>
                           <RxCross2 className='mt-[9px] mx-auto' />
                        </div>
                     </button>
                     <ul
                        style={{ display: showProfileSubMenu ? 'block' : 'none' }}
                        tabIndex={0}
                        className="bg-base-100 z-[1] rounded-sm mt-3 w-52 p-2 shadow absolute right-0 space-y-1 dark:bg-slate-600 dark:text-white border-2">
                        <div className='w-5 h-5 bg-white rotate-45 absolute right-3 -top-[11px] bg-inherit dark:bg-slate-600 border border-t-2 border-l-2 border-r-0 border-b-0'></div>
                        <li><Link to='/dashboard' className='btn btn-sm btn-block btn-ghost rounded-sm mt-1' onClick={hideLink}>Dashboard</Link></li>
                        <li>
                           <button onClick={handleLogout} className='btn btn-sm btn-block bg-opacity-80 border-none bg-secondary hover:bg-secondary/90 text-white rounded-sm flex items-center justify-center'> <VscSignOut className='text-[17px]' /> Sign out</button>
                        </li>
                     </ul>
                  </div>
               </div>
               :
               // display this section before user login
               <div className='hidden lg:flex items-center gap-2'>
                  <div>
                     {/* <button onClick={() => setDarkMood(!darkMood)} className='btn'>{darkMood ? 'Light' : 'Dark'}</button> */}
                     <ThemeToggle></ThemeToggle>
                  </div>
                  <div>
                     <Link to={'/auth/sign-up'} className='btn btn-md bg-opacity-80 border-none rounded-sm bg-secondary hover:bg-secondary/70 text-white flex items-center justify-center' >Register</Link>
                  </div>
                  <div>
                     <Link to='/auth/sign-in' className='btn btn-md bg-opacity-80 border-none rounded-sm bg-secondary hover:bg-secondary/70 text-white flex items-center justify-center' >  <VscSignIn className='text-[17px]' /> Sign In</Link>
                  </div>
               </div>
            }
         </div>

         {/* nav links | will be visible only on the mobile sreen */}
         <div className={` ${showLink ? 'block animate__animated animate__fadeInDown' : 'hidden animate_animated animate_fadeInUp'} pt-3`}>
            <ul className='pb-4 space-y-3 text-lg dark:text-white'>
               <li><NavLink to='/' onClick={hideLink} className='flex items-center gap-2 p-2'> <FaHome /> Home</NavLink></li>
               <li><NavLink to='/donation-requests' onClick={hideLink} className='flex items-center gap-2 p-2'> <FaBriefcaseMedical /> Donation Requests</NavLink></li>
               <li><NavLink to='/blogs' onClick={hideLink} className='flex items-center gap-2 p-2'> <FaBlog /> Blogs</NavLink></li>
               <li><NavLink to='/dashboard' onClick={hideLink} className='flex items-center gap-2 p-2'> <MdDashboard /> Dashboard</NavLink> </li>
               
               <li>
                  {user
                     ?
                     // will be visible only after successfull login
                     <button onClick={handleLogout} className='btn btn-md btn-block bg-opacity-80 border-none bg-secondary text-white rounded-sm  flex items-center justify-center'> <VscSignOut className='text-[17px]' /> Sign out</button>
                     :
                     // will be visible only before login
                     <Link to='/auth/sign-in' onClick={() => setShowLink(false)} className='btn bg-opacity-50 border-none bg-secondary rounded-sm flex items-center justify-center' > <VscSignIn className='text-[17px]' /> Sign In</Link>
                  }
               </li>
            </ul>
         </div>
      </nav>
   )
}

export default Navbar
