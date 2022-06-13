import { createContext, useState, useReducer } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import {
  batchSubmitHandler,
  cancelSession,
  deleteSession,
  editSession,
  useAddSession,
} from "../lib/hooks";

export const UserContext = createContext({ user: null });

export const ShowModal = createContext({ showModal: false });

export const SessionsContext = createContext({});

const defaultSessionState = {
  isLoading: false,
  showModal: false,
  isSubmit: false,
};

const sessionReducer = (state, action) => {
  if (action.type === "ADD") {
    return batchSubmitHandler(
      action.session,
      action.service,
      action.serviceType
    );
  } else if (action.type === "EDIT") {
    if (editSession(action.val, action.session, action.service)) {
    }
  } else if (action.type === "CANCEL") {
    cancelSession(action.val, action.service);
  } else if (action.type === "DELETE") {
    if (deleteSession(action.session, action.service)) {
    } else {
      return toast.error(`${id} was not from the database`);
    }
  } else {
    return toast.error(`An error occured`);
  }
  return defaultSessionState;
};

export const SessionsProvider = ({ children }) => {
  const [newSessions, setNewSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const [sessionState, dispatchSessionAction] = useReducer(
    sessionReducer,
    defaultSessionState
  );

  const editHandler = (e, session, service, serviceType) => {
    dispatchSessionAction({
      type: "EDIT",
      session: session,
      val: e,
      service: service,
      serviceType: serviceType,
    });
  };
  const addHandler = (e, session, service, serviceType) => {
    dispatchSessionAction({
      type: "ADD",
      session: session,
      val: e,
      service: service,
      serviceType: serviceType,
    });
  };
  const cancelHandler = (e, service, serviceType) => {
    dispatchSessionAction({
      type: "CANCEL",
      val: e,
      service: service,
      serviceType: serviceType,
    });
  };
  const deleteHandler = (session, service, serviceType) => {
    dispatchSessionAction({
      type: "DELETE",
      session: session,
      service: service,
      serviceType: serviceType,
    });
  };

  const sessionContext = {
    newSessions: newSessions,
    setNewSessions: setNewSessions,
    showModal: showModal,
    setShowModal: setShowModal,
    modalContent: modalContent,
    setModalContent: setModalContent,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    isDeleted: [],
    setIsDeleted: () => {},
    edit: editHandler,
    add: addHandler,
    delete: deleteHandler,
    cancel: cancelHandler,
    posts: posts,
    setPosts: setPosts,
  };

  return (
    <SessionsContext.Provider value={sessionContext}>
      {children}
    </SessionsContext.Provider>
  );
};
