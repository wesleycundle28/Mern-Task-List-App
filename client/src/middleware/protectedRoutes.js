import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UseAuthContext } from "./auth";

const ProtectedRoutes = () => {
  const { useAuth } = useContext(UseAuthContext);
  return useAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
