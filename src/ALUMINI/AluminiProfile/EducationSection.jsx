import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const EducationSection = ({
    educationList = [],
    onAdd,
    onEdit,
    isEditable = false,
}) => {

    const card = {
        mt: 2,
        p: 2,
        bgcolor: "#fff",
        borderRadius: 2,
    };

    const titleRow = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };

    const eduRow = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        border: "1px solid #c9c3c3",
        p: 1,
        borderRadius: 5,
        mb: 1,
    };

    return (
        <Box sx={card}>
            {/* HEADER */}
            <Box sx={titleRow}>
                <Typography fontWeight={600}>Education</Typography>

                {/* ONLY IF EDITABLE */}
                {isEditable && (
                    <IconButton size="small" onClick={onAdd}>
                        {educationList?.length > 0 ? (
                            <AddCircleIcon />
                        ) : (
                            <EditIcon fontSize="small" />
                        )}
                    </IconButton>
                )}
            </Box>

            {/* LIST */}
            <Box sx={{ mt: 1 }}>
                {educationList?.length > 0 ? (
                    educationList.map((edu, i) => (
                        <Box key={edu?.id || i} sx={eduRow}>
                            {/* LEFT */}
                            <Box>
                                <Typography fontSize={14} fontWeight={600}>
                                    {edu?.degree}
                                </Typography>

                                <Typography fontSize={13} color="text.secondary">
                                    {edu?.institution}
                                </Typography>

                                <Typography fontSize={12} color="gray">
                                    {edu?.field_of_study}
                                </Typography>

                                <Typography fontSize={11} color="gray">
                                    {edu?.start_year} → {edu?.end_year || "Present"}
                                </Typography>

                                {edu?.description && (
                                    <Typography fontSize={11} sx={{ mt: 0.5 }}>
                                        {edu?.description}
                                    </Typography>
                                )}
                            </Box>

                            {/* EDIT BUTTON ONLY IF EDITABLE */}
                            {isEditable && (
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        onEdit({
                                            ...edu,
                                            editIndex: i,
                                        })
                                    }
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>
                    ))
                ) : (
                    <Typography fontSize={12} color="gray">
                        No education added
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default EducationSection;