import { doc, setDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../Firebase";
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";

export const UserFormContext = createContext(null);

const INITIAL_STATES = {
  summary: "",
  PersonalInfo: {
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    github: "",
    linkedin: "",
  },
  WorkExperience: [],
  Education: [],
  Skills: [],
};

export const UserFormProvider = () => {
  const [data, setData] = useState(INITIAL_STATES);
  const navigate = useNavigate();

  const updateUserInformation = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  };

  const AddToDatabase = async (id) => {
    try {
      await setDoc(doc(db, "User-Info", id), data);
      setData(INITIAL_STATES);
      navigate("/user");
      toast.success("Job Seeker Info added successfully for resume");
    } catch (error) {
      console.log(error);
    }
  };

  const value = { data, updateUserInformation, AddToDatabase };

  return (
    <UserFormContext.Provider value={value}>
      <Outlet />
    </UserFormContext.Provider>
  );
};

export default UserFormProvider;
