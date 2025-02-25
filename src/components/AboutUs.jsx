import { FaUsers, FaGlobe, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const AboutUs = () => {
  const {user, loading} = useAuth();
  const navigate = useNavigate();

  const handleBecomeADonor = () => {
    if(user) {
      if (user.isDonor) {
        return toast.warn("You are a donor already!! with us");
      };
  
      if (user.isAdmin) {
        return toast.warn("You are an Admin here!!");
      }
  
      if (user.isVolunteer) {
        return toast.warn("You are a volunteer already");
      }
    }

    navigate('/auth/sign-up');
  }

  if (loading) {
    return <Spinner></Spinner>
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col items-center py-10 px-4 md:px-10 lg:px-20 dark:bg-gray-900">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold text-primary">About Us</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Welcome to <span className="font-bold text-secondary dark:text-blue-500">One Drop</span>, a platform dedicated to saving lives through the power of blood donation. We connect donors with those in need, making the process seamless and efficient.
        </p>
      </div>

      {/* Mission, Vision, and Impact Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <FaHeart className="text-5xl text-red-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            To create a community where no one has to struggle to find a blood donor in times of emergency.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <FaGlobe className="text-5xl text-blue-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            A world where safe blood is accessible to every patient, anytime and anywhere.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <FaUsers className="text-5xl text-green-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-4">Our Impact</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            With the support of thousands of donors, we've helped save countless lives across the country.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center max-w-2xl">
        <h2 className="text-2xl font-semibold text-primary">Join Us in Saving Lives</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Every drop of blood can make a difference. Become a donor today and be a hero to someone in need.
        </p>
        {user?.isAdmin || user?.isDonor || user?.isVolunteer ? <button className="mt-6 btn hover:bg-blue-900 rounded-none bg-blue-900 border-none text-white">Thanks fo being with us</button>  :<button onClick={handleBecomeADonor} className="mt-6 btn btn-primary text-white">Become a Donor</button>}
      </div>
    </div>
  );
};

export default AboutUs;
