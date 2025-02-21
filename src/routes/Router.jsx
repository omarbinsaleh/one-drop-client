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
import UserProfile from "../pages/UserProfile";
import CreateDonationRequest from "../pages/CreateDonationRequest";
import AdminRoutes from "./AdminRoutes";
import UpdateDonationRequest from "../pages/UpdateDonationRequest";
import AllUsers from "../pages/AllUsers";
import AllDonationRequests from "../pages/AllDonationRequests";
import AllPendingDonationRequests from "../pages/AllPendingDonationRequests";
import DonationRequestDetails from "../pages/DonationRequestDetails";
import ContentManagement from "../pages/ContentManagement";
import AddBlog from "../pages/AddBlog";
import EditBlog from "../pages/EditBlog";
import AdminAndVolunteerRoutes from "./AdminAndVolunteerRoutes";

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
            element: <AllPendingDonationRequests></AllPendingDonationRequests>
         },
         {
            path: '/donation-requests/:id',
            element: <PrivateRoutes>
               <DonationRequestDetails></DonationRequestDetails>
            </PrivateRoutes>
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
            path: '/dashboard/update-donation-request/:id',
            element: <PrivateRoutes>
               <UpdateDonationRequest></UpdateDonationRequest>
            </PrivateRoutes>,
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
         },
         {
            path: '/dashboard/all-users',
            element: <AdminRoutes>
               <AllUsers></AllUsers>
            </AdminRoutes>
         },
         {
            path: '/dashboard/all-donation-requests',
            element: <AdminAndVolunteerRoutes>
               <AllDonationRequests></AllDonationRequests>
            </AdminAndVolunteerRoutes>
         },
         {
            path: '/dashboard/content-management',
            element: <AdminAndVolunteerRoutes>
               <ContentManagement></ContentManagement>
            </AdminAndVolunteerRoutes>
         },
         {
            path: '/dashboard/content-management/add-blog',
            element: <AdminAndVolunteerRoutes>
               <AddBlog></AddBlog>
            </AdminAndVolunteerRoutes>
         },
         {
            path: '/dashboard/content-management/blogs/edit/:blogId',
            element: <AdminAndVolunteerRoutes>
               <EditBlog></EditBlog>
            </AdminAndVolunteerRoutes>
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