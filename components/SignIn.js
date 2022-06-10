import classes from "./SignIn.module.css";
import React from "react";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { useState } from "react";

const SignIn = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
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
        console.error(err);
        toast.error("An error occured! " + err);
      });
  };
  const forgotPasswordTrigger = () => {
    setForgotPassword(true);
  };
  const forgotPasswordSubmit = () => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, e.target.email.value);
  };
  return (
    <div className={classes["form__box"]}>
      {!forgotPassword && (
        <>
          <form onSubmit={signInWithEmail} className={classes["form"]}>
            <label for="email">email</label>
            <input placeholder="Email" name="email" type="text" required />
            <label for="pwd">password</label>
            <input
              name="password"
              placeholder="Password"
              type="password"
              required
            />
            <button>submit</button>
          </form>
          <a
            className={classes["form__forgot"]}
            onClick={forgotPasswordTrigger}
          >
            Forgot Password
          </a>
        </>
      )}
      {forgotPassword && (
        <form onSubmit={forgotPasswordSubmit} className={classes["form"]}>
          <label for="email">email</label>
          <input placeholder="Email" name="email" type="text" required />
          <button>Send Password Reset Email</button>
        </form>
      )}
    </div>
  );
};
export default SignIn;
