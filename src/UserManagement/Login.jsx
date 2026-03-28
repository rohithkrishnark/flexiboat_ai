import React, { useState } from "react";
import { Box, Button, Typography, Input, Link } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { errorNotify, infoNotify, successNotify, warningNotify } from "../constant/Constant";
import { axiosLogin } from "../Axios/axios";

const Login = () => {
    const navigate = useNavigate();
    const [currentrole, setRole] = useState("student");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const toggleRole = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                user_email: formData.email,
                password: formData.password,
            };

            // Determine API based on role
            let roleApi = "";
            let redirectPath = "";
            let basepath = ""

            if (currentrole === "student") {
                basepath = "student"
                roleApi = "stdlogin"; // your student login API
                redirectPath = "/students";
            } else if (currentrole === "faculty") {
                basepath = "user"
                roleApi = "faclogin";
                redirectPath = "/faculity";
            } else if (currentrole === "alumni") {
                basepath = "user"
                roleApi = "alumlogin";
                redirectPath = "/alumini";
            }

            const { data: resData } = await axiosLogin.post(`/${basepath}/${roleApi}`, payload);
            const { success, message, data } = resData;

            if (success !== 1) {
                return warningNotify(message || "Login failed");
            }

            successNotify(message || "Login successful!");

            // Save auth data
            const authData = {
                logged_role: currentrole,
                ...data,
            };

            localStorage.setItem("authUser", btoa(JSON.stringify(authData)));

            navigate(redirectPath);
        } catch (error) {
            console.error(error);
            errorNotify("Login failed");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#0b0b0b",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: 420,
                    bgcolor: "white",
                    borderRadius: "14px",
                    p: 4,
                    boxShadow: "lg",
                }}
            >
                <Typography level="h3" textAlign="center" mb={3}>
                    Login
                </Typography>

                {/* ROLE SELECT */}
                <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", mb: 3 }}>
                    {["student", "faculty", "alumni"].map((role) => (
                        <Button
                            key={role}
                            size="sm"
                            variant={currentrole === role ? "solid" : "outlined"}
                            onClick={() => toggleRole(role)}
                            sx={{
                                borderRadius: "20px",
                                px: 2,
                                fontWeight: 600,
                                textTransform: "none",
                                bgcolor: currentrole === role ? (role === "student" ? "#1976d2" : role === "faculty" ? "#2e7d32" : "#7b1fa2") : "transparent",
                                color: currentrole === role ? "#fff" : role === "student" ? "#1976d2" : role === "faculty" ? "#2e7d32" : "#7b1fa2",
                                borderWidth: "2px",
                                borderColor: role === "student" ? "#1976d2" : role === "faculty" ? "#2e7d32" : "#7b1fa2",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </Button>
                    ))}
                </Box>

                {/* LOGIN FORM */}
                <form>
                    <Box mb={2}>
                        <Typography level="body-sm">Email</Typography>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box mb={3}>
                        <Typography level="body-sm">Password</Typography>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Box>

                    <Button onClick={handleSubmit} fullWidth>
                        Login
                    </Button>
                </form>

                {/* SIGNUP LINK */}
                {currentrole === "faculty" && (
                    <Typography level="body-sm" textAlign="center" mt={3}>
                        Don’t have an account?{" "}
                        <Link
                            sx={{ cursor: "pointer", fontWeight: "bold" }}
                            onClick={() => navigate("/signup", { state: { role: currentrole } })}
                        >
                            Create account
                        </Link>
                    </Typography>
                )}
                <Typography level="body-sm" textAlign="center" mt={3}>
                    <Link
                        sx={{ cursor: "pointer", fontWeight: "bold" }}
                        onClick={() => navigate("/home", { state: { role: currentrole } })}
                    >
                        go Back
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;