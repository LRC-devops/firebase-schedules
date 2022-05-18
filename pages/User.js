import UiCard from "../components/UiCard";
import ScheduleBtns from "../components/ScheduleBtns";
import Table from "../components/Table";
import { SessionsContext } from "../lib/context";
import { useContext, useState } from "react";
import Modal from "../components/Modal";
import ScheduleModal from "../components/ScheduleModal";

const User = (props) => {
  const { showModal, setShowModal, setModalContent, modalContent } =
    useContext(SessionsContext);
  const btnClickHandler = (e) => {
    const btnName = e.target.innerHTML;
    setShowModal(true);
    setModalContent({
      btnName: btnName,
    });
    return btnName;
  };
  const onCloseModal = () => {
    setShowModal(false);
  };
  // const {}useContext(SessionContext)
  const posts = props.posts;
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
                  posts={posts}
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
