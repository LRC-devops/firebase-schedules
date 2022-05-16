import { useState, useContext } from "react";
import { SessionsContext, UserContext } from "../lib/context";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useCheckCancel } from "../lib/hooks";

function TableRow(props) {
  const { user } = useContext(UserContext);
  const { isDeleted } = useContext(SessionsContext);

  let trClass;

  if (useCheckCancel(props.post.initCancel, props.post.revertCancel)) {
    trClass = "cancel-session";
  } else if (props.post.mode === "Zoom") {
    trClass = "zoom-session";
  } else if (props.post.mode === "In-Person") {
    trClass = "in-person-session";
  }

  if (props.post.initCancel) {
    useCheckCancel(props.post.initCancel);
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
