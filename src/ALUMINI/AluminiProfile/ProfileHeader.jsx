import React, { memo } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfileHeader = ({ userData = {}, profileDetail = {}, onEdit }) => {
    return (
        <Box
            flex={1}
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
        >
            {/* LEFT */}
            <Box>
                <Typography fontWeight={700}>
                    {userData?.alum_name}
                </Typography>

                <Typography fontSize={13}>
                    {userData?.alum_company_designation} • {userData?.alum_company}
                </Typography>

                <Typography fontSize={13} fontWeight={800} color="gray">
                    {profileDetail?.headline || "Add HeadLine"}
                </Typography>

                <Typography fontSize={12} color="gray">
                    {profileDetail?.bio || "Add Bio"}
                </Typography>

                <Typography fontSize={12} color="gray">
                    {profileDetail?.location || "Add Locations"}
                </Typography>
            </Box>

            {/* RIGHT (EDIT BUTTON) */}
            <IconButton onClick={onEdit}>
                <EditIcon />
            </IconButton>
        </Box>
    );
};

export default memo(ProfileHeader);