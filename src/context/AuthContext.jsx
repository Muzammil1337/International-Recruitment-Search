import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { GoogleProvider, auth, db } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, onSnapshot } from "firebase/firestore";

export const AuthContext = createContext(null);

export default function AuthProvider() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);

  const token = JSON.parse(localStorage.getItem("access_token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsLogged(true);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const uemail = user.email;
          setUserEmail(uemail);
          setId(uid);
          getUserData(uid);
        }
      });
    }
  }, [token, navigate]);

  const getUserData = (id) => {
    setLoadData(true); // Start in the loading state

    try {
      const docRef = doc(db, "User-Info", id);

      const unsubscribe = onSnapshot(docRef, (doc) => {
        setData(doc.data());
        console.log(doc.data());
        setLoadData(false); // Data is ready, turn off loading
      });

      return unsubscribe; // Return the unsubscribe function
    } catch (error) {
      console.error(error);
      setLoadData(false); // Something went wrong, still turn off loading
    }
  };

  const SignIn = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem(
        "access_token",
        JSON.stringify(res._tokenResponse.idToken)
      );
      setIsLoading(false);
      navigate("/");
      toast.success("User signed in successfully!", {
        position: "top-right",
      });
    } catch (error) {
      setIsLogged(false);
      toast.error("(auth/email-or-password-not-found)", {
        position: "top-right",
      });
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
      navigate("/");
      toast.success("User created successfully!", {
        position: "top-right",
      });
    } catch (error) {
      setIsLogged(false);
      toast.error("(auth/email-already-in-use)", {
        position: "top-right",
      });
    }
  };

  const SignUpWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, GoogleProvider);
      localStorage.setItem(
        "access_token",
        JSON.stringify(res._tokenResponse.idToken)
      );
      setIsLoading(false);
      console.log(res);
      navigate("/");
      toast.success("Signed In with Google!", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      setIsLogged(false);
      toast.error("(auth/email-already-in-use)", {
        position: "top-right",
      });
    }
  };

  const SignOut = () => {
    localStorage.removeItem("access_token");
    setIsLogged(false);
    navigate("/");
    toast.error("User signed out!", {
      position: "top-right",
    });
  };

  const value = {
    SignIn,
    SignUp,
    isLogged,
    isLoading,
    userEmail,
    SignOut,
    id,
    data,
    SignUpWithGoogle,
    loadData,
  };
  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  );
}
