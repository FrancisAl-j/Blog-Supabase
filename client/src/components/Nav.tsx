import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { Logout } from "../redux/thunks/authThunks";
import Menu from "../assets/menu.svg";
import { useState } from "react";
import Close from "../assets/close.svg";

const Nav = () => {
  const dispatch = useAppDispatch();
  const { session } = useAppSelector((state) => state.auth);
  const [isShow, setIsShow] = useState(false);

  const handleLogout = () => {
    dispatch(Logout());
  };

  const showNav = () => {
    setIsShow(true);
  };

  const hideNav = () => {
    setIsShow(false);
  };

  return (
    <header className="w-full relative">
      <nav className="main-container flex justify-between py-4">
        <Link to="/">
          <h1 className="logo font-extrabold">Francis Blog</h1>
        </Link>
        <ul
          className={`${
            isShow ? "block" : "hidden"
          }  sm:flex  gap-5 items-center absolute top-0 left-0 w-full sm:w-auto sm:static bg-[#eee] sm:bg-transparent text-[#2c2c2c] sm:text-[#eee]`}
        >
          <header className="flex sm:hidden items-center justify-between px-2 mb-10 mt-5">
            <h1 className="logo font-extrabold">Francis Blog</h1>
            <img
              onClick={hideNav}
              src={Close}
              alt="close-button"
              className=" aspect-square w-12"
            />
          </header>

          <Link to="/">
            <li
              onClick={hideNav}
              className="text-center p-4 sm:p-0 my-4 border-2 sm:border-0"
            >
              Home
            </li>
          </Link>

          {session && (
            <Link to="/blogs">
              <li
                onClick={hideNav}
                className="text-center p-4 sm:p-0 my-4 border-2 sm:border-0"
              >
                My Blogs
              </li>
            </Link>
          )}

          {session && (
            <Link to="/create-blog">
              <li
                onClick={hideNav}
                className="text-center p-4 sm:p-0 my-4 border-2 sm:border-0"
              >
                Create Blogs
              </li>
            </Link>
          )}

          {session ? (
            <li
              onClick={handleLogout}
              className="text-red-600 cursor-pointer text-center p-4 sm:p-0 my-4 border-2 sm:border-0"
            >
              Logout
            </li>
          ) : (
            <Link to="signin">
              <li
                onClick={hideNav}
                className="text-green-600 cursor-pointer text-center p-4 sm:p-0 my-4 border-2 sm:border-0"
              >
                Sign in
              </li>
            </Link>
          )}
        </ul>
        <img
          onClick={showNav}
          src={Menu}
          alt="menu-button"
          className="block sm:hidden aspect-square w-10"
        />
      </nav>
    </header>
  );
};

export default Nav;
