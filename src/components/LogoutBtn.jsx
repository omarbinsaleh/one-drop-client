import React from 'react'
import { VscSignOut } from 'react-icons/vsc'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
   const {logOut} = useAuth();
   const navigate = useNavigate();

   function handleLogout() {
      logOut()

      navigate('/')
      toast.success('User has logged out')
   }

   return (
      <button
         onClick={handleLogout}
         className="btn border border-secondary/30 bg-gray-200 hover:backdrop:bg-gray-400 text-black rounded-[4px] btn-sm"
      >
         <VscSignOut className=""></VscSignOut>
         Logout
      </button>
   )
}

export default LogoutBtn
