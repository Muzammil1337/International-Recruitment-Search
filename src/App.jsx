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

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
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
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}
