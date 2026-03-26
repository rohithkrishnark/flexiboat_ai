import React, { useState } from 'react'
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
    Card
} from '@mui/joy'
import { axiosLogin } from '../../Axios/axios';
import {
    useFetchAllProgramDetail,
    useFetchAllProgramDetailById,
    useFetchAllStudentofSeperateDep
} from '../../ADMIN/CommonCode/useQuery'
import { getAuthUser, successNotify, warningNotify } from '../../constant/Constant'

const FaculityAssignement = () => {

    const user = getAuthUser();
    const departmentId = user ? user.deparment : null;



    const [formData, setFormData] = useState({
        activity_name: '',
        activity_point: '',
        std_program_id: '',
        std_program_year: '',
        isAll: true,
        selected_students: []
    })
    const { data: programDetail = [] } = useFetchAllProgramDetail();
    const { data: programYearDetail = [] } = useFetchAllProgramDetailById(formData?.std_program_id);
    const { data: AllStudentData = [] } =
        useFetchAllStudentofSeperateDep(departmentId, formData?.std_program_id, formData?.std_program_year)
    const [assignedList, setAssignedList] = useState([])

    // handle change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // handle student select
    const handleStudentSelect = (_, value) => {
        setFormData(prev => ({
            ...prev,
            selected_students: value
        }))
    }

    // submit
    const handleSubmit = async () => {

        if (!formData.activity_name) {
            return warningNotify("Enter activity name")
        }

        if (!formData.activity_point) {
            return warningNotify("Enter points")
        }

        if (!formData.std_program_id) {
            return warningNotify("Select program")
        }

        if (!formData.std_program_year) {
            return warningNotify("Select program year")
        }

        if (!formData.isAll && formData.selected_students.length === 0) {
            return warningNotify("Select students")
        }

        try {
            const payload = {
                activity_name: formData.activity_name,
                activity_point: formData.activity_point,
                program_id: formData.std_program_id,
                program_year: formData.std_program_year,
                students: formData.isAll
                    ? AllStudentData
                        .filter(std =>
                            std.std_program_id === formData.std_program_id &&
                            std.std_program_year === formData.std_program_year
                        )
                        .map(s => s.std_id)
                    : formData.selected_students
            }

            const res = await axiosLogin.post("/activity/assign", payload)

            if (res.data.success === 1) {
                successNotify("Activity Assigned")

                setAssignedList(prev => [
                    ...prev,
                    {
                        ...formData,
                        date: new Date().toLocaleString()
                    }
                ])

                setFormData({
                    activity_name: '',
                    activity_point: '',
                    std_program_id: '',
                    std_program_year: '',
                    isAll: true,
                    selected_students: []
                })

            } else {
                warningNotify("Failed")
            }

        } catch (err) {
            console.error(err)
            warningNotify("Error occurred")
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
                height: '100%'
            }}
        >

            <Typography level="h3" sx={{ mb: 3 }}>
                Add Documents
            </Typography>

            <Grid container spacing={2}>

                {/* Activity Name */}
                <Grid xs={12} md={6}>
                    <FormControl>
                        <FormLabel>Activity Name</FormLabel>
                        <Input
                            name="activity_name"
                            value={formData.activity_name}
                            onChange={handleChange}
                            placeholder="Eg: Onam Dance"
                        />
                    </FormControl>
                </Grid>

                {/* Points */}
                <Grid xs={12} md={6}>
                    <FormControl>
                        <FormLabel>Points</FormLabel>
                        <Input
                            type="number"
                            name="activity_point"
                            value={formData.activity_point}
                            onChange={handleChange}
                            placeholder="Eg: 20"
                        />
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
                                setFormData(prev => ({
                                    ...prev,
                                    std_program_id: value,
                                    std_program_year: '',
                                    selected_students: []
                                }))
                            }
                        >
                            {programDetail
                                ?.filter(item => Number(item.program_status) === 1)
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

                {/* Program Year */}
                <Grid xs={12} md={6}>
                    <FormControl>
                        <FormLabel>Program Year</FormLabel>
                        <Select
                            placeholder="Select Program Year"
                            value={formData.std_program_year}
                            onChange={(_, value) =>
                                setFormData(prev => ({
                                    ...prev,
                                    std_program_year: value,
                                    selected_students: []
                                }))
                            }
                            disabled={!formData.std_program_id}
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

                {/* Assign to all */}
                <Grid xs={12}>
                    <Checkbox
                        label="Assign to All Students"
                        checked={formData.isAll}
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                isAll: e.target.checked
                            }))
                        }
                    />
                </Grid>

                {/* Select Students */}
                {!formData.isAll && (
                    <Grid xs={12}>
                        <FormControl>
                            <FormLabel>Select Students</FormLabel>
                            <Select
                                multiple
                                value={formData.selected_students}
                                onChange={handleStudentSelect}
                            >
                                {AllStudentData
                                    .filter(std =>
                                        std.std_program_id === formData.std_program_id &&
                                        std.std_program_year === formData.std_program_year
                                    )
                                    .map((std) => (
                                        <Option
                                            key={std.std_id}
                                            value={std.std_id}
                                        >
                                            {std.std_name}
                                        </Option>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )}

                {/* Submit */}
                <Grid xs={12}>
                    <Button onClick={handleSubmit}>
                        Assign Activity
                    </Button>
                </Grid>

            </Grid>

            {/* ================= LIST ================= */}

            <Typography level="h4" sx={{ mt: 5, mb: 2 }}>
                Assigned Activities
            </Typography>

            {assignedList.map((item, index) => (
                <Card key={index} sx={{ mb: 2, p: 2 }}>
                    <Typography fontWeight="lg">
                        {item.activity_name}
                    </Typography>
                    <Typography>
                        Points: {item.activity_point}
                    </Typography>
                    <Typography>
                        Program ID: {item.std_program_id}
                    </Typography>
                    <Typography>
                        Year: {item.std_program_year}
                    </Typography>
                    <Typography>
                        Type: {item.isAll ? "All Students" : "Individual"}
                    </Typography>
                    <Typography level="body2">
                        {item.date}
                    </Typography>
                </Card>
            ))}

        </Box>
    )
}

export default FaculityAssignement