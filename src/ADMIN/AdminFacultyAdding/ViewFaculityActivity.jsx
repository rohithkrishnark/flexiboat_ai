import React from 'react'
import {
  Box,
  Typography,
  Table,
  Tooltip
} from '@mui/joy'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { useFetchAllFaculity } from '../CommonCode/useQuery'
import { infoNotify, successNotify, warningNotify } from '../../constant/Constant';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { axiosLogin } from '../../Axios/axios';
const ViewFaculityActivity = () => {

  const { data: AllFaculityDetail,
    isLoading,
    isError,
    error, refetch: FetchAllFaculity
  } = useFetchAllFaculity()

  const handleApprove = async (row) => {
    if (row.fac_admin_verify === 1) return infoNotify("Admin Already Verified")
    try {
      const response = await axiosLogin.post("/training/faculty/approve", {
        fac_id: row.fac_id,
        fac_active_status: 1
      });
      if (response.data.success === 1) {
        successNotify("Faculty approved successfully")
        FetchAllFaculity()   // refetch table
      } else {
        warningNotify(response.data.message || "Approval failed")
      }
    } catch (error) {
      console.error("Approve Faculty Error:", error)
      warningNotify("Something went wrong while approving faculty")
    }
  }

  const handleInactive = async (row) => {
    const newStatus = row.fac_stauts === 1 ? 0 : 1
    try {
      const response = await axiosLogin.post("/training/faculty/activefac", {
        fac_id: row.fac_id,
        fac_active_status: newStatus
      })

      if (response.data.success === 1) {
        successNotify(
          newStatus === 1
            ? "Faculty activated successfully"
            : "Faculty deactivated successfully"
        )
        FetchAllFaculity()
      } else {
        warningNotify(response.data.message || "Status update failed")
      }

    } catch (error) {
      console.error("Toggle Faculty Status Error:", error)
      warningNotify("Something went wrong while updating status")
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
        position: 'relative'
      }}
    >

      <Typography
        level="h4"
        sx={{
          mb: 2,
          fontWeight: 700,
          position: "sticky",
          top: 0,
          bgcolor: "#ffffff",
          zIndex: 10
        }}
      >
        Faculty Activity List
      </Typography>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Table hoverRow>

          <thead>
            <tr>
              <th style={{ width: 60 }}>Sl No</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Group</th>
              <th>Admin Approval</th>
              <th>Employee Status</th>
              <th>Approve</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {AllFaculityDetail?.map((row, index) => (
              <tr key={row.fac_id}>

                <td >{index + 1}</td>
                <td>{row.fac_name}</td>
                <td>{row.dep_name}</td>
                <td>{row.desg_name}</td>
                <td>{row.group_name}</td>

                {/* ADMIN APPROVAL */}
                <td>
                  {row.fac_admin_verify === 1 ? (
                    <Typography color="success">Approved</Typography>
                  ) : (
                    <Typography color="warning">Pending</Typography>
                  )}
                </td>

                {/* EMPLOYEE STATUS */}
                <td>
                  {row.fac_stauts === 1 ? (
                    <Typography color="success">Active</Typography>
                  ) : (
                    <Typography color="danger">Inactive</Typography>
                  )}
                </td>

                {/* ADMIN APPROVE */}
                <td>
                   {row.fac_admin_verify === 1 ? (
                   <Tooltip title="Admin Approved">
                    <VerifiedUserIcon
                      color="primary"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleApprove(row)}
                    />
                  </Tooltip>
                  ) : (
                     <Tooltip title="Admin Approve">
                    <CheckCircleIcon
                      color="success"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleApprove(row)}
                    />
                  </Tooltip>
                  )}
                 
                </td>

                {/* EMPLOYEE INACTIVE */}
                <td>
                  {row.fac_stauts === 1 ? (
                    <Tooltip title="Deactivate Employee">
                      <PersonAddDisabledIcon
                        sx={{ cursor: 'pointer', color: 'red' }}
                        onClick={() => handleInactive(row)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Activate Employee">
                      <PersonAddAltIcon
                        sx={{ cursor: 'pointer', color: '#c14242' }}
                        onClick={() => handleInactive(row)}
                      />
                    </Tooltip>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </Table>
      </Box>
    </Box>
  )
}

export default ViewFaculityActivity