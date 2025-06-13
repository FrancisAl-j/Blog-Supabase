import { createSlice } from "@reduxjs/toolkit";
import {
  CreateBlogPost,
  GetBlogs,
  DeleteBlog,
  UpdateBlog,
  GetMyBlogs,
} from "../thunks/blogThunk";

type BlogType = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  create_at?: Date;
};

interface InitialState {
  myBlogs: BlogType[];
  blogs: BlogType[];
  isBlogLoading: boolean;
  gettingBlogs: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  error: string | null;
  deleteMessage: string | null;
  updateMessage: string | null;
  total: number;
}

const initialState: InitialState = {
  myBlogs: [],
  blogs: [],
  isBlogLoading: false,
  gettingBlogs: false,
  isDeleting: false,
  isUpdating: false,
  error: null,
  deleteMessage: null,
  updateMessage: null,
  total: 0,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Blog
    builder.addCase(CreateBlogPost.pending, (state) => {
      state.isBlogLoading = true;
      state.blogs = [];
      state.error = null;
    });
    builder.addCase(CreateBlogPost.fulfilled, (state, action: any) => {
      state.isBlogLoading = false;
      state.blogs.push(action.payload);
      state.error = null;
    });
    builder.addCase(CreateBlogPost.rejected, (state) => {
      state.isBlogLoading = false;
      state.blogs = [];
      state.error = "Failed to create a blog.";
    });

    // Get All Blogs
    builder.addCase(GetBlogs.pending, (state) => {
      state.gettingBlogs = true;
      state.blogs = [];
      state.error = null;
    });
    builder.addCase(GetBlogs.fulfilled, (state, action: any) => {
      state.blogs = action.payload.blogs;
      state.total = action.payload.total; // ✅ Store total
      state.gettingBlogs = false;
    });
    builder.addCase(GetBlogs.rejected, (state) => {
      state.gettingBlogs = false;
      state.blogs = [];
      state.error = "Failed to create a blog.";
    });

    // Delete Blog
    builder.addCase(DeleteBlog.pending, (state) => {
      state.isDeleting = true;
      state.deleteMessage = null;
      state.error = null;
    });
    builder.addCase(DeleteBlog.fulfilled, (state) => {
      state.isDeleting = false;
      state.deleteMessage = "Successfully deleted.";
      state.error = null;
    });
    builder.addCase(DeleteBlog.rejected, (state) => {
      state.isDeleting = false;
      state.deleteMessage = null;
      state.error = "Failed to delete a blog.";
    });

    // Update Blog
    builder.addCase(UpdateBlog.pending, (state) => {
      state.isUpdating = true;
      state.updateMessage = null;
      state.error = null;
    });
    builder.addCase(UpdateBlog.fulfilled, (state) => {
      state.isUpdating = false;
      state.updateMessage = "Updated successfully.";
      state.error = null;
    });
    builder.addCase(UpdateBlog.rejected, (state) => {
      state.isUpdating = false;
      state.updateMessage = null;
      state.error = "Failed to update a blog.";
    });

    // My Blogs
    builder.addCase(GetMyBlogs.pending, (state) => {
      state.gettingBlogs = true;
      state.myBlogs = [];
      state.error = null;
    });
    builder.addCase(GetMyBlogs.fulfilled, (state, action: any) => {
      state.gettingBlogs = false;
      state.myBlogs = action.payload;
      state.error = null;
    });
    builder.addCase(GetMyBlogs.rejected, (state) => {
      state.gettingBlogs = false;
      state.myBlogs = [];
      state.error = "Failed to create a blog.";
    });
  },
});

export default blogSlice.reducer;
