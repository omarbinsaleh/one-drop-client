import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const useAllUsers = ({userStatus=''}) => {
  const query = useQuery({
   queryKey: ['all-users', userStatus],
   queryFn: async () => {
      const result = {};

      // FETCH ALL USERS DATA
      try {
         const {data:allUsersData} = await axios.get(`${import.meta.env.VITE_API_URL}/users?status=${userStatus}`)
         result.users = {data: allUsersData, success:true, message: 'Data is retured successfully' }
      } catch (error) {
         result.users = {data: [], success: false, message: 'Something went wrong', error }
      }

      return result;
   }
  });

  return query;
}

export default useAllUsers;
