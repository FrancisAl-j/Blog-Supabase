import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { GetBlogs } from "../redux/thunks/blogThunk";
import { Link } from "react-router-dom";

type BlogType = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  create_at?: Date;
};

const Blogs = () => {
  const dispatch = useAppDispatch();
  const { blogs, gettingBlogs, total } = useAppSelector((state) => state.blog);
  const [page, setPage] = useState(1);
  const limit = 6;

  const maxPage = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(GetBlogs({ page, limit }));
  }, [dispatch, page]);

  if (gettingBlogs) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }
  return (
    <main className="py-10">
      <h1 className="title text-[#2c2c2c] font-semibold">Blogs</h1>
      <div className="flex flex-wrap justify-center gap-2 py-6">
        {blogs &&
          blogs.map((blog: BlogType, index: number) => {
            return (
              // Blog Cards
              <div
                key={index}
                className="border-[#2c2c2c] border-2 w-[350px] cursor-pointer p-2 rounded-md"
              >
                <Link to={`/blog/${blog.id}`}>
                  <div>
                    <img
                      src={blog.image_url}
                      alt=""
                      className="aspect-square w-full h-[200px] object-contain "
                    />
                    <h1 className="text-[#2c2c2c]">{blog.title}</h1>
                    <p className="text-[#2c2c2c]">
                      {blog.content.slice(0, 30)}...
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>

      {/* ✅ Pagination Controls */}
      <div className="flex justify-center gap-4 mt-4 items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400c cursor-pointer"
        >
          Previous
        </button>
        <span className="text-[#2c2c2c]">
          Page {page} of {maxPage}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= maxPage}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 cursor-pointer"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Blogs;
