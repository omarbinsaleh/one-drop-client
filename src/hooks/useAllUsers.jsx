import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'
import { data } from 'react-router-dom';

const useAllUsers = ({userStatus=''}) => {
  const query = useQuery({
   queryKey: ['all-users', userStatus],
   queryFn: async () => {
      const result = {};

      // FETCH ALL USERS DATA
      try {
         const users = await axios.get(`${import.meta.env.VITE_API_URL}/users?status=${userStatus}`)
         result.users = {data: users, success:true, message: 'Data is retured successfully' }
      } catch (error) {
         result.users = {data: [], success: false, message: 'Something went wrong' }
      }

      return result;
   }
  })

  return query;
}

export default useAllUsers
