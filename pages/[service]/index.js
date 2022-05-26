import { firestore, sessionToJSON } from "../../lib/firebase";
import User from "../../components/User";

export async function getServerSideProps({ query }) {
  const { service } = query;
  console.log(`enter getServerSideProps under ${service}`);

  const docRef = firestore
    .collection("LRC")
    .doc("schedules")
    .collection(service)
    .orderBy("subject", "desc");

  const posts = (await docRef.get()).docs.map(sessionToJSON);
  console.log(posts);

  return {
    props: { service, posts },
  };
}

export default function ServicePage({ service, posts }) {
  // const posts = props.posts;
  console.log(posts);
  console.log(service);

  console.log(`enter dynamic page under ${null}`);
  return (
    <main>
      <h1>{service}</h1>
      <User posts={posts} type={service === "agSched" ? "gsg" : "ssw"} />
    </main>
  );
}
