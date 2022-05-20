import UiCard from "../components/UiCard";
import ScheduleBtns from "../components/ScheduleBtns";
import Table from "../components/Table";
import { SessionsContext } from "../lib/context";
import { useContext, useState } from "react";
import Modal from "../components/Modal";
import ScheduleModal, { queryByBtnName } from "../components/ScheduleModal";
import { db, firestore, sessionToJSON } from "../lib/firebase";

const User = (props) => {
  const { showModal, setShowModal, setModalContent, modalContent } =
    useContext(SessionsContext);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const getData = async (btnName) => {
    try {
      const docRef = firestore
        .collection("LRC")
        .doc("schedules")
        .collection("agSched")
        .where("subject", "==", btnName);
      const sessions = (await docRef.get()).docs.map(sessionToJSON);
      // console.log("inside getData fn", sessions);
      await setModalContent({
        sessions: sessions,
      });
      return {
        props: { sessions },
      };
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(getData(props.modalContent.btnName));

  const btnClickHandler = (e) => {
    const btnName = e.target.innerHTML;
    setShowModal(true);
    const sessions = getData(btnName);
    setModalContent({
      btnName: btnName,
      // sessions: sessions,
    });
    console.log(modalContent.sessions);
    // queryByBtnName(btnName);
    return btnName;
  };

  // const {}useContext(SessionContext)
  const posts = props.posts;
  // const posts = [modalContent.sessions];
  return (
    <main>
      <div className="flex-col">
        <div className="flex">
          <div className="table--box">
            {/* <h1>Guided Study Groups</h1> */}
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
              <ScheduleBtns posts={posts} btnClickHandler={btnClickHandler} />
              {/* <Table key={String(Math.random())} posts={posts} /> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default User;
