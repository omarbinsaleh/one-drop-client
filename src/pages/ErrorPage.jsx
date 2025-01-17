import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  // CHANGE THE PAGE TITLE:
  document.title = "Not Found Page"

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-6">
      <div className="text-red-500 mb-4">
        <FaExclamationTriangle className="text-8xl" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found!</h1>
      <p className="text-gray-600 mt-4">
        Oops! The page you’re looking for doesn’t exist. It might have been moved or deleted.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-3 bg-secondary text-white font-bold rounded-sm shadow hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900 ring-offset-2"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
