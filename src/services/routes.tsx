import { Navigate, Outlet } from "react-router-dom";
import DashboardHome from "../pages/dashboard/home/home";
import Logout from "../pages/dashboard/logout/logout";
import Profile from "../pages/dashboard/profile/profile";
import LandingHome from "../pages/landing/home/Home";
import Login from "../pages/landing/login/login";
import Register from "../pages/landing/register/register";
import SwitchUser from "../shared/dashboard/switchUser/switchUser";
import OTP from "../shared/otp/otp";

const routes = (isLoggedIn = false) => [
  {
    path: "/dashboard",
    element: isLoggedIn ? <Outlet /> : <Navigate to="/" />,
    children: [
      { path: "/dashboard", element: <DashboardHome /> },
      { path: "/dashboard/profile", element: <Profile /> },
    ],
  },
  {
    path: "/switch/user",
    element: isLoggedIn ? <SwitchUser /> : <Navigate to="/" />,
  },
  {
    path: "/logout",
    element: isLoggedIn ? <Logout /> : <Navigate to="/" />,
  },
  {
    path: "/",
    element: <Outlet />,
    children: [
      { path: "/", element: <LandingHome /> },
      {
        path: "/auth",
        element: <Outlet />,
        children: [
          { path: "/auth/login", element: <Login /> },
          { path: "/auth/otp", element: <OTP /> },
          { path: "/auth/register", element: <Register /> },
        ],
      },
    ],
  },
];

export default routes;
