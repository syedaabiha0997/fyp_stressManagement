import React from "react";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200 p-4">

      {/* CARD */}
      <div className="w-full max-w-xl bg-orange-50 rounded-3xl shadow-[0px_8px_40px_rgba(0,0,0,0.1)] p-10 border border-gray-100">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <div className=" flex items-center justify-center">
            <img
              src={logo}
              alt="logo"
              className="h-30 w-30 object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Welcome back
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Please enter your detail to sign in.
        </p>

        {/* Google Login Button */}
        <button className="w-full border border-gray-300 rounded-xl py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition mb-4">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="h-5 w-5"
          />
          <span className="text-gray-700">or sign in with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="text-gray-500 text-sm">OR</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* FORM */}
        <form className="space-y-4">

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              E-mail Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email..."
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="Password@123"
            />
          </div>

          {/* Remember + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span className="text-gray-700">Remember me</span>
            </label>

            <a href="#" className="text-gray-600 hover:text-black underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <Link to="/dashboard">
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition mt-4"
            >
              Sign in
            </button>
          </Link>
        </form>

        {/* Bottom Sign Up */}
        <p className="text-center mt-6 text-gray-600">
          Don’t have an account yet?{" "}
          <Link to="/signup" className="text-black font-semibold hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
