import React from "react";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";

const Signup = () => {
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
                    Create Account
                </h2>

                <p className="text-center text-gray-500 mb-6">
                    Please enter your detail to sign in.
                </p>




                {/* FORM */}
                <form className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter your email..."
                        />
                    </div>

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

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                            placeholder="Password@123"
                        />
                    </div>



                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition"
                    >
                        Sign up
                    </button>
                </form>

                {/* Bottom Sign Up */}
                <p className="text-center mt-6 text-gray-600">
                    Have an account?  {" "}
                    <Link to="/" className="text-black font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Signup;
