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

// export const SessionsProvider = ({ children }) => {
//   const [newSessions, setNewSessions] = useState([]);

//   return (
//     <SessionsContext.Provider value={(newSessions, setNewSessions)}>
//       {children}
//     </SessionsContext.Provider>
//   );
// };
