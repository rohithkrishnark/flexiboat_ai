import React, { useRef, useState } from 'react'
import {
    Box,
    Typography,
    Input,
    Button,
    Select,
    Option,
    FormControl,
    FormLabel,
    Grid,
    Card
} from '@mui/joy'
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { axiosLogin } from '../../Axios/axios';
import {
    useFetchAllProgramDetail,
    useFetchAllProgramDetailById,
    // useFetchDocumentDetails,
    // useFetchDocumentFiles
} from '../../ADMIN/CommonCode/useQuery'
import { getAuthUser, successNotify, warningNotify } from '../../constant/Constant'
// import { combineDocuments } from '../../ADMIN/CommonCode/Reusable';

const FaculityAssignement = () => {

    const fileRef = useRef();

    const user = getAuthUser();
    const departmentId = user ? user.fac_dep_id : null;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file: null,
        std_program_id: '',
        std_program_year: '',
    })

    const { data: programDetail = [] } = useFetchAllProgramDetail();
    const { data: programYearDetail = [] } =
        useFetchAllProgramDetailById(formData?.std_program_id);


    // const { data: documentFiles = [] } =
    //     useFetchDocumentFiles(user?.fac_id);

    // const { data: documentDetails = [] } =
    //     useFetchDocumentDetails(user?.fac_id);


    // const combinedData = combineDocuments(documentDetails, documentFiles);

    
    // input change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if (!file) return;

        if (file.type !== "application/pdf") {
            return warningNotify("Only PDF files allowed")
        }

        setFormData(prev => ({
            ...prev,
            file
        }))
    }

    // submit
    const handleSubmit = async () => {

        if (!formData.title) return warningNotify("Enter title")
        if (!formData.description) return warningNotify("Enter description")
        if (!formData.file) return warningNotify("Upload PDF")
        if (!formData.std_program_id) return warningNotify("Select program")
        if (!formData.std_program_year) return warningNotify("Select year")

        try {
            //  STEP 1: Insert metadata
            const metaRes = await axiosLogin.post("/student/insert-fac-documents", {
                title: formData.title,
                description: formData.description,
                program_id: formData.std_program_id,
                program_year: formData.std_program_year,
                department_id: departmentId,
                uploaded_by: user.fac_id
            });

            if (metaRes.data.success !== 1) {
                return warningNotify("Failed to save details");
            }

            const document_id = metaRes.data.document_id;

            //  STEP 2: Upload file
            const fileData = new FormData();
            fileData.append("files", formData.file);
            fileData.append("document_id", document_id);
            fileData.append("department_id", departmentId);
            fileData.append("uploaded_by", user.fac_id);

            const fileRes = await axiosLogin.post("/student/upload-document", fileData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (fileRes.data.success === 1) {
                successNotify("PDF Uploaded Successfully")

                setFormData({
                    title: '',
                    description: '',
                    file: null,
                    std_program_id: '',
                    std_program_year: '',
                })
            } else {
                warningNotify("File upload failed")
            }

        } catch (err) {
            console.error(err)
            warningNotify("Error occurred")
        }
    }

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                mt: 3
            }}
        >
            <Box sx={{ width: '65%' }}>

                <Card sx={{ p: 3, borderRadius: 3, boxShadow: 'lg' }}>

                    <Typography level="h3" sx={{ mb: 2 }}>
                        📄 Upload Study Material
                    </Typography>

                    <Grid container spacing={2}>

                        {/* TITLE */}
                        <Grid xs={12}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        {/* DESCRIPTION */}
                        <Grid xs={12}>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        {/* PROGRAM */}
                        <Grid xs={12} md={6}>
                            <FormControl>
                                <FormLabel>Program</FormLabel>
                                <Select
                                    value={formData.std_program_id}
                                    onChange={(_, value) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            std_program_id: value,
                                            std_program_year: ''
                                        }))
                                    }
                                >
                                    {programDetail
                                        ?.filter(p => Number(p.program_status) === 1)
                                        ?.map((prog) => (
                                            <Option key={prog.program_id} value={prog.program_id}>
                                                {prog.program_name}
                                            </Option>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* YEAR */}
                        <Grid xs={12} md={6}>
                            <FormControl>
                                <FormLabel>Program Year</FormLabel>
                                <Select
                                    value={formData.std_program_year}
                                    disabled={!formData.std_program_id}
                                    onChange={(_, value) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            std_program_year: value
                                        }))
                                    }
                                >
                                    {programYearDetail?.map((year) => (
                                        <Option
                                            key={year.prgm_mast_dtl_slno}
                                            value={year.prgm_mast_dtl_slno}
                                        >
                                            {year.program_year_name}
                                        </Option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* FILE UPLOAD */}
                        <Grid xs={12}>
                            <Box
                                onClick={() => fileRef.current.click()}
                                sx={{
                                    border: '2px dashed #ccc',
                                    borderRadius: 2,
                                    p: 3,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    '&:hover': {
                                        borderColor: '#1976d2',
                                        background: '#f5faff'
                                    }
                                }}
                            >
                                <UploadFileIcon sx={{ fontSize: 40 }} />

                                <Typography mt={1}>
                                    Click to upload PDF
                                </Typography>

                                <Typography fontSize={12} color="gray">
                                    Only .pdf files allowed
                                </Typography>

                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="application/pdf"
                                    hidden
                                    onChange={handleFileChange}
                                />

                                {formData.file && (
                                    <Typography mt={1} color="success">
                                        ✅ {formData.file.name}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>

                        {/* SUBMIT */}
                        <Grid xs={12}>
                            <Button fullWidth size="lg" onClick={handleSubmit}>
                                Upload PDF
                            </Button>
                        </Grid>

                    </Grid>
                </Card>
            </Box>
        </Box>
    )
}

export default FaculityAssignement