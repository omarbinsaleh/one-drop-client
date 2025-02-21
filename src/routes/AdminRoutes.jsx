import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner'
import { Navigate, useLocation } from 'react-router-dom'

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();


  if (loading) {
    return <Spinner></Spinner>
  }

  if (user?.role !== 'admin') {
    return <Navigate to={'/auth/sign-in'} state={location.pathname} />
  }

  return children;

}

export default AdminRoutes
