import { Box } from '@mui/joy'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../Components/AdminSideBar'
import AdminTopBar from '../Components/AdminTopBar'

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <AdminSideBar />

      {/* Right side */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Navbar */}
        <AdminTopBar />

        {/* Page Content */}
        <Box sx={{ flex: 1, p: 2, bgcolor: '#f9fafb', overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default AdminLayout