import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import About from "../components/About";

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
            path: '/about',
            element: <About></About>
         }
      ]
   },
   {
      path: '*',
      element: <NotFound></NotFound>
   }
])