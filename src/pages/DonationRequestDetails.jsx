import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTint, FaHospital, FaMapMarkerAlt, FaClock, FaUser, FaArrowLeft } from "react-icons/fa";
import Title from "../components/Title";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import bgImg from '../assets/bg-donation-details.jpg';
import useAxiosSecure from "../hooks/useAxiosSecure";

const DonationRequestDetails = () => {
   const navigate = useNavigate();
   const { user, loading } = useAuth();
   const { id } = useParams();
   const queryClient = useQueryClient();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const axiosSecure = useAxiosSecure();

   // CHANGE THE PAGE TITLE
   document.title = 'Request Detials | One Drop';

   // FETCH THE BLOOD DONATION REQUEST DATA USING ID
   const { data: request, isLoading } = useQuery({
      queryKey: ["donationRequest", id],
      queryFn: async () => {
         try {
            const { data } = await axiosSecure.get(`/donation-requests/${id}`);
            return data;
         } catch (error) {
            toast.error("Something went wrong");
            console.log(error)
         }
      },
   });

   // UPDATE THE DONATION STATUS TO 'inprogress'
   const mutation = useMutation({
      // 1st Parameter: mutation function to update the donation request status change
      mutationFn: async ({ id, donorInfo }) => {
         // data to be updated within the donation request
         const donationRequest = {
            status: "inprogress",
            donorInfo
         };
         const { data } = await axiosSecure.patch(`/donation-requests/${id}`, { donationRequest });
      },

      // 2nd Parameter: on successfull data update, display a success message and close the modal
      onSuccess: () => {
         // invalidate the query client and trigger the data refetching
         queryClient.invalidateQueries(["donationRequest", id]);
         // close the confirmation modal
         setIsModalOpen(false);
         // display a success message
         toast.success("Thank you for interest!!\nYour request for this donation is under review")
      },

      // 3rd Parameter: display an error message when something goes wrong while updating the data
      onError: () => {
         toast.error('Something went wrong!!')
      }
   });

   // RENDER THE SPINNER WHILE DATA LOADING
   if (loading || isLoading) return <Spinner></Spinner>;

   // HANDLE THE CONFIRM DONATION
   const handleConfirmDonation = () => {
      const donorInfo = {
         name: user.displayName,
         email: user.email,
         photoURL: user.photoURL,
         bloodGroup: user.blood,
         upazila: user.upazila,
         district: user.district
      }
      // trigger the update
      mutation.mutate({ id, donorInfo });
   };

   // HANDLE DONATE NOW BUTTON CLICK
   const handleDonateNow = (bloodRequest) => {
      // check the user's blood group 
      if (bloodRequest.bloodGroup !== user.blood) {
         return toast.warn("Sorry!!, Your blood group does not match with the requested blood group");
      };

      // open the confirmation modal
      return setIsModalOpen(true);
   };

   return (
      <div
         style={{
            backgroundImage: `url(${bgImg})`
         }}
         className="bg-center bg-cover bg-fixed"
      >
         <div className=" p-6 lg:px-10 bg-white dark:bg-gray-900 relative w-full min-h-screen bg-cover bg-center bg-opacity-90">
            {/* BUTTON TO GO BACK */}
            <button
               onClick={() => navigate(-1)}
               className="btn absolute bg-primary/50 text-secondary hover:bg-primary/60 rounded-lg top-5 left-1">
               <FaArrowLeft /> Go Back
            </button>

            {/* TITLE FOR THIS PAGE */}
            <Title title="Donation Request Details" className="my-1" />

            <main className="mt-14 dark:text-white">
               {/* DETAILED INFORMATION ABOUT THE BLOOD DONATION REUEST */}
               <section className="space-y-4">
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
               </section>

               {/* DONATE NOW BUTTON: FACILATING THE DOANTION PROCESS */}
               {request.status === "pending" && (
                  <button
                     onClick={() => handleDonateNow(request)}
                     className="btn btn-block max-w-[300px] mt-4 bg-secondary/90 hover:bg-secondary focus:ring-2 ring-offset-2 ring-secondary text-white px-6 py-2"
                  >
                     Donate Now
                  </button>
               )}
            </main>

            {/* DONATION CONFIRMATION MODAL */}
            <section
               className={` absolute top-0 left-0 w-full h-full bg-gray-500/90 items-center justify-center ${isModalOpen ? 'flex' : 'hidden'}`}
               onClick={() => setIsModalOpen(false)}
            >
               <div className="p-6 bg-white dark:bg-gray-900 shadow-lg rounded-md w-10/12 max-w-xl ">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Confirm Your Donation</h2>
                  <div className="mb-4">
                     <label className="block text-gray-700 dark:text-gray-300">Your Name</label>
                     <input type="text" value={user?.displayName} disabled className="input input-bordered w-full" />
                  </div>
                  <div className="mb-4">
                     <label className="block text-gray-700 dark:text-gray-300">Your Email</label>
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
            </section>
         </div>


      </div>
   );
};

export default DonationRequestDetails;
