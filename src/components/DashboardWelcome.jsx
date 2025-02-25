import React from "react";
import { Link } from "react-router-dom";
import { FaHandHoldingHeart, FaTint, FaUserPlus } from "react-icons/fa";

const DashboardWelcome = ({user}) => {

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-700 dark:from-red-800/20 dark:to-red-900/30 text-white p-8 rounded-sm shadow-sm">
      {/* Greeting Section */}
      <h1 className="text-3xl font-bold flex items-center gap-2">
        Welcome, {user.displayName} 👋
      </h1>
      <p className="mt-2 text-lg">
        Thank you for being part of our mission to save lives! Your contributions 
        as a donor make a huge difference.
      </p>

      {/* Quick Actions Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Donate Blood Card */}
        <div className="p-4 bg-white dark:bg-white/80 rounded-md shadow-md text-center text-gray-800">
          <FaTint className="text-4xl text-red-600 mx-auto" />
          <h3 className="text-lg font-semibold mt-2">Donate Blood</h3>
          <p className="text-sm text-gray-600 mt-1">
            Your donation can save lives. Be a hero today!
          </p>
          <Link
            to="/dashboard/create-donation-request"
            className="btn btn-sm mt-3 bg-red-600 text-white hover:bg-red-700"
          >
            Request Donation
          </Link>
        </div>

        {/* Find a Donor Card */}
        <div className="p-4 bg-white dark:bg-white/80 rounded-md shadow-md text-center text-gray-800">
          <FaHandHoldingHeart className="text-4xl text-red-600 mx-auto" />
          <h3 className="text-lg font-semibold mt-2">Find a Donor</h3>
          <p className="text-sm text-gray-600 mt-1">
            Need blood? Search for available donors in your area.
          </p>
          <Link
            to="/search-donors"
            className="btn btn-sm mt-3 bg-red-600 text-white hover:bg-red-700"
          >
            Search Donors
          </Link>
        </div>

        {/* Update Profile Card */}
        <div className="p-4 bg-white dark:bg-white/80 rounded-md shadow-md text-center text-gray-800">
          <FaUserPlus className="text-4xl text-red-600 mx-auto" />
          <h3 className="text-lg font-semibold mt-2">Update Profile</h3>
          <p className="text-sm text-gray-600 mt-1">
            Keep your donor profile updated to help those in need.
          </p>
          <Link
            to="/dashboard/profile"
            className="btn btn-sm mt-3 bg-red-600 text-white hover:bg-red-700"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;
