import React, {useEffect} from "react";
import styles from "./GoogleCallback.module.css";

export const GoogleCallback = (setIsGoogle) => {
  return (
    <div className={styles.contain}>
      <div className={styles.container}>
        <div className={styles.line}></div>
      </div>
      <div className={styles.heading}>Waiting for Log In Confirmation</div>
      <div className={styles.subheading}>
        Kindly log in using Google from the new tab. Do not refresh or close this page
      </div>
      {/* <div className={styles.buttonURL} onClick={()=>{navigate('/')}}>Home Page</div> */}
    </div>
  );
};