import React, { useMemo, useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Button,
    Chip,
    Modal,
    TextField,
    IconButton,
} from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";

import {
    useFetchLoggedStudentDetail,
    useFetchProfilePic,
    useFetchSingleStudentActivity,
    useFetchSingleStudentPost,
} from "../../ADMIN/CommonCode/useQuery";

import { getAuthUser, successNotify, errorNotify } from "../../constant/Constant";
import { axiosLogin } from "../../Axios/axios";
import { height } from "@mui/system";
import { BACKEND_IMAGE } from "../../constant/Static";

const StudentProfile = () => {
    const [openImageModal, setOpenImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [openModal, setOpenModal] = useState(null);
    const [tempValue, setTempValue] = useState("");

    const user = getAuthUser();
    const std_id = user?.user_id;

    const { data: StudentPostDetail = [] } =
        useFetchSingleStudentPost(std_id ?? null);

    const { data: MyProfilePicture = [] } =
        useFetchProfilePic(std_id ?? null);

    const { data: studetnActivityDetail = [] } =
        useFetchSingleStudentActivity(std_id ?? null);

    const { data: LoggedUserDetail = [], refetch } =
        useFetchLoggedStudentDetail(std_id ?? null);

    const userData = LoggedUserDetail?.[0] || {};



    //  COUNTS
    const PostCount = useMemo(() => StudentPostDetail.length, [StudentPostDetail]);

    const ActivityCount = useMemo(
        () => studetnActivityDetail.length,
        [studetnActivityDetail]
    );

    const TotalActivityScore = useMemo(() => {
        return studetnActivityDetail.reduce(
            (total, item) => total + (Number(item.activity_score) || 0),
            0
        );
    }, [studetnActivityDetail]);


    //  IMAGE UPLOAD
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    //  SAVE PROFILE IMAGE
    const handleSaveImage = async () => {
        try {
            const formData = new FormData();
            formData.append("media", selectedImage);
            formData.append("student_id", std_id);

            await axiosLogin.post("/student/profile/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            successNotify("Profile updated");
            setOpenImageModal(false);
            refetch();
        } catch (err) {
            errorNotify("Upload failed");
        }
    };

    //  SAVE BIO / SKILL
    const handleSaveText = async () => {
        try {
            if (openModal === "about") {
                await axiosLogin.post("/student/edit-bio", {
                    std_id: std_id,
                    bio: tempValue,
                });
            }
            if (openModal === "skills") {
                // convert to JSON
                const skillsArray = tempValue.split(",").map((s) => s.trim());

                await axiosLogin.post("/student/edit-skill", {
                    std_id: std_id,
                    skill: JSON.stringify(skillsArray),
                });
            }

            successNotify("Updated successfully");
            setOpenModal(null);
            refetch();
        } catch (err) {
            errorNotify("Update failed");
        }
    };
    

    return (
        <Box sx={{ height: "90vh", overflowY: "auto", bgcolor: "#f5f7fb" }}>
            {/* 🔥 BANNER */}
            <Box sx={{ height: 140, background: "linear-gradient(135deg, #6366f1, #ec4899)" }} />

            <Box sx={{ px: 3, mt: -6 }}>
                {/* 🔥 PROFILE */}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ position: "relative" }}>
                        <Avatar
                            src={
                                previewImage
                                    ? previewImage
                                    : MyProfilePicture?.path
                                        ? `${BACKEND_IMAGE}${MyProfilePicture.path}`
                                        : ""
                            }
                            sx={{
                                width: 90,
                                height: 90,
                                border: "4px solid white",
                                cursor: "pointer",
                            }}
                            onClick={() => setOpenImageModal(true)}
                        />



                        <Button
                            size="small"
                            sx={editIcon}
                            onClick={() => setOpenImageModal(true)}
                        >
                            ✎
                        </Button>
                    </Box>
                </Box>

                {/*  NAME */}
                <Typography fontSize={20} fontWeight={700}>
                    {userData.std_name}
                </Typography>

                <Typography color="text.secondary" fontSize={14}>
                    {userData.program_name} • {userData.program_year_name}
                </Typography>

                <Typography fontSize={12} color="gray">
                    {userData.dep_name}
                </Typography>

                {/*  STATS */}
                <Box sx={statsBox}>
                    {[
                        { label: "Posts", value: PostCount },
                        { label: "Activities", value: ActivityCount },
                        { label: "Points", value: TotalActivityScore },
                    ].map((item, i) => (
                        <Box key={i} sx={statCard}>
                            <Typography fontWeight={700}>{item.value}</Typography>
                            <Typography fontSize={12}>{item.label}</Typography>
                        </Box>
                    ))}
                </Box>

                {/*  ABOUT */}
                <Box sx={cardStyle}>
                    <Typography fontWeight={600}>
                        About
                        <Button
                            size="small"
                            onClick={() => {
                                setTempValue(userData?.bio || "");
                                setOpenModal("about");
                            }}
                        >
                            ✎
                        </Button>
                    </Typography>

                    <Typography>{userData.bio}</Typography>
                </Box>

                {/*  SKILLS */}
                <Box sx={cardStyle}>
                    <Typography fontWeight={600}>
                        Skills
                        <Button
                            size="small"
                            onClick={() => {
                                setTempValue((userData.skills || "").replace(/[\[\]"]/g, ""));
                                setOpenModal("skills");
                            }}
                        >
                            ✎
                        </Button>
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {(
                            (() => {
                                try {
                                    if (!userData?.skill) return ["React", "Node"];

                                    return typeof userData?.skill === "string"
                                        ? JSON.parse(userData?.skill)
                                        : userData?.skill; // already array
                                } catch (err) {
                                    return ["React", "Node"];
                                }
                            })()
                        ).map((s, i) => (
                            <Chip key={i} label={s} />
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* 🔥 IMAGE MODAL */}
            <Modal open={openImageModal} onClose={() => setOpenImageModal(false)}>
                <Box sx={modalStyle}>
                    <IconButton sx={closeBtn} onClick={() => setOpenImageModal(false)}>
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6">Update Profile</Typography>

                    <Box sx={previewBox}>
                        {previewImage ? (
                            <img src={previewImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                            "No Image"
                        )}
                    </Box>

                    <Button component="label" startIcon={<ImageIcon />} sx={btnStyle}>
                        Upload
                        <input hidden type="file" onChange={handleImageUpload} />
                    </Button>

                    <Button fullWidth sx={saveBtn} onClick={handleSaveImage}>
                        Save
                    </Button>
                </Box>
            </Modal>

            {/*  TEXT MODAL */}
            <Modal open={!!openModal} onClose={() => setOpenModal(null)}>
                <Box sx={modalStyle}>
                    <Typography>Edit {openModal}</Typography>

                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                    />
                    <Typography sx={{ fontSize: 12 }}>{openModal !== "about" ? "Seperate Skills by coma" : ""}</Typography>
                    <Button sx={saveBtn} onClick={handleSaveText}>
                        Save
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

/* 🔥 STYLES */
const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "#fff",
    p: 3,
    borderRadius: 3,
    height: 350
};

const previewBox = {
    height: 150,
    bgcolor: "#eee",
    my: 2,
};

const btnStyle = {
    borderRadius: "20px",
};

const saveBtn = {
    mt: 2,
    background: "linear-gradient(45deg, #6366f1, #ec4899)",
    color: "#fff",
};

const closeBtn = {
    position: "absolute",
    right: 10,
    top: 10,
};

const editIcon = {
    position: "absolute",
    bottom: 0,
    right: 0,
    minWidth: 30,
    height: 30,
    borderRadius: "50%",
    bgcolor: "#6366f1",
    color: "#fff",
};

const statsBox = {
    display: "flex",
    gap: 2,
    mt: 2,
};

const statCard = {
    flex: 1,
    bgcolor: "#fff",
    p: 1,
    textAlign: "center",
    borderRadius: 2,
};

const cardStyle = {
    mt: 2,
    bgcolor: "#fff",
    p: 2,
    borderRadius: 2,
};

export default StudentProfile;