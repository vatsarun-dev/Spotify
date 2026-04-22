import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../../feature/auth/ui/pages/Login";
import Register from "../../feature/auth/ui/pages/Register";
import HomePage from "../../feature/dashboard/ui/pages/HomePage";
import { getAuthSession } from "../../utils/authStorage";

const RequireAuth = ({ children }) => {
  return getAuthSession() ? children : <Navigate to="/login" replace />;
};

const RedirectIfAuthenticated = ({ children }) => {
  return getAuthSession() ? <Navigate to="/dashboard" replace /> : children;
};

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RedirectIfAuthenticated>
          <AuthLayout />
        </RedirectIfAuthenticated>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="login" replace />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>
      ),
      children: [
        {
          path: "",
          element: <HomePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
