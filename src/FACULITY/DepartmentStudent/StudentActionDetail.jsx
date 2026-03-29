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
import { errorNotify, getAuthUser, infoNotify, successNotify, warningNotify } from '../../constant/Constant'
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { axiosLogin } from '../../Axios/axios';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatIcon from "@mui/icons-material/Chat";



const StudentActionDetail = () => {

    const navigate = useNavigate();
    const user = getAuthUser();

    // console.log({user});
    

    const departmentId = user ? user.fac_dep_id : null;

    const { data: AllStudentData, isLoading, isError, error, refetch: RefetchStudetn } = useFetchAllStudentDetail(departmentId)

    const handleEdit = (row) => {
        navigate(`/faculity/addstudents/${row.std_id}`, {
            state: {
                data: row
            }
        })
    }
    const handleView = (row) => {
        // navigate(`/faculity/addstudents/${row.std_id}`)
        navigate(`/common/studetnglobalview/${row.std_id}`)
    }

    const HandleInactive = async (studentid, currentStatus) => {

        const newStatus = Number(currentStatus) === 1 ? 0 : 1

        try {
            const { data: resData } = await axiosLogin.post(`/student/inactive`, {
                std_id: studentid,
                std_status: newStatus
            })

            const { success, message } = resData

            if (success === 0) return warningNotify("Error in Updating", message)
            if (success === 2) return infoNotify(message)
            if (success === 1) successNotify(message)

            //  Refresh table
            RefetchStudetn()

        } catch (error) {
            console.error("Error in Inactivating Student")
            errorNotify("Error in Updating Status")
        }
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
                                <th>Program</th>
                                <th>Year</th>
                                <th>Status</th>
                                <th>View</th>
                                <th>Edit</th>
                                 {/* <th>Chat</th> */}
                                <th>inactive</th>
                            </tr>
                        </thead>

                        <tbody>
                            {AllStudentData?.map((row, index) => (
                                <tr key={row.std_id}>
                                    <td>{index + 1}</td>
                                    <td>{row.std_name}</td>
                                    <td>{row.std_email}</td>
                                    <td>{row.std_age}</td>
                                    <td>{row.program_name}</td>
                                    <td>{row.program_year_name}</td>
                                    <td>{Number(row.std_status) === 1 ? "Active" : "Inactive"}</td>

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
                                    {/* <td>
                                        <Tooltip title="Chat">
                                            <ChatIcon
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => handleEdit(row)}
                                            />
                                        </Tooltip>
                                    </td> */}

                                    <td>
                                        <Tooltip
                                            title={
                                                Number(row.std_status) === 1
                                                    ? "Deactivate Student"
                                                    : "Activate Student"
                                            }
                                        >
                                            {
                                                Number(row.std_status) === 1 ? (
                                                    <PersonAddDisabledIcon
                                                        sx={{ cursor: 'pointer', color: 'red' }}
                                                        onClick={() =>
                                                            HandleInactive(row.std_id, row.std_status)
                                                        }
                                                    />
                                                ) : (
                                                    <PersonAddIcon
                                                        sx={{ cursor: 'pointer', color: 'green' }}
                                                        onClick={() =>
                                                            HandleInactive(row.std_id, row.std_status)
                                                        }
                                                    />
                                                )
                                            }
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