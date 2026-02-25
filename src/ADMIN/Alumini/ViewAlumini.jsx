import React, { useState } from 'react'
import {
  Box,
  Typography,
  Table
} from '@mui/joy'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useFetchAllAluminDetail } from '../CommonCode/useQuery'
import { successNotify, warningNotify } from '../../constant/Constant'
import { useNavigate } from 'react-router-dom'
import axiosLogin from '../../Axios/axios';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AlumniLoginModal from '../AdminModal/AlumniLoginModal'

const ViewAlumini = () => {
  const { data: AllAluminidata, isLoading, refetch: FetchAllAluminDetail } = useFetchAllAluminDetail()
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [selectedAlumni, setSelectedAlumni] = useState(null)

  // Open modal for specific alumni
  const handleOpenLoginModal = (row) => {
    setSelectedAlumni(row)
    setOpenLoginModal(true)
  }


  const navigate = useNavigate()
  const handleEdit = (row) => {
    navigate(`/admin/addalumin/${row.alum_id}`)
  }


  //Function to Inacitve Alumini
  const handleDelete = async (row) => {
    if (!row.alum_id) {
      return warningNotify("Alumni Id is missing!");
    }
    try {
      const response = await axiosLogin.post('/training/alumini/inactive', { alumin_id: row.alum_id });
      if (response.data.success === 1) {
        successNotify("Alumni marked inactive successfully");
        // Optionally, refetch the table or update local state
        FetchAllAluminDetail(); // make sure you have this refetch function
      } else {
        warningNotify(response.data.message || "Failed to mark alumni inactive");
      }
    } catch (error) {
      console.error("Inactive Alumni Error:", error);
      warningNotify("Something went wrong while marking alumni inactive");
    }
  };
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
        minWidth: 0, // prevents sidebar break
        bgcolor: '#ffffff',
        borderRadius: 2,
        boxShadow: 'sm',
        p: 3,
        boxSizing: 'border-box'
      }}
    >
      <Typography level="h4" sx={{ mb: 2, fontWeight: 700 }}>
        Alumni List
      </Typography>

      {AllAluminidata?.length === 0 ? (
        <Typography>No alumni found</Typography>
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
                <th>email</th>
                <th>Age</th>
                <th>Company</th>
                <th>Designation</th>
                <th>Experience</th>
                <th>Qualification</th>
                <th>Status</th>
                <th>Login</th>
                <th>Edit</th>
                <th>Inactive</th>
              </tr>
            </thead>

            <tbody>
              {AllAluminidata?.map((row, index) => (
                <tr key={row.alum_id}>
                  <td>{index + 1}</td>
                  <td>{row.alum_name}</td>
                  <td>{row.alum_email}</td>
                  <td>{row.alum_age}</td>
                  <td>{row.alum_company}</td>
                  <td>{row.alum_company_designation}</td>
                  <td>{row.alum_experience} yrs</td>
                  <td>{row.alum_qualification}</td>
                  <td>{row.alum_status === 1 ? "Active" : "InActive"}</td>
                  <td>
                    <LockOpenIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleOpenLoginModal(row)}
                    />
                  </td>
                  <td>
                    <EditIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleEdit(row)}
                    />
                  </td>
                  <td>
                    <DeleteIcon
                      sx={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => handleDelete(row)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      )}

      <AlumniLoginModal
        open={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
        alumni={selectedAlumni}
        onSent={() => FetchAllAluminDetail()}
      />
    </Box>
  )
}

export default ViewAlumini