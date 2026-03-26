import React from "react";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Chip,
} from "@mui/material";
import { getAuthUser } from "../../constant/Constant";
import { useFetchSingleStudentActivity, useFetchStudentActivityMedia } from "../../ADMIN/CommonCode/useQuery";

// Dummy Data
const activities = [
    {
        id: 1,
        caption: "Onam Celebration 🎉",
        description: "Group dance performance",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        points: 20,
    },
    {
        id: 2,
        caption: "Football Match ⚽",
        description: "Inter-department winner",
        image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
        points: 15,
    },
    {
        id: 3,
        caption: "Tech Fest 💻",
        description: "React project",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        points: 25,
    },
    {
        id: 4,
        caption: "Music Fest 🎸",
        description: "Band performance",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
        points: 10,
    },
];

const ViewActivities = () => {


    const user = getAuthUser();
    const std_id = user?.user_id;

    const { data: studetnActivityDetail = [] } = useFetchSingleStudentActivity(std_id ?? null);
    const { data: studetnActivityDetailMedia = [] } = useFetchStudentActivityMedia(std_id ?? null);

    // Combine posts with their media
    const postsWithMedia = studetnActivityDetail?.map((post) => {
        const mediaForPost = studetnActivityDetailMedia?.find((p) => p.id === post.id)?.media || [];
        return { ...post, media: mediaForPost };
    }) || [];


    console.log({
        postsWithMedia
    });


    return (
        <Box
            sx={{
                height: "80vh",
                overflowY: "auto",
                bgcolor: "#f5f7fb",
                display: "flex",
                justifyContent: "center",
                p: 2,
            }}
        >
            {/* FIXED WIDTH CONTAINER */}
            <Box sx={{ width: "100%", maxWidth: "1000px" }}>

                {/*  CSS GRID (ALWAYS 3 COLUMN) */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 2,
                    }}
                >
                    {postsWithMedia.map((item) => {
                        const firstImage = item.media?.[0]?.path
                            ? `http://localhost:7000${item.media[0].path}`
                            : "https://via.placeholder.com/300x140";

                        return (
                            <Card
                                key={item.id}
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                    },
                                    height: 300,
                                    p: 1
                                }}
                            >
                                {/* IMAGE */}
                                <CardMedia
                                    component="img"
                                    image={firstImage}
                                    alt="activity"
                                    sx={{
                                        height: "65%"
                                    }}
                                />

                                {/* CONTENT */}
                                <CardContent sx={{ overflow: 'hidden' }}>
                                    <Typography fontWeight={600} fontSize={13}>
                                        {item.caption}
                                    </Typography>

                                    <Typography sx={{
                                        height: 35,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }} fontSize={11} color="text.secondary">
                                        {item.description}
                                    </Typography>

                                    {/* ACTIVITY SCORE */}
                                    <Chip
                                        label={`🏆 ${item.activity_score ?? 0}`}
                                        size="small"
                                        sx={{
                                            mt: 1,
                                            fontWeight: 600,
                                            bgcolor: "#e0f2fe",
                                            color: "#0369a1",
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default ViewActivities;