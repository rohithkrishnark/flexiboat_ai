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
    children: [
      // {
      //   index: true,
      //   element: <HomeDashboard />,
      // },
      // {
      //   path: "profile",
      //   element: <Profile />,
      // },
      // {
      //   path: "settings",
      //   element: <Settings />,
      // },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />, // layoutAdminLayout
    children: [
      {
        path: "admindashboard",
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
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
