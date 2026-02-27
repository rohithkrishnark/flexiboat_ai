import React, { useState, useEffect, useMemo } from 'react'
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
import { useLocation } from 'react-router-dom'
import MasterWrapper from '../../Components/MasterWrapper'
import MasterTable from '../CommonMasterComponent/MasterTable'

const ProgramDetailMaster = () => {

  const location = useLocation()
  const title = location.state?.title || "Program Detail Master"

  const [rowData, setRowData] = useState([])
  const [programList, setProgramList] = useState([])
  const [programYearName, setProgramYearName] = useState('')
  const [programId, setProgramId] = useState(null)

  useEffect(() => {
    fetchProgramDetails()
    fetchPrograms()
  }, [])

  const fetchProgramDetails = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/program-details')
      const data = await res.json()
      setRowData(data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchPrograms = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/programs')
      const data = await res.json()
      setProgramList(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async () => {
    if (!programYearName || !programId)
      return alert("All fields required")

    try {
      await fetch('http://localhost:5000/api/program-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          program_year_name: programYearName,
          program_id: programId
        })
      })

      setProgramYearName('')
      setProgramId(null)
      fetchProgramDetails()

    } catch (err) {
      console.error(err)
    }
  }

  const columnDefs = useMemo(() => [
    { headerName: "SL No", field: "prgm_mast_dtl_slno" },
    { headerName: "Program Year Name", field: "program_year_name" },
    { headerName: "Program Name", field: "program_name" }, // joined value
    { headerName: "Created Date", field: "create_date" },
    { headerName: "Edited Date", field: "edit_date" },
  ], [])

  return (
    <MasterWrapper title={title}>

      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >

        {/* 🔹 LEFT - FORM (30%) */}
        <Card sx={{ flex: { xs: '100%', md: '0 0 30%' } }}>
          <CardContent>

            <Typography level="h5" mb={2}>
              Add Program Detail
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm">Program Year Name</Typography>
              <Input
                value={programYearName}
                onChange={(e) => setProgramYearName(e.target.value)}
                placeholder="Enter program year"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography level="body-sm">Select Program</Typography>
              <Select
                value={programId}
                onChange={(e, newValue) => setProgramId(newValue)}
                placeholder="Select Program"
              >
                {programList.map((program) => (
                  <Option
                    key={program.program_id}
                    value={program.program_id}
                  >
                    {program.program_name}
                  </Option>
                ))}
              </Select>
            </Box>

            <Button fullWidth onClick={handleSubmit}>
              Add Program Detail
            </Button>

          </CardContent>
        </Card>


        {/* 🔹 RIGHT - TABLE (70%) */}
        <Card sx={{ flex: { xs: '100%', md: '0 0 70%' } }}>
          <CardContent>

            <Typography level="h5" mb={2}>
              Program Detail List
            </Typography>

            <MasterTable
              columnDefs={columnDefs}
              rowData={rowData}
            />

          </CardContent>
        </Card>

      </Box>

    </MasterWrapper>
  )
}

export default ProgramDetailMaster