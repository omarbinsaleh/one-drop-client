import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
   const navigate = useNavigate();

   return (
      <div
         className="relative bg-cover bg-center bg-no-repeat h-[500px] flex items-center justify-center bg-fixed"
         style={{
            backgroundImage: "url('https://plus.unsplash.com/premium_photo-1682309704250-6bac0f499665?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
         }}
      >
         {/* Parallax Overlay */}
         <div className="absolute inset-0 bg-secondary bg-opacity-65"></div>

         {/* Content */}
         <div className="relative z-10 text-center text-white px-6 max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">
               Be the Lifeline Someone Needs
            </h1>
            <p className="text-lg mb-8">
               Join our mission to connect donors with those in need. Together, we can make a difference and save lives.
            </p>
            <div className="flex justify-center gap-4">
               <button
                  className="btn btn-primary bg-primary border-none hover:bg-red-600 text-white rounded-sm"
                  onClick={() => navigate('/auth/sign-up')}
               >
                  Join as a Donor
               </button>
               <button
                  className="btn text-white bg-transparent hover:bg-secondary hover:text-white border-2 border-white rounded-sm"
                  onClick={() => navigate('/search')}
               >
                  Search Donors
               </button>
            </div>
         </div>
      </div>
   );
};

export default Banner;
