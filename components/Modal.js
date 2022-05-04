import { AiOutlineCloseCircle } from "react-icons/ai";
import Editor from "./Editor";

const Modal = (props) => {
  let modalContent;
  const modalFill = () => {};
  if (props.action === "DELETE") {
    modalContent = (
      <>
        <p>{`Are you sure you want to ${props.action} "${props.session}"?`}</p>
        <button onClick={props.onConfirm}>Confirm {props.action}</button>
      </>
    );
  } else if (props.action === "EDIT") {
    modalContent = (
      <>
        <Editor
          value={props.session}
          onSubmit={props.submitEditHandler}
          posts={props.posts}
          isCancelled={props.modalContent.isCancelled}
        />
      </>
    );
  } else if (props.action === "CANCEL") {
    modalContent = (
      <>
        <h2>{`You are attempting to cancel session: ${props.session}`}</h2>
        <form
          className="form-basic"
          onSubmit={props.cancelSubmitHandler}
          id={props.session}
        >
          <label htmlFor="cancel">Initiate Change</label>
          <input type="date" id="initCancellation" name="initCancel" />
          <label htmlFor="cancel">Revert Change</label>
          <input type="date" id="revertCancellation" name="revertCancel" />
          <button>Submit Cancellation</button>
        </form>
      </>
    );
  }
  return (
    <>
      <div className="modal__background"></div>
      <div className="modal">
        <div className="modal__title">
          <h2>{props.action}</h2>
        </div>
        <div className="modal__content">{modalContent}</div>

        <AiOutlineCloseCircle className="modal__icon" onClick={props.onClose} />
      </div>
    </>
  );
};

export default Modal;

// {props.action === "DELETE" ? (
//   <>
//     <p>{`Are you sure you want to ${props.action} "${props.session}"?`}</p>
//     <button onClick={props.onConfirm}>Confirm {props.action}</button>
//   </>
// ) : (
//   <>
//     <Editor value={props.session} />
//   </>
// )}
