import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupsIcon from "@mui/icons-material/Groups";
// import DescriptionIcon from "@mui/icons-material/Description";
// import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
// import ChatIcon from "@mui/icons-material/Chat";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
export const FACULTY_MENU = [
  {
    label: "Dashboard",
    icon: DashboardCustomizeIcon,
    path: "",
  },
  // STUDENTS
  {
    label: "Add Student",
    icon: PersonAddAlt1Icon,
    path: "addstudents",
  },
  {
    label: "View Students",
    icon: GroupsIcon,
    path: "viewstudents",
  },

  // DOCUMENTS / ASSIGNMENT
  // {
  //   label: "Add Documents",
  //   icon: DescriptionIcon,
  //   path: "facassignment",
  // },
  // {
  //   label: "Chat",
  //   icon: ChatIcon,
  //   path: "faculitychat",
  // },
  {
    label: "Review Activity",
    icon: EmojiEventsIcon,
    path: "reviewactivity",
  },
  {
    label: "Alerts",
    icon: NotificationsActiveIcon,
    path: "alerts",
  },
  // SETTINGS
  // {
  //   label: "Settings",
  //   icon: SettingsSuggestIcon,
  //   path: "settings",
  // },
];
