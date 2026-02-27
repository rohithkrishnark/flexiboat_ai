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

const DesignationMaster = () => {

  const location = useLocation()
  const title = location.state?.title || "Designation Master"

  const [rowData, setRowData] = useState([])
  const [desgName, setDesgName] = useState('')
  const [desgStatus, setDesgStatus] = useState(true)

  useEffect(() => {
    fetchDesignations()
  }, [])

  const fetchDesignations = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/designations')
      const data = await res.json()
      setRowData(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async () => {
    if (!desgName) return alert("Designation name required")

    try {
      await fetch('http://localhost:5000/api/designations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          desg_name: desgName,
          desg_status: desgStatus ? 'Active' : 'Inactive'
        })
      })

      setDesgName('')
      setDesgStatus(true)
      fetchDesignations()

    } catch (err) {
      console.error(err)
    }
  }

  const columnDefs = useMemo(() => [
    { headerName: "ID", field: "desg_id" },
    { headerName: "Designation Name", field: "desg_name" },
    { headerName: "Status", field: "desg_status" },
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
        <Card
          sx={{
            flex: { xs: '100%', md: '0 0 30%' },
            height: 'fit-content'
          }}
        >
          <CardContent>

            <Typography level="h5" mb={2}>
              Add Designation
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm">Designation Name</Typography>
              <Input
                value={desgName}
                onChange={(e) => setDesgName(e.target.value)}
                placeholder="Enter designation name"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Checkbox
                checked={desgStatus}
                onChange={(e) => setDesgStatus(e.target.checked)}
                label="Active Status"
              />
            </Box>

            <Button fullWidth onClick={handleSubmit}>
              Add Designation
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
              Designation List
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

export default DesignationMaster