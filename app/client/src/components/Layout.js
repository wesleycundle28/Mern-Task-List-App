import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UseAuthContext } from "../middleware/auth";
import { useState } from "react";
import { LoginButton, LogoutButton, TasksButton, SignupButton } from "./Button";
import "./Layout.css";

export const Layout = () => {
  const [useAuth, setUseAuth] = useState(localStorage.getItem("email"));

  return (
    <main>
      <UseAuthContext.Provider value={{ useAuth, setUseAuth }}>
        <nav className="navBar">
          {!useAuth ? (
            <>
              <LoginButton />

              <SignupButton />
            </>
          ) : (
            <>
              <LogoutButton />

              <TasksButton>Tasks</TasksButton>
            </>
          )}
        </nav>
        <Outlet />
        <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          closeButton=""
        />
      </UseAuthContext.Provider>
    </main>
  );
};

export default Layout;
