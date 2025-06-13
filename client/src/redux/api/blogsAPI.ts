import { supabase } from "../../supabase-client";

type FormDataType = {
  title: string;
  content: string;
  user_id: string | undefined;
  image_url: string | null;
};

type UpdateData = {
  title: string;
  content: string;
};

type GetBlogsResponse = {
  data: any[] | null;
  total: number;
};

interface BlogsAPI {
  createBlog: (dataForm: FormDataType) => void;
  getBlogs: ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) => Promise<GetBlogsResponse>;
  deleteBlog: (id: number) => void;
  updateBlog: ({ id, formData }: { id: number; formData: UpdateData }) => void;
  getMyBlogs: (user_id: string) => void;
  getBlog: (id: number) => void;
}

export const blogs: BlogsAPI = {
  createBlog: async (dataForm: FormDataType) => {
    try {
      const res = await supabase.from("blogs").insert(dataForm);

      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getBlogs: async ({
    page = 1,
    limit = 6,
  }: {
    page?: number;
    limit?: number;
  }): Promise<GetBlogsResponse> => {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      const res = await supabase
        .from("blogs")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      return { data: res.data || [], total: res.count || 0 };
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

  getMyBlogs: async (user_id) => {
    try {
      const res = await supabase
        .from("blogs")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", { ascending: true });

      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getBlog: async (id) => {
    try {
      const res = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
