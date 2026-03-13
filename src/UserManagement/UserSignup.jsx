import React from "react";
import { Box, Input, Button } from "@mui/joy";
import axiosLogin from "../../src/Axios/axios";
import { errorNotify, successNotify, warningNotify } from "../constant/Constant";
// import { successNotify, errorNotify, warningNotify } from "../../constant/Constant";

const UserSignup = ({ formData, updateField }) => {

    const handleSubmit = async () => {

        if (!formData.username || !formData.email || !formData.password) {
            warningNotify("Fill all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            warningNotify("Passwords do not match");
            return;
        }

        try {

            await axiosLogin.post("/user/signin", {
                user_name: formData.username,
                user_email: formData.email,
                password: formData.password
            });

            successNotify("User Registered Successfully");

        } catch {
            errorNotify("Registration Failed");
        }
    };

    return (

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

            <Input
                placeholder="Username"
                value={formData.username}
                onChange={(e) => updateField("username", e.target.value)}
            />

            <Input
                placeholder="Email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
            />

            <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
            />

            <Input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
            />

            <Button onClick={handleSubmit}>Sign Up</Button>

        </Box>

    );
};

export default UserSignup;