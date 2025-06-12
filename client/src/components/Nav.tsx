import { Link } from "react-router-dom";

const Nav = () => {
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

          <Link to="signin">
            <li>Sign in</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
