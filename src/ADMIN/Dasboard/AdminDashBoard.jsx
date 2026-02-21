import { Box } from '@mui/joy'
import InfoCard from '../Dasboard/DashboardComponents/InfoCard'

const AdminDashBoard = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 120,
        display: 'flex',
        gap: 1
      }}
    >
      <InfoCard
        title="Total Alumni"
        total={120}
        weeklyData={[12, 15, 14, 20, 18, 22, 19]}
        color="#6366f1"
      />

      <InfoCard
        title="Total Users"
        total={540}
        weeklyData={[50, 62, 70, 65, 80, 75, 90]}
        color="#22c55e"
      />

      <InfoCard
        title="Total Faculty"
        total={45}
        weeklyData={[5, 6, 4, 8, 7, 9, 6]}
        color="#f59e0b"
      />

      <InfoCard
        title="Total Students"
        total={890}
        weeklyData={[90, 110, 105, 130, 125, 140, 150]}
        color="#ef4444"
      />
    </Box>
  )
}

export default AdminDashBoard