import React, { useMemo, useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Button,
    Modal,
    TextField,
    IconButton,
    MenuItem,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getAuthUser, successNotify, warningNotify } from "../../constant/Constant";
import { useFectchAluminiEducation, useFectchAluminiExperience, useFectchAluminiHeading, useFetchAluminiProfilePic, useFetchSingleAluminiDetail, useFetchSingleAluminiEvent, useFetchSingleAluminiPost } from "../../ADMIN/CommonCode/useQuery";
import { axiosLogin } from "../../Axios/axios";
import { formatDate, formatDateForMySQL } from "../../ADMIN/CommonCode/Reusable";
import ProfileHeader from "./ProfileHeader";
import ExperienceSection from "./ExperienceSection";
import ProfileStats from "./ProfileStats";
import EducationSection from "./EducationSection";
import { BACKEND_API } from "../../constant/Static";


const MyProfile = () => {

    const [openModal, setOpenModal] = useState(null);
    const [formData, setFormData] = useState({});
    const [experienceList, setExperienceList] = useState([]);
    const [educationList, setEducationList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const user = getAuthUser();
    const alum_id = user?.alum_id;

    const { data: StudentPostDetail = [], refetch: FetchLoggedUserDetail } =
        useFetchSingleAluminiDetail(alum_id ?? null);

    const { data: StudentProfileDetail = [], refetch: RefechProfileDetail } =
        useFectchAluminiHeading(alum_id ?? null);

    const { data: aluminiEductaion = [], refetch: RefechEducationDetail } =
        useFectchAluminiEducation(alum_id ?? null);

    const { data: aluminiExperience = [], refetch: RefechExperienceDetail } =
        useFectchAluminiExperience(alum_id ?? null);


    const { data: ProfilePic = [], refetch: RefechProfilePicutureDetail } =
        useFetchAluminiProfilePic(alum_id ?? null);

    const { data: alumninPostDetail = [] } =
        useFetchSingleAluminiPost(alum_id ?? null);

    const { data: alumninEventDetail = [] } =
        useFetchSingleAluminiEvent(alum_id ?? null);


    const PostCount = useMemo(() => alumninPostDetail?.length, [StudentPostDetail]);

    const EventCount = useMemo(
        () => alumninEventDetail?.length,
        [alumninEventDetail]
    );


    const userData = StudentPostDetail?.[0] || {};
    const ProfileDetail = StudentProfileDetail?.[0] || {}



    const handleOpen = (type, data) => {
        setOpenModal(type);

        // ================= EXPERIENCE =================
        if (type === "experience") {
            if (Array.isArray(data)) {
                setExperienceList(data);
                setFormData({});
                setIsEdit(false);
                setEditIndex(null);
            } else {
                setFormData(data);
                setIsEdit(true);
                setEditIndex(data.editIndex ?? null);
            }
        }

        // ================= EDUCATION =================
        else if (type === "education") {
            if (Array.isArray(data)) {
                setEducationList(data);
                setFormData({});
                setIsEdit(false);
                setEditIndex(null);
            } else {
                setFormData(data);
                setIsEdit(true);
                setEditIndex(data.editIndex ?? null);
            }
        }

        // ================= PROFILE =================
        else if (type === "profile") {
            if (data && typeof data === "object") {
                //  EDIT
                setFormData({
                    bio: data.bio || "",
                    headline: data.headline || "",
                    location: data.location || "",
                });
                setIsEdit(true);
            } else {
                // ➕ ADD
                setFormData({
                    bio: "",
                    headline: "",
                    location: "",
                });
                setIsEdit(false);
            }
        }

        // ================= BIO =================
        else if (type === "bio") {
            setFormData({
                bio: data || "",
            });
            setIsEdit(!!data);
        }

        // ================= PROFILE PIC =================
        else if (type === "profilepic") {
            setFormData({});
            setIsEdit(false);
        }

        else {
            setFormData({});
            setIsEdit(false);
        }
    };


    /* ================= ADD EXPERIENCE ================= */
    // const addExperience = () => {
    //     setExperienceList([...experienceList, formData]);
    //     setFormData({});
    // };


    const addExperience = () => {
        if (editIndex !== null) {
            // UPDATE
            const updated = [...experienceList];
            updated[editIndex] = formData;
            setExperienceList(updated);
            setEditIndex(null);
        } else {
            // ADD
            setExperienceList([...experienceList, formData]);
        }

        setFormData({});
    };

    /* ================= ADD EDUCATION ================= */
    // const addEducation = () => {
    //     setEducationList([...educationList, formData]);
    //     setFormData({});
    // };


    const addEducation = () => {
        if (editIndex !== null) {
            const updated = [...educationList];
            updated[editIndex] = formData;
            setEducationList(updated);
            setEditIndex(null);
        } else {
            setEducationList([...educationList, formData]);
        }

        setFormData({});
    };

    /* ================= SAVE ================= */


    const fetchAllProfileData = async () => {
        try {
            await Promise.all([
                RefechProfilePicutureDetail(),
                RefechProfileDetail(),        // bio, headline, location
                RefechExperienceDetail(),
                RefechEducationDetail(),
                FetchLoggedUserDetail()
            ]);
        } catch (err) {
            console.error("Refetch error:", err);
        }
    };

    const handleSave = async () => {
        try {
            let url = "";
            let payload = {};
            let isFormData = false;

            switch (openModal) {
                case "experience":
                    const isExpEdit = editIndex !== null;

                    url = isExpEdit
                        ? "/alumini/experience/update"
                        : "/alumini/experience/insert";
                    payload = {
                        alum_id,
                        experienceList,
                        ...formData,
                        start_date: formatDateForMySQL(formData.start_date),
                        end_date: formatDateForMySQL(formData.end_date),
                        ...(isExpEdit && { id: formData.id })
                    };
                    break;

                case "education":
                    const isEduEdit = editIndex !== null;

                    url = isEduEdit
                        ? "/alumini/education/update"
                        : "/alumini/education/insert";

                    payload = {
                        alum_id,
                        educationList,
                        ...formData,
                        ...(isEduEdit && { id: formData.id })
                    };
                    break;

                case "bio":
                    url = "/alumini/bioupdate";
                    payload = { alum_id, bio: formData.bio };
                    break;

                case "profile":
                    const isUpdate = StudentProfileDetail && Object.keys(StudentProfileDetail)?.length > 0;
                    url = isUpdate
                        ? "/alumini/profile/update"
                        : "/alumini/profile/insert";
                    payload = {
                        alum_id,
                        bio: formData.bio,
                        headline: formData.headline,
                        location: formData.location,
                    };
                    break;

                case "profilepic":
                    if (!formData.file) {
                        return warningNotify("Please select an image");
                    }

                    url = "/alumini/profile/upload";
                    payload = new FormData();
                    payload.append("media", formData.file); // multer field
                    payload.append("alum_id", alum_id);
                    isFormData = true;
                    break;

                default:
                    console.log("OTHER SAVE", formData);
                    return;
            }

            const response = await axiosLogin.post(url, payload, {
                headers: isFormData
                    ? { "Content-Type": "multipart/form-data" }
                    : {},
            });

            const { success, message } = response.data ?? {};

            if (success !== 1) {
                return warningNotify(message || "Something went wrong");
            }

            successNotify(message || "Saved successfully");
            await fetchAllProfileData()

        } catch (error) {
            console.error("Save error:", error);
            warningNotify("Server Error");
        } finally {
            setOpenModal(null);
        }
    };

    return (
        <Box
            sx={{
                height: "90vh",
                overflowY: "auto",
                bgcolor: "#f5f7fb",

                //  Hide scrollbar (all browsers)
                scrollbarWidth: "none",        // Firefox
                msOverflowStyle: "none",       // IE & Edge
                "&::-webkit-scrollbar": {
                    display: "none",             // Chrome, Safari
                },
            }}
        >
            {/* BANNER */}
            <Box sx={{ height: 120, background: "linear-gradient(135deg, #6366f1, #ec4899)" }} />

            <Box sx={{ px: 2, mt: -5 }}>
                {/* PROFILE */}
                <Box sx={{ gap: 2 }}>
                    <Box sx={{ position: 'relative' }}>
                        <Avatar
                            src={
                                ProfilePic?.path
                                    ? `${BACKEND_API}${ProfilePic.path}`
                                    : ""
                            }
                            sx={{ width: 80, height: 80 }}
                        />
                        <IconButton
                            sx={{ position: 'absolute', bottom: 0, left: 70 }}
                            onClick={() =>
                                handleOpen("profilepic", userData.alum_name)
                            }
                        >
                            <EditIcon />
                        </IconButton>
                    </Box>

                    

                    <ProfileHeader
                        userData={userData}
                        profileDetail={ProfileDetail}
                        onEdit={() => handleOpen("profile", ProfileDetail)}
                    />


                </Box>

                {/* STATS (RESTORED) */}
             
                <ProfileStats
                    postCount={PostCount}
                    eventCount={EventCount}
                    followers={userData?.followers_count}
                />

                {/* ABOUT */}
                <Box sx={card}>
                    <Typography sx={titleRow}>
                        About
                        <IconButton size="small" onClick={() => handleOpen("bio", userData.bio)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Typography>

                    <Typography fontSize={13}>
                        {userData.bio || "No bio"}
                    </Typography>
                </Box>

                {/* EXPERIENCE */}
               
                <ExperienceSection
                    experienceList={aluminiExperience}
                    isEditable={true}
                    formatDate={formatDate}
                    onAdd={() => handleOpen("experience", [])}
                    onEdit={(data) => handleOpen("experience", data)}
                />

                {/* EDUCATION */}
               
                <EducationSection
                    educationList={aluminiEductaion}
                    isEditable={true}
                    onAdd={() => handleOpen("education", aluminiEductaion)}
                    onEdit={(data) => handleOpen("education", data)}
                />

            </Box>

            {/* MODAL */}
            <Modal open={!!openModal} onClose={() => setOpenModal(null)}>
                <Box sx={modal}>
                    <IconButton
                        size="small"
                        onClick={() => setOpenModal(null)}
                        sx={{ position: "absolute", right: 5, top: 5 }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* ABOUT */}
                    {openModal === "profile" && (
                        <>
                            <>
                                <Typography fontWeight={600}>Edit Profile</Typography>

                                {/* HEADLINE */}
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Headline"
                                    value={formData.headline || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, headline: e.target.value })
                                    }
                                    sx={{ mt: 1 }}
                                />

                                {/* LOCATION */}
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Location"
                                    value={formData.location || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, location: e.target.value })
                                    }
                                    sx={{ mt: 1 }}
                                />

                                {/* BIO */}
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Bio"
                                    value={formData.bio || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, bio: e.target.value })
                                    }
                                    sx={{ mt: 1 }}
                                />
                            </>
                        </>
                    )}


                    {openModal === "bio" && (
                        <>
                            <Typography fontWeight={600}>Edit Bio</Typography>

                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                value={formData.bio || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, bio: e.target.value })
                                }
                                sx={{ mt: 1 }}
                            />
                        </>
                    )}

                    {/* EXPERIENCE */}
                    {openModal === "experience" && (
                        <>
                            <Typography fontWeight={600}>Add Experience</Typography>

                            {/* FORM */}
                            <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>

                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Company"
                                    value={formData.company || ""}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />

                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Designation"
                                    value={formData.designation || ""}
                                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                />

                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Location"
                                    value={formData.location || ""}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="date"
                                        label="Start Date"
                                        InputLabelProps={{ shrink: true }}
                                        value={formData.start_date || ""}
                                        onChange={(e) =>
                                            setFormData({ ...formData, start_date: e.target.value })
                                        }
                                    />

                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="date"
                                        label="End Date"
                                        InputLabelProps={{ shrink: true }}
                                        value={formData.end_date || ""}
                                        onChange={(e) =>
                                            setFormData({ ...formData, end_date: e.target.value })
                                        }
                                    />
                                </Box>

                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Description"
                                    multiline
                                    rows={2}
                                    value={formData.description || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                />

                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.is_current || false}
                                        onChange={(e) =>
                                            setFormData({ ...formData, is_current: e.target.checked })
                                        }
                                    />
                                    <Typography fontSize={13}>Currently Working</Typography>
                                </Box>

                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={addExperience}
                                    sx={{ width: "fit-content" }}
                                >
                                    {editIndex !== null ? "" : "+ Add Experience"}
                                </Button>
                            </Box>

                            {/* LIST (CARD STYLE) */}
                            <Box sx={{ mt: 2 }}>
                                {experienceList?.map((exp, i) => (
                                    <Box key={i} sx={expCard}>
                                        <Box>
                                            <Typography fontWeight={600} fontSize={14}>
                                                {exp.designation || "-"}
                                            </Typography>

                                            <Typography fontSize={13} color="text.secondary">
                                                {exp.company || "-"}
                                            </Typography>

                                            <Typography fontSize={12} color="gray">
                                                {exp.location || "-"}
                                            </Typography>

                                            <Typography fontSize={12} color="gray">
                                                {exp.start_date || "-"} → {exp.is_current ? "Present" : exp.end_date || "-"}
                                            </Typography>

                                            {exp.description && (
                                                <Typography fontSize={12} sx={{ mt: 0.5 }}>
                                                    {exp.description}
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                            <Button
                                                size="small"
                                                onClick={() => setFormData(exp)}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() =>
                                                    setExperienceList(experienceList.filter((_, x) => x !== i))
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </>
                    )}

                    {/* EDUCATION */}
                    {openModal === "education" && (
                        <>
                            <Typography fontWeight={600}>Add Education</Typography>

                            {/* FORM */}
                            <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>

                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Course Name"
                                    value={formData.degree || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, degree: e.target.value })
                                    }
                                />

                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Institution"
                                    value={formData.institution || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, institution: e.target.value })
                                    }
                                />

                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Field of Study"
                                    value={formData.field_of_study || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, field_of_study: e.target.value })
                                    }
                                />

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        label="Start Year"
                                        value={formData.start_year || ""}
                                        onChange={(e) =>
                                            setFormData({ ...formData, start_year: e.target.value })
                                        }
                                    >
                                        {Array.from({ length: 50 }, (_, i) => {
                                            const year = new Date().getFullYear() - i;
                                            return (
                                                <MenuItem key={year} value={year}>
                                                    {year}
                                                </MenuItem>
                                            );
                                        })}
                                    </TextField>

                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        label="End Year"
                                        value={formData.end_year || ""}
                                        onChange={(e) =>
                                            setFormData({ ...formData, end_year: e.target.value })
                                        }
                                    >
                                        <MenuItem value="">Present</MenuItem>

                                        {Array.from({ length: 50 }, (_, i) => {
                                            const year = new Date().getFullYear() - i;
                                            return (
                                                <MenuItem key={year} value={year}>
                                                    {year}
                                                </MenuItem>
                                            );
                                        })}
                                    </TextField>
                                </Box>


                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Description"
                                    multiline
                                    rows={2}
                                    value={formData.description || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                />

                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{ width: "fit-content" }}
                                    onClick={addEducation}
                                >
                                    + Add Education
                                </Button>
                            </Box>

                            {/* LIST (CARD STYLE) */}
                            <Box sx={{ mt: 2 }}>
                                {educationList.map((edu, i) => (
                                    <Box key={i} sx={eduCard}>
                                        <Box>
                                            <Typography fontWeight={600} fontSize={14}>
                                                {edu.degree || "-"}
                                            </Typography>

                                            <Typography fontSize={13} color="text.secondary">
                                                {edu.institution || "-"}
                                            </Typography>

                                            <Typography fontSize={12} color="gray">
                                                {edu.field_of_study || "-"}
                                            </Typography>

                                            <Typography fontSize={12} color="gray">
                                                {edu.start_year || "-"} → {edu.end_year || "-"}
                                            </Typography>

                                            {edu.description && (
                                                <Typography fontSize={12} sx={{ mt: 0.5 }}>
                                                    {edu.description}
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                            <Button size="small" onClick={() => setFormData(edu)}>
                                                Edit
                                            </Button>

                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() =>
                                                    setEducationList(educationList.filter((_, x) => x !== i))
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </>
                    )}


                    {openModal === "profilepic" && (
                        <>
                            <Typography fontWeight={600}>Update Profile Photo</Typography>

                            {/* IMAGE PREVIEW */}
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                <Avatar
                                    src={
                                        formData.preview ||
                                        `http://localhost:5000/uploads/alumini-profiles/${alum_id}/profile.jpg`
                                    }
                                    sx={{ width: 100, height: 100 }}
                                />
                            </Box>

                            {/* FILE INPUT (HIDDEN) */}
                            <input
                                type="file"
                                accept="image/*"
                                id="profile-upload"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setFormData({
                                            ...formData,
                                            file,
                                            preview: URL.createObjectURL(file),
                                        });
                                    }
                                }}
                            />

                            {/* UPLOAD BUTTON */}
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={() => document.getElementById("profile-upload").click()}
                            >
                                Choose Image
                            </Button>

                        </>
                    )}

                    <Button fullWidth sx={saveBtn} onClick={handleSave}>
                        {isEdit ? "Edit" : "Save"}

                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

/* STYLES */
const card = { mt: 2, p: 2, bgcolor: "#fff", borderRadius: 2 };
const titleRow = { display: "flex", justifyContent: "space-between" };

const statBox = {
    flex: 1,
    bgcolor: "#fff",
    p: 1,
    textAlign: "center",
    borderRadius: 2,
};

const modal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "420px",
    maxHeight: "80vh",          //  limit height
    overflowY: "auto",          //  enable scroll
    bgcolor: "#fff",
    p: 2,
    borderRadius: 2,

    // hide scrollbar (all browsers)
    scrollbarWidth: "none",     // Firefox
    msOverflowStyle: "none",    // IE & Edge
    "&::-webkit-scrollbar": {
        display: "none",          // Chrome, Safari
    },
};

const listCard = {
    mt: 1,
    p: 1,
    border: "1px solid #eee",
    borderRadius: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const saveBtn = {
    mt: 2,
    background: "#6366f1",
    color: "#fff",
};

const expCard = {
    p: 1.5,
    border: "1px solid #e0e0e0",
    borderRadius: 2,
    mb: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
};


const eduCard = {
    p: 1.5,
    border: "1px solid #e0e0e0",
    borderRadius: 2,
    mb: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
};


const eduRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    border: "1px solid #c9c3c3",
    p: 1,
    borderRadius: 5,
    mb: 1
};

const cardStyle = {
    mt: 2,
    bgcolor: "#fff",
    p: 2,
    borderRadius: 3,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};



const expTopRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    mt: 1
};

const editBtn = {
    bgcolor: "#fff",
    border: "1px solid #eee",
    "&:hover": {
        bgcolor: "#f3f4f6",
    },
};
export default MyProfile;