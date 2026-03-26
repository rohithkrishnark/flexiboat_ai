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
// import axiosLogin from '../../../Axios/axios'
import { successNotify, warningNotify } from '../../../constant/Constant'
import { useFetchAllUserGroup } from '../../CommonCode/useQuery'
import { axiosLogin } from '../../../Axios/axios'

const UserGroupMaster = () => {

  const location = useLocation()
  const title = location.state?.title || "User Group Master"

  const [groupName, setGroupName] = useState('')
  const [groupAlias, setGroupAlias] = useState('')
  const [groupStatus, setGroupStatus] = useState(true)

  const [groupId, setGroupId] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  // fetch groups
  const {
    data: groupDetail,
    refetch: fetchGroups
  } = useFetchAllUserGroup()
  // edit click
  const handleEdit = useCallback((row) => {
    setGroupId(row.group_id)
    setGroupName(row.group_name)
    setGroupAlias(row.group_alias)
    setGroupStatus(row.group_status === 1)
    setIsEditMode(true)
  }, [])

  // submit insert / update
  const handleSubmit = async () => {

    if (!groupName) {
      warningNotify("Group name required")
      return
    }

    setLoading(true)

    try {

      let endpoint = ""
      let payload = {}

      if (isEditMode) {

        endpoint = `/training/group/update`

        payload = {
          group_id: groupId,
          group_name: groupName,
          group_alias: groupAlias,
          group_status: groupStatus ? 1 : 0
        }

      } else {

        endpoint = `/training/group/insert`

        payload = {
          group_name: groupName,
          group_alias: groupAlias,
          group_status: groupStatus ? 1 : 0
        }

      }

      const response = await axiosLogin.post(endpoint, payload)
      const action = isEditMode ? "updated" : "added"

      if (response.data.success === 1) {

        successNotify(`User group ${action} successfully`)

        setGroupName('')
        setGroupAlias('')
        setGroupStatus(true)
        setGroupId(null)
        setIsEditMode(false)

        fetchGroups()

      } else {
        warningNotify(`Failed to ${action} group`)
      }

    } catch (err) {

      console.error(err)
      warningNotify("Something went wrong")

    } finally {
      setLoading(false)
    }
  }

  // cancel edit
  const cancelEdit = () => {
    setGroupName('')
    setGroupAlias('')
    setGroupStatus(true)
    setGroupId(null)
    setIsEditMode(false)
  }

  // ag grid columns
  const columnDefs = useMemo(() => [

    {
      headerName: "ID",
      field: "group_id",
      width: 90
    },

    {
      headerName: "Group Name",
      field: "group_name"
    },

    {
      headerName: "Alias",
      field: "group_alias"
    },

    {
      headerName: "Status",
      field: "group_status",
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

        {/* LEFT FORM */}

        <Card sx={{ width: '30%' }}>
          <CardContent>

            <Typography level="h5" mb={2}>
              {isEditMode ? "Edit User Group" : "Add User Group"}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm">Group Name</Typography>
              <Input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm">Group Alias</Typography>
              <Input
                value={groupAlias}
                onChange={(e) => setGroupAlias(e.target.value)}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Checkbox
                checked={groupStatus}
                onChange={(e) => setGroupStatus(e.target.checked)}
                label="Active Status"
              />
            </Box>

            <Button fullWidth disabled={loading} onClick={handleSubmit}>
              {loading
                ? "Processing..."
                : isEditMode
                  ? "Update User Group"
                  : "Add User Group"}
            </Button>

            {isEditMode && (
              <Button
                color="neutral"
                sx={{ mt: 1 }}
                fullWidth
                onClick={cancelEdit}
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
              User Group List
            </Typography>

            <MasterTable
              columnDefs={columnDefs}
              rowData={groupDetail}
            />

          </CardContent>
        </Card>

      </Box>

    </MasterWrapper>
  )
}

export default UserGroupMaster