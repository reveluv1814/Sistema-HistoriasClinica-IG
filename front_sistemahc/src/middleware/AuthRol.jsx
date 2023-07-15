import { Navigate } from "react-router-dom";

const isAdmin = localStorage.getItem("rol") === "admin";

const AuthRol = ({ element: Element, ...rest }) => {
  return isAdmin ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/not-found" replace={true} />
  );
};


export default AuthRol