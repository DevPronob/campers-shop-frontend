import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, IUser } from "@/redux/api/features/auth/authSlice";

interface PrivateRouteProps {
  children: JSX.Element;
  role?: string; 
}

function PrivateRoute({ children, role }: PrivateRouteProps) {
  const user = useSelector(selectCurrentUser) as IUser | null;
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
