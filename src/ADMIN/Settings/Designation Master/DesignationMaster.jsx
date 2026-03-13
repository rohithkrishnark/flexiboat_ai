import React, { useState, useMemo, useCallback } from 'react'
import {
  Box,
  Input,
  Button,
  Typography,
  Checkbox,
  Card,
  CardContent
} from '@mui/joy'
import EditIcon from '@mui/icons-material/Edit'
import { useLocation } from 'react-router-dom'
import MasterWrapper from '../../Components/MasterWrapper'
import MasterTable from '../CommonMasterComponent/MasterTable'
import axiosLogin from '../../../Axios/axios'
import { successNotify, warningNotify } from '../../../constant/Constant'
import { useFetchAllDesignationDetail } from '../../CommonCode/useQuery'

const DesignationMaster = () => {

  const location = useLocation()
  const title = location.state?.title || "Designation Master"

  const [desgName, setDesgName] = useState('')
  const [desgStatus, setDesgStatus] = useState(true)
  const [loading, setLoading] = useState(false)

  const [isEditMode, setIsEditMode] = useState(false)
  const [desgId, setDesgId] = useState(null)

  // Fetch Designations
  const {
    data: designationDetail,
    refetch: fetchDesignation
  } = useFetchAllDesignationDetail()

  // Edit Click
  const handleEdit = useCallback((row) => {
    setDesgId(row.desg_id)
    setDesgName(row.desg_name)
    setDesgStatus(row.desg_status === 1)
    setIsEditMode(true)
  }, [])

  // Submit Insert / Update
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!desgName) {
      warningNotify("Designation name required")
      setLoading(false)
      return
    }

    try {

      let endpoint = ""
      let payload = {}

      if (isEditMode) {
        endpoint = `/training/designation/update`
        payload = {
          desg_id: desgId,
          desg_name: desgName,
          desg_status: desgStatus ? 1 : 0
        }
      } else {
        endpoint = `/training/designation/create`
        payload = {
          desg_name: desgName,
          desg_status: desgStatus ? 1 : 0
        }
      }

      const response = await axiosLogin.post(endpoint, payload)
      const action = isEditMode ? "updated" : "added"

      if (response.data.success === 1) {

        successNotify(`Designation ${action} successfully`)

        // Reset Form
        setDesgName('')
        setDesgStatus(true)
        setDesgId(null)
        setIsEditMode(false)

        fetchDesignation()

      } else {
        warningNotify(`Failed to ${action} designation`)
      }

    } catch (err) {
      console.error(err)
      warningNotify("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // AG Grid Columns
  const columnDefs = useMemo(() => [
    {
      headerName: "ID",
      field: "desg_id",
      width: 90
    },
    {
      headerName: "Designation Name",
      field: "desg_name"
    },
    {
      headerName: "Status",
      field: "desg_status",
      filter: false,
      valueFormatter: (params) =>
        params.value === 1 ? "Active" : "Inactive"
    },
    {
      headerName: "Action",
      width: 100,
      filter: false,
      sortable: false,
      cellRenderer: (params) => (
        <EditIcon
          style={{ cursor: "pointer", color: "#1976d2" }}
          onClick={() => handleEdit(params.data)}
        />
      )
    }
  ], [handleEdit])

  return (
    <MasterWrapper title={title}>
      <Box sx={{ display: 'flex', gap: 3 }}>

        {/* LEFT - FORM */}
        <Card sx={{ width: '30%' }}>
          <CardContent>

            <Typography level="h5" mb={2}>
              {isEditMode ? "Edit Designation" : "Add Designation"}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm">Designation Name</Typography>
              <Input
                value={desgName}
                onChange={(e) => setDesgName(e.target.value)}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Checkbox
                checked={desgStatus}
                onChange={(e) => setDesgStatus(e.target.checked)}
                label="Active Status"
              />
            </Box>

            <Button fullWidth disabled={loading} onClick={handleSubmit}>
              {loading
                ? "Processing..."
                : isEditMode
                  ? "Update Designation"
                  : "Add Designation"}
            </Button>

            {isEditMode && (
              <Button
                color="neutral"
                sx={{ mt: 1 }}
                fullWidth
                onClick={() => {
                  setDesgName('')
                  setDesgStatus(true)
                  setDesgId(null)
                  setIsEditMode(false)
                }}
              >
                Cancel Edit
              </Button>
            )}

          </CardContent>
        </Card>

        {/* RIGHT - TABLE */}
        <Card sx={{ width: '70%' }}>
          <CardContent>

            <Typography level="h5" mb={2}>
              Designation List
            </Typography>

            <MasterTable
              columnDefs={columnDefs}
              rowData={designationDetail}
            />

          </CardContent>
        </Card>

      </Box>
    </MasterWrapper>
  )
}

export default DesignationMaster