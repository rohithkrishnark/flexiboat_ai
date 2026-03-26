import React, { useMemo, useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Button,
    Chip,
    Tabs,
    Tab,
    Grid,
    Card,
} from "@mui/material";
import { useParams } from "react-router-dom";

import {
    useFetchSingleStudentPost,
    useFetchSingleStudentMedia,
    useFetchSingleStudentActivity,
    useFetchStudentActivityMedia,
    useFetchLoggedStudentDetail,
    useFetchProfilePic,
} from "../../ADMIN/CommonCode/useQuery";

const StudentGlobalView = () => {
    //const { id } = useParams(); //  student id from URL

    const [tab, setTab] = useState(0);
    const id = 2;
    //  FETCH DATA
    const { data: posts = [] } = useFetchSingleStudentPost(id);
    const { data: postMedia = [] } = useFetchSingleStudentMedia(id);

    const { data: activities = [] } = useFetchSingleStudentActivity(id);
    const { data: activityMedia = [] } = useFetchStudentActivityMedia(id);

    const { data: profilePic = {} } = useFetchProfilePic(id);
    const { data: studentDetail = [] } = useFetchLoggedStudentDetail(id);

    const userData = studentDetail?.[0] || {};

    //  COMBINE POST MEDIA
    const postsWithMedia = useMemo(() => {
        return posts?.map((post) => {
            const media = postMedia?.find((m) => m.id === post.id)?.media || [];
            return { ...post, media };
        });
    }, [posts, postMedia]);

    //  COMBINE ACTIVITY MEDIA
    const activitiesWithMedia = useMemo(() => {
        return activities?.map((act) => {
            const media =
                activityMedia?.find((m) => m.id === act.id)?.media || [];
            return { ...act, media };
        });
    }, [activities, activityMedia]);

    //  SKILLS PARSE
    const skills = useMemo(() => {
        try {
            return userData.skills
                ? JSON.parse(userData.skills)
                : ["React", "Node"];
        } catch {
            return ["React", "Node"];
        }
    }, [userData.skills]);

    const renderGrid = (data) => (
        <Grid container spacing={1}>
            {data.map((item, i) =>
                item.media?.map((m, index) => (
                    <Grid item xs={4} key={index}>
                        <Card
                            sx={{
                                height: 120,
                                overflow: "hidden",
                                borderRadius: 2,
                            }}
                        >
                            {m.type === "video" ? (
                                <video
                                    src={`http://localhost:7000${m.path}`}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            ) : (
                                <img
                                    src={`http://localhost:7000${m.path}`}
                                    alt=""
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            )}
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
    );

    return (
        <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
            {/*  BANNER */}
            <Box
                sx={{
                    height: 150,
                    background: "linear-gradient(135deg,#6366f1,#ec4899)",
                }}
            />

            {/*  PROFILE */}
            <Box sx={{ px: 3, mt: -6 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Avatar
                        src={`http://localhost:7000${profilePic?.path || ""}`}
                        sx={{
                            width: 90,
                            height: 90,
                            border: "4px solid white",
                        }}
                    />
                </Box>

                {/*  NAME */}
                <Box sx={{ mt: 1 }}>
                    <Typography fontSize={20} fontWeight={700}>
                        {userData.std_name}
                    </Typography>

                    <Typography fontSize={14} color="text.secondary">
                        {userData.program_name} • {userData.program_year_name}
                    </Typography>

                    <Typography fontSize={12} color="gray">
                        {userData.dep_name}
                    </Typography>
                </Box>



                {/*  ABOUT */}
                <Box sx={{ mt: 1 }}>
                    <Typography fontSize={14} color="text.secondary">
                        {userData.bio}
                    </Typography>
                </Box>

                {/*  SKILLS */}
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {skills.map((s, i) => (
                            <Chip key={i} label={s} />
                        ))}
                    </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Button variant="contained">Message</Button>
                    <Button variant="outlined">⭐ Rate</Button>
                </Box>

                {/*  TABS */}
                <Tabs
                    value={tab}
                    onChange={(e, v) => setTab(v)}
                    sx={{ mt: 2 }}
                >
                    <Tab label="Posts" />
                    <Tab label="Videos" />
                    <Tab label="Activities" />
                </Tabs>
            </Box>

            {/*  CONTENT */}
            <Box sx={{ p: 2 }}>
                {tab === 0 && renderGrid(postsWithMedia)}

                {tab === 1 &&
                    renderGrid(
                        postsWithMedia.map((p) => ({
                            ...p,
                            media: p.media?.filter((m) => m.type === "video"),
                        }))
                    )}

                {tab === 2 && renderGrid(activitiesWithMedia)}
            </Box>
        </Box>
    );
};

export default StudentGlobalView;