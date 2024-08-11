import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//

const firebaseConfig = {

  apiKey: "AIzaSyAZKqKB6cRwSL_eXZpE-5_MCtairYA7RqI",

  authDomain: "international-project-3f839.firebaseapp.com",

  projectId: "international-project-3f839",

  storageBucket: "international-project-3f839.appspot.com",

  messagingSenderId: "214950002739",

  appId: "1:214950002739:web:4d01448283af553cd8e346",

  measurementId: "G-SEQ5KNDLBX"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const GoogleProvider = new GoogleAuthProvider();
