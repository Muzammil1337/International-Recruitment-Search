import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserPage = () => {
  const { data } = useContext(AuthContext);

  return <div>{JSON.stringify(data)}</div>;
};

export default UserPage;
