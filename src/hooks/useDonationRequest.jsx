import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import useAuth from './useAuth';

const useDonationRequest = ({ donationRequestId }) => {
   const { user } = useAuth();

   const query = useQuery({
      queryKey: ['donation-request-data', user?.email],
      queryFn: async () => {
         // INITIAL RESULT DATA
         const result = {};

         // FETCH A SINGLE DONATION REQUEST DATA
         if (donationRequestId) {
            try {
               const { data: donationRequest } = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests/${donationRequestId}`);
               result.donationRequest = { data: donationRequest, success: true, message: 'Data is retured successfully' };
            } catch (error) {
               result.donationRequest = { success: false, message: 'Something went wrong', data: {}, error };
            }
         } else {
            result.donationRequest = { success: false, message: 'Data was not found because of missing donation request ID', data: {} };
         };

         // FETCH ALL DONATION REQUEST DATA
         try {
            const { data: allDonationRequests } = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests`);
            result.allDonationRequests = { data: allDonationRequests, success: true, message: 'Data is returned successfully' };
         } catch (error) {
            result.allDonationRequests = { success: false, message: "Something went wrong", data: [], error };
         };

         // FETCH RECENT THREE LATEST DONATION REQUESTS DATA
         try {
            const recentDonationRequests = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests?email=${user?.email}&count=3&sort=dce`);
            result.recentDonationRequests = { data: recentDonationRequests, success: true, message: 'Data is returned successfully' };
         } catch (error) {
            result.recentDonationRequests = { success: false, message: 'Something went wrong', data: [], error };
         };

         // RETURN THE FINAL RESULT DATA
         return result;
      }
   });

   return query;
};

export default useDonationRequest;
