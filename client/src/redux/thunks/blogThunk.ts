import { createAsyncThunk } from "@reduxjs/toolkit";
import { blogs } from "../api/blogsAPI";

type FormDataType = {
  title: string;
  content: string;
  user_id: string | undefined;
  image_url: string | null;
};

type UpdateType = {
  title: string;
  content: string;
};

type PageType = {
  page: number;
  limit: number;
};

export const CreateBlogPost = createAsyncThunk(
  "blog/create",
  async (dataForm: FormDataType, { rejectWithValue }) => {
    try {
      const blog = await blogs.createBlog(dataForm);

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
  async ({ page = 1, limit = 6 }: PageType, { rejectWithValue }) => {
    try {
      const { data, total } = await blogs.getBlogs({ page, limit });

      return { blogs: data, total: total };
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
    { id, formData }: { id: number; formData: UpdateType },
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

export const GetMyBlogs = createAsyncThunk(
  "blog/get-myblog",
  async (user_id: string, { rejectWithValue }) => {
    try {
      const myBlogs = await blogs.getMyBlogs(user_id);

      return myBlogs;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Fetching blog failed.");
      }
    }
  }
);

export const GetBlog = createAsyncThunk(
  "blog/one",
  async (id: number, { rejectWithValue }) => {
    try {
      const blog = await blogs.getBlog(id);

      return blog;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Fetching blog failed.");
      }
    }
  }
);
