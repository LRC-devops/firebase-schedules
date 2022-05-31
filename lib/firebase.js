import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWzEu1C96hN6pJLO3P-gAXfYAtImrT1cc",
  authDomain: "reach-schedules--testdb.firebaseapp.com",
  projectId: "reach-schedules--testdb",
  storageBucket: "reach-schedules--testdb.appspot.com",
  messagingSenderId: "528391553050",
  appId: "1:528391553050:web:4aeb87c8a887193e4011a3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// AUTH
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// DATABASE
export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const db = firebase.firestore();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function sessionToJSON(doc) {
  const data = doc.data();
  if (data?.date) {
    return {
      ...data,
      createdAt: data?.createdAt.toMillis() || 0,
      docId: doc.id,
      date: data?.date.toMillis() || 0,
      // convDate: this.date.toDate(),
    };
  } else {
    return {
      ...data,
      createdAt: data?.createdAt.toMillis() || 0,
      docId: doc.id,
    };
  }
}
/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function sswSessionToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    docId: doc.id,
    date: data?.date.toMillis() || 0,
    // convDate: this.date.toDate(),
  };
}

/**
 *
 * @param {string} service
 */

export async function getDocWithSerivce(service) {
  const docRef = firestore.collection("LRC").doc("schedules");

  const query = docRef.where("service", "==", service);

  const serviceDoc = (await query.get()).docs;
  return serviceDoc;
}
