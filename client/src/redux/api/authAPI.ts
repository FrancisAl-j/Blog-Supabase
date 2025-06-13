import { supabase } from "../../supabase-client";

type FormDataType = {
  email: string;
  password: string;
};

interface AuthType {
  signup: (formData: FormDataType) => void;
  signin: (formData: FormDataType) => void;
  checkAuth: () => void;
  logout: () => void;
  getUser: () => void;
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
      console.log(res.data.session);

      return res.data.session;
    } catch (error) {
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const res = await supabase.auth.getSession();
      console.log(res.data.session);

      return res.data.session;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
      return;
    } catch (error) {
      throw error;
    }
  },

  getUser: async () => {
    try {
      const { data } = await supabase.auth.getUser();

      return data.user;
    } catch (error) {
      throw error;
    }
  },
};
