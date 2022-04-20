import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function enter(props) {
  const { user } = useContext(UserContext);

  return (
    <section className="enter-page">
      {user ? <SignOutButton /> : <SignInButton />}
    </section>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={`/google-logo.png`} alt="google logo" /> Google Sign In
    </button>
  );
}
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}
