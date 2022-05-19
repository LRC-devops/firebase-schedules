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

  const btnClickHandler = (e) => {
    const btnName = e.target.innerHTML;
    setShowModal(true);
    setModalContent({
      btnName: btnName,
    });
    console.log(modalContent.sessions);
    return btnName;
  };

  const posts = props.posts;
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
                  posts={posts}
                  btnName={btnClickHandler}
                  modalContent={modalContent}
                />
              )}
              <UiCard />
              <ScheduleBtns posts={posts} btnClickHandler={btnClickHandler} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default User;
