import { Box } from '@mui/joy'

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InfoCard from '../../ADMIN/Dasboard/DashboardComponents/InfoCard';
import SocialMediaCard from '../../ADMIN/Dasboard/DashboardComponents/SocialMediaCard';
import ActivityAverageAnalytics from './ActivityAverageAnalytics';
import FacultyGradeDistribution from './FacultyGradeDistribution';
import { getAuthUser } from '../../constant/Constant';
import { useFetchAllStudentDetail, useFetchAllStudtentAcitivty } from '../../ADMIN/CommonCode/useQuery';
import { getWeeklyStats } from '../../ADMIN/CommonCode/Reusable';
import { useMemo } from 'react';
const FaculityDashboard = () => {


    const user = getAuthUser();

    const departmentId = user ? user.fac_dep_id : null;

    const { data: AllStudentData = [] } = useFetchAllStudentDetail(departmentId);

    console.log({
        AllStudentData
    });

    const { data: ActivityDetail = [] } =
        useFetchAllStudtentAcitivty(departmentId);

    //  FILTER COUNTS
    const approved = ActivityDetail.filter(
        (a) => a.given_staff && a.rejected === 0
    );

    const pending = ActivityDetail.filter(
        (a) => !a.given_staff && a.rejected === 0
    );

    const rejected = ActivityDetail.filter(
        (a) => a.rejected === 1
    );

    //  WEEKLY STATS
    const { weeklyActivity, weeklyScore } =
        getWeeklyStats(ActivityDetail);


    const yearDistribution = useMemo(() => {
        const map = {};

        AllStudentData?.forEach((s) => {
            const key = s.program_year_name || "Unknown";
            map[key] = (map[key] || 0) + 1;
        });

        return Object.values(map);
    }, [AllStudentData]);

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
                    title="Total Students"
                    total={AllStudentData?.length ?? 0}
                    weeklyData={yearDistribution}
                    color="#6366f1"
                />

                <InfoCard
                    title="Activity Approved"
                    total={approved.length}
                    weeklyData={weeklyScore} //  show score trend
                    color="#22c55e"
                />

                <InfoCard
                    title="Activity Pending"
                    total={pending.length}
                    weeklyData={weeklyActivity} //  show activity count
                    color="#f59e0b"
                />

                <InfoCard
                    title="Activity Rejected"
                    total={rejected.length}
                    weeklyData={weeklyActivity}
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
                    <ActivityAverageAnalytics data={ActivityDetail} />
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
                    <FacultyGradeDistribution data={ActivityDetail} />
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

export default FaculityDashboard
