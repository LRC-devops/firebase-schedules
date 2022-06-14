import { firestore, auth, fromDate } from "../lib/firebase";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { serverTimestamp, db } from "../lib/firebase";
import moment from "moment";
// import { user } from "firebase-functions/v1/auth";

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

export function addSession(e, service, serviceType) {
  const s = e.target;

  if (serviceType === "sched") {
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
  } else if (serviceType === "calendar") {
    const timestampString = moment.utc(s.date.value).local().format();
    const timestamp = new Date(timestampString);
    const newSessObj = {
      subject: s.subject.value,
      mode: s.mode.value,
      date: fromDate(timestamp),
      createdAt: serverTimestamp(),
      id: `sswCalen${String(Math.random())}`,
    };
    return newSessObj;
  } else {
    return toast.error(
      `${serviceType} is not valid. Please try again, check for errors in the URL, or contact your administrator. Error in hooks.js`
    );
  }
  return newSessObj;
}

export async function deleteSession(id, service, serviceType) {
  console.log(id, service, serviceType);
  try {
    const promise = await db
      .collection("LRC")
      .doc("schedules")
      .collection(`${service}${serviceType}`)
      .doc(id)
      .delete()
      .then(
        toast.success(
          `${id} was successfully deleted from '/${service}/${serviceType}'`
        )
      );
  } catch (err) {
    return toast.error(err.message);
  }
}

export async function editSession(e, id, service, serviceType) {
  const editRefArr = ["subject", "course", "dayTime", "host", "link", "mode"];
  const batch = firestore.batch();
  console.log("enter useEditSession hook");

  try {
    const newArr = [];
    Array.from(e.target.elements).forEach((session) => {
      newArr.push(session.value);
    });

    const docRef = firestore
      .collection("LRC")
      .doc("schedules")
      .collection(`${service}${serviceType}`)
      .doc(id);

    batch.set(
      newArr.forEach((input, index) => {
        let arrRef = editRefArr[index];
        if (input.length > 0) {
          docRef.update(arrRef, input);
        } else {
          null;
        }
      })
    );
    const promise = await batch
      .commit()
      .then(toast.success(`${id} was successfully updated`));
  } catch (err) {
    if (
      err.message ===
      `Cannot use 'in' operator to search for '_delegate' in undefined`
    ) {
      toast.success(`${id} was successfully updated`);
    } else {
      toast.error(`${err.name}: ${err.message}`);
    }
  }
}

export async function batchSubmitHandler(newSessions, service, serviceType) {
  try {
    const batch = firestore.batch();
    if (newSessions.length === 1) {
      const docRef = firestore
        .collection("LRC")
        .doc("schedules")
        .collection(`${service}${serviceType}`)
        .doc();
      batch.set(docRef, newSessions[0]);
    } else if (newSessions.length > 1) {
      for (let i = 0; i < newSessions.length; i++) {
        const docRef = firestore
          .collection("LRC")
          .doc("schedules")
          .collection(`${service}${serviceType}`)
          .doc();
        batch.set(docRef, newSessions[i]);
      }
    }
    const quan = newSessions.length;

    return await batch
      .commit()
      .then(
        toast.success(
          `${quan} ${
            quan === 1 ? `session was` : `sessions were`
          } successfully uploaded`
        )
      );
  } catch (error) {
    toast.error(error.message);
  }
}

export async function cancelSession(e, service, serviceType) {
  const id = e.target.id;
  console.log("service", service, "serviceType", serviceType);
  try {
    const docRef = db
      .collection("LRC")
      .doc("schedules")
      .collection(`${service}${serviceType}`)
      .doc(id);
    await docRef.update("initCancel", e.target.initCancel.value);
    await docRef.update("revertCancel", e.target.revertCancel.value);
    toast.success("Session was successfully cancelled");
  } catch (err) {
    toast.error(err.message);
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

  // FIXME need better logic here or switch to cloud function
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
