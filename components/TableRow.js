import { useState, useContext } from "react";
import { UserContext } from "../lib/context";
import { AiOutlineArrowRight } from "react-icons/ai";

function TableRow(props) {
  const [sessionToEdit, setSessionToEdit] = useState("");
  const [showModal, setShowModal] = useState(true);

  const { user } = useContext(UserContext);

  // let sessionToEdit = [];
  // const radioSelectHandler = (e) => {
  //   // setSessionToEdit([...sessionToEdit, e.target.id]);
  //   // setSessionToEdit((prevData) => [...prevData, e.target.id]);
  //   // setSessionToEdit([...sessionToEdit, e.target.id]);
  //   // sessionToEdit.push(e.target.id);
  //   // console.log(e.target.id);
  //   // setSessionToEdit([e.target.id]);
  //   // console.log(
  //   //   "session added to radioselectHandler in Table.js",
  //   //   sessionToEdit
  //   // );
  // };

  // const deleteHandler = (e) => {
  //   // setShowModal(true);
  //   // console.log("target", e.target.id);
  //   // setSessionToEdit(e.target.id);
  //   // console.log("sessionToEdit", sessionToEdit);
  // };

  let trClass;
  if (props.post.cancel) {
    trClass = "cancel-session";
  } else if (props.post.mode === "Zoom") {
    trClass = "zoom-session";
  } else {
    trClass = "in-person-session";
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
