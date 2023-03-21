import { Route, Routes, Navigate ,useLocation } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import NotFound from "./Pages/NotFound";
import RecoveryPage from "./Pages/RecoveryPage";
import Admin from "./Pages/AdminPage";
import Navbar from "./Components/Navbar";
import Footer from './Components/Footer'
import ChangePassword from "./Pages/ChangePassword";
import ProtectedRoute from "./Components/Protected";
import { useContext, useEffect, useState } from "react";
import { contextUser } from "./Context/ContextUser";

function App() {
  const { user } = useContext(contextUser);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  function renderElement(Component) {
    return isLoggedIn ? <Component /> : <Navigate to="/login" />;
  }


  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div className=" h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={renderElement(Admin)} />

        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route
          element={
            <ProtectedRoute isAllowed={!!user.rol && user.rol === "admin"} />
          }
        >
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;
