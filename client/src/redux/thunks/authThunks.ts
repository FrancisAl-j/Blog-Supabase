import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../api/authAPI";
type FormDataType = {
  email: string;
  password: string;
};

export const SignupThunk = createAsyncThunk(
  "auth/signup",
  async (formData: FormDataType, { rejectWithValue }) => {
    try {
      const { session, error } = await auth.signup(formData);
      if (error) {
        return rejectWithValue(error || "Sign up failed.");
      }
      return session;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Sign up failed.");
      }
    }
  }
);

export const SigninThunk = createAsyncThunk(
  "auth/signin",
  async (formData: FormDataType, { rejectWithValue }) => {
    try {
      const { session, error } = await auth.signin(formData);

      if (error) {
        return rejectWithValue(error || "Sign in failed.");
      }
      return session;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message || "Sign in failed.");
      }
    }
  }
);

export const CheckAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const session = await auth.checkAuth();

      return session;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Checking Authentication failed."
        );
      }
    }
  }
);

export const Logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await auth.logout();

      return;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Logout failed.");
      }
    }
  }
);

export const GetUser = createAsyncThunk(
  "auth/user",
  async (_, { rejectWithValue }) => {
    try {
      const user = await auth.getUser();

      return user;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Getting user failed.");
      }
    }
  }
);
