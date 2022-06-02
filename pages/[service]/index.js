import { firestore, sessionToJSON } from "../../lib/firebase";
import User from "../../components/User";

// export async function getStaticProps({ params }) {
//   const { service } = params;
//   console.log(service);

//   // const findDoc = await getDocWithService(service);

//   let posts = null;
//   let path = null;

//   // if (findDoc) {
//   // }
//   try {
//     const docRef = firestore
//       .collection("LRC")
//       .doc("schedules")
//       .collection(service);

//     // posts = sessionToJSON(await docRef.get());
//     posts = (await docRef.get()).docs.map(sessionToJSON);
//     console.log(posts);

//     path = docRef.path;

//     return {
//       props: { service, posts, path },
//       revalidate: 5000,
//     };
//   } catch (err) {
//     toast.error(err);
//   }
// }

// export async function getStaticPaths() {
//   const snapshot = await firestore.collection("LRC").doc("schedules").get();

//   const paths = snapshot.docs.map((doc) => {
//     const { service } = doc.data();
//     return {
//       params: { service },
//     };
//   });
//   return {
//     paths,
//     fallback: blocking,
//   };
// }

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

export default function ServicePage({ service, posts }) {
  // console.log(posts, service);
  return (
    <main>
      {!posts.length ? (
        <h1>This service does not seem to exits.</h1>
      ) : (
        <User posts={posts} type={service === "agSched" ? "gsg" : "ssw"} />
      )}
    </main>
  );
}
