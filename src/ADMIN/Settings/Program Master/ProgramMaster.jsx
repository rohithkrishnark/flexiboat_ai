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
// import { axiosLogin } from '../../Axios/axios';
import { successNotify, warningNotify } from '../../../constant/Constant'
import { useFetchAllProgramDetail } from '../../CommonCode/useQuery'
import { axiosLogin } from '../../../Axios/axios'

const ProgramMaster = () => {

  const location = useLocation()
  const title = location.state?.title || "Program Master"

  const [programName, setProgramName] = useState('')
  const [programAlias, setProgramAlias] = useState('')
  const [programStatus, setProgramStatus] = useState(true)
  const [loading, setLoading] = useState(false)

  const [isEditMode, setIsEditMode] = useState(false)
  const [programId, setProgramId] = useState(null)

  //  Fetch Programs
  const {
    data: programDetail,
    refetch: fetchPrograms
  } = useFetchAllProgramDetail();

  

  //  Edit Click
  const handleEdit = useCallback((row) => {
    setProgramId(row.program_id)
    setProgramName(row.program_name)
    setProgramAlias(row.program_alias)
    setProgramStatus(row.program_status === 1)
    setIsEditMode(true)
  }, [])

  //  Submit Insert / Update
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!programName) {
      warningNotify("Program name required")
      setLoading(false)
      return
    }

    try {

      let endpoint = ""
      let payload = {}

      if (isEditMode) {
        endpoint = `/training/program/update`
        payload = {
          program_id: programId,
          program_name: programName,
          program_alias: programAlias,
          program_status: programStatus ? 1 : 0
        }
      } else {
        endpoint = `/training/program/insert`
        payload = {
          program_name: programName,
          program_alias: programAlias,
          program_status: programStatus ? 1 : 0
        }
      }

      const response = await axiosLogin.post(endpoint, payload)
      const action = isEditMode ? "updated" : "added"

      if (response.data.success === 1) {

        successNotify(`Program ${action} successfully`)

        // Reset form
        setProgramName('')
        setProgramAlias('')
        setProgramStatus(true)
        setProgramId(null)
        setIsEditMode(false)

        fetchPrograms()

      } else {
        warningNotify(`Failed to ${action} program`)
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
      field: "program_id",
      width: 90
    },
    {
      headerName: "Program Name",
      field: "program_name"
    },
    {
      headerName: "Alias",
      field: "program_alias"
    },
    {
      headerName: "Status",
      field: "program_status",
      filter: false,
      valueFormatter: (params) =>
        Number(params.value) === 1 ? "Active" : "Inactive"
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
              {isEditMode ? "Edit Program" : "Add Program"}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm">Program Name</Typography>
              <Input
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm">Program Alias</Typography>
              <Input
                value={programAlias}
                onChange={(e) => setProgramAlias(e.target.value)}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Checkbox
                checked={programStatus}
                onChange={(e) => setProgramStatus(e.target.checked)}
                label="Active Status"
              />
            </Box>

            <Button fullWidth disabled={loading} onClick={handleSubmit}>
              {loading
                ? "Processing..."
                : isEditMode
                  ? "Update Program"
                  : "Add Program"}
            </Button>

            {isEditMode && (
              <Button
                color="neutral"
                sx={{ mt: 1 }}
                fullWidth
                onClick={() => {
                  setProgramName('')
                  setProgramAlias('')
                  setProgramStatus(true)
                  setProgramId(null)
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
              Program List
            </Typography>

            <MasterTable
              columnDefs={columnDefs}
              rowData={programDetail}
            />

          </CardContent>
        </Card>

      </Box>
    </MasterWrapper>
  )
}

export default ProgramMaster