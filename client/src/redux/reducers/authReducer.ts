import { createSlice } from "@reduxjs/toolkit";
import {
  SignupThunk,
  SigninThunk,
  CheckAuth,
  Logout,
  GetUser,
} from "../thunks/authThunks";
import type { Session, User } from "@supabase/supabase-js";

type InitialStateType = {
  user: User | null;
  session: Session | null;
  isSigningIn: boolean;
  isSigningUp: boolean;
  isChecking: boolean;
  signinErr: string | null;
  signupErr: string | null;
};

const initialState: InitialStateType = {
  user: null,
  session: null,
  isSigningIn: false,
  isSigningUp: false,
  isChecking: false,
  signinErr: null,
  signupErr: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearSession: (state) => {
      state.session = null;
    },
  },

  extraReducers: (builder) => {
    // Sign up / Register
    builder.addCase(SignupThunk.pending, (state) => {
      state.isSigningUp = true;
      state.user = null;
      state.signupErr = null;
    });
    builder.addCase(SignupThunk.fulfilled, (state, action: any) => {
      state.isSigningUp = false;
      state.user = action.payload;
      state.signupErr = null;
    });
    builder.addCase(SignupThunk.rejected, (state) => {
      state.isSigningUp = false;
      state.user = null;
      state.signupErr = "Sign up failed.";
    });

    // Sign in / Login
    builder.addCase(SigninThunk.pending, (state) => {
      state.isSigningIn = true;
      state.session = null;
      state.signinErr = null;
    });
    builder.addCase(SigninThunk.fulfilled, (state, action: any) => {
      state.isSigningIn = false;
      state.session = action.payload;
      state.signinErr = null;
    });
    builder.addCase(SigninThunk.rejected, (state) => {
      state.isSigningIn = false;
      state.session = null;
      state.signinErr = "Sign up failed.";
    });

    // Check Authentication
    builder.addCase(CheckAuth.pending, (state) => {
      state.isChecking = true;
      state.session = null;
      state.signinErr = null;
    });
    builder.addCase(CheckAuth.fulfilled, (state, action: any) => {
      state.isChecking = false;
      state.session = action.payload;
      state.signinErr = null;
    });
    builder.addCase(CheckAuth.rejected, (state) => {
      state.isChecking = false;
      state.session = null;
      state.signinErr = "Sign up failed.";
    });

    // Getting User
    builder.addCase(GetUser.pending, (state) => {
      state.isChecking = true;
      state.user = null;
      state.signinErr = null;
    });
    builder.addCase(GetUser.fulfilled, (state, action: any) => {
      state.isChecking = false;
      state.user = action.payload;
      state.signinErr = null;
    });
    builder.addCase(GetUser.rejected, (state) => {
      state.isChecking = false;
      state.user = null;
      state.signinErr = "Sign up failed.";
    });
  },
});

export default authSlice.reducer;

export const { clearSession } = authSlice.actions;
