import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = import.meta.env.VITE_API_KEY;
const appId = import.meta.env.VITE_APP_ID;
const messageSenderId = import.meta.env.VITE_MESSAGE_SENDER_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "international-recruitment-app.firebaseapp.com",
  projectId: "international-recruitment-app",
  storageBucket: "international-recruitment-app.appspot.com",
  messagingSenderId: messageSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const GoogleProvider = new GoogleAuthProvider();
