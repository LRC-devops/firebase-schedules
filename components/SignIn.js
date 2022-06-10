import classes from "./SignIn.module.css";
import React from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { useState } from "react";

const SignIn = () => {
  const [authType, setAuthType] = useState("LOG_IN");

  const requestAccess = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        // signed in
        const user = userCredential.user;
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const signInWithEmail = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((err) => {
        toast.error("An error occured! " + err.message);
      });
  };
  const forgotPasswordTrigger = () => {
    setAuthType("FORGOT_PASSWORD");
  };
  const requestAccessTrigger = () => {
    setAuthType("REQUEST_ACCESS");
  };
  const forgotPasswordSubmit = () => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, e.target.email.value);
  };

  return (
    <div className={classes["form__box"]}>
      {authType !== "FORGOT_PASSWORD" && (
        <>
          <form
            onSubmit={authType === "LOG_IN" ? signInWithEmail : requestAccess}
            className={classes["form"]}
          >
            <label htmlFor="email">email</label>
            <input placeholder="Email" name="email" type="text" required />
            <label htmlFor="pwd">password</label>
            <input
              name="password"
              placeholder="Password"
              type="password"
              required
            />
            {authType === "LOG_IN" ? (
              <button>submit</button>
            ) : (
              <button>Request Access</button>
            )}
          </form>
          <a
            className={classes["form__forgot"]}
            onClick={forgotPasswordTrigger}
          >
            Forgot Password
          </a>
          <a className={classes["form__forgot"]} onClick={requestAccessTrigger}>
            Request Admin Access
          </a>
        </>
      )}
      {authType === "FORGOT_PASSWORD" && (
        <form onSubmit={forgotPasswordSubmit} className={classes["form"]}>
          <label htmlFor="email">email</label>
          <input placeholder="Email" name="email" type="text" required />
          <button>Send Password Reset Email</button>
        </form>
      )}
    </div>
  );
};
export default SignIn;
