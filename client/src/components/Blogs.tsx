import { useState } from "react";
import { useAppSelector } from "../redux/Hooks";
import Delete from "./popupComponents/Delete";
import Update from "./popupComponents/Update";
type BlogType = {
  id: number;
  title: string;
  content: string;
  create_at?: Date;
};

const Blogs = () => {
  const { blogs } = useAppSelector((state) => state.blog);
  const [blogId, setBlogId] = useState<null | number>(null);
  const [updateId, setUpdateId] = useState<null | number>(null);

  const getId = (id: number) => {
    setBlogId(id);
  };

  const getUpdateId = (id: number) => {
    setUpdateId(id);
  };
  return (
    <main>
      <h1 className="title text-[#2c2c2c] font-semibold">Blogs</h1>
      <div>
        {blogs &&
          blogs.map((blog: BlogType, index: number) => {
            return (
              // Blog Cards
              <div key={index}>
                <div>
                  <h1 className="text-[#2c2c2c]">{blog.title}</h1>
                  <p className="text-[#2c2c2c]">{blog.content}</p>
                  <button
                    className="cursor-pointer text-red-600"
                    onClick={() => getId(blog.id)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => getUpdateId(blog.id)}
                    className="cursor-pointer text-green-700"
                  >
                    Update
                  </button>
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

export default Blogs;
