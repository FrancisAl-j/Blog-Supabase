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
      const user = await auth.signup(formData);

      return user;
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
      const session = await auth.signin(formData);

      return session;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Sign up failed.");
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
        return rejectWithValue(error.message || "Sign up failed.");
      }
    }
  }
);
