import { firestore, auth } from "../lib/firebase";

import { useState, useEffect, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { serverTimestamp, db } from "../lib/firebase";

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
  const s = e.target;
  const newSession = [];

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

  s.subject.value = "";
  s.course.value = "";
  s.dayTime.value = "";
  s.host.value = "";
  s.link.value = "";
  s.mode.value = "";

  return newSession;
}

export async function useDeleteSession(id) {
  // setIsLoading(true);
  // const id = modalContent.session;
  // console.log(id);
  await db.collection("agSched").doc(id).delete();
  // setIsLoading(false);
  // setShowModal(false);
  // setIsDeleted([...isDeleted, id]);
  // return toast.success(`${id} was successfully removed from the database`);
}
