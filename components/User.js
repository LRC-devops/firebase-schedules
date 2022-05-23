import UiCard from "./UiCard";
import ScheduleBtns from "./ScheduleBtns";
import Table from "./Table";
import { SessionsContext } from "../lib/context";
import { useContext, useState } from "react";
import Modal from "./Modal";
import ScheduleModal, { queryByBtnName } from "./ScheduleModal";
import { db, firestore, sessionToJSON } from "../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

const User = (props) => {
  const {
    showModal,
    setShowModal,
    setModalContent,
    modalContent,
    setIsLoading,
  } = useContext(SessionsContext);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const posts = props.posts;

  // const postRef = firestore.collection("agSched").docs;
  // const [realtimePost] = useDocumentData(postRef);

  // const posts = realtimePost || props.posts;

  // const btnClickHandler = async (e) => {
  //   setIsLoading(true);
  //   const queryData = async (name) => {
  //     try {
  //       const docRef = db
  //         .collection("agSched")
  //         .where("subject", "==", name)
  //         .limit(20);

  //       const data = (await docRef.get()).docs.map(sessionToJSON);
  //       await setModalContent({ sessions: data, btnName: name });
  //       console.log(data);

  //       return data;
  //     } catch (err) {
  //       console.error("Uh Oh!");
  //     }
  //   };
  //   const btnName = e.target.innerHTML;
  //   // queryData(btnName).then((result) =>
  //   //   setModalContent({ sessions: result, btnName: btnName })
  //   // ),
  //   await queryData(btnName);
  //   setShowModal(true);
  //   // setModalContent({
  //   //   btnName: btnName,
  //   // });
  //   console.log(modalContent.sessions);

  //   setIsLoading(false);
  //   return btnName;
  // };

  const btnClickHandler = (e) => {
    const btnName = e.target.innerHTML;
    setShowModal(true);
    // const sessions =
    setModalContent({
      btnName: btnName,
    });
    return btnName;
  };

  return (
    <main>
      <div className="flex-col">
        <div className="flex">
          <div className="table--box">
            <div>
              {showModal && (
                <ScheduleModal
                  onClose={onCloseModal}
                  action="USER_ACCESS"
                  // posts={posts}
                  btnName={btnClickHandler}
                  modalContent={modalContent}
                />
              )}
              <UiCard />
              {/* FIXME SHIT! How can I render the buttons based on db data if I'm only fetching the data on btn clicks??? */}
              <ScheduleBtns btnClickHandler={btnClickHandler} posts={posts} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default User;
