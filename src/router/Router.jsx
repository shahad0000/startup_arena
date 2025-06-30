import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import SignUpSecondStep from "../pages/SignUpSecondStep";

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
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signupTwo", element: <SignUpSecondStep /> },
      { path: "/signin", element: <SignIn /> },
    ],
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      // { path: "/", element: <LandingPage /> }
    ],
  },
  {
    path: "/investor",
    element: <Layout />,
    children: [
      // { path: "/", element: <LandingPage /> }
    ],
  },
  {
    path: "/founder",
    element: <Layout />,
    children: [
      // { path: "/", element: <LandingPage /> }
    ],
  },
  {
    path: "/critic",
    element: <Layout />,
    children: [
      // { path: "/", element: <LandingPage /> }
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
