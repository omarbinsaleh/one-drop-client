import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './providers/AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router.jsx'
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>

    <ToastContainer
      containerId={"registerId"}
      position="top-right"
      autoClose={5000}
      closeOnClick={true}
      pauseOnHover={true}
      transition={"Bounce"}
    /><ToastContainer />

    <Toaster />
  </StrictMode>,
)
