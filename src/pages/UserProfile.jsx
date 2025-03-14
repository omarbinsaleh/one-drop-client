import React, { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import defaultAvatar from '../assets/profile.png';
import { FaEdit, FaSave, FaSignOutAlt } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";
import LogoutBtn from "../components/LogoutBtn";

const UserProfile = () => {
  // State for edit mode
  const [isEditable, setIsEditable] = useState(false);
  const { user, loading, setLoading, refetchUser } = useAuth();
  const [upazilas, setUpazilas] = useState([]); // for the upazilas input field

  // CREATE A REFERANCE TO TARGET THE FORM
  const formRef = useRef();

  // CHANGE THE PAGE TITLE
  document.title = "User Profile | One Drop";

  // FETCH DATA FROM THE DATABASE
  const { isPending, data, error } = useQuery({
    queryKey: ['districts', 'upazilas'],
    queryFn: async () => {
      // FETCH THE DISTRICTS DATA
      const { data: districtsData } = await axios.get(`${import.meta.env.VITE_API_URL}/districts`)
      const districts = districtsData.find(item => item.name === 'districts').data;

      // FETCH UPAZILAS DATA
      const { data: upazilasData } = await axios.get(`${import.meta.env.VITE_API_URL}/upazilas`);
      const upazilas = upazilasData.find(item => item.name === 'upazilas').data;

      return { districts, upazilas };
    }
  });

  // HANDLE DISTRICT CHANGE
  const handleDistrictsChange = (e) => {
    const districtName = e.target.value;
    const district = data.districts.find(district => district.name === districtName);
    const districtId = district.id;
    const upazilasData = data.upazilas.filter(upazila => upazila.district_id === districtId);
    setUpazilas(upazilasData);
  };

  // HANDLE INPUT CHANGE
  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // setFormValues({ ...formValues, [name]: value });
  };

  // HANDLE EDIT BUTTON CLICK
  const handleEditClick = () => {
    setIsEditable(true);
  };

  // HANDLE SAVE BUTTON CLICK
  const handleSaveClick = async () => {

    // 01. take form data
    const form = new FormData(formRef.current);
    const name = form.get('name');
    const email = user.email;
    const district = form.get('district');
    const upazila = form.get('upazila');
    const blood = form.get('blood');
    const userInfo = { email, updatedInfo: { name, email, district, upazila, blood } };

    // 02. make an API call to the server and save the data in the database
    const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/users`, userInfo);
    console.log(data)
    if (data.modifiedCount > 0) {
      // 03. show a success message
      toast.success("Data updated successfully!")

      // 04. refetch the user's data from database and update the UI
      refetchUser();
    }

    // 03. Switch back to view-only mode
    setIsEditable(false);
  };

  // RENDER THE SPINNER, WHILE DATA IS BEING LOADED
  if (loading || isPending) {
    return <Spinner></Spinner>
  };

  console.log('user in user profile --->', user);

  return (
    <div className="max-w-7xl mx-auto py-10 px-3 bg-gray-100/20 shadow-lg dark:bg-inherit">
      {/* header section: title, edit and save button, logout button */}
      <header className="flex items-center justify-between mb-6 flex-col gap-4 md:flex-row">
        <h1 className="text-3xl font-bold text-secondary dark:text-white">Profile</h1>
        <div className="flex items-center gap-2">
          {!isEditable ? (
            <button
              className="btn border border-secondary/30 bg-gray-200 hover:backdrop:bg-gray-400 text-black rounded-[4px] btn-sm"
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

          <LogoutBtn></LogoutBtn>
        </div>
      </header>

      {/* user profile picture, name and email */}
      <section className="flex items-center space-x-6 mb-6 justify-center flex-col">
        <img
          src={user.photoURL || defaultAvatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-primary p-1"
        />
        <div className="text-center">
          <h2 className="text-xl font-semibold">{user?.displayName}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{user.email}</p>
        </div>
      </section>

      <form className="space-y-4" ref={formRef}>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 label py-1 dark:text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={user?.displayName}
            onChange={handleInputChange}
            disabled={!isEditable}
            className={`w-full mt-1 p-3 border rounded-sm dark:bg-gray-700 disabled:dark:text-slate-300 ${isEditable
              ? "focus:ring-primary focus:border-primary"
              : "bg-gray-200 cursor-not-allowed dark:bg-gray-400 dark:border-none dark:text-black"
              }`}
          />
        </div>

        {/* Email (Non-editable) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 label py-1 dark:text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            disabled
            className="w-full mt-1 p-3 border rounded-sm bg-gray-200 cursor-not-allowed dark:bg-gray-400 dark:border-none dark:text-black"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1">
            {/* districts input field   */}
            <label className="form-control w-full rounded-sm">
              <div className="label">
                <span className="block text-sm font-medium text-gray-700 dark:text-white">District</span>
              </div>
              <select className={`select select-bordered rounded-sm font-semibold disabled:bg-gray-200 disabled:text-black ${isEditable ? "focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:border-gray-300 " : "bg-gray-200  cursor-not-allowed"}`} onChange={handleDistrictsChange} defaultValue={user?.district} disabled={!isEditable} name='district'>
                <option value=''>Choose your district</option>
                {data?.districts?.map(district => <option key={district.id} value={district.name}>{district.name}</option>)}
              </select>
            </label>
          </div>

          <div className="flex-1">
            {/* upazila    */}
            <label className="form-control w-full rounded-sm">
              <div className="label py-2">
                <span className="block text-sm font-medium text-gray-700 dark:text-white">Upazila</span>
              </div>
              <select className={`select select-bordered font-semibold rounded-sm disabled:bg-gray-200 disabled:text-black ${isEditable ? "focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:border-gray-300 " : "bg-gray-200 cursor-not-allowed"}`} onChange={handleInputChange} defaultValue={user?.upazila} disabled={!isEditable} name='upazila'>
                <option value=''>Choose your district</option>
                {data?.upazilas?.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)}
              </select>
            </label>
          </div>

          {/* Blood Group    */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 label py-1 dark:text-white">
              Blood Group
            </label>
            <input
              type="text"
              name="blood"
              defaultValue={user?.blood}
              disabled={!isEditable}
              className={`w-full mt-1 p-3 border rounded-sm  ${isEditable
                ? "focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-300"
                : "bg-gray-200 dark:bg-gray-400 dark:text-black cursor-not-allowed"
                }`}
            />
          </div>
        </div>


      </form>
    </div>
  );
};

export default UserProfile;
