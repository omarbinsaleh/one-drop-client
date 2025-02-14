import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import NoData from "../components/NoData";
import Title from "../components/Title";
import SearchBox from "../components/SearchBox";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const ContentManagement = () => {
   const [filter, setFilter] = useState("");
   const queryClient = useQueryClient();

   // Fetch blogs
   const { data: blogs = [], isLoading, isFetching } = useQuery({
      queryKey: ["blogs", filter],
      queryFn: async () => {
         const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/blogs?filter=${filter}`);
         return data;
      },
   });

   // Publish/unpublish blog
   const toggleStatusMutation = useMutation({
      mutationFn: async ({ id, status }) => {
         const blog = { status }
         const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, { blog })
      },
      onSuccess: () => {
         queryClient.invalidateQueries(["blogs"]);
         toast.success("Updated successfully!")
      },
   });

   // Delete blog
   const deleteMutation = useMutation({
      mutationFn: async (id) => {
         const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${id}`)
      },
      onSuccess: () => {
         queryClient.invalidateQueries(["blogs"]);
         toast.success("Deleted successfully!")
      },
   });

   // Hanle filter
   const handleFilter = (e) => {
      setFilter(e.target.value);
   }

   // Handle on Change event in Search box
   const handleSearch = (e) => {
      console.log(e.targe.value);
   }

   // Handle search button click
   const handleSearchButtonClick = (inputValue) => {
      console.log(inputValue);
   }

   if (isLoading) {
      return <Spinner></Spinner>
   }

   console.log(blogs);

   return (
      <div className="p-6 h-full w-full flex flex-col">
         <div className="flex justify-end items-center mb-4">
            {/* <h2 className="text-2xl font-bold">Content Management</h2> */}
            <Link to="/dashboard/content-management/add-blog">
               <button className="btn bg-primary flex items-center gap-2 hover:bg-red-500/90 focus:ring-2 ring-red-500 ring-offset-2">
                  <FaPlus /> Add Blog
               </button>
            </Link>
         </div>
         <div className="flex justify-end mb-4 items-center gap-2">
            <SearchBox onChange={handleSearch} onSearchButtonClick={handleSearchButtonClick} placeholder="Search by title"></SearchBox>
            {/* <h3 className="text-lg ">Filter</h3> */}
            <select className="select select-bordered rounded-sm" onChange={handleFilter} defaultValue="all">
               <option value="">All</option>
               <option value="draft">Draft</option>
               <option value="published">Published</option>
            </select>
         </div>
         <div className="border flex-1">
            {isFetching ? (
               <div className="w-full h-full flex items-center justify-center">
                  <p>Loading blogs...</p>
               </div>
            ) : blogs.length === 0 ? (
               <NoData
                  title='No Blogs added yet!!'
                  actionLink='/dashboard/content-management/add-blog'
                  actionText='Create New Blog'></NoData>
            ) : (
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {blogs.map((blog) => (
                     <div key={blog._id} className="p-4 shadow-lg">

                        <h3 className="text-xl font-semibold">{blog.title}</h3>
                        <p className="text-sm text-gray-600">{blog.status.toUpperCase()}</p>
                        <div className="flex gap-1 mt-4 w-full justify-between">
                           {blog.status === "draft" ? (
                              <button
                                 onClick={() =>
                                    toggleStatusMutation.mutate({
                                       id: blog._id,
                                       status: "published",
                                    })
                                 }
                                 className="btn btn-sm bg-green-500 flex items-center gap-2"
                              >
                                 <FaCheck /> Publish
                              </button>
                           ) : (
                              <button
                                 onClick={() =>
                                    toggleStatusMutation.mutate({
                                       id: blog._id,
                                       status: "draft",
                                    })
                                 }
                                 className="btn btn-sm bg-yellow-500 flex items-center gap-2"
                              >
                                 <FaTimes /> Unpublish
                              </button>
                           )}
                           <button className="btn btn-sm bg-blue-500 flex items-center gap-2">
                              <FaEdit /> Edit
                           </button>
                           <button
                              onClick={() => deleteMutation.mutate(blog._id)}
                              className="btn btn-sm bg-red-500 flex items-center gap-2"
                           >
                              <FaTrash /> Delete
                           </button>
                        </div>
                     </div>

                  ))
                  }
               </div>
            )}
         </div>
      </div>
   );
};

export default ContentManagement;
