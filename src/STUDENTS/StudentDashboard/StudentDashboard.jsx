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
import { getAuthUser } from '../../constant/Constant';
import { useFetchMyConnections, useFetchSingleStudentActivity, useFetchSingleStudentPost } from '../../ADMIN/CommonCode/useQuery';
import { getWeeklyCount, getWeeklyStats } from '../../ADMIN/CommonCode/Reusable';
// import InfoCard from '../../ADMIN/Dasboard/DashboardComponents/InfoCard';
// import SocialMediaCard from '../../ADMIN/Dasboard/DashboardComponents/SocialMediaCard';
// import ActivityAverageAnalytics from './ActivityAverageAnalytics';
// import FacultyGradeDistribution from './FacultyGradeDistribution';
const StudentDashboard = () => {


    const user = getAuthUser();
    const std_id = user?.user_id;

    const { data: studetnActivityDetail = [] } = useFetchSingleStudentActivity(std_id ?? null);
    const { data: StudentPostDetail = [] } = useFetchSingleStudentPost(std_id ?? null);
    const { data: connections = [] } =
        useFetchMyConnections({
            user_id: std_id,
            user_type: "student",
        });



    const totalScore = studetnActivityDetail?.reduce(
        (sum, item) => sum + (item.activity_score || 0),
        0
    );
    const totalAcitivity = studetnActivityDetail?.length;
    const totalPosts = StudentPostDetail?.length;
    const totalConnections = connections?.length;
    const { weeklyActivity, weeklyScore } = getWeeklyStats(studetnActivityDetail);
    const weeklyReports = getWeeklyCount(StudentPostDetail);
    const weeklyConnections = getWeeklyCount(connections);



    console.log({
        studetnActivityDetail
    });


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
                    total={totalAcitivity}
                    weeklyData={weeklyActivity}
                    color="#6366f1"
                />

                <InfoCard
                    title="Activity Points"
                    total={totalScore}
                    weeklyData={weeklyScore}
                    color="#22c55e"
                />

                <InfoCard
                    title="Total Posts"
                    total={totalPosts}
                    weeklyData={weeklyReports}
                    color="#f59e0b"
                />

                <InfoCard
                    title="My Connections"
                    total={totalConnections}
                    weeklyData={weeklyConnections}
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
                    <FacultyGradeDistribution data={studetnActivityDetail} />
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
