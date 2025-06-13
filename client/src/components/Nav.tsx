import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { Logout } from "../redux/thunks/authThunks";

const Nav = () => {
  const dispatch = useAppDispatch();
  const { session } = useAppSelector((state) => state.auth);
  console.log(session);

  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <header className="w-full">
      <nav className="main-container flex justify-between py-4">
        <h1 className="logo font-extrabold">Francis Blog</h1>

        <ul className="flex gap-5">
          <Link to="/">
            <li>Home</li>
          </Link>

          {session && (
            <Link to="/blogs">
              <li>My Blogs</li>
            </Link>
          )}

          {session && (
            <Link to="/create-blog">
              <li>Create Blogs</li>
            </Link>
          )}

          {session ? (
            <li onClick={handleLogout} className="text-red-600 cursor-pointer">
              Logout
            </li>
          ) : (
            <Link to="signin">
              <li>Sign in</li>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
