import User from "../components/User";
import { firestore, sessionToJSON } from "../lib/firebase";

// GET STATIC GSG DATA

export async function getStaticProps({ params }) {
  const postsQuery = firestore
    .collection("LRC")
    .doc("schedules")
    .collection("agSched")
    .orderBy("subject");
  const posts = (await postsQuery.get()).docs.map(sessionToJSON);
  // console.log("REVAL in GSG FETCH");
  return {
    props: { posts },
    revalidate: 60, // revalidate every hour NOTE need to check with analytics to see if this = a read every hour, or if it only counts as a read if there is new data to retrieve. Even if it is a read, = 24 reads every day, not hundreds.
  };
}

export default function gsg(props) {
  return <User posts={props.posts} type="gsg" />;
}
