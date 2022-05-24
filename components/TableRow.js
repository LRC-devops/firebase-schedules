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

  // let date = props.post.date;
  // if (date) {
  //   const convDate = new Date(date);
  // }

  // console.log(typeof new Date(props.post.date));
  const convertDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const day = dateObj.getMonth() + 1;
    const month = dateObj.getDate();
    const time = dateObj.getHours();

    return `${day} / ${month} | ${time}-${time + 1}`;
  };

  if (props.action === "edit") {
    return (
      <tr key={props.post.docId} className={trClass}>
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
  } else if (props.action === "filteredAgSched") {
    return (
      <tr key={props.post.docId} className={trClass}>
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
  } else if (props.action === "ssw") {
    return (
      <tr key={props.post.docId} className={trClass}>
        <td>{props.post.subject}</td>
        <td>{convertDate(props.post.date)}</td>
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
}

export default TableRow;
