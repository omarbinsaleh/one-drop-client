import React from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaArrowRight } from "react-icons/fa";

const NoData = ({ message, actionText, actionLink }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Animated Icon */}
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full shadow-md">
        <FaBoxOpen className="text-6xl text-gray-500 dark:text-gray-300" />
      </div>

      {/* Message */}
      <h2 className="text-2xl font-semibold mt-6 text-gray-700 dark:text-gray-300">
        {message || "Nothing to Show Here"}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        It looks like there's no data available right now.
      </p>

      {/* Action Button */}
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="mt-6 px-6 py-3 flex items-center gap-2 text-white bg-secondary hover:bg-secondary/90 focus:ring-2 ring-offset-2 ring-secondary rounded-lg transition-all duration-300 shadow-md"
        >
          {actionText} <FaArrowRight />
        </Link>
      )}
    </div>
  );
};

export default NoData;
