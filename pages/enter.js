import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext, SessionsContext } from "../lib/context";
import Editor from "../components/Editor";
import Table from "../components/Table";
import { getServerSideProps } from "../pages/index";

// export async function getServerSideProps(context) {
//   const postsQuery = firestore
//     .collection("agSched")
//     .orderBy("subject")
//     .limit(20);
//   // return postsQuery;
//   const posts = (await postsQuery.get()).docs.map(sessionToJSON);
//   // const docIds = {await postsQuery.get(doc.id)}
//   return {
//     props: { posts },
//   };
// }

export default function enter(props) {
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

  return (
    <section className="enter-page">
      {user ? <SignOutButton /> : <SignInButton />}
      {/* {user ? (
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
                    <button
                      className="btn btn-login"
                      onClick={addSessionHandler}
                    >
                      Submit Data to Server
                    </button>
                  ) : null}
                  {sessionCtx.isLoading && <Loader show />}
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : null} */}
    </section>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={`/google-logo.png`} alt="google logo" /> Google Sign In
    </button>
  );
}
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}
