import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

export default function AuthProvider() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const token = JSON.parse(localStorage.getItem("access_token"));
  const navigate = useNavigate();

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
          console.log(uid);
          navigate("/");
          // ...
        } else {
          console.log("No user found");
        }
      });
    }
  }, [token, navigate]);

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
      navigate("/sign-in");
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
      navigate("/sign-up");
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
  };
  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  );
}
