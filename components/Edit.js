import { useContext, useState } from "react";
import { SessionsContext, UserContext } from "../lib/context";
import Modal from "../components/Modal";
import Editor from "../components/Editor";
import Table from "../components/Table";
import Loader from "../components/Loader";

const Edit = (props) => {
  const { user } = useContext(UserContext);

  const {
    newSessions,
    setNewSessions,
    setIsLoading,
    showModal,
    setShowModal,
    setIsDeleted,
    modalContent,
    setModalContent,
  } = useContext(SessionsContext);
  const sessionCtx = useContext(SessionsContext);

  const posts = props.posts;
  const { service, type } = props;

  // if no user, render nothing
  if (!user) {
    return <h1>you do not have permission to edit sessions</h1>;
  }

  const modalTrigger = (e) => {
    setShowModal(true);
    setModalContent({
      action: e.target.innerHTML,
      session: e.target.id,
      name: e.target.name,
    });
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  // write submit handlers
  const deleteSessionsHandler = (e) => {
    setIsLoading(true);
    setIsDeleted((prevState) => {
      return [...prevState, modalContent.session];
    });
    sessionCtx.delete(modalContent.session, service, type);
    setShowModal(false);
    setIsLoading(false);
  };

  const submitEditHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    sessionCtx.edit(e, modalContent.session, service, type);
    setIsLoading(false);
  };

  const addSessionHandler = (e) => {
    setIsLoading(true);
    const newArr = [...newSessions];
    sessionCtx.add(e, newArr, service, type);
    setIsLoading(false);
    return setNewSessions([]);
  };
  // setIsLoading(true);
  const cancelSubmitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await sessionCtx.cancel(e, service, type);
    setIsLoading(false);
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
          <Editor action={`add`} service={service} type={type} />

          <div>
            <div className="table--box">
              <div>
                {posts.length < 1 ? (
                  <h2>This service does not yet exist</h2>
                ) : (
                  <h2>Current (server) Data</h2>
                )}

                <Table
                  key={String(Math.random())}
                  posts={posts}
                  triggerModal={modalTrigger}
                  triggerEdit={modalTrigger}
                  action="edit"
                />
              </div>

              {newSessions.length < 1 ? null : <h2>New (local) Data</h2>}

              <Table
                posts={newSessions}
                key={String(Math.random())}
                action="edit"
              />

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
};

export default Edit;
