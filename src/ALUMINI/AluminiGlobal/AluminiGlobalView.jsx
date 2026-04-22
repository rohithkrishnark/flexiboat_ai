import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Box,
    Typography,
    Avatar,
    Chip,
    Card,
    CardContent,
    Button,
} from "@mui/joy";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import {
    useFectchAluminiEducation,
    useFectchAluminiExperience,
    useFectchAluminiHeading,
    useFetchAluminiProfilePic,
    useFetchAlumniFullEventMedia,
    useFetchAlumniFullMediaSingle,
    useFetchMyConnections,
    useFetchSingleAluminiDetail,
    useFetchSingleAluminiEvent,
    useFetchSingleAluminiPost,
} from "../../ADMIN/CommonCode/useQuery";
import { errorNotify, getAuthUser, successNotify } from "../../constant/Constant";
import ConnectionButton from "./ConnectionButton";
import GlobalLoader from "../../Component/GlobalLoader";
import { axiosLogin } from "../../Axios/axios";
import { BACKEND_IMAGE } from "../../constant/Static";
import FloatingBackButton from "../../Component/FloatingBackButton";

const AluminiGlobalView = () => {
    const { id: alum_id } = useParams();

    const [tab, setTab] = useState("posts");
    const [loading, setLoading] = useState(false);


    const currentUser = getAuthUser();

    const viewer_id = currentUser?.alum_id || currentUser?.student_id;
    const viewer_type = currentUser?.role; // alumni / student




    // ================= DATA =================
    const { data: profileArr = [], refetch: FetchAluminiDetail } = useFetchSingleAluminiDetail(alum_id);
    const { data: headingArr = [] } = useFectchAluminiHeading(alum_id);
    const { data: ProfilePic = [] } = useFetchAluminiProfilePic(alum_id ?? null);

    const { data: posts = [] } = useFetchSingleAluminiPost(alum_id);
    const { data: postMedia = [] } = useFetchAlumniFullMediaSingle(alum_id);

    const { data: events = [] } = useFetchSingleAluminiEvent(alum_id);
    const { data: eventMedia = [] } = useFetchAlumniFullEventMedia(alum_id);

    const { data: experience = [] } = useFectchAluminiExperience(alum_id);
    const { data: education = [] } = useFectchAluminiEducation(alum_id);


    const { data: myConnections = [], refetch: FetchAllMyConnections } = useFetchMyConnections({
        user_id: viewer_id,
        user_type: viewer_type,
    });

    // ================= PROFILE =================
    const user = profileArr?.[0] || {};
    const heading = headingArr?.[0] || {};


  


    const handleConnect = async (id) => {
        try {
            setLoading(true)
            const response = await axiosLogin.post("/student/connect-alumini", {
                sender_id: viewer_id,
                sender_type: "alumni",
                receiver_id: alum_id,
                receiver_type: "alumni",
            });
            const { success, message } = response.data ?? {}
            if (success === 1) {
                // update UI
                successNotify(message)
                FetchAllMyConnections()
                FetchAluminiDetail()
            }

        } catch (err) {
            errorNotify("Errror in Conneting Try After Some Times")
        } finally {
            setLoading(false)
        }
    };

    const isConnected = useMemo(() => {
        return myConnections?.some((c) =>
            Number(c.receiver_id) === Number(alum_id)
        );
    }, [myConnections, alum_id]);

    // ================= POSTS =================
    const postsWithMedia = useMemo(() => {
        return posts.map((post) => {
            const media = postMedia.find(
                (m) => String(m.postId) === String(post.id)
            );

            return {
                ...post,
                media: media?.media || [],
            };
        });
    }, [posts, postMedia]);

    // ================= EVENTS =================
    const eventsWithMedia = useMemo(() => {
        const map = {};

        eventMedia.forEach((e) => {
            map[e.eventId] = e.media?.[0]?.url;
        });

        return events.map((ev) => ({
            ...ev,
            image: map[ev.id] || ev.banner_image,
        }));
    }, [events, eventMedia]);

    return (
        <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh" }}>
            {loading && <GlobalLoader text="Processing..." />}
            {/* HEADER */}
            <Box sx={{ height: 120, background: "linear-gradient(135deg, #6366f1, #ec4899)" }} />

            <Box sx={{ px: 2, mt: -6 }}>

                {/* PROFILE HEADER */}
                <Box sx={{ alignItems: "center", gap: 2, mb: 1 }}>
                    <Avatar
                        src={
                            ProfilePic?.path
                                ? `${BACKEND_IMAGE}${ProfilePic.path}`
                                : ""
                        }
                        sx={{ width: 80, height: 80 }}
                    />

                    <Box>
                        <Typography fontWeight={700} fontSize={18}>
                            {user.alum_name}
                        </Typography>

                        <Typography fontSize={13} color="gray">
                            {heading.headline || user.alum_company_designation}
                        </Typography>

                        <Typography fontSize={12}>
                            {heading.location}
                        </Typography>
                    </Box>
                </Box>
                {/* <ConnectionButton
                    isOwner={Number(viewer_id) === Number(alum_id)}
                    isConnected={isConnected}
                    onFollow={() => handleConnect()}
                    onMessage={() => {
                        console.log("Message clicked");
                        // navigate to chat
                    }}
                /> */}

                {/* STATS */}
                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Box sx={statBox}>
                        <Typography fontWeight={700}>{posts.length}</Typography>
                        <Typography fontSize={11}>Posts</Typography>
                    </Box>

                    <Box sx={statBox}>
                        <Typography fontWeight={700}>{events.length}</Typography>
                        <Typography fontSize={11}>Events</Typography>
                    </Box>

                    <Box sx={statBox}>
                        <Typography fontWeight={700}>
                            {user.followers_count || 0}
                        </Typography>
                        <Typography fontSize={11}>Followers</Typography>
                    </Box>
                </Box>

                {/* TABS */}
                <Tabs
                    value={tab}
                    onChange={(e, newValue) => setTab(newValue)}
                    sx={{ mt: 2 }}
                >
                    <Tab label="Posts" value="posts" />
                    <Tab label="Events" value="events" />
                    <Tab label="About" value="about" />
                </Tabs>

                {/* ================= POSTS ================= */}
                {tab === "posts" && (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 1,
                            mt: 2,
                        }}
                    >
                        {postsWithMedia.map((post) => (
                            <Card key={post.id}>
                                {post.media?.[0] && (
                                    <img
                                        src={`${BACKEND_IMAGE}${post.media[0].url}`}
                                        style={{
                                            width: "100%",
                                            height: 180,
                                            objectFit: "cover",
                                        }}
                                    />
                                )}

                                <CardContent>
                                    <Typography fontWeight={600}>
                                        {post.title}
                                    </Typography>

                                    <Typography fontSize={12}>
                                        {post.description?.slice(0, 60)}
                                    </Typography>

                                    <Chip size="sm">{post.post_type}</Chip>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}

                {/* ================= EVENTS ================= */}
                {tab === "events" && (
                    <Box sx={{ mt: 2 }}>
                        {eventsWithMedia.map((ev) => (
                            <Card key={ev.id} sx={{ mb: 1 }}>
                                {ev.image && (
                                    <img
                                        src={`${BACKEND_IMAGE}${ev.image}`}
                                        style={{
                                            width: "100%",
                                            height: 150,
                                            objectFit: "cover",
                                        }}
                                    />
                                )}

                                <CardContent>
                                    <Typography fontWeight={600}>
                                        {ev.title}
                                    </Typography>

                                    <Typography fontSize={12}>
                                        {ev.description}
                                    </Typography>

                                    <Chip size="sm">{ev.event_type}</Chip>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}

                {/* ================= ABOUT (🔥 IMPROVED) ================= */}
                {tab === "about" && (
                    <Box sx={{ mt: 2 }}>

                        {/* BIO */}
                        <Card sx={{ mb: 1 }}>
                            <CardContent>
                                <Typography fontWeight={700}>
                                    About
                                </Typography>

                                <Typography fontSize={13} sx={{ mt: 1, lineHeight: 1.6 }}>
                                    {heading.bio ||
                                        "No bio available. This user has not added a bio yet."}
                                </Typography>
                            </CardContent>
                        </Card>

                        {/* EXPERIENCE (IMPROVED) */}
                        <Card sx={{ mb: 1 }}>
                            <CardContent>
                                <Typography fontWeight={700}>
                                    Experience
                                </Typography>

                                {experience.length === 0 ? (
                                    <Typography fontSize={12} sx={{ mt: 1 }}>
                                        No experience added
                                    </Typography>
                                ) : (
                                    experience.map((e, i) => (
                                        <Box
                                            key={i}
                                            sx={{
                                                mt: 1,
                                                p: 1,
                                                borderRadius: 1,
                                                bgcolor: "#f9fafb",
                                            }}
                                        >
                                            <Typography fontWeight={600} fontSize={13}>
                                                {e.designation}
                                            </Typography>

                                            <Typography fontSize={12} color="gray">
                                                {e.company} • {e.location || "Location not specified"}
                                            </Typography>

                                            <Typography fontSize={12} sx={{ mt: 0.5 }}>
                                                {e.description || "No description provided for this role."}
                                            </Typography>
                                        </Box>
                                    ))
                                )}
                            </CardContent>
                        </Card>

                        {/* EDUCATION (IMPROVED) */}
                        <Card>
                            <CardContent>
                                <Typography fontWeight={700}>
                                    Education
                                </Typography>

                                {education.length === 0 ? (
                                    <Typography fontSize={12} sx={{ mt: 1 }}>
                                        No education added
                                    </Typography>
                                ) : (
                                    education.map((e, i) => (
                                        <Box
                                            key={i}
                                            sx={{
                                                mt: 1,
                                                p: 1,
                                                borderRadius: 1,
                                                bgcolor: "#f9fafb",
                                            }}
                                        >
                                            <Typography fontWeight={600} fontSize={13}>
                                                {e.degree}
                                            </Typography>

                                            <Typography fontSize={12} color="gray">
                                                {e.institution} • {e.year || "Year not specified"}
                                            </Typography>

                                            <Typography fontSize={12} sx={{ mt: 0.5 }}>
                                                {e.description || "No additional details provided."}
                                            </Typography>
                                        </Box>
                                    ))
                                )}
                            </CardContent>
                        </Card>

                    </Box>
                )}

            </Box>
             <FloatingBackButton/>
        </Box>
    );
};

export default AluminiGlobalView;

// ================= STYLES =================
const statBox = {
    flex: 1,
    bgcolor: "white",
    p: 1,
    textAlign: "center",
    borderRadius: 2,
    boxShadow: "sm",
};