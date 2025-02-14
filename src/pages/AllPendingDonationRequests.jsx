import { useNavigate } from "react-router-dom";
import useDonationRequest from "../hooks/useDonationRequest";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import DonationRequest from "../components/DonationRequest";
import Title from "../components/Title";

const fetchPendingRequests = async () => {
  const res = await fetch("/api/donation-requests?status=pending");
  return res.json();
};

const AllPendingDonationRequests = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // Check if user is logged in

  const { data: requests, isLoading } = useDonationRequest({
    currentUserDonationRequests: false,
    recentDonationRequests: false,
    filter: 'pending',
    districts: false,
    upazilas: false,
  })

  if (loading) return <Spinner />;

  return (
    <div className=" mx-auto px-4 py-8 max-h-screen overflow-auto border w-full">
      <header >
        <Title title="Donations Requests" />
      </header>

      <main className="mt-14">
        {isLoading ? (
          <p className="text-center">Loading requests...</p>
        ) : requests?.allDonationRequests?.data?.length === 0 ? (
          <p className="text-center text-gray-500">No pending donation requests available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {requests?.allDonationRequests?.data.map((request) => <DonationRequest key={request._id} request={request} />)}
          </div>
        )}
      </main>
    </div>
  );
};

export default AllPendingDonationRequests;
