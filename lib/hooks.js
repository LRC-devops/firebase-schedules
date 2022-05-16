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

  const newSessObj = {
    subject: s.subject.value,
    course: s.course.value,
    dayTime: s.dayTime.value,
    host: s.host.value,
    link: s.link.value,
    mode: s.mode.value,
    createdAt: serverTimestamp(),
    id: `agSched${String(Math.random())}`,
  };

  return newSessObj;
}

export async function useDeleteSession(id) {
  try {
    await db.collection("agSched").doc(id).delete();
    return toast.success(`${id} was successfully Deleted`);
  } catch (error) {
    return toast.error(error);
  }
}

export async function useEditSession(e, id) {
  const editRefArr = ["subject", "course", "dayTime", "host", "link", "mode"];
  const batch = firestore.batch();
  console.log("enter useEditSession hook");
  // try {
  //   console.log("enter try");
  //   const newArr = [];
  //   console.log("in useEditSession", e.target.elements);
  //   Array.from(e.target.elements).forEach((session) => {
  //     newArr.push(session.value);
  //   });
  //   console.log("try newArr", newArr);

  //   const docRef = firestore.collection("agSched").doc(id);

  //   batch.set(
  //     newArr.forEach((session, index) => {
  //       if (session.length > 0) {
  //         docRef.update(editRefArr[index], session);
  //       } else {
  //         null;
  //       }
  //     })
  //   );
  //   await batch.commit();
  //   // return toast.success("Success!");
  // }
  try {
    console.log("enter try");
    const newArr = [];
    console.log("in useEditSession", e.target.elements);
    Array.from(e.target.elements).forEach((session) => {
      newArr.push(session.value);
    });
    console.log("try newArr", newArr);
    console.log("try id", id);

    const docRef = firestore.collection("agSched").doc(id);

    batch.set(
      newArr.forEach((session, index) => {
        let arrRef = editRefArr[index];
        if (session.length > 0) {
          docRef.update(arrRef, session);
        } else {
          null;
        }
      })
    );
    // batch.set(
    // );
    await batch.commit();
  } catch (error) {
    console.log("enter catch");
    toast.error(error.message);
    return false;
  }
}

export async function useBatchSubmitHandler(e, newSessions) {
  // e.preventDefault();
  // setIsLoading(true);
  // setIsSubmit(true);

  const batch = firestore.batch();

  for (let i = 0; i < newSessions.length; i++) {
    const docRef = firestore.collection("agSched").doc();
    batch.set(docRef, newSessions[i]);
  }
  // console.log("in batchSubmitHandler", newSessions);

  toast.success("Sucussfully submitted to the server!");
  // setIsLoading(false);
  return await batch.commit();
  // return setNewSessions([]);
}

export async function useCancelSubmitHandler(e) {
  const id = e.target.id;
  const docRef = db.collection("agSched").doc(id);
  // docRef.update("cancel", true);
  docRef.update("initCancel", e.target.initCancel.value);
  docRef.update("revertCancel", e.target.revertCancel.value);
  // setIsLoading(false);
  toast.success("Session was successfully cancelled");
}

export const useCheckCancel = (initCancel, revertCancel) => {
  const today = new Date();
  const todayMonth =
    today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
  const todayDay =
    today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();

  // REMOVE FIRST 5 LETTERS FROM STRING (Typically year + '-')
  const stringInit = String(initCancel);
  const stringRevert = String(revertCancel);
  const dataStrInit = stringInit.slice(5);
  const dataStrRevert = stringRevert.slice(5);

  // console.log("dataStrInit", dataStrInit);
  // console.log("dataStrRevert", dataStrRevert);

  if (Number(dataStrInit.slice(0, 2)) === Number(todayMonth)) {
    if (
      Number(todayDay) >= Number(dataStrInit.slice(3)) &&
      Number(todayDay) < Number(dataStrRevert.slice(3))
    ) {
      // console.log("Session Should be Cancelled!");
      return true;
    } else {
      // console.log("Session should not be cancelled");
      return false;
    }
  }
};
