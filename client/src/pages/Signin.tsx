import React, { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { SigninThunk } from "../redux/thunks/authThunks";

const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { signinErr } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(SigninThunk(formData));

    if (SigninThunk.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <main className="main-container grid place-items-center h-[100svh]">
      <form
        onSubmit={handleSignin}
        className="form-container border-[#eee] border-2 rounded-lg p-4 flex flex-col gap-4"
      >
        <header>
          <h1 className="title font-extrabold text-center">Sign in</h1>
        </header>
        <div className="flex flex-col">
          <span className="label">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-[#eee] p-1"
          />
        </div>

        <div className="flex flex-col">
          <span className="label">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-2 border-[#eee] p-1"
          />
        </div>

        <button className="bg-[#eee] text-[#2c2c2c] cursor-pointer p-1">
          Sign In
        </button>

        <div>
          <p>
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text-blue-700">Sign up</span>
            </Link>
          </p>
        </div>
        {signinErr && (
          <p className="text-[#eee] bg-red-950 border-l-10 border-red-700">
            {signinErr}
          </p>
        )}
      </form>
    </main>
  );
};

export default Signin;
