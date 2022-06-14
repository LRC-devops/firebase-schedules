import { firestore, sessionToJSON } from "../../lib/firebase";
import User from "../../components/User";
import { UserContext, SessionsContext } from "../../lib/context";
import { useContext } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

export async function getStaticProps({ params }) {
  try {
    const { type, service } = params;
    let docRef, post, path;
    if (type === "calendar") {
      const today = new Date();
      docRef = firestore
        .collection("LRC")
        .doc("schedules")
        .collection(`${service}${type}`)
        .where("date", ">=", today)
        .orderBy("date");
    } else {
      docRef = firestore
        .collection("LRC")
        .doc("schedules")
        .collection(`${service}${type}`);
    }
    const posts = (await docRef.get()).docs.map(sessionToJSON);
    // path = docRef.path;
    return {
      props: { posts, service, type },
      revalidate: 60,
    };
  } catch (err) {
    toast.error(err.message);
  }
}
export function getStaticPaths() {
  return {
    paths: ["/calendar/ssw", "/sched/ag", "/sched/si"],
    fallback: "blocking",
  };
}

export default function ServicePage({ service, posts, type }) {
  const { isLoading, setIsLoading } = useContext(SessionsContext);
  !posts ? setIsLoading(true) : setIsLoading(false);

  return (
    <main>
      {isLoading && <Loader show />}
      {/* <Loader /> */}

      {!posts.length ? (
        <h1>This service does not seem to exits.</h1>
      ) : (
        <User posts={posts} service={service} type={type} />
      )}
    </main>
  );
}
