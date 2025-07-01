import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import SignUpSecondStep from "../pages/SignUpSecondStep";
import MyIdeas from "../pages/MyIdeas";
import AllIdeas from "../pages/ExploreStartupIdeas";
import FeaturedIdeas from "../pages/FeaturedIdeas";

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
      { path: "/MyIdeas", element: <MyIdeas/> },
      { path: "/AllIdeas", element:<AllIdeas/>  },
      { path: "/FeaturedIdeas", element:<FeaturedIdeas/>  },


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
