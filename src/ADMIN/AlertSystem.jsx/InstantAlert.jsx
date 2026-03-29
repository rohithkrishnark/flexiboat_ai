import React, { useState } from "react";
import {
    Box,
    Typography,
    Input,
    Textarea,
    Button,
    Card,
    CardContent,
    Chip,
    IconButton,
} from "@mui/joy";

import Delete from "@mui/icons-material/Delete";
import CampaignIcon from "@mui/icons-material/Campaign";

import {
    errorNotify,
    successNotify,
    warningNotify,
} from "../../constant/Constant";

import { axiosLogin } from "../../Axios/axios";
import { useFetchAllAlerts } from "../CommonCode/useQuery";

const InstantAlert = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const {
        data: fetchAllInstantAlerts,
        refetch: RefetchAgain,
    } = useFetchAllAlerts();

    const alerts = fetchAllInstantAlerts || [];

    // SEND ALERT
    const handleSend = async () => {
        if (!title || !message)
            return warningNotify("Title and Message required");

        const payload = { title, message };

        try {
            const response = await axiosLogin.post(
                "/training/alert/insert",
                payload
            );

            const { message, success } = response.data ?? {};

            if (success === 0)
                return errorNotify("Error in Inserting Data...!");

            successNotify(message);

            setTitle("");
            setMessage("");

            RefetchAgain();
        } catch (error) {
            console.error(error);
            errorNotify("Error in inserting Data");
        }
    };



    const HandleDeleteAlert = async (id) => {
        if (!id)
            return warningNotify("Alert Id is required");
        try {
            const response = await axiosLogin.post("/training/alert/delete", { id: id });
            const { message, success } = response.data ?? {};
            if (success === 0) return errorNotify("Error in Inserting Data...!");

            successNotify(message);
            RefetchAgain();
        } catch (error) {
            console.error(error);
            errorNotify("Error in Deleting Data");
        }
    };

    return (
        <Box
            sx={{
                flex: 1,
                minWidth: 0,
                bgcolor: "#f4f6fb",
                borderRadius: 3,
                p: 2,
                height: "100%",
                overflowY: "auto",
            }}
        >
            {/* HEADER */}
            <Typography
                level="h3"
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
            >
                <CampaignIcon sx={{ fontSize: 32, color: "#7c3aed" }} />
                Instant Alerts
            </Typography>

            <Box sx={{ display: "flex", gap: 3, height: "100%" }}>
                {/* LEFT - SEND ALERT */}
                <Card sx={{ flex: 1, borderRadius: 3 }}>
                    <CardContent>
                        <Typography level="h5" mb={2}>
                            Send Announcement
                        </Typography>

                        <Typography level="body-sm">Title</Typography>
                        <Input
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <Typography level="body-sm">Message</Typography>
                        <Textarea
                            placeholder="Write announcement..."
                            minRows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <Button fullWidth onClick={handleSend}>
                            Send Announcement
                        </Button>
                    </CardContent>
                </Card>

                {/* RIGHT - ALERT LIST */}
                <Card
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                    }}
                >
                    {/* HEADER */}
                    <Box sx={{ p: 2 }}>
                        <Typography level="h5">Previous Announcements</Typography>
                    </Box>

                    {/* LIST */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            px: 2,
                            pb: 2,
                            "&::-webkit-scrollbar": { display: "none" },
                            scrollbarWidth: "none",
                        }}
                    >
                        {alerts.length === 0 && (
                            <Typography level="body-sm">
                                No announcements yet.
                            </Typography>
                        )}

                        {alerts?.map((item) => (
                            <Box
                                key={item?.id}
                                sx={{
                                    p: 2,
                                    mb: 2,
                                    borderRadius: 2,
                                    background:
                                        "linear-gradient(135deg, #ffffff, #f7f7ff)",
                                    border: "1px solid #eee",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                                    transition: "0.2s",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                                    },
                                }}
                            >
                                {/* TITLE + DELETE */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography fontWeight="bold">
                                        {item?.title}
                                    </Typography>

                                    <IconButton
                                        onClick={() => HandleDeleteAlert(item?.id)}
                                        size="sm" color="danger">
                                        <Delete />
                                    </IconButton>
                                </Box>

                                {/* MESSAGE */}
                                <Typography sx={{ mt: 1, fontSize: 14, color: "#444" }}>
                                    {item?.message}
                                </Typography>

                                {/* FOOTER */}
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Chip size="sm" color="primary">
                                        ALERT
                                    </Chip>

                                    <Typography sx={{ fontSize: 12, color: "#888" }}>
                                        {new Date(item?.created_at).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Card>
            </Box>
        </Box>
    );
};

export default InstantAlert;