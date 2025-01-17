import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

const Footer = () => {
   return (
      <footer className="bg-gray-900 text-gray-300 py-10 px-6">
         <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and About */}
            <div>
               <Link to="/" className="flex items-center gap-3 mb-4">
                  <img
                     src={logo}
                     alt="Marathon Hub Logo"
                     className="w-[120px] object-cover"
                  />
               </Link>
               <p>
                  One Drop is your trusted platform for organizing and participating in marathon events. Discover races, connect with organizers, and manage your registrations—all in one place.
               </p>
            </div>

            {/* Quick Links */}
            <div>
               <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
               <ul className="space-y-2">
                  <li>
                     <Link to="/" className="hover:text-blue-400">Home</Link>
                  </li>
                  <li>
                     <Link to="/about" className="hover:text-blue-400">About Us</Link>
                  </li>
                  

               </ul>
            </div>

            {/* Social Media & Contact */}
            <div>
               <h2 className="text-xl font-bold text-white mb-4">Connect with Us</h2>
               <div className="flex gap-4 mb-4">
                  <a
                     href="https://facebook.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-gray-300 hover:text-blue-400"
                  >
                     <FaFacebookF size={24} />
                  </a>
                  <a
                     href="https://twitter.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-gray-300 hover:text-blue-400"
                  >
                     <FaTwitter size={24} />
                  </a>
                  <a
                     href="https://instagram.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-gray-300 hover:text-blue-400"
                  >
                     <FaInstagram size={24} />
                  </a>
                  <a
                     href="https://linkedin.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-gray-300 hover:text-blue-400"
                  >
                     <FaLinkedinIn size={24} />
                  </a>
               </div>
               <p>Email: support@onedrop.com</p>
               <p>Phone: +1 234 567 890</p>
            </div>
         </div>
         <div className="text-center mt-8 border-t border-gray-600 pt-4">
            <p>&copy; {new Date().getFullYear()} One Drop. All Rights Reserved.</p>
         </div>
      </footer>
   );
};

export default Footer;
