import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import LandingPage from "../pages/LandingPage"
import SignUp from "../Component/SignUpFirstStep"
import SignIn from "../pages/SignIn"
import SignUpSecondStep from "../Component/SignUpSecondStep"
import SubmitIdeaForm from "../pages/SubmitIdeaForm"
import MyIdeas from "../pages/MyIdeas"
import AllIdeas from "../pages/ExploreStartupIdeas"
import FeaturedIdeas from "../pages/FeaturedIdeas"
import IdeaAnalysis from "../pages/IdeaAnalysis"
import IdeaDetails from "../pages/IdeaDetails"
import ScheduleMeetingForm from "../pages/ScheduleMeetingForm"
import SignUpForm from "../pages/SignUp"
import AdminLogin from "../admin/pages/AdminLogin"
import AdminDashboard from "../admin/pages/AdminDashboard"
import ManageComments from "../admin/pages/ManageComments"
import WatchMeetings from "../pages/WatchMeetings"
import Nav from "../user/components/Nav"

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
     /*  { path: "/", element: <LandingPage /> },
      { path: "/signup", element: <SignUpForm /> },
      { path: "/signin", element: <SignIn /> }, */
      { path: "/submitIdea", element: <SubmitIdeaForm /> },
      { path: "/MyIdeas", element: <MyIdeas /> },
      { path: "/AllIdeas", element: <AllIdeas /> },
      { path: "/FeaturedIdeas", element: <FeaturedIdeas /> },
      { path: "/IdeaAnalysis/:id", element: <IdeaAnalysis /> },
      { path: "/detailIdea/:id", element: <IdeaDetails /> },
      { path: "/watchMeeting", element: <WatchMeetings /> },
      //{ path: "/profile", element: <UserProfile/> },
    ],
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      { index: true, element: <AdminLogin /> },
      { path: "adminDashboard", element: <AdminDashboard /> },
      { path: "manageComments", element: <ManageComments /> },
    ],
  },
  {
    path: "/",
    children: [
      { index: true, path: "/", element: <LandingPage /> },
      { path: "/signup", element: <SignUpForm /> },
      { path: "/signin", element: <SignIn /> },
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
])

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
