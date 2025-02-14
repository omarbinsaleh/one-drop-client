import { format } from "date-fns";
import { BiWorld } from "react-icons/bi";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaTint, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const DonationRequest = ({ request }) => {
   return (
      <div className="card bg-base-100 shadow-lg  border border-gray-100 dark:border-gray-700 rounded-md">
         <div className="card-body ">
            <div>
               <h3 className="text-xl font-semibold">{request.recipientName} <span className=" bg-primary/20 border border-primary/30 px-2 rounded-full relative -top-[2px] text-center text-xs">recipent</span> </h3>
               <small className="flex items-center gap-1 text-slate-500"> <BiWorld /> {format(new Date(request?.createdAt), 'PP pp')}</small>
            </div>
            <p className="flex  gap-2">
               <FaMapMarkerAlt className="text-red-500 mt-[6px]" />
               {request?.hospitalName}, {request?.district}, {request?.upazila}
            </p>
            <p className="flex items-center gap-2">
               <FaTint className="text-red-500" />
               <span className="font-bold">{request.bloodGroup}</span>
            </p>
            <p className="flex items-center gap-2">
               <FaCalendarAlt className="text-blue-500" />
               {request.donationDate}
            </p>
            <p className="flex items-center gap-2">
               <FaClock className="text-green-500" />
               {request.donationTime}
            </p>
            <div className="card-actions justify-end">
               <Link
                  to={`/donation-requests/${request._id}`}
                  className="btn btn-block bg-secondary text-white hover:bg-secondary/90 rounded-sm focus:ring-2 ring-offset-2 ring-secondary"
               >
                  View Details <FaExternalLinkAlt />
               </Link>
            </div>
         </div>
      </div>
   )
}

export default DonationRequest
