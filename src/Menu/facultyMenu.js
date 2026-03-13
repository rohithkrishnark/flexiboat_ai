import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";

export const FACULTY_MENU = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    path: "dashboard",
  },
  {
    label: "Students",
    icon: SchoolIcon,
    nested: [
      {
        label: "Add New",
        path: "addstudents",
      },
      {
        label: "View Details",
        path: "viewstudents",
      },
    ],
  },
  {
    label: "Assignments",
    icon: AssignmentIcon,
    path: "assignments",
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    path: "settings",
  },
];
