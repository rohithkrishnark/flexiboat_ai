import React, { useState } from "react";
import {
    successNotify,
    errorNotify,
    warningNotify,
} from "../constant/Constant"
import { useNavigate } from "react-router-dom";
import axiosLogin from "../../src/Axios/axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Sign In
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            warningNotify("Passwords do not match");
            return;
        }

        try {
            const payload = {
                user_name: formData.username,
                user_email: formData.email,
                password: formData.password,
            };

            const res = await axiosLogin.post("/user/signin", payload);

            if (res.data.success === 1) {
                successNotify("Registered successfully");
                navigate("/login");
            } else {
                errorNotify(res.data.message || "Registration failed");
            }

        } catch (error) {
            if (error.response) {
                errorNotify(error.response.data.message);
            } else {
                errorNotify("Network error. Please try again.");
            }
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-black mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-semibold text-black mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            required
                            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter username"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-black mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            required
                            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-black mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            required
                            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-semibold text-black mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            required
                            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Confirm password"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-900 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-5">
                    Already have an account?{" "}
                    <a href="/login" className="text-black font-semibold underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
