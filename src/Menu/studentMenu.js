import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CollectionsIcon from "@mui/icons-material/Collections";
import ExploreIcon from "@mui/icons-material/Explore";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArticleIcon from "@mui/icons-material/Article";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditDocumentIcon from "@mui/icons-material/EditDocument";

export const STUDENT_MENU = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    path: "",
  },

  // POSTS
  {
    label: "Create Post",
    icon: AddBoxIcon, // ➕ create
    path: "create-post",
  },
  {
    label: "My Posts",
    icon: CollectionsIcon, // 🖼 posts gallery
    path: "my-posts",
  },

  // ACTIVITIES
  {
    label: "View Activities",
    icon: ExploreIcon, // 🔍 explore
    path: "view-activities",
  },
  {
    label: "My Activities",
    icon: EmojiEventsIcon, // 🏆 achievements
    path: "my-activities",
  },

  // ALUMNI
  {
    label: "Alumni Posts",
    icon: ArticleIcon, // 📰 posts
    path: "alumni-posts",
  },
  {
    label: "Find Alumni",
    icon: PersonSearchIcon, // 🔎 search
    path: "find-alumni",
  },
  {
    label: "My Connections",
    icon: GroupAddIcon, // 👥 connections
    path: "my-connections",
  },

  // CHAT
  {
    label: "Chat",
    icon: ChatIcon, // 💬
    path: "studentchat",
  },

  {
    label: "View Documents",
    icon: EditDocumentIcon, // 🔔 active alerts
    path: "facdocument",
  },

  // ALERTS
  {
    label: "Alerts",
    icon: NotificationsActiveIcon, // 🔔 active alerts
    path: "alerts",
  },

  // PROFILE
  {
    label: "Profile",
    icon: AccountCircleIcon, // 👤 profile
    path: "view-profile",
  },
];
