import { Box } from '@mui/joy'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../Components/AdminSideBar'
import AdminTopBar from '../Components/AdminTopBar'

const AdminLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',   //  important
        overflow: 'hidden' //  prevent full page scroll
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          height: '100vh',  //  full height
          flexShrink: 0
        }}
      >
        <AdminSideBar />
      </Box>

      {/* Right side */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100vh'
        }}
      >
        {/* Top Navbar */}
        <Box sx={{ flexShrink: 0 }}>
          <AdminTopBar />
        </Box>

        {/* Scrollable Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',  //  only this scrolls
            p: 2,
            bgcolor: '#f9fafb'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default AdminLayout