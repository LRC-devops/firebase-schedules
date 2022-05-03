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
    .orderBy("subject")
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
  const [editSession, setEditSession] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [isDeleted, setIsDeleted] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [radioArr, setRadioArr] = useState([]);

  const { user } = useContext(UserContext);

  // console.log(props.posts);

  // server communication
  let scheduleRef;
  let unsubscribe;

  scheduleRef = firestore.collection("agSched");

  const submitHandler = (e) => {
    e.preventDefault();

    const s = e.target;
    // console.log(s.host.value.length);

    if (
      s.subject.value.length < 0 ||
      s.course.value.length < 0 ||
      s.dayTime.value.length < 0 ||
      s.host.value.length < 0 ||
      s.mode.value.length < 0
    ) {
      setIsValid(false);
    }

    if (!isValid) {
      return toast.error("session data is incomplete");
    } else if (isValid) {
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

      // reset inputs
      e.target.subject.value = "";
      e.target.course.value = "";
      e.target.dayTime.value = "";
      e.target.host.value = "";
      e.target.link.value = "";
      e.target.mode.value = "";
    }
  };

  const deleteSessionsHandler = async (e) => {
    // docRef = firestore.collection("agSched");
    setIsLoading(true);
    const id = modalContent.session;
    console.log(id);
    await db.collection("agSched").doc(id).delete();
    setIsLoading(false);
    setShowModal(false);
    setIsDeleted([...isDeleted, id]);
    return toast.success(`${id} was successfully removed from the database`);
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

  const triggerEdit = (e) => {
    setShowModal(true);
    setModalContent({
      action: e.target.innerHTML,
      session: e.target.id,
      id: e.target.parentElement.getAttribute("data-id"),
    });
  };

  const editRefArr = ["subject", "course", "dayTime", "host", "link", "mode"];

  const submitEditHandler = async (e) => {
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

      // CONVERT DATA INTO OBJECT - NOTE keep getting error that firestore wont take an array, however, the adat is being transfered perfectly fine even with the thrown error message
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
    docRef.update("cancel", true);
    docRef.update("initCancel", e.target.initCancel.value);
    docRef.update("revertCancel", e.target.revertCancel.value);
    setIsLoading(false);
    toast.success("Session was successfully deleted");
  };

  return (
    <main>
      {showModal && (
        <Modal
          onClose={onCloseModal}
          action={modalContent.action}
          session={modalContent.session}
          onConfirm={deleteSessionsHandler}
          cancelSubmitHandler={cancelSubmitHandler}
          submitEditHandler={submitEditHandler}
        />
      )}
      <div className="flex-col">
        <div className="flex">
          {/* <SimpleTable /> */}
          {user && (
            <Editor submitHandler={submitHandler} setIsValid={setIsValid} />
          )}

          <div>
            <div className="table--box">
              <h1>Guided Study Groups</h1>
              <div>
                {user && <h2>Current (server) Data</h2>}

                <Table
                  key={String(Math.random())}
                  posts={posts}
                  deleteSessionsHandler={deleteSessionsHandler}
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
