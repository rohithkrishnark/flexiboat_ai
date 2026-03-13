import React, { useState } from "react";
import { Box, Card, Typography } from "@mui/joy";
import { useLocation, useNavigate } from "react-router-dom";
import UserSignup from "./UserSignup";
import FacultyStep1 from "./FacultyStep1";
import FacultyStep2 from "./FacultyStep2";



const Signup = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const role = location.state?.role || "user";

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",

        fac_name: "",
        fac_age: "",
        fac_mobile_no: "",
        fac_dep_id: "",
        fac_group: "",
        fac_desg_id: "",
        fac_address: "",
        fac_email: ""
    });

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (

        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(120deg,#000,#1c1c1c)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >

            <Card sx={{ width: 420, p: 4 }}>

                <Typography level="h3" textAlign="center" mb={3}>
                    {role === "faculty" ? "Faculty Registration" : "Create Account"}
                </Typography>

                {role === "user" && (
                    <UserSignup
                        formData={formData}
                        updateField={updateField}
                    />
                )}

                {role === "faculty" && step === 1 && (
                    <FacultyStep1
                        formData={formData}
                        updateField={updateField}
                        nextStep={() => setStep(2)}
                    />
                )}

                {role === "faculty" && step === 2 && (
                    <FacultyStep2
                        formData={formData}
                        updateField={updateField}
                        prevStep={() => setStep(1)}
                        navigate={navigate}
                    />
                )}

            </Card>

        </Box>

    );
};

export default Signup;