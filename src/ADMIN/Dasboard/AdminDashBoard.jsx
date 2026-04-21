import { Box } from '@mui/joy'
import InfoCard from '../Dasboard/DashboardComponents/InfoCard'
import FAQAnalytics from './DashboardComponents/FAQAnalytics'
import UserFeedbackWithChart from './DashboardComponents/UserFeedbackWithChart';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SocialMediaCard from './DashboardComponents/SocialMediaCard';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import { useFetchAllActiveStudents, useFetchAllAlumini, useFetchAllEnqiury, useFetchAllFaculity } from '../CommonCode/useQuery';
import { useMemo } from 'react';
const AdminDashBoard = () => {

  const { data: AllAluminiDetail = [], isLoading: LoadingAlumini, } = useFetchAllAlumini();
  const { data: AllStudentData = [] } = useFetchAllActiveStudents();
  const { data: AllFaculityDetail } = useFetchAllFaculity();
  const { data: filtered = [] } = useFetchAllEnqiury();

  const yearDistribution = useMemo(() => {
    const map = {};

    AllStudentData?.forEach((s) => {
      const key = s.program_year_name || "Unknown";
      map[key] = (map[key] || 0) + 1;
    });

    return Object.values(map);
  }, [AllStudentData]);

  const alumniExperienceData = useMemo(() => {
    const map = {};

    AllAluminiDetail?.forEach((a) => {
      const exp = a.alum_experience || "0";
      map[exp] = (map[exp] || 0) + 1;
    });

    return Object.values(map);
  }, [AllAluminiDetail]);

  const facultyDeptData = useMemo(() => {
    const map = {};

    AllFaculityDetail?.forEach((f) => {
      const dept = f.dep_name || "Unknown";
      map[dept] = (map[dept] || 0) + 1;
    });

    return Object.values(map);
  }, [AllFaculityDetail]);


  const enquiryTrend = useMemo(() => {
    const map = {};

    filtered?.forEach((e) => {
      const date = new Date(e.created_at).toLocaleDateString();
      map[date] = (map[date] || 0) + 1;
    });

    return Object.values(map);
  }, [filtered]);


  

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
          total={AllAluminiDetail?.length}
          weeklyData={alumniExperienceData}
          color="#6366f1"
        />

        <InfoCard
          title="Total Students"
          total={AllStudentData?.length}
          weeklyData={yearDistribution}
          color="#22c55e"
        />

        <InfoCard
          title="Total Faculty"
          total={AllFaculityDetail?.length}
          weeklyData={facultyDeptData}
          color="#f59e0b"
        />

        <InfoCard
          title="Total Enquiry"
          total={filtered?.length}
          weeklyData={enquiryTrend}
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