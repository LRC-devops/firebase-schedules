import React, { useContext } from "react";
import { auth, googleAuthProvider } from "../lib/firebase";
import { UserContext } from "../lib/context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

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

// <section className="enter-page">
// {user ? (
//   <div className="flex">
//     <Link href="/agSched/edit">
//       <button className="btn">edit agSched</button>
//     </Link>
//     <SignOutButton />
//   </div>
// ) : (
//   <SignInButton />
// )}
// </section>

export default function Enter(props) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <section className="enter-page">
      {user ? (
        <div className="flex">
          {/* <Link href="/agSched/edit">
            <button className="btn">edit agSched</button>
          </Link> */}
          <SignOutButton />
        </div>
      ) : (
        <SignInButton />
      )}
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
