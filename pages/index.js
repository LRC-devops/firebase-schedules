import Editor from "../components/Editor";
import Table from "../components/Table";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../lib/context";

import { useState } from "react";

import {
  firestore,
  serverTimestamp,
  sessionToJSON,
  fromMillis,
} from "../lib/firebase";

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collection("agSched")

    .orderBy("createdAt", "desc")
    .limit(10);

  const posts = (await postsQuery.get()).docs.map(sessionToJSON);

  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(props.posts);
  const [newSessions, setNewSessions] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const { user } = useContext(UserContext);

  const notify = (message) => {
    toast(message);
  };

  // server communication
  let scheduleRef;
  let unsubscribe;

  scheduleRef = firestore.collection("agSched");

  // write to database
  const submitHandler = (e) => {
    e.preventDefault();

    setNewSessions([
      ...newSessions,
      {
        subject: e.target.subject.value,
        course: e.target.course.value,
        dayTime: e.target.dayTime.value,
        host: e.target.host.value,
        link: e.target.link.value,
        mode: e.target.mode.value,
        createdAt: serverTimestamp(),
        id: `agSched${String(Math.random())}`,
      },
    ]);

    console.log(newSessions);

    e.target.subject.value = "";
    e.target.course.value = "";
    e.target.dayTime.value = "";
    e.target.host.value = "";
    e.target.link.value = "";
    e.target.mode.value = "";
  };

  // console.log("newSessions", newSessions);

  // const getMorePosts = async () => {
  //   setLoading(true);
  //   const last = posts[posts.length - 1];

  //   const cursor =
  //     typeof last.createdAt === "number"
  //       ? fromMillis(last.createdAt)
  //       : last.createdAt;

  //   const query = firestore
  //     .collection("agSched")
  //     .orderBy("createdAt", "desc")
  //     .startAfter(cursor)
  //     .limit(5);

  //   const newPosts = (await query.get()).docs.map((doc) => doc.data());

  //   setPosts(posts.concat(newPosts));
  //   setLoading(false);

  //   if (newPosts.length < 5) {
  //     setPostsEnd(true);
  //   }
  // };

  // FIXME: buggy! For some reason the batch commit will only write the last object in the array to the database...? Not sure if it's an issue with batch.set inside of the for loop. try pushing all batch.set into promises arr, maybe writing the batch.commit without the await, then using await on the promise array?
  // NOTE: Cant tell if its an issue with use state and updating the state based on prev state or not... Probably?

  const batchSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmit(true);

    const docRef = firestore.collection("agSched").doc();

    const batch = firestore.batch();
    const promises = [];
    // console.log("enter for loop to batch");
    for (let i = 0; i < newSessions.length; i++) {
      promises.push(batch.set(docRef, newSessions[i]));
      // if (i >= newSessions.length - 1) {
      //   console.log(`Committing batch of ${i}`);
      //   promises.push(batch.commit());
      // }
      // console.log("in for loop at #", i);
      console.log(`promises`, promises);
    }
    // console.log("exit for loop, counter =");

    await batch.commit();
    // console.log("after batch.commit");
    setIsLoading(false);
    return notify("Success!");

    // newSessions.forEach((s) => {
    //   batch.set(docRef, {
    //     subject: s.subject,
    //     course: s.course,
    //     dayTime: s.dayTime,
    //     host: s.host,
    //     link: s.link,
    //     mode: s.mode,
    //     createdAt: s.createdAt,
    //     id: s.id,
    //   });
    // });
  };

  // console.log("dtatbase check", scheduleRef);

  return (
    <>
      <div className="flex-col">
        <div className="flex">
          {user && <Editor submitHandler={submitHandler} />}
          <div>
            <h1>TABLE</h1>
            <div>
              <h2>Current (server) Data</h2>
              <table>
                <tbody>
                  <Table posts={posts} />
                </tbody>
              </table>
              {user && (
                <>
                  <h2>New Data</h2>
                  <table>
                    <tbody>
                      <Table posts={newSessions} />
                    </tbody>
                  </table>
                </>
              )}
              {newSessions.length && !isSubmit ? (
                <button className="btn btn-login" onClick={batchSubmitHandler}>
                  Submit Data to Server
                </button>
              ) : null}
              {isLoading && <Loader show />}
            </div>
          </div>
        </div>
        {isLoading && <Loader show />}
      </div>
    </>
  );
}
