import { configureStore } from "@reduxjs/toolkit";
import { blogSlice } from "./reducers/blogsReducer";
import { authSlice } from "./reducers/authReducer";

export const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
    auth: authSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
