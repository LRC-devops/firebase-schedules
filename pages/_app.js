import NavBar from "../components/NavBar";
import { UserContext, ShowModal } from "../lib/context";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useUserData } from "../lib/hooks";
import Modal from "../components/Modal";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <NavBar />
      <ShowModal.Provider value={false}>
        <Component {...pageProps} />
      </ShowModal.Provider>
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
