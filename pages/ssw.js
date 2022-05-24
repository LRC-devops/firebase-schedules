import User from "../components/User";
import { firestore, sswSessionToJSON } from "../lib/firebase";

export async function getStaticProps({ params }) {
  const today = new Date();
  const postsQuery = firestore
    .collection("sswSched")
    .orderBy("date")
    .where("date", ">=", today);
  const posts = (await postsQuery.get()).docs.map(sswSessionToJSON);
  return {
    props: { posts },
    revalidate: 3600, // revalidate every hour NOTE need to check with analytics to see if this = a read every hour, or if it only counts as a read if there is new data to retrieve. Even if it is a read, = 24 reads every day, not hundreds.
  };
}

export default function ssw(props) {
  console.log(props.posts);
  return <User posts={props.posts} type="ssw" />;
}
