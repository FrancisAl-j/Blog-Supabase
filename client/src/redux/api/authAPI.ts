import { supabase } from "../../supabase-client";

type FormDataType = {
  email: string;
  password: string;
};

interface AuthType {
  signup: (formData: FormDataType) => void;
  signin: (formData: FormDataType) => void;
  checkAuth: () => void;
}

export const auth: AuthType = {
  signup: async (formData: FormDataType) => {
    try {
      const res = await supabase.auth.signUp(formData);

      return res.data.user;
    } catch (error) {
      throw error;
    }
  },

  signin: async (formData: FormDataType) => {
    try {
      const res = await supabase.auth.signInWithPassword(formData);

      return res.data.session;
    } catch (error) {
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const res = await supabase.auth.getSession();

      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
