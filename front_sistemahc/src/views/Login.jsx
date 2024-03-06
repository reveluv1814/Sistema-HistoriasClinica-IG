import React from "react";
import LoginForm from "./LoginComponents/FormLogin";
import { useThemeProvider } from "./../layouts/utils/ThemeContext";
import NavbarLogin from "./../layouts/pages/NavbarLogin";

const Login = () => {
  localStorage.clear();
  const { changeCurrentTheme } = useThemeProvider();
  changeCurrentTheme("light");
  return (
    <>
      <NavbarLogin />
      <div className="flex w-full h-auto">
        <div className="w-1/2 fondologin ">
          <div className="flex h-[87vh] items-center justify-center">
            <h1 className="text-6xl font-bold text-white titulologin leading-[96px]">
              Sistema de <br /> Administración de <br /> Historias Clínicas
            </h1>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center pt-14 h-[100%]">
          <div className="">
            <img className="h-44" src="./../../iglogo.png" alt="" />
          </div>
          <div className="bg-[#dcdbdb] rounded-3xl w-auto p-2 px-5 h-100 flex flex-col items-center shadow-2xl">
            <div className="userlogin h-36 w-52 mt-5"></div>
            <div className="pt-3 pb-3">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
