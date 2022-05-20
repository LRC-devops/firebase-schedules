import User from "./User";
// import second from '../lib'
import { firestore, sessionToJSON } from "../lib/firebase";
import Loader from "../components/Loader";
import { SessionsContext } from "../lib/context";
import { useContext } from "react";
// /////////////////////////
// READ FROM DATABASE (GET)
// /////////////////////////

// export async function getServerSideProps(context) {
//   const postsQuery = firestore
//     .collection("agSched")
//     .orderBy("subject")
//     .limit(20);
//   // return postsQuery;
//   const posts = (await postsQuery.get()).docs.map(sessionToJSON);
//   return {
//     props: { posts },
//   };
// }

export default function Home(props) {
  const { isLoading } = useContext(SessionsContext);

  return (
    <>
      <User />
      {isLoading && <Loader />}
    </>
  );
}
