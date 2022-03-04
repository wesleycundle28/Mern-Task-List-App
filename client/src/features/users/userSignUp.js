import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../api/apiSlice";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import { UseAuthContext } from "../../middleware/auth";
import "./userSignUp.css";
import { toast } from "react-toastify";

const EMAIL_REGEX = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const UserSignUp = () => {
  const emailRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const { setUseAuth } = useContext(UseAuthContext);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  const [addNewUser, { isLoading }] = useRegisterUserMutation();

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const canSave = [email, password].every(Boolean) && !isLoading;

  const onRegisterUserClicked = async () => {
    if (canSave) {
      await addNewUser({ email, password })
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
    } else if (!canSave || (!validEmail && !validPassword)) {
      toast.error("please fill out all fields");
    }
  };

  return (
    <section className="registerContainer">
      <h2>Sign Up</h2>
      <form className="registerForm">
        <label>
          Email:
          <span className={validEmail ? "valid" : "hide"}>
            <FcCheckmark />
          </span>
          <span className={validEmail || !email ? "hide" : "invalid"}>x</span>
        </label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          name="email"
          autoComplete="off"
          onChange={onEmailChange}
          required
          aria-invalid={validEmail ? "false" : "true"}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p
          id="uidnote"
          className={
            emailFocus && email && !validEmail ? "instructions" : "offscreen"
          }
        >
          <BsFillExclamationTriangleFill />
          <span> </span>
          must be a valid email format
        </p>
        <label>
          Password:
          <span className={validPassword ? "valid" : "hide"}>
            <FcCheckmark />
          </span>
          <span className={validPassword || !password ? "hide" : "invalid"}>
            x
          </span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          onChange={onPasswordChange}
          required
          aria-invalid={validPassword ? "false" : "true"}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <p
          id="password"
          className={
            passwordFocus && password && !validPassword
              ? "instructions"
              : "offscreen"
          }
        >
          <BsFillExclamationTriangleFill />
          <span> </span>
          8 to 24 characters. <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
        </p>
        <button
          className="btnLogin"
          // disabled={!validEmail || !validPassword ? true : false}
          onClick={(e) => {
            onRegisterUserClicked(e.preventDefault());
          }}
        >
          Signup
        </button>
      </form>
    </section>
  );
};
