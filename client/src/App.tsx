import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import { useAppDispatch, useAppSelector } from "./redux/Hooks";
import { GetBlogs } from "./redux/thunks/blogThunk";
import Nav from "./components/Nav";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { CheckAuth, GetUser } from "./redux/thunks/authThunks";
import { supabase } from "./supabase-client";
import { clearSession } from "./redux/reducers/authReducer";
import MyBlogs from "./pages/MyBlogs";

const App = () => {
  const dispatch = useAppDispatch();
  const { session, user } = useAppSelector((state) => state.auth);
  const userId = user?.id;
  console.log(userId);

  useEffect(() => {
    dispatch(GetBlogs());
    dispatch(CheckAuth());

    // Check if there is changes in the session.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          dispatch(clearSession());
        }
      }
    );

    //
    return () => authListener.subscription.unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (session) {
      dispatch(GetUser());
    }
  }, [dispatch, session]);

  return (
    <Router>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<MyBlogs />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
