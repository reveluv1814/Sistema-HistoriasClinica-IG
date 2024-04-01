import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAllowed, children, redirectTo = "/" }) {
  console.log(isAllowed)
  if (!isAllowed) {
    return <Navigate to="/" />;
  }
  return children ? children : <Outlet />;
}
export default ProtectedRoute;
