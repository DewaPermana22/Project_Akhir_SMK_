import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';
const GuardianRoute = ({children, allowedRoles}) => {
    const {user, isAuth} = useSelector((state) => state.user);
    if (!isAuth) return <Navigate to="/" replace/>
    if (children && !allowedRoles.includes(user?.role)) return <Navigate to="/unauthorize" replace/>
  return (
    <>{children}</>
  )
}

export default GuardianRoute