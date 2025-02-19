import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import NoData from "../components/NoData";
import SearchBox from "../components/SearchBox";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import { Parser } from "html-to-react";

const ContentManagement = () => {
   const {user, loading} = useAuth();
   const [filter, setFilter] = useState("");
   const queryClient = useQueryClient();

   const htmlParser = Parser();

   // CHANGE THE PAGE TITLE
   document.title = 'Content Management | One Drop';

   // FETCH BLOGS
   const { data: blogs = [], isLoading, isFetching } = useQuery({
      queryKey: ["blogs", filter],
      queryFn: async () => {
         const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/blogs?status=${filter}`);
         return data;
      },
   });

   // PUBLISH / UNPUBLISH BLOG
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

   // DELETE BLOG
   const deleteMutation = useMutation({
      mutationFn: async (id) => {
         const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${id}`)
      },
      onSuccess: () => {
         queryClient.invalidateQueries(["blogs"]);
         toast.success("Deleted successfully!")
      },
   });

   // HANDLE FILTER
   const handleFilter = (e) => {
      setFilter(e.target.value);
   }

   // HANDLE ON CHANGE EVENT ON THE SEARCH BOX
   const handleSearch = (e) => {
      console.log(e.targe.value);
   }

   // HANDLE CLICK EVENT ON THE SEARCH BUTTON
   const handleSearchButtonClick = (inputValue) => {
      console.log(inputValue);
   }

   // RENDER THE SPINNER WHILE LOADING DATA
   // if (isLoading) {
   //    return <Spinner></Spinner>
   // }

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
                     <div
                        key={blog._id}
                        className="p-4 shadow-lg"
                     >
                        {/* blog title */}
                        <h3 className="text-xl font-semibold">{blog.title}</h3>
                        {/* blog status */}
                        <p className="text-sm text-gray-600">{blog.status.toUpperCase()}</p>
                        {/* blog content: display after the blog is published by admin */}
                        {blog.status === 'published' && htmlParser.parse(blog?.content) }
                        {/* actions buttons */}
                        <div className="flex gap-2 mt-4 w-full justify-start flex-wrap">

                           {blog.status === "draft" ? (
                              <button
                                 onClick={() =>
                                    toggleStatusMutation.mutate({
                                       id: blog._id,
                                       status: "published",
                                    })
                                 }
                                 className="btn btn-sm bg-transparent border-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-white focus:ring-1 ring-green-500 ring-offset-1 flex items-center gap-2"
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
                                 className="btn btn-sm flex items-center gap-2 border-1 text-yellow-500 border-yellow-500 bg-transparent hover:bg-yellow-500 hover:text-white focus:ring-1 ring-yellow-500 ring-offset-1"
                              >
                                 <FaTimes /> Unpublish
                              </button>
                           )}
                           <Link to={`/dashboard/content-management/blogs/edit/${blog._id}`} className="btn btn-sm bg-transparent border-1 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-1 ring-blue-500 ring-offset-1 flex items-center gap-2">
                              <FaEdit /> Edit
                           </Link>
                           { user?.isAdmin && <button
                              onClick={() => deleteMutation.mutate(blog._id)}
                              className="btn btn-sm bg-transparent text-red-500 border-1 border-red-500 hover:bg-red-500 hover:text-white focus:ring-1 ring-red-500 ring-offset-1 flex items-center gap-2"
                           >
                              <FaTrash /> Delete
                           </button>}
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
