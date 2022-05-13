import { createContext, useState } from "react";

export const UserContext = createContext({ user: null });

export const ShowModal = createContext({ showModal: false });

export const SessionsContext = createContext({
  newSessions: [],
  setNewSessions: (data) => {},
  isDeleted: [],
  setIsDeleted: () => {},
  showModal: false,
  setShowModal: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const SessionsProvider = ({ children }) => {
  const [newSessions, setNewSessions] = useState([]);
  const [isDeleted, setIsDeleted] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SessionsContext.Provider
      value={
        (newSessions,
        setNewSessions,
        isDeleted,
        setIsDeleted,
        showModal,
        setShowModal,
        isLoading,
        setIsLoading)
      }
    >
      {children}
    </SessionsContext.Provider>
  );
};
