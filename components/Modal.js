import { useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Editor from "./Editor";
import { useDeleteSession } from "../lib/hooks";
import { toast } from "react-hot-toast";
import { SessionsProvider } from "../lib/context";
const Modal = (props) => {
  // const { setIsLoading, setShowModal, setIsDeleted } =
  //   useContext(SessionsContext);

  let modalContent;

  const btnClickHandler = () => {
    setIsLoading(true);

    if (useDeleteSession()) {
      const objRet = {
        isLoading: false,
        showModal: false,
        isDeleted: [...isDeleted, id],
      };
      setIsLoading(false);
      setShowModal(false);
      setIsDeleted([...isDeleted, id]);
      return toast.success(`${id} was successfully removed from the database`);
    } else {
      return toast.success(`${id} was not from the database`);
    }
  };
  // const modalFill = () => {};
  if (props.action === "DELETE") {
    modalContent = (
      <>
        <p>{`Are you sure you want to ${props.action} "${props.name}"?`}</p>
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
          action={`edit`}
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
    <SessionsProvider>
      <div className="modal__background"></div>
      <div className="modal">
        <div className="modal__title">
          <h2>{props.action}</h2>
        </div>
        <div className="modal__content">{modalContent}</div>

        <AiOutlineCloseCircle className="modal__icon" onClick={props.onClose} />
      </div>
    </SessionsProvider>
  );
};

export default Modal;
