import React, { useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { CreateBlogPost, GetBlogs } from "../redux/thunks/blogThunk";
type FormDataType = {
  title: string;
  content: string;
  user_id: string | undefined;
};

const CreateBlog = () => {
  const dispatch = useAppDispatch();
  const { isBlogLoading } = useAppSelector((state) => state.blog);
  const { user } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    content: "",
    user_id: user?.id,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(CreateBlogPost(formData));

    if (CreateBlogPost.fulfilled.match(result)) {
      setFormData({
        title: "",
        content: "",
        user_id: user?.id,
      });
      dispatch(GetBlogs());
    }
  };

  return (
    <main className="main-container h-[100svh] grid place-items-center">
      <div className="form-container bg-[#eeeeee] border-black border-2 rounded-lg p-2">
        <h1 className="title text-[#2c2c2c] font-extrabold text-center">
          Create Blog
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col mt-20 gap-4 p-4">
          <div className="flex flex-col">
            <span className="label text-[#2c2c2c]">Title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border-black border-2 text-[#2c2c2c] p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <span className="label text-[#2c2c2c]">Content</span>
            <input
              type="text"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="border-black border-2 text-[#2c2c2c] p-2 rounded-md"
            />
          </div>

          <button className="label bg-[#2c2c2c] cursor-pointer rounded-md mt-10 hover:bg-[#eeeeee] hover:text-[#2c2c2c] border-[#2c2c2c] border-2">
            {isBlogLoading ? "Loading..." : "Create Blog"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateBlog;
