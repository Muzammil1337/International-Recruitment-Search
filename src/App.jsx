import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Layout from "./pages/Layout";
import ResumeBuilder from "./pages/Resume-Builder";
import AuroraHero from "./components/Hero";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";
import ProtectedRoute from "./pages/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import UserFormProvider from "./context/FormContext";
import UserPage from "./pages/UserPage";
import MyResume from "./pages/My-Resume";

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        element: <UserFormProvider />,
        children: [
          {
            path: "/",
            element: <Layout />,
            children: [
              {
                path: "/",
                element: <AuroraHero />,
              },
              {
                path: "/resume-builder",
                element: (
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                ),
              },
              {
                path: "/user",
                element: (
                  <ProtectedRoute>
                    <UserPage />
                  </ProtectedRoute>
                ),
              },
              {
                path: "/about-us",
                element: <About />,
              },
              {
                path: "/contact-us",
                element: <Contact />,
              },
              {
                path: "/sign-up",
                element: <SignUp />,
              },
              {
                path: "/sign-in",
                element: <SignIn />,
              },
              {
                path: "/my-resume",
                element: <MyResume />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <Fragment>
      <ToastContainer />
      <RouterProvider router={router} />
    </Fragment>
  );
}
