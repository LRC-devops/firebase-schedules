import User from "../components/User";
import { firestore, sessionToJSON } from "../lib/firebase";
import Loader from "../components/Loader";
import { SessionsContext } from "../lib/context";
import { useContext } from "react";

export async function getStaticProps({ params }) {
  const postsQuery = firestore.collection("agSched").orderBy("subject");
  const posts = (await postsQuery.get()).docs.map(sessionToJSON);
  return {
    props: { posts },
    revalidate: 3600, // revalidate every hour NOTE need to check with analytics to see if this = a read every hour, or if it only counts as a read if there is new data to retrieve. Even if it is a read, = 24 reads every day, not hundreds.
  };
}
// FIXME could possibly need this getStaticPaths fn, but I dont think I need it because I dont have dynamic pages.
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
