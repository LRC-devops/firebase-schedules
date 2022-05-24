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

import { firestore } from "../lib/firebase";
import { useEffect } from "react";

export const UserContext = createContext({ user: null });

export const ShowModal = createContext({ showModal: false });

export const SessionsContext = createContext({});

const defaultSessionState = {
  isLoading: false,
  showModal: false,
  isSubmit: false,
};

// console.log(defaultSessionState.isLoading);
const sessionReducer = (state, action) => {
  if (action.type === "ADD") {
    return batchSubmitHandler(action.session);
    // useEffect(() => {
    //   const newArr = [...action.session];
    //   console.log("i fire once");
    // }, []);
  } else if (action.type === "EDIT") {
    // console.log(action.val, action.session);
    if (editSession(action.val, action.session)) {
      // return toast.success(`${action.session} was successfully updated`);
    }
    // state.isLoading = true;
    // if (useEditSession(action.val, action.session)) {
    // state.isLoading = false;
    // state.showModal = false;
  } else if (action.type === "CANCEL") {
    cancelSession(action.val);
  } else if (action.type === "DELETE") {
    // state.isLoading = true;
    if (deleteSession(action.session)) {
      // state.isLoading = false;
      // state.showModal = false;
      // state.isDeleted = [...state.isDeleted, action.session];
      // return toast
      //   .success
      // `${action.session} was successfully removed from the database`
      // ();
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
  const [isDeleted, setIsDeleted] = useState([]);
  const [modalContent, setModalContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [btnName, setBtnName] = useState("");
  const [posts, setPosts] = useState([]);

  const [sessionState, dispatchSessionAction] = useReducer(
    sessionReducer,
    defaultSessionState
  );

  const editHandler = (e, session) => {
    dispatchSessionAction({ type: "EDIT", session: session, val: e });
  };
  const addHandler = (e, session) => {
    dispatchSessionAction({ type: "ADD", session: session, val: e });
  };
  const cancelHandler = (e) => {
    dispatchSessionAction({ type: "CANCEL", val: e });
  };
  const deleteHandler = (session) => {
    dispatchSessionAction({ type: "DELETE", session: session });
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
