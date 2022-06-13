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
  const { showModal, setShowModal, setModalContent, modalContent } =
    useContext(SessionsContext);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const posts = props.posts;
  // console.log(posts);

  const btnClickHandler = (e) => {
    const btnName = e.target.innerHTML;
    setShowModal(true);
    // const sessions =
    setModalContent({
      btnName: btnName,
    });
    return btnName;
  };

  // console.log(props.service);

  const serviceCheck = () => {
    if (props.service === "agSched") {
      return (
        <>
          <UiCard />
          <ScheduleBtns btnClickHandler={btnClickHandler} posts={posts} />
        </>
      );
    } else if (props.service === "sswCalen") {
      return (
        <ScheduleBtns
          posts={["Schedule"]}
          type={props.type}
          btnClickHandler={btnClickHandler}
        />
      );
    }
  };

  return (
    <div className="flex-col">
      <div className="flex">
        <div>
          {showModal && (
            <ScheduleModal
              onClose={onCloseModal}
              action="USER_ACCESS"
              posts={posts}
              btnName={btnClickHandler}
              modalContent={modalContent}
              service={props.service}
            />
          )}
          {serviceCheck()}

          {/* {props.service.length > 3 && props.service.slice(-5) === "Sched" ? (
            <>
              <UiCard />
              <ScheduleBtns btnClickHandler={btnClickHandler} posts={posts} />
            </>
            : null}
          {props.serivce === "ssw" ? (
            <ScheduleBtns
              posts={["Schedule"]}
              type={props.type}
              btnClickHandler={btnClickHandler}
            />
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default User;
