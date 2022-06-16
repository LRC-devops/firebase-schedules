import { sessionToJSON, firestore, schedColl } from "../../../lib/firebase";
import Edit from "../../../components/Edit";
import { useContext, useEffect } from "react";
import AuthCheck from "../../../components/AuthCheck";
import { SessionsContext } from "../../../lib/context";

// Should eventually add snapshot listener for realtime data preview when editing

export async function getServerSideProps({ params }) {
  const { service, type } = params;

  let docRef = schedColl.collection(`${service}${type}`);
  if (type === "calendar") {
    const today = new Date();
    docRef = docRef.where("date", ">=", today).orderBy("date");
  } else if (type === "sched") {
    docRef = docRef.orderBy("subject");
  }

  const posts = (await docRef.get()).docs.map(sessionToJSON);

  return {
    props: { posts, service, type },
  };
}
export default function EditServicePage({ posts, service, type }) {
  const { setServiceType, serviceType } = useContext(SessionsContext);
  useEffect(() => {
    setServiceType(type);
  }, [false]);

  return (
    <main>
      <AuthCheck>
        <h1>Edit {service}</h1>
        <Edit posts={posts} service={service} serviceType={serviceType} />
      </AuthCheck>
    </main>
  );
}
