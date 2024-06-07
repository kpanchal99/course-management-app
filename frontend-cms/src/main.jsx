import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import "react-toastify/dist/ReactToastify.css";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import { AdminHome } from "./pages/AdminHome.jsx";
import { CoursePage } from "./pages/CoursePage.jsx";
import { CourseDetailsPage } from "./pages/CourseDetailsPage.jsx";

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login isAdmin={false} />,
      },
      {
        path: "/signup",
        element: <Signup isAdmin={false} />,
      },
      {
        path: "adminlogin",
        element: <Login isAdmin={true} />,
      },
      {
        path: "adminhome",
        element: <AdminHome />,
      },
      {
        path: "course/:id",
        element: <CoursePage />,
      },
      {
        path: "/CourseDetailsPage/:id",
        element: <CourseDetailsPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
