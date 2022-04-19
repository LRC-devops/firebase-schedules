import Editor from "../components/Editor";
import Table from "../components/Table";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

// import { doc, getDoc } from "firebase/firestore";

import { useState } from "react";

import {
  firestore,
  serverTimestamp,
  sessionToJSON,
  fromMillis,
} from "../lib/firebase";

const DataTester = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState(props.posts);
  const [postsEnd, setPostsEnd] = useState(false);
  const [newSessions, setNewSessions] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const notify = (message) => {
    toast(message);
  };

  // server communication
  let scheduleRef;
  let unsubscribe;

  scheduleRef = firestore.collection("agSched");

  const newSessionArr = [];
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

  const batchSubmitHandler = (e) => {
    setLoading(true);
    setIsSubmit(true);
    for (let i = 0; i < newSessions.length; i++) {
      scheduleRef.add(newSessions[i]);
    }
    setLoading(false);
    // return notify("Success!");
  };

  return (
    <>
      <div className="flex-col">
        <div className="flex">
          <Editor submitHandler={submitHandler} />
          <div>
            <h1>TABLE</h1>
            <div>
              <h2>Current (server) Data</h2>
              <table>
                <tbody>
                  <Table posts={posts} />
                </tbody>
              </table>
              <h2>New Data</h2>
              <table>
                <tbody>
                  <Table posts={newSessions} />
                </tbody>
              </table>
              {newSessions.length && !isSubmit && (
                <button onClick={batchSubmitHandler}>
                  Submit Data to Server
                </button>
              )}
              {/* {isSubmit && toast.success("Data was successfully submitted!")} */}
              {loading && <loading show />}
            </div>
          </div>
        </div>
        {loading && <Loader show />}
      </div>
    </>
  );
};

export default DataTester;
