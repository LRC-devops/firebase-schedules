import NavBar from "../components/NavBar";
import {
  UserContext,
  ShowModal,
  SessionsContext,
  SessionsProvider,
} from "../lib/context";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useAddSession, useUserData } from "../lib/hooks";
import Modal from "../components/Modal";
import { useState } from "react";
import Loader from "../components/Loader";

function MyApp({ Component, pageProps }) {
  const [newSessions, setNewSessions] = useState([]);
  const userData = useUserData();
  // const addSessions = useAddSession(;
  return (
    <UserContext.Provider value={userData}>
      <NavBar />
      <ShowModal.Provider value={false}>
        <SessionsProvider>
          <Component {...pageProps} />
        </SessionsProvider>
      </ShowModal.Provider>
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
