import useDonationRequest from "../hooks/useDonationRequest";
import Spinner from "../components/Spinner";
import DonationRequest from "../components/DonationRequest";
import Title from "../components/Title";
import SearchBox from "../components/SearchBox";
import { useState } from "react";
import NoData from "../components/NoData";

const AllPendingDonationRequests = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [search, setSearch] = useState('');

  // CHANGE THE PAGE TITLE
  document.title = 'All Requests | One Drop'

  // FETCH ALL THE PENDING BLOOD DONATION REQUESTS
  const { data: requests, isLoading } = useDonationRequest({
    currentUserDonationRequests: false,
    recentDonationRequests: false,
    filter: 'pending',
    districts: false,
    upazilas: false,
    bloodGroup: bloodGroup
  })

  const handleFilter = (e) => {
    if (e.target.value === 'all') {
      setBloodGroup('');
    } else {
      const encondedData = encodeURIComponent(e.target.value);
      setBloodGroup(encondedData);
    }
  }

  console.log(requests);
  console.log(bloodGroup)

  // RENDER THE SPINNER WHILE THE DATA LOADING
  // if (isLoading) return <Spinner />;

  return (
    <div className=" mx-auto px-4 py-8 max-h-screen overflow-auto border w-full">
      <header className="">
        {/* <Title title="Donations Requests" /> */}
        <div className="flex md:justify-end flex-wrap gap-2">
        <SearchBox></SearchBox>

        {/* filter based on the blood group */}
        <select
          onChange={handleFilter}
          className='select select-md rounded-md border border-gray-300 bg-secondary text-white'
        >
          <option value='all'>Choose All</option>
          <option value='A+'>A+</option>
          <option value='A-'>A-</option>
          <option value='B+'>B+</option>
          <option value='B-'>B-</option>
          <option value='AB+'>AB+</option>
          <option value='AB-'>AB-</option>
          <option value='O+'>O+</option>
          <option value='O-'>O-</option>
        </select>
      </div>
      </header>

      

      <main className="mt-7 max-h-screen">
        {isLoading ? (
          <p className="text-center">Loading requests...</p>
        ) : requests?.allDonationRequests?.data?.length === 0 ? (
          <div className="flex items-center justify-center flex-1 border min-h-[500px]">
            <NoData title='No Donation Request'></NoData>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {requests?.allDonationRequests?.data?.map((request) => <DonationRequest key={request._id} request={request} />)}
          </div>
        )}
      </main>
    </div>
  );
};

export default AllPendingDonationRequests;
