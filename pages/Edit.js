import { useContext, useState } from "react";
import { SessionsContext, UserContext } from "../lib/context";
import Modal from "../components/Modal";
import Editor from "../components/Editor";
import Table from "../components/Table";
import Loader from "../components/Loader";
import { firestore, sessionToJSON, sswSessionToJSON } from "../lib/firebase";
import { useCancelSession } from "../lib/hooks";
import toast from "react-hot-toast";

// import { getServerSideProps } from "./index";

// const posts = getServerSideProps();
// getServerSideProps is only called on index load, so on first load of this page, there is no data to be displayed!

export async function getServerSideProps(context) {
  const postsQuery = firestore.collection("agSched").orderBy("subject");
  const posts = (await postsQuery.get()).docs.map(sessionToJSON);
  return {
    props: { posts },
  };
}
// export function addSnapshot(filter) {
//   // let dataQuery;
//   console.log("enter addSnapshot fn");
//   console.log("filter passed into addSnapshot fn", filter);
//   try {
//     const dataQuery = firestore.collection(`${filter}`).orderBy("subject");
//     const posts = dataQuery.get().docs.map(sessionToJSON);
//     // setData(posts);
//     return {
//       props: { posts },
//     };
//   } catch (err) {
//     toast.error("An error occured");
//   }
// }

const Edit = (props) => {
  const [filter, setFilter] = useState(null);
  const { user } = useContext(UserContext);
  const [data, setData] = useState();

  // if no user, render nothing
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
  console.log("posts", posts);
  console.log("data", data);
  if (!user) {
    return null;
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
    const newArr = [...newSessions];
    console.log(newArr);
    sessionCtx.add(e, newArr);
    setIsLoading(false);
    return setNewSessions([]);
  };
  const cancelSubmitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await sessionCtx.cancel(e);
    setIsLoading(false);
  };
  const filterChangeHandler = (e) => {
    setFilter(e.target.value);
    // if (filter === "gsg") {
    //   const posts = addSnapshot("agSched");
    // } else if (filter === "ssw") {
    //   const posts = addSnapshot("sswSched");
    // }
    // console.log("updated filter state", e.target.value);
    // console.log(posts);
  };

  // const dataToTable = data;

  // if (!dataToTable) {
  //   toast.error("no data retrieved from db");
  // }

  if (!filter || filter === null) {
    return (
      <main>
        <select value={filter} onChange={filterChangeHandler}>
          <option value={null} defaultValue>
            Select a schedule to edit
          </option>
          <option value={"gsg"}>GSG</option>
          <option value={"ssw"}>SSW</option>
          <option value={"si"}>SI</option>
          <option value={"iprep"}>iPrep</option>
        </select>
      </main>
    );
  } else {
    return (
      <main>
        <select value={filter} onChange={filterChangeHandler}>
          <option value={null} defaultValue>
            Select a schedule to edit
          </option>
          <option value={"gsg"}>GSG</option>
          <option value={"ssw"}>SSW</option>
          <option value={"si"}>SI</option>
          <option value={"iprep"}>iPrep</option>
        </select>
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
                    action="edit"
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
  }

  // return (
  //   <main>
  //     <select value={filter} onChange={filterChangeHandler}>
  //       <option value={"gsg"}>GSG</option>
  //       <option value={"ssw"}>SSW</option>
  //       <option value={"si"}>SI</option>
  //       <option value={"iprep"}>iPrep</option>
  //     </select>
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
  //         posts={posts}
  //       />
  //     )}
  //     <div className="flex-col">
  //       <div className="flex">
  //         <Editor action={`add`} />

  //         <div>
  //           <div className="table--box">
  //             <h1>Guided Study Groups</h1>
  //             <div>
  //               <h2>Current (server) Data</h2>

  //               <Table
  //                 key={String(Math.random())}
  //                 posts={posts}
  //                 triggerModal={modalTrigger}
  //                 triggerEdit={modalTrigger}
  //                 action="edit"
  //               />
  //             </div>

  //             <h2>New (local) Data</h2>

  //             <Table posts={newSessions} key={String(Math.random())} />

  //             {newSessions.length > 0 ? (
  //               <button className="btn btn-login" onClick={addSessionHandler}>
  //                 Submit Data to Server
  //               </button>
  //             ) : null}
  //             {sessionCtx.isLoading && <Loader show />}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </main>
  // );
};

export default Edit;
