import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../features/api/apiSlice";
import { UseAuthContext } from "../middleware/auth";
import "./Button.css";

export const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="button"
      onClick={() => {
        navigate("/login");
      }}
    >
      Login Page
    </button>
  );
};

export const LogoutButton = () => {
  const navigate = useNavigate();

  const { setUseAuth } = useContext(UseAuthContext);
  const [logoutUser] = useLogoutUserMutation();
  const onLogoutUserClicked = async () => {
    await logoutUser()
      .unwrap()
      .then((payload) => {
        localStorage.clear("token");
        toast.success(payload.logoutSuccess);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });

    setUseAuth(null);
  };

  return (
    <button
      className="button"
      onClick={() => {
        onLogoutUserClicked();
      }}
    >
      Log Out
    </button>
  );
};

export const SignupButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="button"
      onClick={() => {
        navigate("/signup");
      }}
    >
      Sign Up Page
    </button>
  );
};

export const TasksButton = ({ children }) => {
  const navigate = useNavigate();

  return (
    <button className="button" onClick={() => navigate("/tasks")}>
      {children}
    </button>
  );
};
