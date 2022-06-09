import { sessionToJSON, firestore } from "../../lib/firebase";
import Edit from "../../components/Edit";
import { UserContext } from "../../lib/context";
import React, { useContext } from "React";

export async function getServerSideProps({ params }) {
  const { service } = params;

  const docRef = firestore
    .collection("LRC")
    .doc("schedules")
    .collection(service);
  const posts = (await docRef.get()).docs.map(sessionToJSON);

  return {
    props: { posts, service },
    // revalidate: 60,
  };
}
export default function EditServicePage({ posts, service }) {
  // const { user } = useContext(UserContext);

  // const isAdmin = async () => {
  //   const docRef = firestore.collection("users");
  // };

  return (
    <main>
      <h1>Edit Service Page {service}</h1>
      <Edit posts={posts} service={service} />
      {/* FIXME CONDITIONAL RENDER LOGIC BELOW  */}
      {/* {!posts.length ? (
        <h1>There is no data to edit</h1>
      ) : (
        <>
          <h1>Edit Service Page {service}</h1>
          <Edit posts={posts} />
        </>
      )} */}
    </main>
  );
}
