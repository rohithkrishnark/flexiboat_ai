import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Intro from "./Intro";
import Login from "../src/UserManagement/Login";
import Home from "./Home";
import Signup from "./UserManagement/SignUp";
import AdminDashBoard from "./ADMIN/Dasboard/AdminDashBoard";
import AdminLayout from "./ADMIN/AdminLayout/AdminLayout";

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
      // {
      //   path: "profile",
      //   element: <Profile />,
      // },
      // {
      //   path: "settings",
      //   element: <Settings />,
      // },
    ],
  }
  
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
