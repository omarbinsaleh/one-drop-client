import React from 'react';
import { FaHeartbeat, FaUserPlus, FaSearchLocation, FaHandsHelping } from 'react-icons/fa';

const WhyUs = () => {
  const features = [
    {
      icon: <FaHeartbeat size={40} className="text-primary" />,
      title: 'Life-Saving Donations',
      description: 'Connect donors with those in need, making every drop count towards saving lives.',
    },
    {
      icon: <FaUserPlus size={40} className="text-primary" />,
      title: 'Easy Registration',
      description: 'Quick and seamless donor registration process to join the community.',
    },
    {
      icon: <FaSearchLocation size={40} className="text-primary" />,
      title: 'Find Donors Nearby',
      description: 'Easily search for donors near you with advanced location-based filtering.',
    },
    {
      icon: <FaHandsHelping size={40} className="text-primary" />,
      title: 'Trusted Platform',
      description: 'A secure and reliable platform for connecting donors and recipients.',
    },
  ];

  return (
    <div className="py-16 bg-gray-100 dark:bg-slate-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 text-center text-inherit">
        <h2 className="text-4xl font-bold text-secondary mb-8 dark:text-white">
          Why Choose <span className='uppercase text-blue-800 dark:text-primary'>One Drop</span>?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-md dark:bg-gray-600 dark:text-white p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-secondary mb-2 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
