import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../components/About";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/Register";

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
      path: '*',
      element: <ErrorPage></ErrorPage>
   }
])