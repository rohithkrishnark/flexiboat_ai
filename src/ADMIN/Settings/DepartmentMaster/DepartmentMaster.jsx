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
import MasterWrapper from '../../Components/MasterWrapper'
import { useLocation } from 'react-router-dom'
import MasterTable from '../CommonMasterComponent/MasterTable'
import { successNotify, warningNotify } from '../../../constant/Constant'
import { useFetchAllDeprtmentDetail } from '../../CommonCode/useQuery'
import { axiosLogin } from '../../../Axios/axios'


const DepartmentMaster = () => {

    const location = useLocation()
    const title = location.state?.title || "Department Master"

    const [depName, setDepName] = useState('')
    const [depStatus, setDepStatus] = useState(true)
    const [loading, setLoading] = useState(false)

    const [isEditMode, setIsEditMode] = useState(false)
    const [depId, setDepId] = useState(null)


    // Fetch Departments
    const { data: departmentDetail, refetch: fetchDepartments } = useFetchAllDeprtmentDetail()


    //  Handle Edit Click
    const handleEdit = useCallback((row) => {
        setDepId(row.dep_id)
        setDepName(row.dep_name)
        setDepStatus(row.dep_status === 1 || row.dep_status === 'Active')
        setIsEditMode(true)
    }, [])

    //  Submit Insert / Update
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!depName) {
            warningNotify("Department name required")
            setLoading(false)
            return
        }

        try {

            let endpoint = ""
            let payload = {}

            if (isEditMode) {
                //  UPDATE
                endpoint = `/training/department/update`
                payload = {
                    dep_id: depId,
                    dep_name: depName,
                    dep_status: depStatus ? 1 : 0
                }
            } else {
                //  INSERT
                endpoint = `/training/department/insert`
                payload = {
                    dep_name: depName,
                    dep_status: depStatus ? 1 : 0
                }
            }
            const response = await axiosLogin.post(endpoint, payload)
            const action = isEditMode ? "updated" : "added"
            if (response.data.success === 1) {
                successNotify(`Department ${action} successfully`)
                // Reset form
                setDepName('')
                setDepStatus(true)
                setIsEditMode(false)
                setDepId(null)
                fetchDepartments()
            } else {
                warningNotify(`Failed to ${action} department`)
            }

        } catch (error) {
            console.error(error)
            warningNotify("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    //  Ag-Grid Columns
    const columnDefs = useMemo(() => [
        {
            headerName: "ID",
            field: "dep_id",
            width: 90
        },
        {
            headerName: "Department Name",
            field: "dep_name"
        },
        {
            headerName: "Status",
            field: "dep_status",
            filter: false,
            valueFormatter: (params) =>
                params.value === 1 ? "Active" : "Inactive"
        },
        {
            headerName: "Action",
            width: 100,

            // disable filter & sort
            filter: false,
            sortable: false,
            floatingFilter: false,

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
            <Box
                sx={{
                    display: 'flex',
                    gap: 3,
                    alignItems: 'flex-start',
                    width: '100%',
                    height: '100%'
                }}
            >

                {/* LEFT - FORM */}
                <Card sx={{ width: '30%' }}>
                    <CardContent>

                        <Typography level="h5" mb={2}>
                            {isEditMode ? "Edit Department" : "Add Department"}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                            <Typography level="body-sm">
                                Department Name
                            </Typography>
                            <Input
                                value={depName}
                                onChange={(e) => setDepName(e.target.value)}
                                placeholder="Enter department name"
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Checkbox
                                checked={depStatus}
                                onChange={(e) => setDepStatus(e.target.checked)}
                                label="Active Status"
                            />
                        </Box>

                        <Button
                            disabled={loading}
                            fullWidth
                            onClick={handleSubmit}
                        >
                            {loading
                                ? "Processing..."
                                : isEditMode
                                    ? "Update Department"
                                    : "Add Department"}
                        </Button>

                        {/* Cancel Edit */}
                        {isEditMode && (
                            <Button
                                color="neutral"
                                sx={{ mt: 1 }}
                                fullWidth
                                onClick={() => {
                                    setDepName('')
                                    setDepStatus(true)
                                    setDepId(null)
                                    setIsEditMode(false)
                                }}
                            >
                                Cancel Edit
                            </Button>
                        )}

                    </CardContent>
                </Card>

                {/* RIGHT - TABLE */}
                <Card sx={{ width: '70%', minHeight: '50%' }}>
                    <CardContent>

                        <Typography level="h5" mb={2}>
                            Department List
                        </Typography>

                        <MasterTable
                            columnDefs={columnDefs}
                            rowData={departmentDetail || []}
                        />

                    </CardContent>
                </Card>

            </Box>
        </MasterWrapper>
    )
}

export default DepartmentMaster