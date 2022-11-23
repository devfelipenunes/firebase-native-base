import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_aCxdu5hEqKW_WYwsauWCVuChOJR3IF0",
  authDomain: "fir-login-e2326.firebaseapp.com",
  projectId: "fir-login-e2326",
  storageBucket: "fir-login-e2326.appspot.com",
  messagingSenderId: "758835452979",
  appId: "1:758835452979:web:7676498fb458e323899746",
  measurementId: "G-0665L2MXPG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

let currentUser = undefined;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

export { auth, currentUser, db };
