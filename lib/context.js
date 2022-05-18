import { createContext, useState, useReducer } from "react";
import toast from "react-hot-toast";
import {
  useBatchSubmitHandler,
  useCancelSubmitHandler,
  useDeleteSession,
  useEditSession,
} from "../lib/hooks";

export const UserContext = createContext({ user: null });

export const ShowModal = createContext({ showModal: false });

export const SessionsContext = createContext({
  newSessions: [],
  setNewSessions: (data) => {},
  // isDeleted: [],
  // setIsDeleted: () => {},
  showModal: false,
  setShowModal: () => {},
  isLoading: false,
  setIsLoading: () => {},
  posts: {},
});

const defaultSessionState = {
  isLoading: false,
  // setIsLoading: () => {},
  showModal: false,
  isSubmit: false,
};

// console.log(defaultSessionState.isLoading);
const sessionReducer = (state, action) => {
  // state.isLoading = true;
  if (action.type === "ADD") {
    useBatchSubmitHandler(action.val, action.session);
  } else if (action.type === "EDIT") {
    console.log(action.val, action.session);
    if (useEditSession(action.val, action.session)) {
      // return toast.success(`${action.session} was successfully updated`);
    }
    // state.isLoading = true;
    // if (useEditSession(action.val, action.session)) {
    // state.isLoading = false;
    // state.showModal = false;
  } else if (action.type === "CANCEL") {
    useCancelSubmitHandler(action.val);
  } else if (action.type === "DELETE") {
    // state.isLoading = true;
    if (useDeleteSession(action.session)) {
      // state.isLoading = false;
      // state.showModal = false;
      // state.isDeleted = [...state.isDeleted, action.session];
      return toast
        .success
        // `${action.session} was successfully removed from the database`
        ();
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
  // const [isDeleted, setIsDeleted] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState([]);
  const [modalContent, setModalContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [btnName, setBtnName] = useState("");
  const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const [sessionState, dispatchSessionAction] = useReducer(
    sessionReducer,
    defaultSessionState
  );

  // console.log("newSessions", newSessions);

  const editHandler = (e, session) => {
    dispatchSessionAction({ type: "EDIT", session: session, val: e });
  };
  const addHandler = (e, session) => {
    dispatchSessionAction({ type: "ADD", session: session, val: e });
  };
  const cancelHandler = (e) => {
    dispatchSessionAction({ type: "CANCEL", session: session, val: e });
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

    // setIsDeleted: setIsDeleted,
    // setIsLoading: setIsLoading,
    // isDeleted: isDeleted,
  };

  return (
    <SessionsContext.Provider value={sessionContext}>
      {children}
    </SessionsContext.Provider>
  );
};
