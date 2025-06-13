import React, { useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { CreateBlogPost, GetBlogs } from "../redux/thunks/blogThunk";
import { supabase } from "../supabase-client";
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

  const [blogImage, setBlogImage] = useState<File | null>(null);

  const page = 1;
  const limit = 6;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const filePath = `${file.name}-${Date.now()}`;
    console.log(filePath);

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (error) {
      console.log("Error uploading image.");
      return null;
    }

    // Geetting the uploaded file
    const { data } = await supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let image_url: string | null = null;
    if (blogImage) {
      image_url = await uploadImage(blogImage);
    }

    const dataForm = {
      title: formData.title,
      content: formData.content,
      user_id: formData.user_id,
      image_url,
    };

    const result = await dispatch(CreateBlogPost(dataForm));

    if (CreateBlogPost.fulfilled.match(result)) {
      setFormData({
        title: "",
        content: "",
        user_id: user?.id,
      });
      dispatch(GetBlogs({ page, limit }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBlogImage(e.target.files[0]);
    }
  };

  return (
    <main className="main-container h-[100svh] grid place-items-center">
      <div className="form-container bg-[#eeeeee] border-black border-2 rounded-lg p-2">
        <h1 className="title text-[#2c2c2c] font-extrabold text-center">
          Create Blog
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col mt-20 gap-4 p-4">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-[#2c2c2c] cursor-pointer"
            />
          </div>
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
