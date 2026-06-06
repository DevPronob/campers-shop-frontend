import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
interface IUser {
  role: "admin" | "USER";
}
interface RootState {
  auth: {
    user: IUser | null;
    token: string | null;
  };
}
interface PrivateRouteProps {
  children: React.ReactNode;
  role?: "admin" | "USER" | Array<"admin" | "USER">;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const location = useLocation();

  const { user, token } = useSelector((state: RootState) => state.auth);
  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];

    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;