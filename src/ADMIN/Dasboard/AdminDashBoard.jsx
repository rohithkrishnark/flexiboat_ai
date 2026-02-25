import { Box } from '@mui/joy'
import InfoCard from '../Dasboard/DashboardComponents/InfoCard'
import FAQAnalytics from './DashboardComponents/FAQAnalytics'
import UserFeedbackWithChart from './DashboardComponents/UserFeedbackWithChart';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SocialMediaCard from './DashboardComponents/SocialMediaCard';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
const AdminDashBoard = () => {

  return (
    <Box
      sx={{
        width: '100%',
        // height: 120
      }}
    >
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

      <Box
        sx={{
          width: '98%',
          height: 350,
          display: 'flex',
          gap: 1,
        }}>
        <Box sx={{
          width: '60%',
          height: '100%',
          bgcolor: '#fff',
          boxShadow: 'lg',
          borderRadius: 5
        }}>
          <FAQAnalytics />
        </Box>
        <Box
          sx={{
            width: '40%',
            height: '100%',
            bgcolor: '#fff',
            boxShadow: 'lg',
            borderRadius: 5,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <UserFeedbackWithChart />
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          height: 100,
          display: 'flex',
          gap: 1,
          mt: 1
        }}
      >
        <SocialMediaCard
          title="Instagram"
          description="Follow us on Instagram"
          icon={<InstagramIcon sx={{ color: '#E1306C' }} />}
          link="https://instagram.com/yourpage"
          color="#E1306C"
        />

        <SocialMediaCard
          title="Twitter"
          description="Latest updates"
          icon={<TwitterIcon sx={{ color: '#1DA1F2' }} />}
          link="https://twitter.com/yourpage"
          color="#1DA1F2"
        />

        <SocialMediaCard
          title="LinkedIn"
          description="Connect with us"
          icon={<LinkedInIcon sx={{ color: '#af208e' }} />}
          link="https://linkedin.com/company/yourpage"
          color="#af208e"
        />
        <SocialMediaCard
          title="Facebook"
          description="Whats Going On There"
          icon={<FacebookTwoToneIcon sx={{ color: '#0A66C2' }} />}
          link="https://linkedin.com/company/yourpage"
          color="#0A66C2"
        />
      </Box>

    </Box>
  )
}

export default AdminDashBoard