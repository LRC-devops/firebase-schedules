import { firestore, auth } from "../lib/firebase";

import { useState, useEffect, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { serverTimestamp } from "../lib/firebase";
// import { SessionsContext } from "../lib/context";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState("");

  useEffect(() => {
    let unsub;
    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsub = ref.onSnapshot((doc) => {
        setUsername(doc.data?.username);
      });
    } else {
      setUsername(null);
    }

    return unsub;
  }, [user]);
  return { user };
}

export function useFilteredServerSideProps(btnName) {
  async function getServerSideProps(context) {
    if (btnName) {
      const postsQuery = firestore
        .collection("agSched")
        .where("subject", "==", "Music")
        .orderBy("createdAt", "desc")
        .limit(10);
    } else {
      const postsQuery = firestore
        .collection("agSched")
        .orderBy("createdAt", "desc")
        .limit(10);
    }

    const posts = (await postsQuery.get()).docs.map(sessionToJSON);

    return {
      props: { posts },
    };
  }
}

export function useToast(ty, msg) {
  return `toast.${ty}(${msg})`;
}

export function useAddSession(e) {
  // const [newSessions, setNewSessions] = useState([]);
  // useContext(SessionsContext);
  // e.preventDefault();

  const s = e.target;
  const newSession = [];

  console.log("s.subject.value.length", s.subject.value.length);

  newSession.push({
    subject: s.subject.value,
    course: s.course.value,
    dayTime: s.dayTime.value,
    host: s.host.value,
    link: s.link.value,
    mode: s.mode.value,
    createdAt: serverTimestamp(),
    id: `agSched${String(Math.random())}`,
  });

  // console.log(newSession);

  s.subject.value = "";
  s.course.value = "";
  s.dayTime.value = "";
  s.host.value = "";
  s.link.value = "";
  s.mode.value = "";

  // if (
  //   s.subject.value.length === 0 ||
  //   s.course.value.length === 0 ||
  //   s.dayTime.value.length === 0 ||
  //   s.host.value.length === 0 ||
  //   s.mode.value.length === 0
  // ) {
  //   // setIsValid(false);
  //   console.log("if returned true, exist and return error");
  //   return toast.error("session data is incomplete");
  // } else {
  //   console.log("if returned false, continue");
  //   newSession.push({
  //     subject: e.target.subject.value,
  //     course: e.target.course.value,
  //     dayTime: e.target.dayTime.value,
  //     host: e.target.host.value,
  //     link: e.target.link.value,
  //     mode: e.target.mode.value,
  //     createdAt: serverTimestamp(),
  //     id: `agSched${String(Math.random())}`,
  //   });
  //   // reset inputs
  //   e.target.subject.value = "";
  //   e.target.course.value = "";
  //   e.target.dayTime.value = "";
  //   e.target.host.value = "";
  //   e.target.link.value = "";
  //   e.target.mode.value = "";
  //   // }
  // }
  return newSession;
}

// setNewSessions([
//   ...newSessions,
//   {
//     subject: e.target.subject.value,
//     course: e.target.course.value,
//     dayTime: e.target.dayTime.value,
//     host: e.target.host.value,
//     link: e.target.link.value,
//     mode: e.target.mode.value,
//     createdAt: serverTimestamp(),
//     id: `agSched${String(Math.random())}`,
//   },
// ]);
