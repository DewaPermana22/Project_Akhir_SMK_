import { useAuth } from '../contexts/AuthContext';

const GuardianRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorize" replace />;
  }

  return children;
};

export default GuardianRoute;