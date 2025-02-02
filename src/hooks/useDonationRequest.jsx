import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'

const useDonationRequest = (donationRequestId) => {
   const query = useQuery({
      queryKey: ['donation-request-data'],
      queryFn: async () => {
         // FETCH A SINGLE DONATION REQUEST DATA
         const { data: donationRequest } = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests/${donationRequestId}`);

         // FETCH ALL DONATION REQUEST DATA
         const { data: allDonationRequests } = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests`);

         // FETCH RECENT THREE DONATION REQUESTS DATA
         const recentDonationRequests = allDonationRequests.length >= 3 ? allDonationRequests.slice(0, 3) : allDonationRequests;

         return { donationRequest, allDonationRequests, recentDonationRequests };

      }
   })

   return query;
}

export default useDonationRequest
