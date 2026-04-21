import React, { memo, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Chip,
    Modal,
    IconButton,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";

import { useFetchDocumentDetails, useFetchDocumentFiles } from "../../ADMIN/CommonCode/useQuery";
import { combineDocuments } from "../../ADMIN/CommonCode/Reusable";
import { getAuthUser } from "../../constant/Constant";
import { BACKEND_IMAGE } from "../../constant/Static";


const ViewFaculityAssignments = () => {
    const user = getAuthUser();

    const { data: documentFiles = [] } =
        useFetchDocumentFiles(user?.fac_id);

    const { data: documentDetails = [] } =
        useFetchDocumentDetails(user?.fac_id);

    const combinedData = combineDocuments(documentDetails, documentFiles);

    const [open, setOpen] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState("");

    const handleOpen = (path) => {
        setSelectedPdf(path);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPdf("");
    };

    return (
        <Box
            sx={{
                flex: 1,
                minWidth: 0,
                bgcolor: "#f4f6f8",
                borderRadius: 2,
                p: 3,
            }}
        >
            {/* Title */}
            <Typography variant="h5" fontWeight="bold" mb={3}>
                Faculty Documents
            </Typography>

            {/* Cards */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: 2,
                }}
            >
                {combinedData.map((doc) => (
                    <Card
                        key={doc.document_id}
                        sx={{
                            borderRadius: 3,
                            boxShadow: 3,
                            transition: "0.3s",
                            "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: 6,
                            },
                        }}
                    >
                        <CardContent>
                            {/* Title */}
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                {doc.title}
                            </Typography>

                            {/* Description */}
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                {doc.description}
                            </Typography>

                            {/* Chips */}
                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                                <Chip label={doc.department_name} color="primary" />
                                <Chip label={doc.program_name} color="secondary" />
                                <Chip label={doc.program_year_name} />
                            </Box>

                            {/* File Button */}
                            {doc.files?.map((file, index) => (
                                <Button
                                    key={index}
                                    variant="contained"
                                    startIcon={<PictureAsPdfIcon />}
                                    fullWidth
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: "none",
                                    }}
                                    onClick={() =>
                                        handleOpen(`${BACKEND_IMAGE}${file.path}`)
                                    }
                                >
                                    View PDF
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        height: "85%",
                        bgcolor: "#000",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Close Button */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* PDF Viewer */}
                    <Box sx={{ flex: 1 }}>
                        {selectedPdf && (
                            <iframe
                                src={selectedPdf}
                                title="PDF Viewer"
                                width="100%"
                                height="100%"
                                style={{ border: "none", borderRadius: "8px" }}
                            />
                        )}
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default memo(ViewFaculityAssignments);