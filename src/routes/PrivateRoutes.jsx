import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./../store/auth.store";

const PrivateRoutes = ({ roles }) => {
  const { user, isAuthenticated} = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
