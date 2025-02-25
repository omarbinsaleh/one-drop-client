import { FaUser, FaCalendarAlt } from "react-icons/fa";

const SingleBlog = ({ blog }) => {

  return (
    <div className="max-w-5xl mx-auto px-5 py-6">
      {/* Thumbnail */}
      <div className="rounded-sm overflow-hidden shadow-lg">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-72 object-cover"
        />
      </div>

      {/* Title & Author */}
      <h1 className="text-3xl font-bold mt-6">{blog.title}</h1>
      <div className="flex items-center gap-3 mt-3 text-gray-600 dark:text-gray-300">
        <FaUser className="text-lg" />
        <p className="text-lg font-medium">{blog.author.name}</p>
      </div>

      {/* Created & Last Modified Date */}
      <div className="flex gap-5 text-gray-500 dark:text-gray-400 mt-2">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-md" />
          <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-md" />
          <span>Updated: {new Date(blog.lastModifiedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Blog Content */}
      <div
        className="mt-6 text-lg leading-relaxed dark:text-gray-300"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default SingleBlog;
