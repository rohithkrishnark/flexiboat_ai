import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Intro from "./Intro";
import Login from "../src/UserManagement/Login";
import Home from "./Home";
import Signup from "./UserManagement/SignUp";
import AdminDashBoard from "./ADMIN/Dasboard/AdminDashBoard";
import AdminLayout from "./ADMIN/AdminLayout/AdminLayout";
import UploadTraining from "./ADMIN/AdminPdfUpload/UploadTraining";
import AddNewFaculity from "./ADMIN/AdminFacultyAdding/AddNewFaculity";
import ViewFaculityActivity from "./ADMIN/AdminFacultyAdding/ViewFaculityActivity";
import AddAlumin from "./ADMIN/Alumini/AddAlumin";
import ViewAlumini from "./ADMIN/Alumini/ViewAlumini";
import InstantAlert from "./ADMIN/AlertSystem.jsx/InstantAlert";
import Settings from "./ADMIN/Settings/Settings";
import DepartmentMaster from "./ADMIN/Settings/DepartmentMaster/DepartmentMaster";
import ProgramDetailMaster from "./ADMIN/Settings/Program Detail Master/ProgramDetailMaster";
import ProgramMaster from "./ADMIN/Settings/Program Master/ProgramMaster";
import DesignationMaster from "./ADMIN/Settings/Designation Master/DesignationMaster";
import UserGroupMaster from "./ADMIN/Settings/User Group Master/UserGroupMaster";
import FaculityLayout from "./FACULITY/FaculityLayout/FaculityLayout";
import FaculityDashboard from "./FACULITY/FaculityDashboard/FaculityDashboard";
import StudentActionDetail from "./FACULITY/DepartmentStudent/StudentActionDetail";
import AddStudentDetail from "./FACULITY/DepartmentStudent/AddStudentDetail";
import AboutExploration from "./WebFrontDesign/Pages/AboutExploration";
import FaculityAssignement from "./FACULITY/FaculityAssignement/FaculityAssignement";
import ChatBot from "./Chatbot/ChatBot";
import AluminiLayout from "./ALUMINI/AluminiLayout/AluminiLayout";
import WorkingPage from "./Component/WorkingPage";
import AlumniDashboard from "./ALUMINI/AluminiDashboard/AlumniDashboard";
import MyProfile from "./ALUMINI/AluminiProfile/MyProfile";
import PostJob from "./ALUMINI/AluminiJob/PostJob";
import MyJobs from "./ALUMINI/AluminiJob/Myjobs";
import EventDetail from "./ALUMINI/AluminiEvent/EventDetail";
import ViewEvetnDetail from "./ALUMINI/AluminiEvent/ViewEvetnDetail";
import Network from "./ALUMINI/AluminiCommunitiy/Network";
import ChatPage from "./ALUMINI/AluminiCommunitiy/ChatPage";
import AluminiNotification from "./ALUMINI/AluminiProfile/AluminiNotification";
import MyNetwork from "./ALUMINI/AluminiCommunitiy/MyNetwork";
import StudentLayout from "./STUDENTS/StudentLayout/StudentLayout";
import StudentDashboard from "./STUDENTS/StudentDashboard/StudentDashboard";
import StudentPost from "./STUDENTS/StudentPost/StudentPost";
import StudentViewPost from "./STUDENTS/StudentPost/StudentViewPost";
import MyParticipation from "./STUDENTS/StudentActivity/MyParticiaption";
import ViewActivities from "./STUDENTS/StudentActivity/ViewActivites";
import FindAlumini from "./STUDENTS/StudentAlumini/FindAlumini";
import MyConnection from "./STUDENTS/StudentAlumini/MyConnection";
import StudentAlert from "./STUDENTS/StudentAlert/StudentAlert";
import StudentProfile from "./STUDENTS/StudentProfile/StudentProfile";
import StudentChat from "./STUDENTS/StudentChat/StudentChat";
import Facultychat from "./FACULITY/FaculityChat/Facultychat";
import ReviewActitivity from "./FACULITY/ReviewActivity/ReviewActitivity";
import FaculityAlertNotification from "./FACULITY/FaculityAlerts/FaculityAlertNotification";
import StudentGlobalView from "./STUDENTS/StudentGlobalView/StudentGlobalView";
import AluminiGlobalView from "./ALUMINI/AluminiGlobal/AluminiGlobalView";
import AluminiStudentList from "./ALUMINI/AluminiStudents/AluminiStudentList";
import AuthProtectedRoute from "./Utils/Protected/RoleProtectedRoute";

