import Editor from "../components/Editor";
import Table from "../components/Table";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import { useContext, useState } from "react";
import { SessionsContext, UserContext } from "../lib/context";
import Modal from "../components/Modal";
import { useAddSession, useDeleteSession } from "../lib/hooks";

import { firestore, serverTimestamp, sessionToJSON, db } from "../lib/firebase";

// /////////////////////////
// READ FROM DATABASE (GET)
// /////////////////////////

// NOTE maybe I should switch this UI so that `!user ? serverSideProps : onSnapshotChange`

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collection("agSched")
    .orderBy("subject")
    .limit(20);
  // return postsQuery;
  const posts = (await postsQuery.get()).docs.map(sessionToJSON);
  // const docIds = {await postsQuery.get(doc.id)}
  return {
    props: { posts },
  };
}

// NOTE NEED TO ADD FUNCTIONALITY THAT ADDS A USER TO THE USER COLLECTION IN FIRESTORE SO THAT I CAN SET SELECT USERS AS ADMIN: TRUE, AND ONLY WHEN ADMIN === TRUE WILL THE INTERFACE SHOW THE EDIT FEATURES.

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [isDeleted, setIsDeleted] = useState([]);
  // const [posts, setPosts] = useState(props.posts);
  // const [newSessions, setNewSessions] = useState([]);
  // const [isValid, setIsValid] = useState(true);

  const { user } = useContext(UserContext);
  const { newSessions, setNewSessions } = useContext(SessionsContext);

  const posts = props.posts;
  // server communication

  const deleteSessionsHandler = (e) => {
    setIsLoading(true);
    const id = modalContent.session;
    if (useDeleteSession(id)) {
      setIsLoading(false);
      setShowModal(false);
      setIsDeleted([...isDeleted, id]);
      return toast.success(`${id} was successfully removed from the database`);
    } else {
      return toast.error(`${id} was not from the database`);
    }
  };

  // Look into useReducer! Maybe use it for all of these submitHandlers, where i can set the type of action (edit, delete, cancel) then it always triggers one fn, will setLoading and modal content regardless, then specific fn for action

  const batchSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmit(true);

    const batch = firestore.batch();

    for (let i = 0; i < newSessions.length; i++) {
      const docRef = firestore.collection("agSched").doc();
      batch.set(docRef, newSessions[i]);
    }

    toast.success("Sucussfully submitted to the server!");
    setIsLoading(false);
    await batch.commit();
    return setNewSessions([]);
  };
  // The reducer would house this modal trigger as well
  const modalTrigger = (e) => {
    setShowModal(true);
    setModalContent({
      action: e.target.innerHTML,
      session: e.target.id,
      id: e.target.parentElement.getAttribute("data-id"),
      name: e.target.subject,
    });
  };
  const onCloseModal = () => {
    setShowModal(false);
  };

  // const isCancelled = () => {
  //   const session = posts.filter((session) => session.docId === target);
  //   return session.cancel;
  // };

  // const checkIsCancelled = (target) => {
  //   const session = posts.filter((session) => {
  //     return session.docId === target;
  //   });
  //   return session[0].cancel;
  // };
  // console.log("checkIsCancelled", checkIsCancelled());

  const triggerEdit = (e) => {
    setShowModal(true);
    // const sessionCancel = checkIsCancelled(e.target.id);
    // console.log("sessionCancel in triggerEdit()", sessionCancel);
    console.log(e.target.id);
    setModalContent({
      action: e.target.innerHTML,
      session: e.target.id,
      id: e.target.parentElement.getAttribute("data-id"),
      // isCancelled: sessionCancel,
      name: e.target.session,
    });
  };

  const submitEditHandler = async (e) => {
    const editRefArr = ["subject", "course", "dayTime", "host", "link", "mode"];
    // Prevent Reload
    e.preventDefault();
    setIsLoading(true);
    // const formRef = e.target;
    const batch = firestore.batch();
    try {
      const newArr = [];

      // Create array from target form (Editor)

      Array.from(e.target.elements).forEach((session) => {
        newArr.push(session.value);
      });

      const docRef = firestore.collection("agSched").doc(modalContent.session);

      // CONVERT DATA INTO OBJECT - NOTE keep getting error that firestore wont take an array, however, the edit is being transfered perfectly fine even with the thrown error message
      // const convToObj = newArr.map((obj) => {
      //   return Object.assign({}, obj);
      // });
      // const sessionToEdit: Project = {
      //   id: modalContent.session,
      //   name: modalContent.id,
      //   newData: convToObj,
      // };

      // Iterate through array looking for only valid feilds

      batch.set(
        newArr.forEach((session, index) => {
          if (session.length > 0) {
            const updateData = docRef.update(editRefArr[index], session);
            // console.log("updatedData", updateData);
          } else {
            null;
          }
        })
      );
      await batch.commit();
      toast.success("Success!");
    } catch (error) {
      toast.error(error.message);
    }

    setIsLoading(false);
    // location.reload();
  };

  const radioHandler = (e) => {
    setRadioArr((prevData) => [...prevData, e.target.id]);
  };

  const cancelSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const id = e.target.id;
    const docRef = db.collection("agSched").doc(id);
    // docRef.update("cancel", true);
    docRef.update("initCancel", e.target.initCancel.value);
    docRef.update("revertCancel", e.target.revertCancel.value);
    setIsLoading(false);
    toast.success("Session was successfully cancelled");
  };

  return (
    <main>
      {showModal && (
        <Modal
          onClose={onCloseModal}
          action={modalContent.action}
          session={modalContent.session}
          name={modalContent.name}
          modalContent={modalContent}
          onConfirm={deleteSessionsHandler}
          cancelSubmitHandler={cancelSubmitHandler}
          submitEditHandler={submitEditHandler}
          posts={posts}
        />
      )}
      <div className="flex-col">
        <div className="flex">
          {/* <SimpleTable /> */}
          {user && (
            // <Editor submitHandler={submitHandler} setIsValid={setIsValid} />
            <Editor action={`add`} />
          )}

          <div>
            <div className="table--box">
              <h1>Guided Study Groups</h1>
              <div>
                {user && <h2>Current (server) Data</h2>}

                <Table
                  key={String(Math.random())}
                  posts={posts}
                  // deleteSessionsHandler={deleteSessionsHandler}
                  triggerModal={modalTrigger}
                  idDeleted={isDeleted}
                  triggerEdit={triggerEdit}
                  radioHandler={radioHandler}
                />
              </div>
              {user && (
                <>
                  <h2>New (local) Data</h2>

                  <Table posts={newSessions} key={String(Math.random())} />
                </>
              )}
              {newSessions.length && !isSubmit ? (
                <button className="btn btn-login" onClick={batchSubmitHandler}>
                  Submit Data to Server
                </button>
              ) : null}
              {isLoading && <Loader show />}
              {/* <Loader show /> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
