import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoutes = ({ children, allowedRoles }: ProtectedRoutesProps) => {
  const { token, email, role } = useAppSelector((state) => state.auth);

  if (!token || !email) {
    return <Navigate to="/adminlogin" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
