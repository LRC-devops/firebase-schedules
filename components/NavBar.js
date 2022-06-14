import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import { auth, googleAuthProvider } from "../lib/firebase";
import Modal from "../components/Modal";
import logo from "../public/LRC-logo-HORZ-GOLD.png";
import { FiEdit, FiLogOut } from "react-icons/fi";

export default function NavBar() {
  const { user } = useContext(UserContext);
  const [signInModal, setSignInModal] = useState(false);

  const triggerSignInModal = () => {
    console.log("signIn");
    setSignInModal(true);
  };
  const closeModal = () => {
    setSignInModal(false);
  };

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link href="/sched/ag">
              <Image
                className="navBar__img"
                src={logo}
                alt="LRC Logo"
                width={130}
                height={46}
              />
            </Link>
          </li>
          {user && (
            <div className="push-left">
              <div className="navBar__user-box">
                <div className="navBar__holds-two">
                  <li>
                    <Link href={`/sched/ag/edit`}>
                      <FiEdit className="navBar--icon" title="edit" />
                    </Link>
                  </li>
                  <li>
                    <FiLogOut
                      className="navBar--icon"
                      onClick={() => auth.signOut()}
                      title="sign out"
                    />
                  </li>
                </div>
                <li>
                  <Link href="/enter">
                    {/* <button className="btn btn-login">Profile</button> */}
                    <p className="navBar--user">signed in as: {user?.email}</p>
                    {/* <img src={user?.photoURL || "/hacker/png"} alt="user photo" /> */}
                  </Link>
                </li>
              </div>
              {/* <li>
              <Link href="/enter">
              <button className="btn btn-login">Sign Out</button>
              </Link>
            </li> */}
            </div>
          )}

          {!user && (
            <li>
              {/* <Link href="/enter">
              <button className="btn btn-login">Admin log in</button>
            </Link> */}
              {/* <button onClick={SignInButton()} className="btn btn-login">
              Admin log in
            </button> */}
              {/* <SignInButton /> */}
              <button className="btn btn-login" onClick={triggerSignInModal}>
                Admin Sign In
              </button>
            </li>
          )}
        </ul>
      </nav>
      {signInModal && !user && (
        <Modal action="sign-in" title="Sign In" onClose={closeModal} />
      )}
    </>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button className="btn btn-login" onClick={signInWithGoogle}>
      Admin log in
    </button>
  );
}
