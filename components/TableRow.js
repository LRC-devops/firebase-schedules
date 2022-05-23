import { useState, useContext } from "react";
import { SessionsContext, UserContext } from "../lib/context";
import { AiOutlineArrowRight } from "react-icons/ai";
import { checkCancel } from "../lib/hooks";

function TableRow(props) {
  let trClass;

  if (checkCancel(props.post.initCancel, props.post.revertCancel)) {
    trClass = "cancel-session";
  } else if (props.post.mode === "Zoom") {
    trClass = "zoom-session";
  } else if (props.post.mode === "In-Person") {
    trClass = "in-person-session";
  }

  if (props.post.initCancel) {
    checkCancel(props.post.initCancel);
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

  // console.log(typeof props.post.initCancel);

  return (
    <tr key={props.post.docId} className={trClass}>
      {props.action === "edit" && (
        <>
          <td>
            <a
              className="danger-link"
              onClick={props.triggerModal}
              id={props.post.docId}
              session={`${props.post.host}-${props.post.course}`}
              name={`${props.post.host}'s ${props.post.course} ${props.post.dayTime} session`}
            >
              CANCEL
            </a>
          </td>
          <td id={props.dataId}>
            <a
              className="danger-link"
              onClick={props.triggerModal}
              id={props.post.docId}
              name={`${props.post.host}'s ${props.post.course} ${props.post.dayTime} session`}
            >
              DELETE
            </a>
          </td>
          <td id={props.dataId}>
            <a
              className="danger-link"
              onClick={props.triggerEdit}
              id={props.post.docId}
              name={`${props.post.host}'s ${props.post.course} ${props.post.dayTime} session`}
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
      <td>
        {trClass === "cancel-session"
          ? `Cancelled (${props.post.initCancel.slice(
              5
            )} - ${props.post.revertCancel.slice(5)})`
          : mode}
      </td>
    </tr>
  );
}

export default TableRow;

// {checkCancel(props.post)
//   ? `Cancelled ${props.post.initCancel} - ${props.post.revertCancel}`
//   : props.post.mode}

// {checkCancel(props.post.initCancel, props.post.revertCancel)
//   ? `Cancelled ${props.post.initCancel} - ${props.post.revertCancel}`
//   : props.post.mode}
