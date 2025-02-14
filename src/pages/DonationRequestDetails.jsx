import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTint, FaHospital, FaMapMarkerAlt, FaClock, FaUser } from "react-icons/fa";
import { Button, Modal, Input } from "daisyui";
import Title from "../components/Title";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const fetchDonationRequest = async (id) => {
   const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`);
   return data;
};

const updateDonationStatus = async ({ id, donorInfo }) => {
   const donationRequest = {
      status: "inprogress",
      donorInfo
   }
   const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, { donationRequest });
};

const DonationRequestDetails = () => {
   const { user, loasing } = useAuth();
   const { id } = useParams();
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const [isModalOpen, setIsModalOpen] = useState(false);

   const { data: request, isLoading } = useQuery({
      queryKey: ["donationRequest", id],
      queryFn: () => fetchDonationRequest(id),
   });

   const mutation = useMutation({
      mutationFn: updateDonationStatus,
      onSuccess: () => {
         queryClient.invalidateQueries(["donationRequest", id]);
         setIsModalOpen(false);
         toast.success("Than you for interest!!\nYour request for this donation is under review")
      },
      onError: () => {
         toast.error('Something went wrong!!')
      }
   });

   if (isLoading) return <p className="text-center">Loading...</p>;

   const handleConfirmDonation = () => {
      mutation.mutate({
         id,
         donorInfo: { name: user.displayName, email: user.email },
      });
   };

   console.log(request)

   return (
      <div className=" p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg relative w-full">
         <Title title="Donation Request Details" className="my-1" />

         <div className="space-y-4">
            <p className="text-lg flex items-center gap-2">
               <FaUser className="text-red-500" /> <strong>Recipient:</strong> {request?.recipientName}
            </p>
            <p className="text-lg flex items-center gap-2">
               <FaTint className="text-red-500" /> <strong>Blood Group:</strong> {request?.bloodGroup}
            </p>
            <p className="text-lg flex items-center gap-2">
               <FaHospital className="text-blue-500" /> <strong>Hospital:</strong> {request?.hospitalName}
            </p>
            <p className="text-lg flex items-center gap-2">
               <FaMapMarkerAlt className="text-green-500" /> <strong>Location:</strong> {request?.district}, {request?.upazila}
            </p>
            <p className="text-lg flex items-center gap-2">
               <FaClock className="text-yellow-500" /> <strong>Date & Time:</strong> {request?.donationDate} at {request?.donationTime}
            </p>
            <p className="text-lg">
               <strong>Full Address:</strong> {request?.fullAddress}
            </p>
            <p className="text-lg text-red-600 dark:text-red-400">
               <strong>Request Message:</strong> {request?.requestMessage}
            </p>
         </div>

         {request.status === "pending" && (
            <button
               onClick={() => setIsModalOpen(true)}
               className="btn mt-4 bg-primary hover:bg-red-600 focus:ring-2 ring-offset-2 ring-red-600 text-white px-6 py-2"
            >
               Donate Now
            </button>
         )}

         {/* DONATION CONFIRMATION MODAL */}
         <div className={` absolute top-0 left-0 w-full h-full bg-gray-500/90 items-center justify-center ${isModalOpen ? 'flex' : 'hidden'}`} onClick={() => setIsModalOpen(false)}>
            <div className="p-6 bg-white dark:bg-gray-900 shadow-lg rounded-md w-6/12">
               <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Confirm Your Donation</h2>
               <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300">Donor Name</label>
                  <input type="text" value={user?.displayName} disabled className="input input-bordered w-full" />
               </div>
               <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300">Donor Email</label>
                  <input type="email" value={user?.email} disabled className="input input-bordered w-full" />
               </div>
               <div className="flex justify-end">
                  <button className="btn bg-primary text-white mr-2 hover:bg-red-600 focus:ring-2 ring-red-600 ring-offset-2" onClick={() => setIsModalOpen(false)}>
                     Cancel
                  </button>
                  <button className="btn bg-secondary text-white hover:bg-secondary/85 focus:ring-2 ring-secondary ring-offset-2" onClick={handleConfirmDonation} disabled={mutation.isLoading}>
                     {mutation.isLoading ? "Processing..." : "Confirm Donation"}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default DonationRequestDetails;
