import React, { useState, useMemo } from 'react'
import {
    Box,
    Input,
    Button,
    Typography,
    Checkbox,
    Card,
    CardContent
} from '@mui/joy'
import MasterWrapper from '../../Components/MasterWrapper'
import { useLocation } from 'react-router-dom'
import MasterTable from '../CommonMasterComponent/MasterTable'

const DepartmentMaster = () => {

    const location = useLocation()
    const title = location.state?.title || "Department Master"

    const [rowData, setRowData] = useState([])
    const [depName, setDepName] = useState('')
    const [depStatus, setDepStatus] = useState(true) // true = Active

    const fetchDepartments = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/departments')
            const data = await res.json()
            setRowData(data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleSubmit = async () => {
        if (!depName) return alert("Department name required")

        try {
            await fetch('http://localhost:5000/api/departments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dep_name: depName,
                    dep_status: depStatus ? 'Active' : 'Inactive'
                })
            })

            setDepName('')
            setDepStatus(true)
            fetchDepartments()

        } catch (err) {
            console.error(err)
        }
    }

    const columnDefs = useMemo(() => [
        { headerName: "ID", field: "dep_id" },
        { headerName: "Department Name", field: "dep_name" },
        { headerName: "Status", field: "dep_status" },
        { headerName: "Created Date", field: "create_date" },
        { headerName: "Edited Date", field: "edit_date" },
    ], [])

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

                {/* 🔹 Left - Form (30%) */}
                <Card
                    sx={{
                        width: '30%',
                        height: '100%'
                    }}
                >
                    <CardContent>

                        <Typography level="h5" mb={2}>
                            Add Department
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                            <Typography level="body-sm">Department Name</Typography>
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

                        <Button fullWidth onClick={handleSubmit}>
                            Add Department
                        </Button>

                    </CardContent>
                </Card>


                {/* 🔹 Right - Table (70%) */}
                <Card
                    sx={{
                        width:'70%',
                        minHeight: '50%'
                    }}
                >
                    <CardContent>

                        <Typography level="h5" mb={2}>
                            Department List
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

export default DepartmentMaster