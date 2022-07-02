import { Navigate, useLocation } from 'react-router-dom'
import { Loader } from 'components'
import { useAuthContext } from 'providers'

const withProtectedRoute = (Component, role = 'EMP') => {
  return (props) => {
    const { state } = useLocation()
    const { user, loading, error } = useAuthContext()
    // const token = localStorage.getItem('token')

    const pathname = state?.from?.pathname || '/'

    if (loading) return <Loader />

    if (!user || error) {
      return <Navigate to={pathname} />
    }

    if (user && user.role !== role) {
      const userPath = user.role === 'HR' ? '/hr/dashboard' : '/employee/dashboard'
      return <Navigate to={userPath} />
    }
    return <Component {...props} user={user} />
  }
}

export default withProtectedRoute
