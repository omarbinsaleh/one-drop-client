import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Title from "../components/Title";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddBlog = () => {
   const {user, loading} = useAuth();
   const [title, setTitle] = useState("");
   const [thumbnail, setThumbnail] = useState(null);
   const [content, setContent] = useState("");
   const editor = useRef(null);
   const queryClient = useQueryClient();
   const navigate = useNavigate();
   const axiosSecure = useAxiosSecure();

   // CHANGE THE PAGE TITLE
   document.title = 'Add Blog | One Drop';

   // SPECIFY THE IMAGEBB API KEY
   const imageBB_API = import.meta.env.VITE_IMGBB_API_KEY;

   // HANDLE CREATE NEW BLOG
   const mutation = useMutation({
      mutationFn: async (newBlog) => {
         const blog = { ...newBlog }
         const response = await axiosSecure.post(`/blogs`, { blog });
         return response.data;
      },
      onSuccess: () => {
         queryClient.invalidateQueries(['blogs']);
         toast.success("Blog created successfully!");
         navigate('/dashboard/content-management');
      },
      onError: () => {
         toast.error("Failed to create blog.");
      },
   });

   // HANDLE THE THUMBNAIL IMAGE UPLOAD TO THE IMAGEBB AND GET THE IMAGE URL
   const handleImageUpload = async (event) => {
      // 01. take image from the user
      const file = event.target.files[0];

      // 02. if user does not provide any image, return early
      if (!file) return;

      // 03. take the user provided image
      const formData = new FormData();
      formData.append("image", file);

      try {
         // 04. upload the file to the imagebb
         const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${imageBB_API}`,
            formData
         );
         // 05. get the image url and save the url in the thumbnail state
         setThumbnail(res.data.data.url);
         // 0.6 display a success message
         toast.success("Image uploaded!");
      } catch (error) {
         // 07. display an error message, if something goes wrong
         toast.error("Image upload failed!");
      }
   };

   // HANDLE THE THE CREATE NEW BLOG
   const handleSubmit = (e) => {
      // 01. prevent the native submit behaviour
      e.preventDefault();

      // 02. if data not provided, return early
      if (!title || !thumbnail || !content) {
         toast.error("All fields are required!");
         return;
      }

      // 03. create a new blog object
      const newBlog = {
         title,
         thumbnail,
         content,
         status: "draft",
         author: {
            name: user.displayName,
            email: user.email
         }
      };

      // 04. trigget the api call to save the new blog in  the database
      mutation.mutate(newBlog);
   };

   // RENDER THE SPINNER WHILE DATA AND USER LOADING
   if (loading) return <Spinner />

   return (
      <div className="h-full md:px-5 bg-white dark:bg-gray-800 flex flex-col ">
         <Title title="Create a New Blog"></Title>

         <form onSubmit={handleSubmit} className="space-y-4 flex-1 mt-10">
            {/* Title Input */}
            <div>
               <label className="block text-gray-700 dark:text-white mb-2">Title</label>
               <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-primary/50"
                  placeholder="Enter blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
               />
            </div>

            {/* Thumbnail Upload */}
            <div>
               <label className="block text-gray-700 dark:text-white mb-2">Thumbnail Image</label>
               <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  onChange={handleImageUpload}
                  required
               />
               {/* {thumbnail && <img src={thumbnail} alt="Thumbnail" className="mt-2 w-32 h-20 object-cover rounded" />} */}
            </div>

            {/* Text Editor */}
            <div>
               <label className="block text-gray-700 dark:text-white mb-2">Content</label>
               <JoditEditor className="" ref={editor} value={content} onChange={(newContent) => setContent(newContent)} />
            </div>

            {/* Submit Button */}
            <button
               type="submit"
               className="btn btn-block max-w-sm bg-red-500 hover:bg-red-600 text-white py-2 rounded font-bold transition"
            >
               Create Blog
            </button>
         </form>
      </div>
   );
};

export default AddBlog;
