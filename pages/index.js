import User from "../components/User";
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

export async function getStaticProps({ params }) {
  // let posts;
  const postsQuery = firestore.collection("agSched").orderBy("subject");
  // posts = sessionToJSON(await docRef.get());
  const posts = (await postsQuery.get()).docs.map(sessionToJSON);
  return {
    props: { posts },
    revalidate: false,
    // fallback: "blocking",
  };
}
// export async function getStaticPaths() {
//   const snapshot = await firestore.collection("agSched").get();

//   const paths = snapshot.docs.map((post) => {
//     params: {
//       id: post.id;
//     }
//   });
//   // const path = {
//   //   params: {id: post},
//   // };
//   return { paths, fallback: "blocking" };
// }

export default function Home(props) {
  const { isLoading } = useContext(SessionsContext);

  const posts = props.posts;

  return (
    <>
      <User posts={posts} />
      {isLoading && <Loader />}
    </>
  );
}
