import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';
import SingleBlog from '../components/SingleBlog';

const BlogDetials = () => {
   const {id} = useParams();
   const {data:blog, isPending, isError } = useQuery({
      queryKey: ['blog-details', id],
      queryFn: async () => {
         const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
         return data;
      }
   });

   if (isPending) return <Spinner />;

  return (
    <section className="min-h-screen bg-base-100 text-base-content pt-8 dark:bg-gray-800 dark:text-white">
      <SingleBlog blog={blog} />
    </section>
  )
}

export default BlogDetials
