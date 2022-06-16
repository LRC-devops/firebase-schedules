import { useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Editor from "./Editor";
import { deleteSession } from "../lib/hooks";
import { toast } from "react-hot-toast";
import { SessionsProvider } from "../lib/context";
import classes from "./Modal.module.css";
import SignIn from "./SignIn";
const Modal = (props) => {
  let modalContent;
  let sessionRef;
  if (props.modalContent != undefined) {
    sessionRef = props.modalContent.sessionRef[0];
  }

  if (props.action === "DELETE") {
    modalContent = (
      <>
        <p>{`Are you sure you want to ${props.action} "${sessionRef.subject}"?`}</p>
        <button onClick={props.onConfirm}>Confirm {props.action}</button>
      </>
    );
  } else if (props.action === "EDIT") {
    modalContent = (
      <>
        <Editor
          value={props.name}
          onSubmit={props.submitEditHandler}
          posts={props.posts}
          isCancelled={props.modalContent.isCancelled}
          action={`edit`}
          nameRef={props.name}
          serviceType={props.serviceType}
          sessionRef={sessionRef}
          onClose={props.onClose}
        />
      </>
    );
  } else if (props.action === "CANCEL") {
    modalContent = (
      <>
        <h2>{`You are attempting to cancel session: ${props.name}`}</h2>
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
  let schedHeader;
  let calenHeader;
  if (sessionRef) {
    schedHeader = `${sessionRef.host}'s ${sessionRef.course} on ${sessionRef.dayTime}`;
    calenHeader = `${sessionRef.subject} on ${sessionRef.date}`;
  }

  return (
    <SessionsProvider>
      <>
        <div
          className={classes["modal__background"]}
          onClick={props.onClose}
        ></div>
        <div className={classes.modal}>
          <div className={classes["modal__title"]}>
            {props.action === "sign-in" ? null : <h2>{props.action}:</h2>}
            <h2>{props.serviceType === "sched" ? schedHeader : calenHeader}</h2>
          </div>
          <div className={classes["modal__content"]}>
            {props.action === "sign-in" ? <SignIn /> : modalContent}
          </div>

          <AiOutlineCloseCircle
            className={classes["modal__icon"]}
            onClick={props.onClose}
          />
        </div>
      </>
    </SessionsProvider>
  );
};

export default Modal;
