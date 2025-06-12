import { createAsyncThunk } from "@reduxjs/toolkit";
import { blogs } from "../api/blogsAPI";

type FormDataType = {
  title: string;
  content: string;
};

export const CreateBlogPost = createAsyncThunk(
  "blog/create",
  async (formData: FormDataType, { rejectWithValue }) => {
    try {
      const blog = await blogs.createBlog(formData);

      return blog;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Creating blog failed.");
      }
    }
  }
);

export const GetBlogs = createAsyncThunk(
  "blog/get-all",
  async (_, { rejectWithValue }) => {
    try {
      const allBlogs = await blogs.getBlogs();

      return allBlogs;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Fetching blog failed.");
      }
    }
  }
);

export const DeleteBlog = createAsyncThunk(
  "blog/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await blogs.deleteBlog(id);
      return;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Fetching blog failed.");
      }
    }
  }
);

export const UpdateBlog = createAsyncThunk(
  "blog/update",
  async (
    { id, formData }: { id: number; formData: FormDataType },
    { rejectWithValue }
  ) => {
    try {
      const newData = await blogs.updateBlog({ id, formData });

      return newData;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Fetching blog failed.");
      }
    }
  }
);
