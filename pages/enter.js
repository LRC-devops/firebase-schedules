import React, { useContext } from "react";
import { auth, googleAuthProvider } from "../lib/firebase";
import { UserContext } from "../lib/context";
import Image from "next/image";

// export async function getServerSideProps(context) {
//   const postsQuery = firestore
//     .collection("agSched")
//     .orderBy("subject")
//     .limit(20);
//   // return postsQuery;
//   const posts = (await postsQuery.get()).docs.map(sessionToJSON);
//   // const docIds = {await postsQuery.get(doc.id)}
//   return {
//     props: { posts },
//   };
// }

export default function Enter(props) {
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
      <Image src={`/google-logo.png`} alt="google logo" height={5} width={5} />{" "}
      Google Sign In
    </button>
  );
}
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}
