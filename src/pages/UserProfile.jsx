import React, { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import defaultAvatar from '../assets/profile.png';
import { FaEdit, FaSave } from "react-icons/fa";

const UserProfile = () => {
  // State for edit mode
  const [isEditable, setIsEditable] = useState(false);
  const { user, loading, setLoading, refetchUser } = useAuth();
  const [upazilas, setUpazilas] = useState([]); // for the upazilas input field

  const formRef = useRef();

  // FETCH DATA FROM THE DATABASE
  const { isPending, data, error } = useQuery({
    queryKey: ['districts', 'upazilas'],
    queryFn: async () => {
      // FETCH THE DISTRICTS DATA
      const { data: districtsData } = await axios.get(`${import.meta.env.VITE_API_URL}/districts`)
      const districts = districtsData[1].data;

      // FETCH UPAZILAS DATA
      const { data: upazilasData } = await axios.get(`${import.meta.env.VITE_API_URL}/upazilas`);
      const upazilas = upazilasData[2].data;

      return { districts, upazilas }
    }
  })

  // Handle input changes
  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // setFormValues({ ...formValues, [name]: value });
  };

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditable(true);
  };

  // Handle save button click
  const handleSaveClick = async () => {

    // 01. take form data
    const form = new FormData(formRef.current);
    const name = form.get('name');
    const email = user.email;
    const district = form.get('district');
    const upazila = form.get('upazila');
    const blood = form.get('blood');
    const userInfo = { email, updatedInfo: { name, email, district, upazila, blood } };

    // make an API request
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/users`, userInfo);
    console.log(data)
    if (data.modifiedCount > 0) {
      toast.success("Data updated successfully!")
      refetchUser();
    }

    setIsEditable(false); // Switch back to view-only mode
  };

  if (loading || isPending) {
    return <Spinner></Spinner>
  }

  console.log('user in user profile --->', user);

  return (
    <div className="max-w-4xl mx-auto py-10 px-3 bg-gray-100/20 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-secondary">Profile</h1>
        {!isEditable ? (
          <button
            className="btn border border-secondary bg-gray-200 hover:backdrop:bg-gray-400 text-black rounded-[4px] btn-sm"
            onClick={handleEditClick}
          >
            <FaEdit />
            Edit
          </button>
        ) : (
          <button
            className="btn btn-success bg-green-600 hover:bg-green-700 text-white rounded-[4px] btn-sm"
            onClick={handleSaveClick}
          >
            <FaSave></FaSave>
            Save
          </button>
        )}
      </div>

      <div className="flex items-center space-x-6 mb-6">
        <img
          src={user.photoURL || defaultAvatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-primary p-1"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <form className="space-y-4" ref={formRef}>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 label py-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={user?.displayName}
            onChange={handleInputChange}
            disabled={!isEditable}
            className={`w-full mt-1 p-3 border rounded-sm ${isEditable
              ? "focus:ring-primary focus:border-primary"
              : "bg-gray-200 cursor-not-allowed"
              }`}
          />
        </div>

        {/* Email (Non-editable) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 label py-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            disabled
            className="w-full mt-1 p-3 border rounded-sm bg-gray-200 cursor-not-allowed"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1">
            {/* districts input field   */}
            <label className="form-control w-full rounded-sm">
              <div className="label">
                <span className="block text-sm font-medium text-gray-700">District</span>
              </div>
              <select className={`select select-bordered rounded-sm font-semibold disabled:bg-gray-200 disabled:text-black ${isEditable ? "focus:ring-primary focus:border-primary " : "bg-gray-200 cursor-not-allowed"}`} onChange={handleInputChange} defaultValue={user?.district} disabled={!isEditable} name='district'>
                <option value=''>Choose your district</option>
                {data?.districts?.map(district => <option key={district.id} value={district.name}>{district.name}</option>)}
              </select>
            </label>
          </div>

          <div className="flex-1">
            {/* upazila    */}
            <label className="form-control w-full rounded-sm">
              <div className="label py-2">
                <span className="block text-sm font-medium text-gray-700">Upazila</span>
              </div>
              <select className={`select select-bordered font-semibold rounded-sm disabled:bg-gray-200 disabled:text-black ${isEditable ? "focus:ring-primary focus:border-primary " : "bg-gray-200 cursor-not-allowed"}`} onChange={handleInputChange} defaultValue={user?.upazila} disabled={!isEditable} name='upazila'>
                <option value=''>Choose your district</option>
                {data?.upazilas?.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)}
              </select>
            </label>
          </div>

          {/* Blood Group    */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 label py-1">
              Blood Group
            </label>
            <input
              type="text"
              name="blood"
              defaultValue={user?.blood}
              disabled={!isEditable}
              className={`w-full mt-1 p-3 border rounded-sm ${isEditable
                ? "focus:ring-primary focus:border-primary"
                : "bg-gray-200 cursor-not-allowed"
                }`}
            />
          </div>
        </div>


      </form>
    </div>
  );
};

export default UserProfile;
