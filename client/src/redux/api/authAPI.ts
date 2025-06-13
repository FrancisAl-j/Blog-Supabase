import type { Session } from "@supabase/supabase-js";
import { supabase } from "../../supabase-client";

type FormDataType = {
  email: string;
  password: string;
};

type SigninResponse = {
  session: Session | null;
  error: string | undefined;
};

interface AuthType {
  signup: (formData: FormDataType) => Promise<SigninResponse>;
  signin: (formData: FormDataType) => Promise<SigninResponse>;
  checkAuth: () => void;
  logout: () => void;
  getUser: () => void;
}

export const auth: AuthType = {
  signup: async (formData: FormDataType): Promise<SigninResponse> => {
    try {
      const res = await supabase.auth.signUp(formData);

      return { session: res.data.session, error: res.error?.message };
    } catch (error) {
      throw error;
    }
  },

  signin: async (formData: FormDataType): Promise<SigninResponse> => {
    try {
      const res = await supabase.auth.signInWithPassword(formData);

      return { session: res.data.session, error: res.error?.message };
    } catch (error) {
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const res = await supabase.auth.getSession();

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
