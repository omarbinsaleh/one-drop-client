import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
import useAxiosSecure from './useAxiosSecure';

const useDonationRequest = ({
   allDonationRequests = true,
   currentUserDonationRequests = true,
   recentDonationRequests = true,
   upazilas = true,
   districts = true,
   filter = '',
   search = '',
   bloodGroup = ''
}) => {
   // GET THE CURRENT USER INFORMATION
   const { user } = useAuth();
   const axiosPublic = useAxiosPublic();
   const axiosSecure = useAxiosSecure();

   const query = useQuery({
      queryKey: ['donation-request-data', user?.email, filter, search, bloodGroup],
      queryFn: async () => {
         // INITIAL RESULT DATA
         const result = {};

         if (allDonationRequests) {
            // FETCH ALL DONATION REQUEST DATA
            try {
               const { data: allDonationRequests } = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests?search=${search}&filter=${filter}&bloodGroup=${bloodGroup}`);
               // result.allDonationRequests = { data: allDonationRequests, success: true, message: 'Data is returned successfully' };
               result.allDonationRequests = allDonationRequests;
            } catch (error) {
               result.allDonationRequests = { success: false, message: "Something went wrong", data: [], error };
            };
         } else {
            result.allDonationRequests = null;
         }

         if (currentUserDonationRequests) {
            // FETCH CURRENT USER'S DONATION REQUESTS
            try {
               const { data: userDonationRequests } = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests?email=${user?.email}&filter=${filter}&search=${search}&bloodGroup=${bloodGroup}`, { withCredentials: true });
               // result.currentUserDonationRequests = { data: userDonationRequests, success: true, message: 'Data is returned successfully' };
               result.currentUserDonationRequests = userDonationRequests;
            } catch (error) {
               result.currentUserDonationRequests = { success: false, message: 'Something went wrong', data: [], error };
            }
         } else {
            result.currentUserDonationRequests = null;
         }

         if (recentDonationRequests) {
            // FETCH RECENT THREE LATEST DONATION REQUESTS DATA
            try {
               const { data: recentDonationRequests } = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests?email=${user?.email}&count=3&sort=dce`, { withCredentials: true });
               // result.recentDonationRequests = { data: recentDonationRequests, success: true, message: 'Data is returned successfully' };
               result.recentDonationRequests = recentDonationRequests;
            } catch (error) {
               result.recentDonationRequests = { success: false, message: 'Something went wrong', data: [], error };
            };
         } else {
            result.recentDonationRequests = null;
         }

         if (districts) {
            // FETCH DISTRICTS
            try {
               const { data: districtsData } = await axiosPublic.get(`/districts`);
               const finalDistrictsData = districtsData.find(item => item.name === 'districts').data;
               result.districts = { data: finalDistrictsData, success: true, message: 'Data is returned successfully' }
            } catch (error) {
               result.districts = { success: false, message: 'Something went wrong', data: [], error }
            }
         } else {
            result.districts = null;
         }

         if (upazilas) {
            // FETCH UPAZILAS
            try {
               const { data: upazilasData } = await axiosPublic.get(`/upazilas`);
               const finalUpazilasData = upazilasData.find(item => item.name === 'upazilas').data;
               result.upazilas = { data: finalUpazilasData, success: true, message: 'Data is retured successfully' };
            } catch (error) {
               result.upazilas = { success: false, message: 'Something went wrong', data: [], error }
            }
         } else {
            result.upazilas = null;
         }



         // RETURN THE FINAL RESULT DATA
         return result;
      }
   });

   return query;
};

export default useDonationRequest;
