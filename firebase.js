// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCjedIB_D7yt3rXaOKLE95MSSUofEawHt8",
  authDomain: "mm-dashboard-f82fd.firebaseapp.com",
  projectId: "mm-dashboard-f82fd",
  storageBucket: "mm-dashboard-f82fd.appspot.com",
  messagingSenderId: "967355119644",
  appId: "1:967355119644:web:42c88eb3d180244a7a07d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
