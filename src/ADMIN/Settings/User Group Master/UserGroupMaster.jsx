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

const UserGroupMaster = () => {

  const location = useLocation()
  const title = location.state?.title || "User Group Master"

  const [rowData, setRowData] = useState([])
  const [groupName, setGroupName] = useState('')
  const [groupAlias, setGroupAlias] = useState('')
  const [groupStatus, setGroupStatus] = useState(true)

  useEffect(() => {
    fetchUserGroups()
  }, [])

  const fetchUserGroups = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user-groups')
      const data = await res.json()
      setRowData(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async () => {
    if (!groupName) return alert("User group name required")

    try {
      await fetch('http://localhost:5000/api/user-groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          group_name: groupName,
          group_alias: groupAlias,
          group_status: groupStatus ? 'Active' : 'Inactive'
        })
      })

      setGroupName('')
      setGroupAlias('')
      setGroupStatus(true)
      fetchUserGroups()

    } catch (err) {
      console.error(err)
    }
  }

  const columnDefs = useMemo(() => [
    { headerName: "ID", field: "group_id" },
    { headerName: "Group Name", field: "group_name" },
    { headerName: "Alias", field: "group_alias" },
    { headerName: "Status", field: "group_status" },
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
              Add User Group
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm">Group Name</Typography>
              <Input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm">Group Alias</Typography>
              <Input
                value={groupAlias}
                onChange={(e) => setGroupAlias(e.target.value)}
                placeholder="Enter group alias"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Checkbox
                checked={groupStatus}
                onChange={(e) => setGroupStatus(e.target.checked)}
                label="Active Status"
              />
            </Box>

            <Button fullWidth onClick={handleSubmit}>
              Add User Group
            </Button>

          </CardContent>
        </Card>

        {/* 🔹 RIGHT - TABLE (70%) */}
        <Card sx={{ flex: { xs: '100%', md: '0 0 70%' } }}>
          <CardContent>

            <Typography level="h5" mb={2}>
              User Group List
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

export default UserGroupMaster