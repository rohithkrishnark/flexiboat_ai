import React, { useState } from "react";
import { errorNotify, successNotify, warningNotify } from "../constant/Constant";
import { useNavigate } from "react-router-dom";
import axiosLogin from "../../src/Axios/axios";


const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // Handle Login page
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                user_email: formData.email,
                password: formData.password,
            };

            // Send request to backend
            const res = await axiosLogin.post("/user/login", payload); // adjust route if needed

            if (res.data.success === 1) {
                //  Successful login
                successNotify(res.data.message || "Login successful!");

                // Store user info in localStorage
                const { user_id, user_name, user_email } = res.data.data;

                //  Encode as Base64 before storing
                const userData = btoa(JSON.stringify({ user_id, user_name, user_email }));
                localStorage.setItem("user", userData);

                console.log("User data stored:", res.data.data);

                // Redirect to dashboard/home
                navigate("/home");
            } else {
                // Backend returned known error but 200 response (rare)
                warningNotify(res.data.message || "Login failed");
            }

        } catch (error) {
            // Backend returned an error response
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.message || "Something went wrong";

                if (status === 400) {
                    warningNotify(message); // Missing required fields
                } else if (status === 401) {
                    warningNotify(message); // Invalid email/password
                } else if (status >= 500) {
                    errorNotify("Server error. Please try again later.");
                } else {
                    errorNotify(message); // Any other backend error
                }

            } else if (error.request) {
                // Request made but no response
                errorNotify("No response from server. Please check your network.");
            } else {
                // Other errors
                errorNotify("An unexpected error occurred.");
            }

            console.error("Login error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-black mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-black mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter email"
                            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter password"
                            className="w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-900 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-5">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-black font-semibold underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
