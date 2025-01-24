import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";

const CreateDonationRequest = () => {
   const [upazilas, setUpazilas] = useState([]); // for the upazilas input field
   const { user, loading } = useAuth();

   // FETCH DATA FROM THE DATABASE
   const { isPending, data, error } = useQuery({
      queryKey: ['districtsData', 'upazilasData'],
      queryFn: async () => {
         // FETCH THE DISTRICTS DATA
         const { data: districtsData } = await axios.get(`${import.meta.env.VITE_API_URL}/districts`)
         const districts = districtsData[1].data;

         // FETCH UPAZILAS DATA
         const { data: upazilasData } = await axios.get(`${import.meta.env.VITE_API_URL}/upazilas`);
         const upazilas = upazilasData[2].data;

         return { districts, upazilas }
      }
   })

   // RENDER THE SPINNER, WHILE THE DATA IS BEING FETCHED
   if (isPending || loading) {
      return <Spinner></Spinner>
   }

   // HANDLE DISTRICT CHANGE
   const handleDistrictsChange = (e) => {
      const districtName = e.target.value;
      const district = data.districts.find(district => district.name === districtName);
      const districtId = district.id;
      const upazilasData = data.upazilas.filter(upazila => upazila.district_id === districtId);
      setUpazilas(upazilasData);
   }

   // HANDLE FORM SUBMISION
   const handleSubmit = async (e) => {
      // 01. block the native behaviour of the form submision
      e.preventDefault();

      // 02. take user input
      const form = new FormData(e.target);
      const requesterName = form.get('requesterName');
      const requesterEmail = form.get('requesterEmail');
      const recipientName = form.get('recipientName');
      const bloodGroup = form.get('blood-group');
      const hospitalName = form.get('hospitalName');
      const fullAddress = form.get('fullAddress');
      const district = form.get('district');
      const upazila = form.get('upazila');
      const donationDate = form.get('donationDate');
      const donationTime = form.get('donationTime');
      const requestMessage = form.get('requestMessage');
      const status = 'pending';

      // 03. create donation request
      const request = {
         requesterName,
         requesterEmail,
         recipientName,
         bloodGroup,
         hospitalName,
         fullAddress,
         district,
         upazila,
         donationDate,
         donationTime,
         requestMessage,
         status
      }

      // 04. send the data to the backend here
      try {
         const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/donation-requests`, request)
         if (data.insertedId) {
            toast.success("Request Posted Successfully!")
            // Reset form after submission
            e.target.reset();
         }
      } catch (error) {
         toast.error(error.message)
         console.log(error);
      }
   };

   return (
      <div className="max-w-4xl mx-auto py-10 px-6 bg-base-100 shadow-lg rounded-sm dark:bg-gray-800">
         <h1 className="text-2xl font-bold text-secondary mb-6 dark:text-white">
            Create Donation Request
         </h1>

         <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
               {/* Requester Name */}
               <div className="flex-1">
                  <label className="block text-sm font-medium dark:text-white">
                     Requester Name
                  </label>
                  <input
                     type="text"
                     name="requesterName"
                     value={user?.displayName}
                     readOnly
                     className="w-full mt-1 p-3 border rounded-sm bg-gray-200 cursor-not-allowed dark:bg-gray-700"
                  />
               </div>

               {/* Requester Email */}
               <div className="flex-1">
                  <label className="block text-sm font-medium dark:text-white">
                     Requester Email
                  </label>
                  <input
                     type="email"
                     name="requesterEmail"
                     value={user?.email}
                     readOnly
                     className="w-full mt-1 p-3 border rounded-sm bg-gray-200 cursor-not-allowed dark:bg-gray-700"
                  />
               </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
               {/* Recipient Name */}
               <div className="flex-1">
                  <label className="block text-sm font-medium dark:text-white label">
                     Recipient Name
                  </label>
                  <input
                     type="text"
                     required
                     name="recipientName"
                     placeholder="Enter recipient name"
                     className="w-full mt-1 p-3 border rounded-sm dark:bg-gray-700 dark:text-white focus:ring-primary focus:border-primary"
                  />
               </div>

               {/* blood group input field   */}
               <label className="form-control w-full rounded-sm flex-1">
                  <div className="label">
                     <span className="label-text font-medium">Blood Group</span>
                  </div>
                  <select className="select select-bordered rounded-sm" defaultValue='' name='blood-group' required>
                     <option value=''>Choose your blood group</option>
                     <option value='A+'>A+</option>
                     <option value='A-'>A-</option>
                     <option value='B+'>B+</option>
                     <option value='B-'>B-</option>
                     <option value='AB+'>AB+</option>
                     <option value='AB-'>AB-</option>
                     <option value='O+'>O+</option>
                     <option value='O-'>O-</option>
                  </select>
               </label>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
               {/* Recipient Districts Input Field   */}
               <label className="form-control w-full rounded-sm flex-1">
                  <div className="label">
                     <span className="label-text font-medium">District</span>
                  </div>
                  <select className="select select-bordered rounded-sm" onChange={handleDistrictsChange} defaultValue='' name='district' required>
                     <option value=''>Choose your district</option>
                     {data?.districts?.map(district => <option key={district.id} value={district.name}>{district.name}</option>)}
                  </select>
               </label>
               {/* Recipient Upazilas Input Field   */}
               <label className="form-control w-full rounded-sm flex-1">
                  <div className="label">
                     <span className="label-text font-medium">Upazila</span>
                  </div>
                  <select className="select select-bordered rounded-sm" defaultValue='' name='upazila' required>
                     <option value=''>Choose your upazila</option>
                     {upazilas?.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)}
                  </select>
               </label>
            </div>

            {/* Hospital Name */}
            <div>
               <label className="block text-sm font-medium dark:text-white">
                  Hospital Name
               </label>
               <input
                  type="text"
                  required
                  name="hospitalName"
                  placeholder="Enter hospital name"
                  className="w-full mt-1 p-3 border rounded-sm dark:bg-gray-700 dark:text-white focus:ring-primary focus:border-primary"
               />
            </div>

            {/* Full Address */}
            <div>
               <label className="block text-sm font-medium dark:text-white">
                  Full Address
               </label>
               <input
                  type="text"
                  required
                  name="fullAddress"
                  placeholder="Enter full address"
                  className="w-full mt-1 p-3 border rounded-sm dark:bg-gray-700 dark:text-white focus:ring-primary focus:border-primary"
               />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
               {/* Donation Date */}
               <div className="flex-1">
                  <label className="block text-sm font-medium dark:text-white">
                     Donation Date
                  </label>
                  <input
                     type="date"
                     required
                     name="donationDate"
                     className="w-full mt-1 p-3 border rounded-sm dark:bg-gray-700 dark:text-white focus:ring-primary focus:border-primary"
                  />
               </div>

               {/* Donation Time */}
               <div className="flex-1">
                  <label className="block text-sm font-medium dark:text-white">
                     Donation Time
                  </label>
                  <input
                     type="time"
                     required
                     name="donationTime"
                     className="w-full mt-1 p-3 border rounded-sm dark:bg-gray-700 dark:text-white focus:ring-primary focus:border-primary"
                  />
               </div>
            </div>

            {/* Request Message */}
            <div>
               <label className="block text-sm font-medium dark:text-white">
                  Request Message
               </label>
               <textarea
                  name="requestMessage"
                  placeholder="Why do you need blood?"
                  className="w-full mt-1 p-3 border rounded-sm dark:bg-gray-700 dark:text-white focus:ring-primary focus:border-primary"
               />
            </div>

            {/* Submit Button */}
            <button
               type="submit"
               className="btn btn-primary btn-block max-w-sm mx-auto bg-secondary hover:bg-red-600 text-white mt-4 rounded-sm"
            >
               Request
            </button>
         </form>
      </div>
   );
};

export default CreateDonationRequest;
