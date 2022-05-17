import Editor from "../components/Editor";
import Table from "../components/Table";
import Loader from "../components/Loader";
import { useContext, useState } from "react";
import { SessionsContext, UserContext } from "../lib/context";
import Modal from "../components/Modal";
import { useBatchSubmitHandler, useCancelSubmitHandler } from "../lib/hooks";

import { firestore, sessionToJSON } from "../lib/firebase";

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
  // const [isSubmit, setIsSubmit] = useState(false);
  // const [modalContent, setModalContent] = useState({});

  const { user } = useContext(UserContext);
  const {
    newSessions,
    setNewSessions,
    setIsLoading,
    isLoading,
    showModal,
    setShowModal,
    setIsDeleted,
    modalContent,
    setModalContent,
  } = useContext(SessionsContext);
  const sessionCtx = useContext(SessionsContext);

  const posts = props.posts;
  // server communication

  // FIXME: DELETE handler

  // console.log("Modal content in index", modalContent);

  const deleteSessionsHandler = (e) => {
    setIsLoading(true);
    setIsDeleted((prevState) => {
      return [...prevState, modalContent.session];
    });
    sessionCtx.delete(modalContent.session);
    setShowModal(false);
    setIsLoading(false);
  };
  const submitEditHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    sessionCtx.edit(e, modalContent.session);
    setIsLoading(false);
  };

  const addSessionHandler = (e) => {
    setIsLoading(true);
    // setIsSubmit(true);
    const s = e.target;
    // useBatchSubmitHandler(e, newSessions);
    // s.subject.value = "";
    // s.course.value = "";
    // s.dayTime.value = "";
    // s.host.value = "";
    // s.link.value = "";
    // s.mode.value = "";
    sessionCtx.add(e, newSessions);
    setIsLoading(false);
    return setNewSessions([]);
  };

  // FIXME: MODAL handler
  // The reducer would house this modal trigger as well
  const modalTrigger = (e) => {
    setShowModal(true);
    setModalContent({
      action: e.target.innerHTML,
      session: e.target.id,
      // id: e.target.parentElement.getAttribute("data-id"),
      name: e.target.name,
    });
    // console.log(modalContent);
  };
  const onCloseModal = () => {
    setShowModal(false);
  };

  // FIXME: CANCEL handler

  const cancelSubmitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    useCancelSubmitHandler(e);
    // sessionCtx.cancel(e);
    setIsLoading(false);
  };

  // EDITOR (if User)
  if (user) {
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
            // posts={posts}
          />
        )}
        <div className="flex-col">
          <div className="flex">
            <Editor action={`add`} />

            <div>
              <div className="table--box">
                <h1>Guided Study Groups</h1>
                <div>
                  <h2>Current (server) Data</h2>

                  <Table
                    key={String(Math.random())}
                    posts={posts}
                    triggerModal={modalTrigger}
                    triggerEdit={modalTrigger}
                  />
                </div>

                <h2>New (local) Data</h2>

                <Table posts={newSessions} key={String(Math.random())} />

                {newSessions.length > 0 ? (
                  <button className="btn btn-login" onClick={addSessionHandler}>
                    Submit Data to Server
                  </button>
                ) : null}
                {sessionCtx.isLoading && <Loader show />}
              </div>
            </div>
          </div>
        </div>
      </main>
    );

    // USER (if !User)
  } else {
    return (
      <main>
        <div className="flex-col">
          <div className="flex">
            <div className="table--box">
              <h1>Guided Study Groups</h1>
              <div>
                {user && <h2>Current (server) Data</h2>}

                <Table
                  key={String(Math.random())}
                  posts={posts}
                  triggerModal={modalTrigger}
                  triggerEdit={modalTrigger}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // return (
  //   <main>
  //     {showModal && (
  //       <Modal
  //         onClose={onCloseModal}
  //         action={modalContent.action}
  //         session={modalContent.session}
  //         name={modalContent.name}
  //         modalContent={modalContent}
  //         onConfirm={deleteSessionsHandler}
  //         cancelSubmitHandler={cancelSubmitHandler}
  //         submitEditHandler={submitEditHandler}
  //         // posts={posts}
  //       />
  //     )}
  //     <div className="flex-col">
  //       <div className="flex">
  //         {/* <SimpleTable /> */}
  //         {user && (
  //           // <Editor submitHandler={submitHandler} setIsValid={setIsValid} />
  //           <Editor action={`add`} />
  //         )}

  //         <div>
  //           <div className="table--box">
  //             <h1>Guided Study Groups</h1>
  //             <div>
  //               {user && <h2>Current (server) Data</h2>}

  //               <Table
  //                 key={String(Math.random())}
  //                 posts={posts}
  //                 triggerModal={modalTrigger}
  //                 triggerEdit={modalTrigger}
  //               />
  //             </div>
  //             {user && (
  //               <>
  //                 <h2>New (local) Data</h2>

  //                 <Table posts={newSessions} key={String(Math.random())} />
  //               </>
  //             )}
  //             {newSessions.length && !sessionCtx.isSubmit ? (
  //               <button className="btn btn-login" onClick={addSessionHandler}>
  //                 Submit Data to Server
  //               </button>
  //             ) : null}
  //             {sessionCtx.isLoading && <Loader show />}
  //             {/* <Loader show /> */}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </main>
  // );
}
