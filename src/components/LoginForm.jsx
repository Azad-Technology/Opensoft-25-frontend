import React, {useEffect} from "react";
import styles from "./LoginForm.module.css";
import {FaBeer} from "react-icons/fa";
import {FaUser, FaEye, FaEyeSlash} from "react-icons/fa";
import {useState} from "react";
import instance from "../../axios";
import {useStateValue} from "../../MyContexts/StateProvider";
import {useNavigate} from "react-router-dom";
import RejectedPopup from "../LoginAcceptedRejected/rejectedLogin";
import {GoogleCallback} from "./GoogleCallback";
import {GoogleLoginButton} from "../LoginForm/GoogleLoginButton.jsx";

import {MdEmail} from "react-icons/md";

function LoginForm({register, setShowPopup, setShowPopup2, showPopup2}) {
  const [{token, premium}, dispatch] = useStateValue();
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [err, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogle, setIsGoogle] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const newEmail = document.getElementById("email").value;
    const newPass = document.getElementById("password").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setErrors("Please enter a valid email address.");
    } else {
      setErrors("");
      try {
        const response = await instance.post(
          "/login",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({
          type: "SET_TOKEN",
          token: response.data.token,
        });
        {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 4000);
        }
        navigate(-1);
      } catch (error) {
        setErrors(error.response.data.detail);
        setShowPopup2(true);
        setTimeout(() => {
          setShowPopup2(false);
        }, 3000);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (token && token !== "null" && token !== "undefined") {
      navigate("/");
    }
  }, [token]);

  return (
    <div className={styles.login}>
      {showPopup2 && <RejectedPopup message={err} />}
      {isGoogle && <GoogleCallback setIsGoogle={setIsGoogle} />}
      {!isGoogle && (
        <div className={styles.wrapper}>
          <form action="">
            <h1>Welcome Back.</h1>
            <div className="OAuth" >
              <GoogleLoginButton
                className={styles.GoogleLogin}
                setShowPopup={setShowPopup}
                setShowPopup2={setShowPopup2}
                showPopup2={showPopup2}
                setIsGoogle={setIsGoogle}
              />
            </div>
            <hr className={styles.Or} />
            <div>
              <div className={styles.Oth}>Sign {register === "register" ? "up" : "in"} with your email</div>
            </div>

            <div className={styles.signup}>
              <input
                type="email"
                placeholder="name@email.com"
                id="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <div className={styles.eyeIcon}>
                <MdEmail className={styles.icon} />
              </div>
            </div>

            <div className={styles.input_box}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <div onClick={togglePasswordVisibility} style={{cursor: "pointer"}} className={styles.eyeIcon}>
                {isPasswordVisible ? <FaEye className={styles.icon} /> : <FaEyeSlash className={styles.icon} />}
              </div>
            </div>

            <button type={err === "" ? "submit" : "button"} onClick={e => handleSubmit(e)} id="loginButton">
              Login
            </button>
            <div className={styles.register_link}>
              <p>Don't have an account?</p> <a href="/signup">Register</a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginForm;