import { Box } from '@mui/joy'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InfoCard from '../../ADMIN/Dasboard/DashboardComponents/InfoCard';
import ActivityAverageAnalytics from '../../FACULITY/FaculityDashboard/ActivityAverageAnalytics';
import FacultyGradeDistribution from '../../FACULITY/FaculityDashboard/FacultyGradeDistribution';
import SocialMediaCard from '../../ADMIN/Dasboard/DashboardComponents/SocialMediaCard';
import MonthlyHeatmap from './MonthlyHeatmap';
// import InfoCard from '../../ADMIN/Dasboard/DashboardComponents/InfoCard';
// import SocialMediaCard from '../../ADMIN/Dasboard/DashboardComponents/SocialMediaCard';
// import ActivityAverageAnalytics from './ActivityAverageAnalytics';
// import FacultyGradeDistribution from './FacultyGradeDistribution';
const StudentDashboard = () => {

    return (
        <Box
            sx={{
                width: '100%',
                // height: 120
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: 120,
                    display: "flex",
                    gap: 1,
                }}
            >
                <InfoCard
                    title="My Activities"
                    total={12}
                    weeklyData={[1, 2, 1, 3, 2, 2, 1]}
                    color="#6366f1"
                />

                <InfoCard
                    title="Activity Points"
                    total={240}
                    weeklyData={[20, 30, 25, 40, 35, 50, 40]}
                    color="#22c55e"
                />

                <InfoCard
                    title="Assignments Submitted"
                    total={18}
                    weeklyData={[2, 3, 2, 4, 3, 2, 2]}
                    color="#f59e0b"
                />

                <InfoCard
                    title="Pending Tasks"
                    total={5}
                    weeklyData={[1, 1, 0, 1, 1, 0, 1]}
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
                    <MonthlyHeatmap />
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
                    <FacultyGradeDistribution />
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

export default StudentDashboard
