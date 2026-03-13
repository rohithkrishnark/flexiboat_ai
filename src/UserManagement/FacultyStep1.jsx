import React, { useState } from "react";
import {
    Box,
    Input,
    Button,
    Modal,
    ModalDialog,
    Typography
} from "@mui/joy";
import { warningNotify } from "../constant/Constant";

const FacultyStep1 = ({ formData, updateField, nextStep }) => {

    const [confirmOpen, setConfirmOpen] = useState(false);

    const validateFields = () => {

        const nameRegex = /^[A-Za-z ]{3,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        if (!formData.fac_name || !formData.fac_age || !formData.fac_mobile_no || !formData.fac_email) {
            warningNotify("Fill all fields");
            return false;
        }

        if (!nameRegex.test(formData.fac_name)) {
            warningNotify("Enter a valid name (minimum 3 letters)");
            return false;
        }

        if (formData.fac_age < 21 || formData.fac_age > 70) {
            warningNotify("Age must be between 21 and 70");
            return false;
        }

        if (!emailRegex.test(formData.fac_email)) {
            warningNotify("Enter a valid email address");
            return false;
        }

        if (!mobileRegex.test(formData.fac_mobile_no)) {
            warningNotify("Mobile number must be exactly 10 digits");
            return false;
        }

        return true;
    };

    const handleNext = () => {

        if (!validateFields()) return;

        const emailConfirmed = localStorage.getItem("facultyEmailConfirmed");

        if (emailConfirmed === "true") {
            nextStep();
        } else {
            setConfirmOpen(true);
        }
    };

    const handleConfirm = () => {

        localStorage.setItem("facultyEmailConfirmed", "true");

        setConfirmOpen(false);

        nextStep();
    };

    return (
        <>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                <Input
                    placeholder="Faculty Name"
                    value={formData.fac_name}
                    onChange={(e) => updateField("fac_name", e.target.value)}
                />

                <Input
                    type="number"
                    placeholder="Age"
                    value={formData.fac_age}
                    slotProps={{ input: { min: 21, max: 70 } }}
                    onChange={(e) => updateField("fac_age", e.target.value)}
                />

                <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.fac_email}
                    onChange={(e) => updateField("fac_email", e.target.value)}
                />

                <Input
                    placeholder="Mobile Number"
                    value={formData.fac_mobile_no}
                    onChange={(e) => updateField("fac_mobile_no", e.target.value)}
                />

                <Button onClick={handleNext}>
                    Next
                </Button>

            </Box>

            {/* CONFIRMATION MODAL */}

            <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>

                <ModalDialog>

                    <Typography level="h4">
                        Confirm Email
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                        Make sure the email is correct. Login credentials will be sent to:
                    </Typography>

                    <Typography sx={{ fontWeight: "bold", mt: 1, color: '#2c8eff', textTransform: 'lowercase', fontStyle: 'italic' }}>
                        "{formData.fac_email}"
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, mt: 3 }}>

                        <Button
                            variant="outlined"
                            onClick={() => setConfirmOpen(false)}
                        >
                            Edit Email
                        </Button>

                        <Button
                            color="primary"
                            onClick={handleConfirm}
                        >
                            Confirm & Continue
                        </Button>

                    </Box>

                </ModalDialog>

            </Modal>

        </>
    );
};

export default FacultyStep1;