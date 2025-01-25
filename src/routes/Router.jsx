import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";
import MyDonationRequest from "../pages/MyDonationRequest";
import Blogs from "../pages/Blogs";
import AllDonationRequest from "../pages/AllDonationRequest";
import UserProfile from "../pages/UserProfile";
import CreateDonationRequest from "../pages/CreateDonationRequest";
import AdminRoutes from "./AdminRoutes";

export const router = createBrowserRouter([
   {
      path: '/',
      element: <MainLayout></MainLayout>,
      children: [
         {
            path: '/',
            element: <Home></Home>
         },
         {
            path: '/blogs',
            element: <Blogs></Blogs>
         },
         {
            path: '/donation-requests',
            element: <AllDonationRequest></AllDonationRequest>
         }
      ]
   },
   {
      path: '/dashboard',
      element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
      children: [
         {
            index: true,
            element: <PrivateRoutes>
               <DashboardHome></DashboardHome>
            </PrivateRoutes>
         },
         {
            path: '/dashboard/my-donation-requests',
            element: <PrivateRoutes>
               <MyDonationRequest></MyDonationRequest>
            </PrivateRoutes>
         },
         {
            path: '/dashboard/profile',
            element: <PrivateRoutes>
               <UserProfile></UserProfile>
            </PrivateRoutes>
         },
         {
            path: '/dashboard/create-donation-request',
            element: <PrivateRoutes>
               <CreateDonationRequest></CreateDonationRequest>
            </PrivateRoutes>
         }
      ]
   },
   {
      path: '/auth/sign-up',
      element: <Register></Register>
   },
   {
      path: '/auth/sign-in',
      element: <Login></Login>
   },
   {
      path: '*',
      element: <ErrorPage></ErrorPage>
   }
])