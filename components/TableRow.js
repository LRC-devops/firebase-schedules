import { useState, useContext } from "react";
import { UserContext } from "../lib/context";
import { AiOutlineArrowRight } from "react-icons/ai";

function TableRow(props) {
  const [sessionToEdit, setSessionToEdit] = useState("");
  const [showModal, setShowModal] = useState(true);

  const { user } = useContext(UserContext);

  let trClass;

  // console.log(props.post.revertCancel);
  const dataTest = String(props.post.revertCancel);
  // console.log(dataTest.slice(5));

  const returnCancelSession = (initCancel, revertCancel) => {
    const today = new Date();
    const todayMonth =
      today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    const todayDay =
      today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();

    // REMOVE FIRST 5 LETTERS FROM STRING (Typically year + '-')
    const stringInit = String(initCancel);
    const stringRevert = String(revertCancel);
    const dataStrInit = stringInit.slice(5);
    const dataStrRevert = stringRevert.slice(5);

    // console.log("dataStrInit", dataStrInit);
    // console.log("dataStrRevert", dataStrRevert);

    if (Number(dataStrInit.slice(0, 2)) === Number(todayMonth)) {
      if (
        Number(todayDay) >= Number(dataStrInit.slice(3)) &&
        Number(todayDay) < Number(dataStrRevert.slice(3))
      ) {
        // console.log("Session Should be Cancelled!");
        return true;
      } else {
        // console.log("Session should not be cancelled");
        return false;
      }
    }
  };

  if (returnCancelSession(props.post.initCancel, props.post.revertCancel)) {
    trClass = "cancel-session";
  } else if (props.post.mode === "Zoom") {
    trClass = "zoom-session";
  } else if (props.post.mode === "In-Person") {
    trClass = "in-person-session";
  }

  if (props.post.initCancel) {
    returnCancelSession(props.post.initCancel);
    let trCancelClassDate = props.post.initCancel;
    let trCancelClass = props.post.docId;
    // console.log("trCancelClass", trCancelClass, trCancelClassDate);
  }

  let mode;
  if (props.post.mode === "Zoom") {
    mode = (
      <a className="table--link" href={props.post.link}>
        {props.post.mode} <AiOutlineArrowRight />
      </a>
    );
  } else {
    mode = props.post.mode;
  }

  return (
    <tr key={props.post.docId} className={trClass}>
      {user && (
        <>
          <td>
            <a
              className="danger-link"
              onClick={props.triggerModal}
              id={props.post.docId}
              session={`${props.post.host}-${props.post.course}`}
            >
              CANCEL
            </a>
          </td>
          <td id="props.dataId">
            <a
              className="danger-link"
              onClick={props.triggerModal}
              id={props.post.docId}
            >
              DELETE
            </a>
          </td>
          <td id="props.dataId">
            <a
              className="danger-link"
              onClick={props.triggerEdit}
              id={props.post.docId}
            >
              EDIT
            </a>
          </td>
        </>
      )}
      <td>{props.post.host}</td>
      <td>{props.post.course}</td>
      <td>{props.post.subject}</td>
      <td>{props.post.dayTime}</td>
      <td>{mode}</td>
    </tr>
  );
}

export default TableRow;
