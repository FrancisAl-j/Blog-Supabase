import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import ViewBlog from "./pages/ViewBlog";
import Footer from "./components/Footer";

const App = () => {
  const dispatch = useAppDispatch();
  const { session } = useAppSelector((state) => state.auth);
  const page = 1;
  const limit = 6;

  useEffect(() => {
    dispatch(GetBlogs({ page, limit }));
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
          <Route
            path="/create-blog"
            element={session ? <CreateBlog /> : <Navigate to="/signin" />}
          />
          <Route
            path="/signup"
            element={session ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/signin"
            element={session ? <Navigate to="/" /> : <Signin />}
          />
          <Route path="/blogs" element={<MyBlogs />} />
          <Route path="/blog/:id" element={<ViewBlog />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
