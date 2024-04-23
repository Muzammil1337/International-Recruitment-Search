import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const appId = import.meta.env.VITE_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "international-recruitment-app.firebaseapp.com",
  projectId: "international-recruitment-app",
  storageBucket: "international-recruitment-app.appspot.com",
  messagingSenderId: "279755863522",
  appId: appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
