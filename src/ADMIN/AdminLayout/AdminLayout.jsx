import { Box } from '@mui/joy'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../Components/AdminSideBar'
import AdminTopBar from '../Components/AdminTopBar'
// import AdminSideBar from '../Components/AdminSideBar'
// import AdminTopBar from '../Components/AdminTopBar'

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <AdminSideBar />

      {/* Right side */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
        <AdminTopBar />

        {/* Page Content */}
        <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#f9fafb',m:1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default AdminLayout