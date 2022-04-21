import { firestore, auth } from "../lib/firebase";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

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
