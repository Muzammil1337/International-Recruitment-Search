import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//

const firebaseConfig = {
  apiKey: "AIzaSyBUiH4yJJTgNNl7g-s5j8NQ9RE6pOHg-UE",
  authDomain: "international-recruitment.firebaseapp.com",
  projectId: "international-recruitment",
  storageBucket: "international-recruitment.appspot.com",
  messagingSenderId: "516582616113",
  appId: "1:516582616113:web:9274f3010239c63a1af910",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const GoogleProvider = new GoogleAuthProvider();
