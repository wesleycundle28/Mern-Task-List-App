import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../api/apiSlice";
import { UseAuthContext } from "../../middleware/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./userLogin.css";

export const UserLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUseAuth } = useContext(UseAuthContext);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const canSave = [email, password].every(Boolean) && !isLoading;

  const onLoginUserClicked = async () => {
    try {
      if (canSave) {
        await loginUser({ email, password })
          .unwrap()
          .then((payload) => {
            localStorage.setItem("token", JSON.stringify(payload.token));
            localStorage.setItem("email", JSON.stringify(payload.email));
            setUseAuth(payload.email);
            setEmail("");
            setPassword("");
            toast.success(payload.success);
            toast.error(payload.error);
            navigate("/tasks");
          })
          .catch((error) => {
            toast.error(`status code: ${error.originalStatus}`);
          });
      } else if (!canSave) {
        toast.error("please fill out all fields");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="loginContainer">
      <h2>Log In</h2>
      <form className="loginForm">
        <label>Email:</label>
        <input type="text" onChange={onEmailChange} value={email} />
        <label>Password:</label>
        <input type="password" onChange={onPasswordChange} value={password} />
        <button
          className="btnLogin"
          onClick={(e) => onLoginUserClicked(e.preventDefault())}
        >
          Login
        </button>
      </form>
    </section>
  );
};
