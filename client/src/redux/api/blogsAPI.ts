import { supabase } from "../../supabase-client";

type FormDataType = {
  title: string;
  content: string;
};

interface BlogsAPI {
  createBlog: (formData: FormDataType) => void;
  getBlogs: () => void;
  deleteBlog: (id: number) => void;
  updateBlog: ({
    id,
    formData,
  }: {
    id: number;
    formData: FormDataType;
  }) => void;
}

export const blogs: BlogsAPI = {
  createBlog: async (formData: FormDataType) => {
    try {
      const res = await supabase.from("blogs").insert(formData);

      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getBlogs: async () => {
    try {
      const res = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: true });

      return res.data;
    } catch (error) {
      throw error;
    }
  },

  deleteBlog: async (id) => {
    try {
      await supabase.from("blogs").delete().eq("id", id);
      return;
    } catch (error) {
      throw error;
    }
  },

  updateBlog: async ({ id, formData }) => {
    try {
      const res = await supabase.from("blogs").update(formData).eq("id", id);

      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
