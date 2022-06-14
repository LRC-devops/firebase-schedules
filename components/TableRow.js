import { AiOutlineArrowRight } from "react-icons/ai";
import { checkCancel } from "../lib/hooks";
import { SessionsContext } from "../lib/context";
import { useContext } from "react";

function TableRow(props) {
  const { serviceType } = useContext(SessionsContext);
  const post = props.post;
  let trClass;

  if (checkCancel(post.initCancel, post.revertCancel)) {
    trClass = "cancel-session";
  } else if (post.mode === "Zoom") {
    trClass = "zoom-session";
  } else if (post.mode === "In-Person") {
    trClass = "in-person-session";
  }

  if (post.initCancel) {
    checkCancel(post.initCancel);
  }

  let mode;
  if (post.mode === "Zoom") {
    mode = (
      <a className="table--link" href={post.link}>
        {post.mode} <AiOutlineArrowRight />
      </a>
    );
  } else {
    mode = post.mode;
  }

  const convertDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const day = dateObj.getMonth() + 1;
    const month = dateObj.getDate();
    const time = dateObj.getHours();

    return `${day} / ${month} ${time}-${time + 1}`;
  };

  if (props.action === "edit") {
    return (
      <tr key={post.docId} className={trClass}>
        <td>
          <a
            className="danger-link"
            onClick={props.triggerModal}
            id={post.docId}
            session={`${post.host}-${post.course}`}
            schedName={`${post.host}'s ${post.course} ${post.dayTime} session`}
            calenName={`${post.subject} on ${post.date}`}
          >
            CANCEL
          </a>
        </td>
        <td id={props.dataId}>
          <a
            className="danger-link"
            onClick={props.triggerModal}
            id={post.docId}
            schedName={`${post.host}'s ${post.course} ${post.dayTime} session`}
            calenName={`${post.subject} on ${post.date}`}
          >
            DELETE
          </a>
        </td>
        <td id={props.dataId}>
          <a
            className="danger-link"
            onClick={props.triggerEdit}
            id={post.docId}
            schedName={`${post.host}'s ${post.course} ${post.dayTime} session`}
            calenName={`${post.subject} on ${post.date}`}
          >
            EDIT
          </a>
        </td>
        {serviceType === "sched" ? (
          <>
            <td>{post.host}</td>
            <td>{post.course}</td>
            <td>{post.subject}</td>
            <td>{post.dayTime}</td>
            <td>{post.initCancel}</td>
            <td>{post.revertCancel}</td>
            <td>
              {trClass === "cancel-session"
                ? `Cancelled (${post.initCancel.slice(
                    5
                  )} - ${post.revertCancel.slice(5)})`
                : mode}
            </td>
          </>
        ) : (
          <>
            <td>{post.subject}</td>
            <td>{convertDate(post.date)}</td>
            <td>{post.mode}</td>
          </>
        )}
      </tr>
    );
  } else if (props.action === "filteredAgSched") {
    return (
      <tr key={post.docId} className={trClass}>
        <td>{post.host}</td>
        <td>{post.course}</td>
        <td>{post.subject}</td>
        <td>{post.dayTime}</td>
        <td>
          {trClass === "cancel-session"
            ? `Cancelled (${post.initCancel.slice(
                5
              )} - ${post.revertCancel.slice(5)})`
            : mode}
        </td>
      </tr>
    );
  }
  // else if (props.action === "ssw") {
  //   return (
  //     <tr key={post.docId} className={trClass}>
  //       <td>{post.subject}</td>
  //       <td>{convertDate(post.date)}</td>
  //       <td>
  //         {trClass === "cancel-session"
  //           ? `Cancelled (${post.initCancel.slice(
  //               5
  //             )} - ${post.revertCancel.slice(5)})`
  //           : mode}
  //       </td>
  //     </tr>
  //   );
  // }
}

export default TableRow;
