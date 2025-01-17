import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/Register";
import Login from "../pages/Login";

export const router = createBrowserRouter([
   {
      path: '/',
      element: <MainLayout></MainLayout>,
      children: [
         {
            path: '/',
            element: <Home></Home>
         },
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