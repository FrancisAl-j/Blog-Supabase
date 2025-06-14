import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { useEffect } from "react";
import { GetBlog } from "../redux/thunks/blogThunk";

const ViewBlog = () => {
  const dispatch = useAppDispatch();
  const { blog } = useAppSelector((state) => state.blog);
  const { id } = useParams();
  const numericId = Number(id);
  console.log(blog);

  useEffect(() => {
    if (!id) return;
    dispatch(GetBlog(numericId));
  }, [dispatch, id]);
  return (
    <main className="main-container">
      <div className="p-10">
        {blog && (
          <div className="flex flex-col gap-10">
            <img src={blog?.image_url} alt="" className="aspect-[4/2]" />
            <h1 className="title font-extrabold text-center">{blog?.title}</h1>
            <p className="label text-center">{blog?.content}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ViewBlog;
