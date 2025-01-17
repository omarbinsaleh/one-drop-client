import { useContext, useState } from 'react'
import { HiMiniBars3 } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx';
import { FaArrowDown, FaBriefcase, FaChevronDown, FaChevronUp, FaDatabase, FaHome, FaListAlt, FaUser, } from 'react-icons/fa';
import { IoIosContact, IoIosSearch } from 'react-icons/io';
import { MdDashboard, MdDesignServices } from 'react-icons/md';
import { IoNewspaper } from 'react-icons/io5';
import { RiMessage2Fill } from 'react-icons/ri';
import newLogo from '../assets/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { VscSignIn, VscSignOut } from 'react-icons/vsc';
import profileImg from '../assets/profile.png';
import { AuthContext } from '../providers/AuthProvider';
import { Tooltip } from 'react-tooltip';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
   const navigate = useNavigate();
   const { darkMood, setDarkMood } = useContext(AuthContext);

   const { user, logOut } = useContext(AuthContext);
   const [showLink, setShowLink] = useState(false);
   const [showMenu, setShowMenu] = useState(false);


   function handleBarClick() {
      setShowLink(!showLink);
   }

   function hideLink() {
      setShowLink(false)
   }

   function handleLogout() {
      // logout the user:
      // logOut();
      setShowLink(false)
      logOut()

      navigate('/')
      alert('User has logged out')
   }

   return (
      <nav id='navbar' className='bg-white/60 dark:bg-slate-800/60 shadow-md text-black p-3 py-2 sticky top-0 left-0 backdrop-blur-xl'>
         <div className='flex items-center justify-between h-[80px'>
            {/* nav start */}
            <div className='flex items-center gap-2'>
               <Link to='/' className='w-[60px] h-[48px] btn btn-ghost p-0 py-0 hover:bg-transparent active:bg-transparent focus:bg-transparent'><img className='w-full h-full mix-blend-multiply dark:mix-blend-normal' src={newLogo} alt="" /></Link>
            </div>


            {/* nav center | links */}
            <div className='hidden md:block'>
               <ul className='flex items-center gap-7 justify-center dark:text-white'>
                  <li><NavLink to='/' onClick={hideLink} className='' > Home</NavLink></li>
                  {/* <li><NavLink to='/about' onClick={hideLink} >About</NavLink></li> */}
                  <li><NavLink to='/marathons' onClick={hideLink} >Marathons</NavLink></li>
                  <li className={user ? 'block' : 'hidden'}><NavLink to='/dashboard' onClick={hideLink} >Dashboard</NavLink></li>
               </ul>
            </div>

            <div className='space-x-2 md:hidden'>
               <ThemeToggle></ThemeToggle>
               <button onClick={handleBarClick} className='btn md:hidden bg-transparent  text-2xl px-3 font-extrabold dark:text-white'>{showLink ? <RxCross2 /> : <HiMiniBars3 />}</button>
            </div>
            {
               user ? <div className='hidden md:flex items-center gap-2'>
                  <div>
                     {/* <button onClick={() => setDarkMood(!darkMood)} className='btn'>{darkMood ? 'Light' : 'Dark'}</button> */}
                     <ThemeToggle></ThemeToggle>
                  </div>
                  <div>
                     <Link to={'/dashboard/profile'}><img className='w-12 p-1 rounded-full border aspect-square user-profile' referrerPolicy='no-referrer' src={user?.photoURL ? user.photoURL : profileImg} alt="" /></Link>

                     <Tooltip
                        anchorSelect=".user-profile"
                        content={user?.displayName}
                     />
                  </div>
                  <div>
                     <button onClick={handleLogout} className='btn btn-md bg-opacity-80 border-none bg-blue-900 text-white rounded-md flex items-center justify-center'> <VscSignOut className='text-[17px]' /> Sign out</button>
                  </div>
               </div> : <div className='hidden lg:flex items-center gap-2'>
                  <div>
                     {/* <button onClick={() => setDarkMood(!darkMood)} className='btn'>{darkMood ? 'Light' : 'Dark'}</button> */}
                     <ThemeToggle></ThemeToggle>
                  </div>
                  <div>
                     <Link to={'/auth/sign-up'} className='btn btn-md bg-opacity-80 border-none rounded-md bg-blue-900 text-white flex items-center justify-center' >Register</Link>
                  </div>
                  <div>
                     <Link to='/auth/sign-in' className='btn btn-md bg-opacity-80 border-none rounded-md bg-blue-900 text-white flex items-center justify-center' >  <VscSignIn className='text-[17px]' /> Sign In</Link>
                  </div>
               </div>
            }
         </div>
         {/* nav links */}
         <div className={` ${showLink ? 'block animate__animated animate__fadeInDown' : 'hidden animate_animated animate_fadeInUp'} pt-3`}>
            <ul className='pb-4 space-y-3 text-lg dark:text-white'>
               <li><NavLink to='/' onClick={hideLink} className='flex items-center gap-2 p-2'> <FaHome /> Home</NavLink></li>
               <li><NavLink to='/marathons' onClick={hideLink} className='flex items-center gap-2 p-2'> <FaListAlt /> Marathons</NavLink> </li>
               <li onClick={() => setShowMenu(!showMenu)} className={user ? 'block' : 'hidden'}>
                  <div className='flex items-center justify-between pr-5'><span className='flex items-center gap-2 p-2'> <MdDashboard /> Dashboard</span> {showMenu ? <FaChevronUp /> : <FaChevronDown />}</div>
                  <ul className={`${showMenu ? 'block' : 'hidden'} px-4`}>
                     <li><NavLink to='/dashboard' onClick={hideLink} className='flex items-center gap-2 p-2'> <FaHome /> Home</NavLink> </li>
                     <li><NavLink to='/dashboard/add-marathon' onClick={hideLink} className='flex items-center gap-2 p-2'> <FaDatabase /> Add Marathon</NavLink> </li>
                     <li><NavLink to='/dashboard/my-marathons-list' onClick={hideLink} className='flex items-center gap-2 p-2'> <IoNewspaper /> My Marathons List </NavLink> </li>
                     <li><NavLink to='/dashboard/my-apply-list' onClick={hideLink} className='flex items-center gap-2 p-2'> <RiMessage2Fill /> My Apply List</NavLink> </li>
                     <li><NavLink to='/dashboard/profile' onClick={hideLink} className='flex items-center gap-2 p-2'> <FaUser />My Profile</NavLink> </li>
                  </ul>
               </li>
               <li>
                  {user ? <button onClick={handleLogout} className='btn btn-md btn-block bg-opacity-80 border-none bg-blue-900 text-white rounded-md  flex items-center justify-center'> <VscSignOut className='text-[17px]' /> Sign out</button> : <Link to='/auth/sign-in' onClick={() => setShowLink(false)} className='btn bg-opacity-50 border-none bg-blue-300 flex items-center justify-center' > <VscSignIn className='text-[17px]' /> Sign In</Link>}
               </li>
            </ul>
         </div>
      </nav>
   )
}

export default Navbar
