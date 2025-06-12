import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/Hooks";

const Nav = () => {
  const { session } = useAppSelector((state) => state.auth);

  return (
    <header className="w-full">
      <nav className="main-container flex justify-between py-4">
        <h1 className="logo font-extrabold">Francis Blog</h1>

        <ul className="flex gap-5">
          <Link to="/">
            <li>Home</li>
          </Link>

          <Link to="/create-blog">
            <li>Create Blogs</li>
          </Link>

          {session ? (
            <li className="text-red-600 cursor-pointer">Logout</li>
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
