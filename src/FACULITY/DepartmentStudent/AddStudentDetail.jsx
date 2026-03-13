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
    Checkbox,
    Textarea
} from '@mui/joy'
import SchoolIcon from '@mui/icons-material/School'
import axiosLogin from '../../Axios/axios'
import { getAuthUser, successNotify, warningNotify } from '../../constant/Constant'
import { useFetchAllDeprtmentDetail, useFetchAllProgramDetail, useFetchAllProgramDetailById } from '../../ADMIN/CommonCode/useQuery'

const AddStudentDetail = () => {

    const [loading, setLoading] = useState(false)
    const user = getAuthUser();

    const [formData, setFormData] = useState({
        std_name: '',
        std_age: '',
        std_email: '',
        std_mobile_no: '',
        std_address: '',
        std_dep_id: '',
        std_program_id: '',
        std_program_year: '',
        std_status: true
    })


    const { std_program_id } = formData || {}
    //  Fetch Programs
    const { data: programDetail = [] } = useFetchAllProgramDetail();
    // Fetch Program Years
    const { data: programYearDetail = [] } = useFetchAllProgramDetailById(std_program_id);

    // Department 
    const { data: departmentDetail = [] } = useFetchAllDeprtmentDetail()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }


    useEffect(() => {
        if (user?.deparment) {
            setFormData((prev) => ({
                ...prev,
                std_dep_id: user.deparment
            }))
        }
    }, [user]);

    const validate = () => {

        if (Object.values(formData).length === 0) return;

        if (!formData?.std_name || formData?.std_name.length < 3) {
            warningNotify("Student name must be atleast 3 characters")
            return false
        }

        if (!formData.std_age || formData.std_age < 15 || formData.std_age > 100) {
            warningNotify("Enter valid age")
            return false
        }

        if (!formData.std_email) {
            warningNotify("Email is required")
            return false
        }

        if (!formData.std_mobile_no) {
            warningNotify("Mobile number required")
            return false
        }

        if (!formData.std_program_id) {
            warningNotify("Select program")
            return false
        }

        if (!formData.std_program_year) {
            warningNotify("Select program year")
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return
        setLoading(true)
        try {

            const payload = {
                ...formData,
                std_status: formData.std_status ? 1 : 0
            }

            const result = await axiosLogin.post(
                "/student/insert",
                payload
            )
            if (result.data.success === 1) {
                successNotify("Student added successfully")
                setFormData({
                    std_name: '',
                    std_age: '',
                    std_email: '',
                    std_mobile_no: '',
                    std_address: '',
                    std_dep_id: '',
                    std_program_id: '',
                    std_program_year: '',
                    std_status: true
                })
            } else {
                warningNotify("Failed to add student")
            }
        } catch (err) {
            console.error(err)
            warningNotify("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (

        <Box
            sx={{
                flex: 1,
                minWidth: 0,
                bgcolor: '#ffffff',
                borderRadius: 2,
                boxShadow: 'sm',
                px: 3,
                position: 'relative'
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
                    gap: 1,
                    position: 'sticky',
                    top: 0,
                    background: "#ffffff",
                    zIndex: 999,
                    p: 1
                }}
            >
                <SchoolIcon /> Add Student Detail
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>

                <Grid container spacing={2}>

                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Student Name</FormLabel>
                            <Input
                                name="std_name"
                                value={formData.std_name}
                                onChange={handleChange}
                                placeholder="Enter student name"
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Age</FormLabel>
                            <Input
                                type="number"
                                name="std_age"
                                value={formData.std_age}
                                onChange={handleChange}
                                placeholder="Enter age"
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                name="std_email"
                                value={formData.std_email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Mobile</FormLabel>
                            <Input
                                name="std_mobile_no"
                                value={formData.std_mobile_no}
                                onChange={handleChange}
                                placeholder="Mobile number"
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12}>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Textarea
                                sx={{ minHeight: 60 }}
                                name="std_address"
                                value={formData.std_address}
                                onChange={handleChange}
                                placeholder="Student address"
                            />
                        </FormControl>
                    </Grid>

                    {/* darpartment */}
                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Department</FormLabel>
                            <Select
                                disabled={true}
                                placeholder="Select program"
                                value={formData.std_dep_id}
                                onChange={(_, value) =>
                                    setFormData({
                                        ...formData,
                                        std_program_id: value
                                    })
                                }
                            >
                                {departmentDetail
                                    ?.filter(item => item.dep_status = 1)
                                    ?.map((dep) => (
                                        <Option
                                            key={dep.dep_id}
                                            value={dep.dep_id}
                                        >
                                            {dep.dep_name}
                                        </Option>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Program */}
                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Program</FormLabel>
                            <Select
                                placeholder="Select program"
                                value={formData.std_program_id}
                                onChange={(_, value) =>
                                    setFormData({
                                        ...formData,
                                        std_program_id: value
                                    })
                                }
                            >
                                {programDetail
                                    ?.filter(item => item.program_status = 1)
                                    ?.map((prog) => (
                                        <Option
                                            key={prog.program_id}
                                            value={prog.program_id}
                                        >
                                            {prog.program_name}
                                        </Option>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Program Year Select */}
                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Program Year</FormLabel>
                            <Select
                                placeholder="Select Program Year"
                                value={formData.std_program_year}
                                onChange={(_, value) =>
                                    setFormData({
                                        ...formData,
                                        std_program_year: value
                                    })
                                }
                            >
                                {programYearDetail?.map((year) => (
                                    <Option
                                        key={year?.prgm_mast_dtl_slno}
                                        value={year?.prgm_mast_dtl_slno}
                                    >
                                        {year?.program_year_name}
                                    </Option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Status */}
                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Status</FormLabel>
                            <Checkbox
                                label={formData.std_status ? "Active" : "Inactive"}
                                checked={formData.std_status}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        std_status: e.target.checked
                                    })
                                }
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12}>
                        <Button
                            loading={loading}
                            type="submit"
                            size="lg"
                            sx={{ mt: 2 }}
                        >
                            Save Student
                        </Button>
                    </Grid>

                </Grid>

            </Box>

        </Box>
    )
}

export default AddStudentDetail