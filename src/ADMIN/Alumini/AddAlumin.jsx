import React, { useEffect, useState } from 'react'
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
    Checkbox
} from '@mui/joy'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload'
import { successNotify, warningNotify } from '../../constant/Constant'
import axiosLogin from '../../Axios/axios'
import { isValidEmail } from '../CommonCode/Reusable'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchAllAluminDetail, useFetchAllAluminDetailById } from '../CommonCode/useQuery'


const AddAlumin = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        alum_name: '',
        alum_age: '',
        alum_email: '',
        alum_company: '',
        alum_company_location: '',
        alum_company_designation: '',
        alum_experience: '',
        alum_qualification: '',
        alum_status: true
    })


    const navigate = useNavigate()

    const { id } = useParams()
    const isEditMode = Boolean(id)
    const { refetch: FetchAllAluminDetail } = useFetchAllAluminDetail()
    const { data: SingleAluminiDetail = {}, isLoading: LoadingSingleData } = useFetchAllAluminDetailById(id);


    useEffect(() => {
        if (isEditMode && Array.isArray(SingleAluminiDetail) && SingleAluminiDetail.length > 0) {
            const alum = SingleAluminiDetail[0]; // get the first (and only) object
            setFormData({
                alum_name: alum.alum_name || '',
                alum_age: alum.alum_age || '',
                alum_email: alum.alum_email || '',
                alum_company: alum.alum_company || '',
                alum_company_location: alum.alum_company_location || '',
                alum_company_designation: alum.alum_company_designation || '',
                alum_experience: alum.alum_experience || '',
                alum_qualification: alum.alum_qualification || '',
                alum_status: alum.alum_status ?? true
            });
        }
    }, [isEditMode, SingleAluminiDetail]);

    console.log({
        SingleAluminiDetail
    });


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    //validating before inserting detail
    const validate = () => {
        if (!formData.alum_name || formData.alum_name.length < 3) {
            warningNotify('Name must be at least 3 characters')
            return false
        }

        if (!formData.alum_age || formData.alum_age < 18 || formData.alum_age > 100) {
            warningNotify('Age must be between 18 and 100')
            return false
        }

        if (!formData.alum_email) {
            warningNotify('Email is required')
            return false
        }

        if (!isValidEmail(formData.alum_email)) {
            warningNotify('Enter a valid email address')
            return false
        }


        if (!formData.alum_company) {
            warningNotify('Company is required')
            return false
        }

        if (!formData.alum_company_location) {
            warningNotify('Company location is required')
            return false
        }

        if (!formData.alum_company_designation) {
            warningNotify('Designation is required')
            return false
        }

        if (
            formData.alum_experience === '' ||
            formData.alum_experience < 0 ||
            formData.alum_experience > 60
        ) {
            warningNotify('Experience must be between 0 and 60 years')
            return false
        }

        if (!formData.alum_qualification) {
            warningNotify('Qualification is required')
            return false
        }

        return true
    }

    //Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!validate()) {
            setLoading(false);
            return;
        }

        try {
            // Use ternary to select API endpoint
            const endpoint = isEditMode
                ? `/training/alumini/update/${id}`  // Update API
                : '/training/alumini/insert';       // Insert API
            //  Convert boolean → 1 / 0 here
            const payload = {
                ...formData,
                alum_status: formData.alum_status ? 1 : 0
            };
            const response = await axiosLogin.post(endpoint, payload);

            // Success / Failure message
            const action = isEditMode ? 'updated' : 'added';

            if (response.data.success === 1) {
                successNotify(`Alumni ${action} successfully ddd`);

                // Clear form only if adding, not editing
                if (!isEditMode) {
                    setFormData({
                        alum_name: '',
                        alum_age: '',
                        alum_email: '',
                        alum_company: '',
                        alum_company_location: '',
                        alum_company_designation: '',
                        alum_experience: '',
                        alum_qualification: '',
                        alum_status: true
                    });
                }

                if (isEditMode) {
                    FetchAllAluminDetail()
                    navigate('/admin/viewalumini')
                }
            } else {
                warningNotify(`Failed to ${action} alumni`);
            }
        } catch (error) {
            console.error(error);
            warningNotify('Something went wrong');
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box
            sx={{
                flex: 1,
                minWidth: 0, // prevents sidebar break
                bgcolor: '#ffffff',
                borderRadius: 2,
                boxShadow: 'sm',
                p: 3,
                boxSizing: 'border-box'
            }}
        >
            <Typography
                sx={{
                    fontSize: 24,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    borderBottom: '2px solid #13163c',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <AssuredWorkloadIcon /> {isEditMode ? "Edit Alumni Detail" : "Add Alumni Detail"}
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>

                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                name="alum_name"
                                value={formData.alum_name}
                                onChange={handleChange}
                                placeholder="Enter alumni name"
                                required
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Age</FormLabel>
                            <Input
                                type="number"
                                name="alum_age"
                                value={formData.alum_age}
                                onChange={handleChange}
                                placeholder="Age"
                                required
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Company</FormLabel>
                            <Input
                                name="alum_company"
                                value={formData.alum_company}
                                onChange={handleChange}
                                placeholder="Company name"
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Company Location</FormLabel>
                            <Input
                                name="alum_company_location"
                                value={formData.alum_company_location}
                                onChange={handleChange}
                                placeholder="Location"
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Designation</FormLabel>
                            <Input
                                name="alum_company_designation"
                                value={formData.alum_company_designation}
                                onChange={handleChange}
                                placeholder="Designation"
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Experience (Years)</FormLabel>
                            <Input
                                type="number"
                                name="alum_experience"
                                value={formData.alum_experience}
                                onChange={handleChange}
                                placeholder="Experience"
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Email *</FormLabel>
                            <Input
                                type="text"
                                name="alum_email"
                                value={formData.alum_email}
                                onChange={handleChange}
                                placeholder="Email Address"
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Qualification</FormLabel>
                            <Select
                                value={formData.alum_qualification}
                                onChange={(_, value) =>
                                    setFormData({ ...formData, alum_qualification: value })
                                }
                                placeholder="Select qualification"
                            >
                                <Option value="BSc">BSc</Option>
                                <Option value="BCA">BCA</Option>
                                <Option value="MSc">MSc</Option>
                                <Option value="MCA">MCA</Option>
                                <Option value="PhD">PhD</Option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Status</FormLabel>
                            <Checkbox
                                label={formData.alum_status ? "Active" : "Inactive"}
                                checked={Boolean(formData.alum_status)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        alum_status: e.target.checked
                                    })
                                }
                                sx={{
                                    mt: 1
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12}>
                        <Button
                            disabled={loading}
                            type="submit"
                            size="lg"
                            sx={{ mt: 2 }}>
                            {isEditMode ? "Edit Alumni" : 'Save Alumni'}
                        </Button>
                        {
                            isEditMode &&
                            <Button
                                onClick={() => navigate('/admin/viewalumini')}
                                // type="submit"
                                size="lg"
                                sx={{ mx: 2 }}>
                                goBack
                            </Button>
                        }
                    </Grid>

                </Grid>
            </Box>
        </Box>
    )
}

export default AddAlumin