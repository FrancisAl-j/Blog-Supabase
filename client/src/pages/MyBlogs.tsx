import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { GetMyBlogs } from "../redux/thunks/blogThunk";
import Delete from "../components/popupComponents/Delete";
import Update from "../components/popupComponents/Update";
type BlogType = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  create_at?: Date;
};

const MyBlogs = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { myBlogs } = useAppSelector((state) => state.blog);
  const [blogId, setBlogId] = useState<null | number>(null);
  const [updateId, setUpdateId] = useState<null | number>(null);

  const getId = (id: number) => {
    setBlogId(id);
  };

  const getUpdateId = (id: number) => {
    setUpdateId(id);
  };

  useEffect(() => {
    dispatch(GetMyBlogs(user?.id as string));
  }, [dispatch]);
  return (
    <main>
      <h1 className="title font-extrabold">My Blogs</h1>

      <div className="px-5 flex flex-col gap-4">
        {myBlogs &&
          myBlogs.map((blog: BlogType, index: number) => {
            return (
              <div key={index}>
                <div className="flex justify-between border-[#eee] border-2 items-center">
                  <img
                    src={blog.image_url}
                    alt=""
                    className="aspect-square w-[200px]"
                  />

                  <div>
                    <h1>{blog.title}</h1>
                    <p>{blog.content.slice(0, 20)}...</p>
                  </div>

                  <div className="flex flex-col justify-center px-5 gap-3">
                    <button
                      className="cursor-pointer bg-red-600 p-3"
                      onClick={() => getId(blog.id)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => getUpdateId(blog.id)}
                      className="cursor-pointer bg-green-700 p-3"
                    >
                      Update
                    </button>
                  </div>
                </div>

                {blog.id === blogId && (
                  <Delete id={blogId} setBlogId={setBlogId} />
                )}

                {blog.id === updateId && (
                  <Update
                    id={blog.id}
                    title={blog.title}
                    content={blog.content}
                    setUpdateId={setUpdateId}
                  />
                )}
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default MyBlogs;
