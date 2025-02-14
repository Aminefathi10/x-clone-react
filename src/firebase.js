import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzbtmwZFTO1ZvWrDwHvtXl_XEUot7n_jo",
  authDomain: "x-react-87a4d.firebaseapp.com",
  projectId: "x-react-87a4d",
  storageBucket: "x-react-87a4d.appspot.com",
  messagingSenderId: "481679969860",
  appId: "1:481679969860:web:5b3e097f1e3a29e2323611",
  measurementId: "G-TLLFWTP6JQ"
};
initializeApp(firebaseConfig);
  
const db = getFirestore();
const auth = getAuth();

export { db, auth };