import React, { useState, useMemo, useCallback, memo } from 'react'
import {
  Box,
  Input,
  Button,
  Typography,
  Card,
  CardContent,
  Select,
  Option
} from '@mui/joy'
import EditIcon from '@mui/icons-material/Edit'
import { useLocation } from 'react-router-dom'
import MasterWrapper from '../../Components/MasterWrapper'
import MasterTable from '../CommonMasterComponent/MasterTable'
import axiosLogin from '../../../Axios/axios'
import { successNotify, warningNotify } from '../../../constant/Constant'
import { useFetchAllProgramDetail, useFetchAllProgramDetailMast } from '../../CommonCode/useQuery'

const ProgramDetailMaster = () => {

  const location = useLocation()
  const title = location.state?.title || "Program Detail Master"

  const [programYearName, setProgramYearName] = useState('')
  const [programId, setProgramId] = useState(null)
  const [loading, setLoading] = useState(false)

  const [isEditMode, setIsEditMode] = useState(false)
  const [detailId, setDetailId] = useState(null)



  // Fetch Programs for dropdown
  const {
    data: programDetail,
  } = useFetchAllProgramDetail()

  //program detail master
  const {
    data: programDetailMast = [],
    refetch: fetchProgramDetailMast
  } = useFetchAllProgramDetailMast()


  // Edit Click
  const handleEdit = useCallback((row) => {
    setDetailId(row.prgm_mast_dtl_slno)
    setProgramYearName(row.program_year_name)
    setProgramId(row.program_id)
    setIsEditMode(true)
  }, [])

  // Submit Insert / Update
  const handleSubmit = async (e) => {

    e.preventDefault()
    setLoading(true)

    if (!programYearName || !programId) {
      warningNotify("All fields required")
      setLoading(false)
      return
    }

    try {

      let endpoint = ""
      let payload = {}

      if (isEditMode) {

        endpoint = `/training/program-detail/update`

        payload = {
          prgm_mast_dtl_slno: detailId,
          program_year_name: programYearName,
          program_id: programId
        }

      } else {

        endpoint = `/training/program-detail/insert`

        payload = {
          program_year_name: programYearName,
          program_id: programId
        }
      }

      const response = await axiosLogin.post(endpoint, payload)
      const action = isEditMode ? "updated" : "added"

      if (response.data.success === 1) {

        successNotify(`Program detail ${action} successfully`)

        setProgramYearName('')
        setProgramId(null)
        setDetailId(null)
        setIsEditMode(false)

        fetchProgramDetailMast()

      } else {
        warningNotify(`Failed to ${action}`)
      }

    } catch (err) {
      console.error(err)
      warningNotify("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const columnDefs = useMemo(() => [
    {
      headerName: "SL No",
      field: "prgm_mast_dtl_slno",
      width: 100
    },
    {
      headerName: "Program Year Name",
      field: "program_year_name"
    },
    {
      headerName: "Program Name",
      field: "program_name"
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

        {/* LEFT FORM */}
        <Card sx={{ width: '30%' }}>
          <CardContent>

            <Typography level="h5" mb={2}>
              {isEditMode ? "Edit Program Detail" : "Add Program Detail"}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm">Program Year Name</Typography>
              <Input
                value={programYearName}
                onChange={(e) => setProgramYearName(e.target.value)}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography level="body-sm">Select Program</Typography>
              <Select
                value={programId}
                onChange={(e, newValue) => setProgramId(newValue)}
                placeholder="Select Program"
              >
                {programDetail?.map((program) => (
                  <Option
                    key={program?.program_id}
                    value={program?.program_id}
                  >
                    {program?.program_name}
                  </Option>
                ))}
              </Select>
            </Box>

            <Button fullWidth disabled={loading} onClick={handleSubmit}>
              {loading
                ? "Processing..."
                : isEditMode
                  ? "Update Program Detail"
                  : "Add Program Detail"}
            </Button>

            {isEditMode && (
              <Button
                fullWidth
                sx={{ mt: 1 }}
                color="neutral"
                onClick={() => {
                  setProgramYearName('')
                  setProgramId(null)
                  setDetailId(null)
                  setIsEditMode(false)
                }}
              >
                Cancel Edit
              </Button>
            )}

          </CardContent>
        </Card>

        {/* RIGHT TABLE */}
        <Card sx={{ width: '70%' }}>
          <CardContent>

            <Typography level="h5" mb={2}>
              Program Detail List
            </Typography>

            <MasterTable
              columnDefs={columnDefs}
              rowData={programDetailMast || []}
            />

          </CardContent>
        </Card>

      </Box>

    </MasterWrapper>
  )
}

export default memo(ProgramDetailMaster);