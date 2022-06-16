import classes from "./SignIn.module.css";
import React, { useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast, { useToasterStore } from "react-hot-toast";
import { useState, useContext } from "react";
import { SessionsContext } from "../lib/context";
import { firestore } from "../lib/firebase";

const SignIn = () => {
  const [authType, setAuthType] = useState("LOG_IN");
  const [authAccess, setAuthAccess] = useState(false);
  const { setIsLoading } = useContext(SessionsContext);

  const checkAuthAccess = async () => {
    const docRef = firestore
      .collection("admin")
      .doc("allowNewAuthAccess")
      .get();
    let allowAccess;
    await docRef.then((res) => {
      allowAccess = res.data().isAllowAccess;
    });
    setAuthAccess(allowAccess);
    return allowAccess;
  };

  useEffect(() => {
    checkAuthAccess();
  });

  const requestAccess = (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!authAccess) {
      return toast.error(
        "Access Denied. Please contact the site admin to grant access."
      );
    }

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
    setIsLoading(false);
  };

  const signInWithEmail = (e) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };
  const forgotPasswordTrigger = () => {
    setAuthType("FORGOT_PASSWORD");
  };
  const requestAccessTrigger = () => {
    if (authAccess) {
      setAuthType("REQUEST_ACCESS");
    } else {
      toast.error(
        "Access Denied. Please contact the site admin to grant access."
      );
    }
  };
  const forgotPasswordSubmit = () => {
    setIsLoading(true);
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, e.target.email.value);
    setIsLoading(false);
  };

  return (
    <div className={classes["form__box"]}>
      {authType !== "FORGOT_PASSWORD" && (
        <>
          <h2 className={classes["form-h2"]}>{authType}</h2>
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
        <>
          <h2 className={classes["form-h2"]}>{authType}</h2>
          <form onSubmit={forgotPasswordSubmit} className={classes["form"]}>
            <label htmlFor="email">email</label>
            <input placeholder="Email" name="email" type="text" required />
            <button>Send Password Reset Email</button>
          </form>
        </>
      )}
    </div>
  );
};
export default SignIn;
