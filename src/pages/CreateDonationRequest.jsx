import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";
import useDonationRequest from "../hooks/useDonationRequest";

const CreateDonationRequest = () => {
   const [upazilas, setUpazilas] = useState([]); // for the upazilas input field
   const { user, loading } = useAuth();

   // CHANGE THE PAGE TITLE
   document.title = "New Donation Request | One Drop";

   // FETCH DATA FROM THE DATABASE
   const { isPending, data, error } = useDonationRequest({
      allDonationRequests: false,
      currentUserDonationRequests: false,
      recentDonationRequests: false,
   })

   // const { isPending, data, error } = useQuery({
   //    queryKey: ['districtsData', 'upazilasData'],
   //    queryFn: async () => {
   //       // FETCH THE DISTRICTS DATA
   //       const { data: districtsData } = await axios.get(`${import.meta.env.VITE_API_URL}/districts`)
   //       const districts = districtsData.find(item => item.name === 'districts').data;

   //       // FETCH UPAZILAS DATA
   //       const { data: upazilasData } = await axios.get(`${import.meta.env.VITE_API_URL}/upazilas`);
   //       const upazilas = upazilasData.find(item => item.name === 'upazilas').data;

   //       return { districts, upazilas }
   //    }
   // })

   // RENDER THE SPINNER, WHILE THE DATA IS BEING FETCHED
   if (isPending || loading) {
      return <Spinner></Spinner>
   }

   // HANDLE DISTRICT CHANGE
   const handleDistrictsChange = (e) => {
      const districtName = e.target.value;
      const district = data?.districts?.data?.find(district => district.name === districtName);
      const districtId = district.id;
      const upazilasData = data?.upazilas?.data?.filter(upazila => upazila.district_id === districtId);
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
         status: 'pending'
      }

      // 04. send the data to the backend here
      try {
         const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/donation-requests`, { donationRequest: request })
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
      <div className=" mx-auto px-6 bg-base-100 shadow-lg rounded-sm dark:bg-gray-800">
         <header>
            <Title title="Create Donation Requests" />
         </header>

         <form onSubmit={handleSubmit} className="space-y-4 pb-10 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 flex-wrap flex-col sm:flex-row">
               {/* Requester Name */}
               <div className="flex-1 w-full">
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
               <div className="flex-1 w-full">
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

            <div className="flex items-center gap-3 flex-wrap flex-col sm:flex-row">
               {/* Recipient Name */}
               <div className="flex-1 w-full">
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
                     {data?.districts?.data?.map(district => <option key={district.id} value={district.name}>{district.name}</option>)}
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

            <div className="flex items-center gap-3 flex-wrap">
               {/* Hospital Name */}
               <div className="flex-1">
                  <label className="block text-sm font-medium dark:text-white">
                     Hospital Name
                  </label>
                  <input
                     type="text"
                     required
                     name="hospitalName"
                     placeholder="Enter hospital name"
                     className="w-full  mt-1 p-3 border rounded-sm dark:bg-gray-700 dark:text-white focus:ring-primary focus:border-primary"
                  />
               </div>

               {/* Full Address */}
               <div className="flex-1 min-w-72">
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
               className="btn btn-primary btn-block capitalize  max-w-sm mx-auto bg-secondary hover:bg-secondary/90 focus:ring-2 ring-offset-2 ring-secondary text-white mt-4 rounded-sm"
            >
               Request
            </button>
         </form>
      </div>
   );
};

export default CreateDonationRequest;
