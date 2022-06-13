import { sessionToJSON, firestore, getDoc } from "../../../lib/firebase";
import Edit from "../../../components/Edit";
import React from "react";
import AuthCheck from "../../../components/AuthCheck";

export async function getServerSideProps({ params }) {
  const { service, type } = params;

  const docRef = firestore
    .collection("LRC")
    .doc("schedules")
    .collection(`${service}${type}`);
  const posts = (await docRef.get()).docs.map(sessionToJSON);

  return {
    props: { posts, service, type },
    // revalidate: 60,
  };
}
export default function EditServicePage({ posts, service, type }) {
  return (
    <main>
      <AuthCheck>
        <h1>Edit {service}</h1>
        <Edit posts={posts} service={service} type={type} />
      </AuthCheck>
    </main>
  );
}
