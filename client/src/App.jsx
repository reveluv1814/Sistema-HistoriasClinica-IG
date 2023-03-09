import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import NotFound from "./Pages/NotFound";
import RecoveryPage from "./Pages/RecoveryPage";
import Admin from "./Pages/AdminPage";
import Navbar from "./Components/Navbar";
import ChangePassword from './Pages/ChangePassword'
import ProtectedRoute from "./Components/Protected";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect, useState } from "react";
import UserProvider, { contextUser } from "./hooks/context/ContextUser";

function App() {
  const { user } = useContext(contextUser);
  return (
    <>
      <div className="bg-zinc-100 h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/recovery" element={<RecoveryPage />} />
          <Route path="/change-password" element={<ChangePassword/>}/>
          <Route
            element={
              <ProtectedRoute isAllowed={!!user.rol && user.rol === "admin"} />
            }
            >
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
            </>
  );
}

export default App;
