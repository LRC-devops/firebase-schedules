import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth, googleAuthProvider } from "../lib/firebase";

export default function NavBar() {
  const { user } = useContext(UserContext);
  // const { service } = params;
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/agSched">
            <button className="btn btn-logo">LRC</button>
          </Link>
        </li>
        {/* <li> */}
        {/* <Link href="/gsg">
            <button className="nav-link">GSG</button>
            </Link>
            </li>
            <li>
            <Link href="/ssw">
            <button className="nav-link">SSW</button>
            </Link>
            </li>
            <li>
            <Link href="/">
            <button className="nav-link">SI</button>
            </Link>
            </li>
            <li>
            <Link href="/">
            <button className="nav-link">iPrep</button>
            </Link>
          </li> */}
        {user && (
          <div className="push-left">
            {/* <li>
              {user && (
                <Link href="/Edit">
                <button className="btn">Edit</button>
                </Link>
                )}
              </li> */}
            <li>
              <Link href={`/agSched/edit`}>
                <button>Edit agSched service</button>
              </Link>
            </li>
            <li>
              <Link href="/enter">
                {/* <button className="btn btn-login">Profile</button> */}
                <img src={user?.photoURL || "/hacker/png"} alt="user photo" />
              </Link>
            </li>
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
            <SignInButton />
          </li>
        )}
      </ul>
    </nav>
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
