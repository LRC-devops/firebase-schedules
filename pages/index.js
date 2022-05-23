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
    revalidate: 43200, //revalidate every 43200s = 12 hours NOTE if revalidate occurs on timmed interval, if revalidate on demand with sercret API key, then revalidate is set to false ... ? or on callback function ...
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
