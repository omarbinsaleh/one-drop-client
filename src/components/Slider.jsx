import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Spinner from './Spinner';

const Slider = () => {
   const navigate = useNavigate();
   const [sliders, setSliders] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchSlidersData = async () => {
         try {
            const { data } = await axios.get(`https://marathon-hub-server.vercel.app/marathons?count=3`)
            setSliders(data);
            setLoading(false);
         } catch (error) {
            console.log(error.message);
            toast.error(error.message);
         }
      }

      fetchSlidersData();
   }, [])

   if(loading) {
      return <Spinner></Spinner>
   }

   return (
      <section className='relative mb-10'>
         <div className="carousel w-full scroll-smooth cursor-pointer">
            {
               sliders?.map((slider, index) => {
                  return <div onClick={() => navigate(`/marathons/${slider._id}`)} key={slider._id} id={`item${index + 1}`} className="carousel-item w-full h-[500px]  bg-center bg-cover " style={{ backgroundImage: `url(${slider?.coverPhotoURL})` }}>
                     <div className="w-full h-full bg-white/70 flex flex-col items-center justify-center gap-5">
                        <div className="text-center max-w-[900px] px-3 space-y-5">
                           <h1 className="text-3xl sm:text-4xl font-bold">{slider.title}</h1>
                           <p>{slider?.description.slice(0, 200)}...</p>
                           <Link className='btn bg-blue-900 text-white border border-blue-900 rounded-md hover:bg-blue-700' to={`/marathons/${slider._id}`}>See Event's Details</Link>
                        </div>
                     </div>
                  </div>
               })
            }
         </div>
         <div className="flex w-full justify-center gap-2 py-2 absolute z-10 bottom-0">
            {sliders?.map((item, index) => <a key={index} href={`#item${index + 1}`} className="btn btn-xs">{index + 1}</a>)}
         </div>
      </section>
   )
}

export default Slider