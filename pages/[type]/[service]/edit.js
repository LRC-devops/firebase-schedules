import { sessionToJSON, firestore, getDoc } from "../../../lib/firebase";
import Edit from "../../../components/Edit";
import { useContext, useEffect } from "react";
import AuthCheck from "../../../components/AuthCheck";
import { SessionsContext } from "../../../lib/context";

export async function getServerSideProps({ params }) {
  const { service, type } = params;

  const docRef = firestore
    .collection("LRC")
    .doc("schedules")
    .collection(`${service}${type}`);
  const posts = (await docRef.get()).docs.map(sessionToJSON);

  return {
    props: { posts, service, type },
  };
}
export default function EditServicePage({ posts, service, type }) {
  const { setServiceType, serviceType } = useContext(SessionsContext);
  useEffect(() => {
    setServiceType(type);
  }, []);

  return (
    <main>
      <AuthCheck>
        <h1>Edit {service}</h1>
        <Edit posts={posts} service={service} serviceType={serviceType} />
      </AuthCheck>
    </main>
  );
}