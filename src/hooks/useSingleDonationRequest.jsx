import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

const useSingleDonationRequest = ({ donationRequestId }) => {

   const query = useQuery({
      queryKey: ['single-donation-request'],
      queryFn: async () => {
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

         // FETCH DISTRICTS
         try {
            const { data: districtsData } = await axios.get(`${import.meta.env.VITE_API_URL}/districts`);
            const finalDistrictsData = districtsData.find(item => item.name === 'districts').data;
            result.districts = { data: finalDistrictsData, success: true, message: 'Data is returned successfully' }
         } catch (error) {
            result.districts = { success: false, message: 'Something went wrong', data: [], error }
         }

         // FETCH UPAZILAS
         try {
            const { data: upazilasData } = await axios.get(`${import.meta.env.VITE_API_URL}/upazilas`);
            const finalUpazilasData = upazilasData.find(item => item.name === 'upazilas').data;
            result.upazilas = { data: finalUpazilasData, success: true, message: 'Data is retured successfully' };
         } catch (error) {
            result.upazilas = { success: false, message: 'Something went wrong', data: [], error }
         }

         // RETURN THE RESULT AS DATA
         return result;
      }
   })

   // RETURN THE QUERY OBJECT
   return query;
}

export default useSingleDonationRequest
