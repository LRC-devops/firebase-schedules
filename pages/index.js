import User from "./User";
// import second from '../lib'
import { firestore, sessionToJSON } from "../lib/firebase";

// /////////////////////////
// READ FROM DATABASE (GET)
// /////////////////////////

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collection("agSched")
    .orderBy("subject")
    .limit(20);
  // return postsQuery;
  const posts = (await postsQuery.get()).docs.map(sessionToJSON);
  return {
    props: { posts },
  };
}

export default function Home(props) {
  const posts = props.posts;
  return (
    <>
      <User posts={posts} />
    </>
  );
}
