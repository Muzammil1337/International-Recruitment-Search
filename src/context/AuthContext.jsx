import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const token = JSON.parse(localStorage.getItem("access_token"));

  useEffect(() => {
    if (token) {
      setIsLogged(true);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          const uemail = user.email;
          setUserEmail(uemail);
          console.log(uid, user);

          // ...
        } else {
          console.log("No user found");
        }
      });
    }
  }, [token]);

  const SignIn = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem(
        "access_token",
        JSON.stringify(res._tokenResponse.idToken)
      );
      setIsLoading(false);
    } catch (error) {
      console.log(
        "There is a problem while creating user or User Exists",
        error
      );
      setIsLogged(false);
    }
  };

  const SignUp = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem(
        "access_token",
        JSON.stringify(res._tokenResponse.idToken)
      );
      setIsLoading(false);
      console.log(res);
    } catch (error) {
      console.log(
        "There is a problem while creating user or User Exists",
        error
      );
      setIsLogged(false);
    }
  };
  const value = {
    SignIn,
    SignUp,
    isLogged,
    isLoading,
    userEmail,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
