import React, { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { SignupThunk } from "../redux/thunks/authThunks";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSigningUp, signupErr } = useAppSelector((state) => state.auth);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(SignupThunk(formData));

    if (SignupThunk.fulfilled.match(result)) {
      navigate("/signin");
    }
  };

  return (
    <main className="main-container grid place-items-center h-[100svh]">
      <form
        onSubmit={handleSubmit}
        className="form-container border-[#eee] border-2 rounded-lg p-4 flex flex-col gap-4"
      >
        <header>
          <h1 className="title font-extrabold text-center">Sign up</h1>
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
          {isSigningUp ? "Signing up..." : "Sign up"}
        </button>

        <div>
          <p>
            Already have an account?{" "}
            <Link to="/signin">
              <span className="text-blue-700">Sign In</span>
            </Link>
          </p>
        </div>
        {signupErr && (
          <p className="text-[#eee] bg-red-950 border-l-10 border-red-700">
            {signupErr}
          </p>
        )}
      </form>
    </main>
  );
};

export default Signup;
