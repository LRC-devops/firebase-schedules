import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = (props) => {
  return (
    <>
      <div className="modal__background"></div>
      <div className="modal">
        <div className="modal__title">
          <h2>{props.action}</h2>
        </div>
        <div className="modal__content">
          <p>{`Are you sure you want to ${props.action} "${props.session}"?`}</p>
          <button onClick={props.onConfirm}>Confirm {props.action}</button>
        </div>

        <AiOutlineCloseCircle className="modal__icon" onClick={props.onClose} />
      </div>
    </>
  );
};

export default Modal;
