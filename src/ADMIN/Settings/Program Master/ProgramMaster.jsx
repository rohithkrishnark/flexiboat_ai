import React, { useState, useEffect, useMemo } from 'react'
import {
  Box,
  Input,
  Button,
  Typography,
  Checkbox,
  Card,
  CardContent
} from '@mui/joy'
import { useLocation } from 'react-router-dom'
import MasterWrapper from '../../Components/MasterWrapper'
import MasterTable from '../CommonMasterComponent/MasterTable'

const ProgramMaster = () => {

  const location = useLocation()
  const title = location.state?.title || "Program Master"

  const [rowData, setRowData] = useState([])
  const [programName, setProgramName] = useState('')
  const [programAlias, setProgramAlias] = useState('')
  const [programStatus, setProgramStatus] = useState(true)

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/programs')
      const data = await res.json()
      setRowData(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async () => {
    if (!programName) return alert("Program name required")

    try {
      await fetch('http://localhost:5000/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          program_name: programName,
          program_alias: programAlias,
          program_status: programStatus ? 'Active' : 'Inactive'
        })
      })

      setProgramName('')
      setProgramAlias('')
      setProgramStatus(true)
      fetchPrograms()

    } catch (err) {
      console.error(err)
    }
  }

  const columnDefs = useMemo(() => [
    { headerName: "ID", field: "program_id" },
    { headerName: "Program Name", field: "program_name" },
    { headerName: "Alias", field: "program_alias" },
    { headerName: "Status", field: "program_status" },
    { headerName: "Created Date", field: "create_date" },
    { headerName: "Edited Date", field: "edit_date" },
  ], [])

  return (
    <MasterWrapper title={title}>

      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexDirection: {
            xs: 'column',
            md: 'row'
          }
        }}
      >

        {/* 🔹 LEFT - FORM (30%) */}
        <Card
          sx={{
            flex: { xs: '100%', md: '0 0 30%' },
            height: 'fit-content'
          }}
        >
          <CardContent>

            <Typography level="h5" mb={2}>
              Add Program
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm">Program Name</Typography>
              <Input
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                placeholder="Enter program name"
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm">Program Alias</Typography>
              <Input
                value={programAlias}
                onChange={(e) => setProgramAlias(e.target.value)}
                placeholder="Enter program alias"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Checkbox
                checked={programStatus}
                onChange={(e) => setProgramStatus(e.target.checked)}
                label="Active Status"
              />
            </Box>

            <Button fullWidth onClick={handleSubmit}>
              Add Program
            </Button>

          </CardContent>
        </Card>


        {/* 🔹 RIGHT - TABLE (70%) */}
        <Card
          sx={{
            flex: { xs: '100%', md: '0 0 70%' }
          }}
        >
          <CardContent>

            <Typography level="h5" mb={2}>
              Program List
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

export default ProgramMaster