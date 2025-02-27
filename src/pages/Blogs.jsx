import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import Spinner from "../components/Spinner";
import NoData from "../components/NoData";
import { Parser } from "html-to-react";
import SearchBox from "../components/SearchBox";
import Title from "../components/Title";
import DataFethingMessage from "../components/DataFethingMessage";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Blogs = () => {
  const htmlParser = Parser();
  const [search, setSearch] = useState("");
  const axiosPublic = useAxiosPublic();

  // FETCH THE ALL THE PUBLISHED BLOGS
  const { data: blogs, isLoading, error, isFetching } = useQuery({
    queryKey: ["publishedBlogs", search],
    queryFn: async () => {
      // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/blogs?status=published`);
      const { data } = await axiosPublic.get(`/blogs?status=published`);
      return data
    },
  });

  // RENDER THE SPINNER WHILE DATA LOADING
  if (isLoading) return <Spinner></Spinner>

  // HANDLE THE ON CHANGE EVENT ON THE SEARCH INPUT BOX
  const handleSearch = (event) => {
    if (event.target.value === '') {
      setSearch(event.target.value);
    };
  };

  // HANDLE THE SEARCH BUTTON CLICK
  const handleSearchButtonClick = (inputValue) => {
    setSearch(inputValue);
  };

  // CHANGE THE PAGE TITLE
  document.title = 'Blogs | One Drop';

  return (
    <div className="min-h-screen p-4 dark:bg-gray-900 pt-8">
      <div className="">
        {/* <Title title="Published Blogs" /> */}

        {/* Search Bar */}
        <div className="flex justify-center py-4">
          <SearchBox onChange={handleSearch} onSearchButtonClick={handleSearchButtonClick} />
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {isFetching
            ?
            (
              // DISPLAY A DATA LOAING MESSAGE
              <div className="col-span-full flex items-center justify-center min-h-[380px]">
                <DataFethingMessage></DataFethingMessage>
              </div>
            )
            :
            (blogs.length > 0 ? (
              // DISPLAY ALL THE PUBLISHED BLOGS HERE
              blogs.map((blog) => (
                <div key={blog._id} className="bg-white dark:bg-gray-800 shadow-md rounded-md overflow-hidden">
                  <img src={blog.thumbnail} alt={blog.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{blog.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                      {htmlParser.parse(blog.content.substring(0, 100))}
                    </p>
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="inline-block mt-3 text-red-500 hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              // DISPLAY A 'NO DATA' MESSAGE WHEN THERE IS NO BLOGS TO DISPLAY
              <div className="col-span-full border mt-5">
                <NoData
                  actionLink='/dashboard/content-management/add-blog'
                  actionText='Create New Blog'
                  title='No Blogs Published Yet'
                ></NoData>
              </div>
            )
            )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