// import HomeDashboard from "./HomeDashboard";
// import Profile from "./Profile";
// import Settings from "./Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
    errorElement: <h1 className="text-center mt-10">Page Not Found</h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <Home />, // layout
  },
  {
    path: "/about",
    element: <AboutExploration />, // layout
  },
  {
    path: "/chat",
    element: <ChatBot />, // layout
  },
  {
    path: "/faculity",
    element: (
      <AuthProtectedRoute allowedRoles={["faculty"]}>
        <FaculityLayout />
      </AuthProtectedRoute>
    ), // layoutAdminLayout
    children: [
      {
        path: "",
        // index: true,
        element: <FaculityDashboard />,
      },
      {
        path: "addstudents",
        element: <AddStudentDetail />,
      },
      {
        path: "viewstudents",
        element: <StudentActionDetail />,
      },
      {
        path: "addstudents/:id",
        element: <AddStudentDetail />,
      },
      {
        path: "facassignment",
        element: <FaculityAssignement />,
      },
      {
        path: "faculitychat",
        element: <Facultychat />,
      },
      {
        path: "reviewactivity",
        element: <ReviewActitivity />,
      },
      {
        path: "alerts",
        element: <FaculityAlertNotification />,
      },
      {
        path: "*",
        element: <WorkingPage />, //  fallback inside alumni
      },
      ,
    ],
  },
  {
    path: "/admin",
    element: (
      <AuthProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </AuthProtectedRoute>
    ), // layoutAdminLayout
    children: [
      {
        path: "",
        // index: true,
        element: <AdminDashBoard />,
      },
      {
        path: "uploadpdf",
        element: <UploadTraining />,
      },
      {
        path: "addfaculity",
        element: <AddNewFaculity />,
      },
      {
        path: "viewfaculity",
        element: <ViewFaculityActivity />,
      },
      {
        path: "addalumin",
        element: <AddAlumin />,
      },
      {
        path: "addalumin/:id",
        element: <AddAlumin />,
      },
      {
        path: "viewalumini",
        element: <ViewAlumini />,
      },
      {
        path: "alert",
        element: <InstantAlert />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "depmaster",
        element: <DepartmentMaster />,
      },
      {
        path: "programdtlmast",
        element: <ProgramDetailMaster />,
      },
      {
        path: "programmast",
        element: <ProgramMaster />,
      },
      {
        path: "designation",
        element: <DesignationMaster />,
      },
      {
        path: "usergroup",
        element: <UserGroupMaster />,
      },
      ,
    ],
  },
  {
    path: "/alumini",
    element: (
      <AuthProtectedRoute allowedRoles={["alumni"]}>
        <AluminiLayout />
      </AuthProtectedRoute>
    ), // alumini Layout
    children: [
      {
        path: "",
        // index: true,
        element: <AlumniDashboard />,
      },
      {
        path: "profile",
        element: <MyProfile />,
      },
      {
        path: "post-job",
        element: <PostJob />,
      },
      {
        path: "post",
        element: <MyJobs />,
      },
      {
        path: "create-jobfair",
        element: <EventDetail />,
      },
      {
        path: "job-fair",
        element: <ViewEvetnDetail />,
      },
      {
        path: "network",
        element: <Network />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
      {
        path: "notification",
        element: <AluminiNotification />,
      },
      {
        path: "follower",
        element: <MyNetwork />,
      },
      {
        path: "aluminiglobal/:id",
        element: <AluminiGlobalView />,
      },
      {
        path: "allstudents",
        element: <AluminiStudentList />,
      },
      {
        path: "*",
        element: <WorkingPage />, //  fallback inside alumni
      },
      ,
    ],
  },
  {
    path: "/common",
    // element: <StudentLayout />, // alumini Layout
    children: [
      {
        path: "aluminiglobal/:id",
        element: <AluminiGlobalView />,
      },
      {
        path: "studetnglobalview/:id",
        element: <StudentGlobalView />,
      },

      ,
    ],
  },
  {
    path: "/students",
    element: (
      <AuthProtectedRoute allowedRoles={["student"]}>
        <StudentLayout />
      </AuthProtectedRoute>
    ),
    children: [
      {
        path: "",
        // index: true,
        element: <StudentDashboard />,
      },
      {
        path: "create-post",
        element: <StudentPost />,
      },
      {
        path: "my-posts",
        element: <StudentViewPost />,
      },
      {
        path: "my-activities",
        element: <MyParticipation />,
      },
      {
        path: "view-activities",
        element: <ViewActivities />,
      },
      {
        path: "find-alumni",
        element: <FindAlumini />,
      },
      {
        path: "alumni-posts",
        element: <AlumniDashboard />,
      },
      {
        path: "my-connections",
        element: <MyConnection />,
      },
      {
        path: "alerts",
        element: <StudentAlert />,
      },
      {
        path: "view-profile",
        element: <StudentProfile />,
      },
      {
        path: "studentchat",
        element: <StudentChat />,
      },
      // {
      //   path: "studetnglobalview/:id",
      //   element: <StudentGlobalView />,
      // },

      {
        path: "*",
        element: <WorkingPage />, //  fallback inside alumni
      },
      ,
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
