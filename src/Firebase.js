import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKX3V_0Ghma2pH5rd2PeTQWTWRoH01PUc",
  authDomain: "international-recruitment-app.firebaseapp.com",
  projectId: "international-recruitment-app",
  storageBucket: "international-recruitment-app.appspot.com",
  messagingSenderId: "279755863522",
  appId: "1:279755863522:web:f05262f36f808b3039f5bb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
