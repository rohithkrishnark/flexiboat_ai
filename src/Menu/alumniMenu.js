import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import PostAddIcon from "@mui/icons-material/PostAdd";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SchoolIcon from '@mui/icons-material/School';

export const ALUMNI_MENU = [
  // DASHBOARD
  {
    label: "Dashboard",
    icon: DashboardIcon,
    path: "",
  },

  // JOBS
  {
    label: "My Jobs",
    icon: WorkIcon,
    path: "post",
  },
  {
    label: "Post Job",
    icon: PostAddIcon,
    path: "post-job",
  },

  // JOB FAIR
  {
    label: "Create Job Fair",
    icon: EventNoteIcon,
    path: "create-jobfair",
  },
  {
    label: "View Job Fair",
    icon: EventAvailableIcon,
    path: "job-fair",
  },

  // COMMUNITY
  {
    label: "Network",
    icon: GroupIcon,
    path: "network",
  },
  {
    label: "Chat",
    icon: ChatIcon,
    path: "chat",
  },
  {
    label: "My Followers",
    icon: PeopleAltIcon,
    path: "follower",
  },
{
    label: "Studetns",
    icon: SchoolIcon,
    path: "allstudents",
  },
  // PERSONAL
  {
    label: "Profile",
    icon: PersonIcon,
    path: "profile",
  },
  {
    label: "Notifications",
    icon: NotificationsIcon,
    path: "notification",
  },
];
