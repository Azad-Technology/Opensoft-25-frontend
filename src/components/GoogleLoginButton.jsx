import React from "react";
import {useGoogleLogin} from "@react-oauth/google";
import {useStateValue} from "../../MyContexts/StateProvider";
import instance from "../../axios";
import styles from "./LoginForm.module.css";
import {FcGoogle} from "react-icons/fc";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const clientID = "950287933882-5bvrs6br7a5ubeb1l2m8di6vgjgu7sco.apps.googleusercontent.com";

export const GoogleLoginButton = ({register, setShowPopup, setShowPopup2, setIsGoogle}) => {
  const [{}, dispatch] = useStateValue();

  const navigate = useNavigate();

  const login = useGoogleLogin({
    
    onSuccess: async codeResponse => {
      try {
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
          },
        });
        const email = response.data.email;
        const name = response.data.name;
        const profilePic = response.data.picture;
        await instance
          .post("/auth/callback", {
            email: email,
            name: name,
            profilePic: profilePic,
          })
          .then(response => {
            dispatch({
              type: "SET_TOKEN",
              token: response.data.token,
            });
          });
        setShowPopup(true);
        setIsGoogle(false);
        navigate("/");
        setTimeout(() => {
          setShowPopup(false);
        }, 4000);
      } catch (err) {
        setShowPopup2(true);
        setTimeout(() => {
          setShowPopup2(false);
        }, 4000);
      }
    },
  });

  return (
    <button className={styles.googleButton} onClick={() => {
      setIsGoogle(true);
      login()
    }}>
      <FcGoogle style={{width: "1.25rem", height: "1.25rem"}} className={styles.googleIcon} />
      Sign {register ? "up" : "in"} with Google
    </button>
  );
};