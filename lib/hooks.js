import { firestore, auth } from "../lib/firebase";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { serverTimestamp, db } from "../lib/firebase";

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

export function useToast(ty, msg) {
  return `toast.${ty}(${msg})`;
}

export function addSession(e) {
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

export async function deleteSession(id) {
  try {
    await db
      .collection("LRC")
      .doc("schedules")
      .collection("agSched")
      .doc(id)
      .delete();
    return toast.success(`${id} was successfully Deleted`);
  } catch (error) {
    return toast.error(error);
  }
}

export async function editSession(e, id) {
  const editRefArr = ["subject", "course", "dayTime", "host", "link", "mode"];
  const batch = firestore.batch();
  console.log("enter useEditSession hook");

  try {
    console.log("enter try");
    const newArr = [];
    console.log("in useEditSession", e.target.elements);
    Array.from(e.target.elements).forEach((session) => {
      newArr.push(session.value);
    });
    console.log("try newArr", newArr);
    console.log("try id", id);

    const docRef = firestore
      .collection("LRC")
      .doc("schedules")
      .collection("agSched")
      .doc(id);

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
    await batch.commit();
    toast.success(`${id} was successfully updated`);
  } catch (error) {
    console.log("enter catch");
    toast.error(error.message);
    return false;
  }
}

export async function batchSubmitHandler(newSessions) {
  console.log("enter batchSubmit");

  try {
    const batch = firestore.batch();
    if (newSessions.length === 1) {
      const docRef = firestore
        .collection("LRC")
        .doc("schedules")
        .collection("agSched")
        .doc();
      batch.set(docRef, newSessions[0]);
      console.log(newSessions[0]);
    } else if (newSessions.length > 1) {
      for (let i = 0; i < newSessions.length; i++) {
        const docRef = firestore
          .collection("LRC")
          .doc("schedules")
          .collection("agSched")
          .doc();
        batch.set(docRef, newSessions[i]);
        console.log(newSessions[i]);
      }
    }
    const quan = newSessions.length;
    toast.success(
      `${quan} ${
        quan === 1 ? `session was` : `sessions were`
      } successfully uploaded`
    );
    return await batch.commit();
  } catch (error) {
    toast.error(error.message);
  }
}

export async function cancelSession(e) {
  const id = e.target.id;
  const docRef = db
    .collection("LRC")
    .doc("schedules")
    .collection("agSched")
    .doc(id);
  try {
    await docRef.update("initCancel", e.target.initCancel.value);
    await docRef.update("revertCancel", e.target.revertCancel.value);
    toast.success("Session was successfully cancelled");
  } catch (err) {
    toast.error(err);
  }
}

export const checkCancel = (initCancel, revertCancel) => {
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

  if (Number(dataStrInit.slice(0, 2)) === Number(todayMonth)) {
    if (
      Number(todayDay) >= Number(dataStrInit.slice(3)) &&
      Number(todayDay) < Number(dataStrRevert.slice(3))
    ) {
      return true;
    } else {
      return false;
    }
  }
};
