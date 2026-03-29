import React, { memo } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ExperienceSection = ({
    experienceList = [],
    onAdd,
    onEdit,
    isEditable = false,
    formatDate,
}) => {

    const cardStyle = {
        mt: 2,
        bgcolor: "#fff",
        p: 2,
        borderRadius: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    };

    const titleRow = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };

    const expTopRow = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mt: 1,
    };

    const editBtn = {
        bgcolor: "#fff",
        border: "1px solid #eee",
        "&:hover": {
            bgcolor: "#f3f4f6",
        },
    };

    return (
        <Box sx={cardStyle}>
            {/* HEADER */}
            <Box sx={titleRow}>
                <Typography fontWeight={600}>Experience</Typography>

                {/* SHOW ONLY IF EDITABLE */}
                {isEditable && (
                    <IconButton size="small" onClick={onAdd}>
                        {experienceList?.length > 0 ? (
                            <AddCircleIcon fontSize="small" />
                        ) : (
                            <EditIcon fontSize="small" />
                        )}
                    </IconButton>
                )}
            </Box>

            {/* LIST */}
            {experienceList?.length === 0 ? (
                <Typography fontSize={13} color="gray">
                    No experience added
                </Typography>
            ) : (
                experienceList.map((exp, index) => (
                    <Box
                        key={exp?.id || index}
                        sx={{
                            border: "0.5px solid grey",
                            borderRadius: 5,
                            p: 1,
                            mb: 1,
                        }}
                    >
                        {/* TOP ROW */}
                        <Box sx={expTopRow}>
                            <Box>
                                <Typography fontWeight={600}>
                                    {exp?.designation}
                                </Typography>

                                <Typography fontSize={13} color="gray">
                                    {exp?.company}
                                </Typography>
                            </Box>

                            {/* EDIT BUTTON ONLY IF EDITABLE */}
                            {isEditable && (
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        onEdit({
                                            ...exp,
                                            editIndex: index,
                                        })
                                    }
                                    sx={editBtn}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>

                        {/* DETAILS */}
                        <Typography fontSize={12} sx={{ mt: 0.5 }}>
                            📍 {exp?.location}
                        </Typography>

                        <Typography fontSize={12}>
                            🗓 {formatDate(exp?.start_date)} -{" "}
                            {exp?.is_current
                                ? "Present"
                                : formatDate(exp?.end_date)}
                        </Typography>

                        {exp?.description && (
                            <Typography fontSize={12} sx={{ mt: 1, color: "#555" }}>
                                {exp.description}
                            </Typography>
                        )}
                    </Box>
                ))
            )}
        </Box>
    );
};

export default memo(ExperienceSection);