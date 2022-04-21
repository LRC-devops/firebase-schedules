import { useState } from "react";
function TableRow(props) {
  const [sessionToEdit, setSessionToEdit] = useState("");
  const [showModal, setShowModal] = useState(true);
  // let sessionToEdit = [];
  const radioSelectHandler = (e) => {
    // setSessionToEdit([...sessionToEdit, e.target.id]);
    // setSessionToEdit((prevData) => [...prevData, e.target.id]);
    // setSessionToEdit([...sessionToEdit, e.target.id]);
    // sessionToEdit.push(e.target.id);
    // console.log(e.target.id);
    // setSessionToEdit([e.target.id]);
    // console.log(
    //   "session added to radioselectHandler in Table.js",
    //   sessionToEdit
    // );
  };

  const deleteHandler = (e) => {
    // setShowModal(true);
    // console.log("target", e.target.id);
    // setSessionToEdit(e.target.id);
    // console.log("sessionToEdit", sessionToEdit);
  };

  return (
    <>
      <tr key={props.post.id}>
        <td id="props.dataId">
          {/* <input
            type="radio"
            onChange={radioSelectHandler}
            id={props.post.id}
          /> */}
          <a
            className="danger-link"
            onClick={props.triggerModal}
            id={props.post.id}
          >
            DELETE
          </a>
        </td>
        <td>{props.post.course}</td>
        <td>{props.post.dayTime}</td>
        <td>{props.post.host}</td>
        <td>{props.post.link}</td>
        <td>{props.post.mode}</td>
        <td>{props.post.subject}</td>
      </tr>
    </>
  );
}

export default TableRow;
