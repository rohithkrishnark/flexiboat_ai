import React, { memo } from "react";
import { Box, Typography } from "@mui/material";

const ProfileStats = ({ postCount = 0, eventCount = 0, followers = 0 }) => {
    const statBox = {
        flex: 1,
        bgcolor: "#fff",
        p: 1,
        textAlign: "center",
        borderRadius: 2,
    };

    return (
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Box sx={statBox}>
                <Typography fontWeight={600}>{postCount}</Typography>
                <Typography fontSize={11}>Posts</Typography>
            </Box>

            <Box sx={statBox}>
                <Typography fontWeight={600}>{eventCount}</Typography>
                <Typography fontSize={11}>Events</Typography>
            </Box>

            <Box sx={statBox}>
                <Typography fontWeight={600}>{followers}</Typography>
                <Typography fontSize={11}>Followers</Typography>
            </Box>
        </Box>
    );
};

export default memo(ProfileStats);