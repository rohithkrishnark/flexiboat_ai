import React from 'react'
import {
    Box,
    Typography,
    Table,
    Tooltip
} from '@mui/joy'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate } from 'react-router-dom'
import { useFetchAllStudentDetail } from '../../ADMIN/CommonCode/useQuery'


const StudentActionDetail = () => {

    const { data: AllStudentData, isLoading, isError, error } = useFetchAllStudentDetail()

    const navigate = useNavigate()

    const handleEdit = (row) => {
        navigate(`/faculity/addstudents/${row.std_id}`)
    }
    const handleView = (row) => {
        navigate(`/faculity/addstudents/${row.std_id}`)
    }

    if (isError) {
        return <Typography color="danger">{error.message}</Typography>
    }

    if (isLoading) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography>Loading...</Typography>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                flex: 1,
                minWidth: 0,
                bgcolor: '#ffffff',
                borderRadius: 2,
                boxShadow: 'sm',
                p: 3,
                boxSizing: 'border-box'
            }}
        >
            <Typography level="h4" sx={{ mb: 2, fontWeight: 700 }}>
                Student List
            </Typography>

            {AllStudentData?.length === 0 ? (
                <Typography>No Students Found</Typography>
            ) : (
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                    <Table
                        hoverRow
                        sx={{
                            width: '100%',
                            tableLayout: 'auto'
                        }}
                    >
                        <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Department</th>
                                <th>Year</th>
                                <th>Status</th>
                                <th>View</th>
                                <th>Edit</th>
                            </tr>
                        </thead>

                        <tbody>
                            {AllStudentData?.map((row, index) => (
                                <tr key={row.std_id}>
                                    <td>{index + 1}</td>
                                    <td>{row.std_name}</td>
                                    <td>{row.std_email}</td>
                                    <td>{row.std_age}</td>
                                    <td>{row.std_department}</td>
                                    <td>{row.std_year}</td>
                                    <td>{row.std_status === 1 ? "Active" : "Inactive"}</td>

                                    <td>
                                        <Tooltip title="View Student">
                                            <VisibilityIcon
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => handleView(row)}
                                            />
                                        </Tooltip>
                                    </td>

                                    <td>
                                        <Tooltip title="Edit Student">
                                            <EditIcon
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => handleEdit(row)}
                                            />
                                        </Tooltip>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Box>
            )}
        </Box>
    )
}

export default StudentActionDetail