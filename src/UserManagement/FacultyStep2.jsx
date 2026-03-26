import React, { useEffect, useState } from "react";
import {
    Box,
    Select,
    Option,
    Button,
    Textarea,
    Modal,
    ModalDialog,
    Typography
} from "@mui/joy";
import { useNavigate } from "react-router-dom";

// import { axiosLogin } from '../../Axios/axios';
import { errorNotify } from "../constant/Constant";
import {
    useFetchAllDeprtmentDetail,
    useFetchAllUserGroup,
    useFetchAllDesignationDetail
} from "../ADMIN/CommonCode/useQuery";
import GlobalLoader from "../Component/GlobalLoader";
import { axiosLogin } from "../Axios/axios";

const FacultyStep2 = ({ formData, updateField, prevStep }) => {

    const navigate = useNavigate();
    const [openSuccess, setOpenSuccess] = useState(false);
    const [loading, setLoading] = useState(false)

    const { data: groupDetail, refetch: fetchGroups } = useFetchAllUserGroup();
    const { data: departmentDetail, refetch: fetchDepartments } =
        useFetchAllDeprtmentDetail();
    const { data: designationDetail, refetch: fetchDesignation } =
        useFetchAllDesignationDetail();

    useEffect(() => {
        fetchGroups();
        fetchDepartments();
        fetchDesignation();
    }, []);

    const handleSubmit = async () => {
        try {
            setLoading(true)

            if (!formData.fac_dep_id) {
                errorNotify("Please select department");
                return;
            }

            if (!formData.fac_group) {
                errorNotify("Please select group");
                return;
            }

            if (!formData.fac_desg_id) {
                errorNotify("Please select designation");
                return;
            }

            if (!formData.fac_address) {
                errorNotify("Please enter address");
                return;
            }

            const response = await axiosLogin.post(
                "/training/faculty/registration",
                formData
            );
            const { success, message } = response.data;

            if (success === 1) {
                localStorage.removeItem("faculty_email_confirmed");
                setOpenSuccess(true);

            } else {
                errorNotify(message || "Registration failed");
            }

        } catch (err) {

            console.error("Faculty registration error:", err);
            if (err.response?.data?.message) {
                errorNotify(err.response.data.message);
            } else {
                errorNotify("Server error. Please try again later.");
            }

        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            {loading && <GlobalLoader text="Sending Request..." />}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                {/* Department */}
                <Select
                    placeholder="Department"
                    value={formData.fac_dep_id || null}
                    onChange={(e, val) => updateField("fac_dep_id", val)}
                >
                    {departmentDetail?.map((dep) => (
                        <Option key={dep.dep_id} value={dep.dep_id}>
                            {dep.dep_name}
                        </Option>
                    ))}
                </Select>

                {/* Group */}
                <Select
                    placeholder="Group"
                    value={formData.fac_group || null}
                    onChange={(e, val) => updateField("fac_group", val)}
                >
                    {groupDetail?.map((grp) => (
                        <Option key={grp.group_id} value={grp.group_id}>
                            {grp.group_name}
                        </Option>
                    ))}
                </Select>

                {/* Designation */}
                <Select
                    placeholder="Designation"
                    value={formData.fac_desg_id || null}
                    onChange={(e, val) => updateField("fac_desg_id", val)}
                >
                    {designationDetail?.map((desg) => (
                        <Option key={desg.desg_id} value={desg.desg_id}>
                            {desg.desg_name}
                        </Option>
                    ))}
                </Select>

                {/* Address */}
                <Textarea
                    placeholder="Address"
                    minRows={3}
                    value={formData.fac_address || ""}
                    onChange={(e) => updateField("fac_address", e.target.value)}
                />

                {/* Buttons */}
                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>

                    <Button
                        variant="outlined"
                        color="neutral"
                        onClick={prevStep}
                    >
                        Back
                    </Button>

                    <Button
                        disabled={loading}
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Send Admin Verification Request
                    </Button>

                </Box>

            </Box>


            {/* SUCCESS MODAL */}

            <Modal open={openSuccess}>
                <ModalDialog
                    sx={{
                        maxWidth: 450,
                        textAlign: "center",
                        borderRadius: "lg",
                        p: 4
                    }}
                >

                    {/* Success Icon */}
                    <Typography level="h1">
                        🎉
                    </Typography>

                    {/* Title */}
                    <Typography
                        level="h3"
                        sx={{ fontWeight: "bold", color: "success.600" }}
                    >
                        Registration Successful!
                    </Typography>

                    {/* Message */}
                    <Typography sx={{ mt: 2 }}>
                        Your faculty registration request has been submitted successfully.
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                        You can login using the{" "}
                        <b>email address and password sent to your mail.</b>
                    </Typography>

                    {/* Highlight message */}
                    <Box
                        sx={{
                            mt: 2,
                            p: 2,
                            borderRadius: "md",
                            backgroundColor: "warning.softBg",
                        }}
                    >
                        <Typography sx={{ fontWeight: "bold", color: "warning.700" }}>
                            ⚠ Your login will be activated only after
                            <br />
                            admin verification is completed.
                        </Typography>
                    </Box>

                    <Typography sx={{ mt: 2, fontStyle: "italic", color: "text.secondary" }}>
                        Please wait for admin approval.
                    </Typography>

                    {/* Button */}
                    <Button
                        sx={{ mt: 3 }}
                        size="lg"
                        color="success"
                        fullWidth
                        onClick={() => navigate("/login")}
                    >
                        Continue to Login
                    </Button>

                </ModalDialog>
            </Modal>

        </>
    );
};

export default FacultyStep2;