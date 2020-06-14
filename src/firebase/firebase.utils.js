import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpPBAkL6sd7ID-Wt8PXWZYt4T26-4D0Hs",
  authDomain: "reactzero-629ad.firebaseapp.com",
  databaseURL: "https://reactzero-629ad.firebaseio.com",
  projectId: "reactzero-629ad",
  storageBucket: "reactzero-629ad.appspot.com",
  messagingSenderId: "305339732381",
  appId: "1:305339732381:web:e4748814431e71998a1f74",
  measurementId: "G-WFWV4ZEE61",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
