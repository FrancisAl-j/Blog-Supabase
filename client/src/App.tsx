import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import { useAppDispatch } from "./redux/Hooks";
import { GetBlogs } from "./redux/thunks/blogThunk";
import Nav from "./components/Nav";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetBlogs());
  }, [dispatch]);

  useEffect(() => {}, []);
  return (
    <Router>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
