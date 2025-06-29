import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";

import React from "react";
import { Outlet } from "react-router";
import LandingPage from "../pages/LandingPage";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <LandingPage /> }],
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [{ path: "/", element: <LandingPage /> }],
  },
  {
    path: "/investor",
    element: <Layout />,
    children: [{ path: "/", element: <LandingPage /> }],
  },
  {
    path: "/founder",
    element: <Layout />,
    children: [{ path: "/", element: <LandingPage /> }],
  },
  {
    path: "/critic",
    element: <Layout />,
    children: [{ path: "/", element: <LandingPage  /> }],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
