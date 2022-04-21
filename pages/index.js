import Editor from "../components/Editor";
import Table, { TableRow } from "../components/Table";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import Modal from "../components/Modal";

import { firestore, serverTimestamp, sessionToJSON, db } from "../lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import SimpleTable from "../components/SimpleTable";

// /////////////////////////
// READ FROM DATABASE (GET)
// /////////////////////////

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collection("agSched")
    .orderBy("createdAt", "desc")
    .limit(20);
  // return postsQuery;
  const posts = (await postsQuery.get()).docs.map(sessionToJSON);
  // const docIds = {await postsQuery.get(doc.id)}
  return {
    props: { posts },
  };
}

const btnFilterClickHandler = (e) => {
  // setBtnName(e.target.innerHTML);
  // getServerSideProps(e.target.innerHTML);
};

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(props.posts);
  const [newSessions, setNewSessions] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [btnName, setBtnName] = useState(null);
  const [sessionsToDelete, setSessionsToDelete] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const { user } = useContext(UserContext);

  // server communication
  let scheduleRef;
  let unsubscribe;

  scheduleRef = firestore.collection("agSched");

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

  const deleteSessionsHandler = async (e) => {
    docRef = firestore.collection("agSched");
    docRef.doc();
  };

  const batchSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmit(true);
    // toast.loading("Sending...");

    const batch = firestore.batch();

    for (let i = 0; i < newSessions.length; i++) {
      const docRef = firestore.collection("agSched").doc();
      batch.set(docRef, newSessions[i]);
    }

    // notify("Success!");
    // useToast("success", "Success!");

    toast.success("Sucussfully submitted to the server!");
    setIsLoading(false);
    await batch.commit();
    return setNewSessions([]);
  };

  const radioSeectHandler = () => {};

  const modalTrigger = (e) => {
    setShowModal(true);
    setModalContent({
      action: e.target.innerHTML,
      session: e.target.id,
      id: e.target.parentElement.getAttribute("data-id"),
    });
  };
  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal
          onClose={onCloseModal}
          action={modalContent.action}
          session={modalContent.session}
          onConfirm={deleteSessionsHandler}
        />
      )}
      <div className="flex-col">
        <div className="flex">
          <SimpleTable />
          {/* {user && <Editor submitHandler={submitHandler} />}
          <div className="btn-box">
            <button onClick={modalTrigger}>Music</button>
            <button onClick={btnFilterClickHandler}>Philosophy</button>
            <button onClick={btnFilterClickHandler}>Biology</button>
          </div>
          <div>
            <h1>TABLE</h1>
            <div>
              <h2>Current (server) Data</h2>
              <table>
                <tbody>
                  <Table
                    posts={posts}
                    deleteSessionsHandler={deleteSessionsHandler}
                    triggerModal={modalTrigger}
                  />
                </tbody>
              </table> */}
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
    </>
  );
}
