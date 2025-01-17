import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import contactBg from '../assets/contact-us.png';

const ContactUs = () => {
   return (
      <div className="bg-gray-100 py-16">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-secondary text-center mb-10">
               Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Contact Form */}
               <div className="bg-white shadow-lg rounded-md p-6">
                  <h3 className="text-2xl font-semibold text-secondary mb-4">
                     Send Us a Message
                  </h3>
                  <form className="space-y-4">
                     <div>
                        <label
                           htmlFor="name"
                           className="block text-sm font-medium text-gray-700"
                        >
                           Name
                        </label>
                        <input
                           type="text"
                           id="name"
                           className="w-full mt-1 p-3 border rounded-md focus:ring-primary focus:border-primary"
                           placeholder="Your Name"
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="email"
                           className="block text-sm font-medium text-gray-700"
                        >
                           Email
                        </label>
                        <input
                           type="email"
                           id="email"
                           className="w-full mt-1 p-3 border rounded-md focus:ring-primary focus:border-primary"
                           placeholder="Your Email"
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="message"
                           className="block text-sm font-medium text-gray-700/10"
                        >
                           Message
                        </label>
                        <textarea
                           id="message"
                           rows="4"
                           className="w-full mt-1 p-3 border rounded-md focus:ring-primary focus:border-primary"
                           placeholder="Your Message"
                        ></textarea>
                     </div>
                     <button
                        type="submit"
                        className="btn btn-primary bg-primary border-none hover:bg-red-600 text-white w-full rounded-sm"
                     >
                        Send Message
                     </button>
                  </form>
               </div>

               {/* Contact Information */}
               <div
                  style={{ backgroundImage: `url('${contactBg}')` }}
                  className=" text-white shadow-lg rounded-lg  r bg-center bg-cover relative">
                  <div className=' w-full h-full bg-secondary/85 inset-0 flex flex-col justify-center p-6'>
                     <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
                     <p className="text-lg mb-6">
                        Have any questions? Feel free to reach out to us directly!
                     </p>
                     <div className="flex items-center text-lg">
                        <FaPhoneAlt size={24} className="mr-4" />
                        <span>+1 (234) 567-890</span>
                     </div>
                  </div>


               </div>
            </div>
         </div>
      </div>
   );
};

export default ContactUs;
