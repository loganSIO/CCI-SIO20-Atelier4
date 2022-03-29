// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWw3t1_KZxKdMuxmeqXBurz_0sQtc-sD8",
  authDomain: "ephonyapp.firebaseapp.com",
  projectId: "ephonyapp",
  storageBucket: "ephonyapp.appspot.com",
  messagingSenderId: "1033034459895",
  appId: "1:1033034459895:web:eabd42e525920ddfc941f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db }